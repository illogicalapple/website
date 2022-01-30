<template>
	<main id="content">
		<div class="piano" style="height: 100%; text-align: center;">
			<div class="key-parent" v-for="key in keys.white" :style="key[0] == '_' ? blackParentStyle : ''">
				<div class="key-white" v-if="key[0] != '_'" @mousedown="startNote(key)" @mouseup="endNote(key)">
					{{ key[0] }}
				</div>
				<div class="key-black" v-else @mousedown="startNote(keys.black[key[1]])" @mouseup="endNote(keys.black[key[1]])">
					{{ keys.black[key[1]].substring(0, 2) }}
				</div>
			</div>
		</div>
	</main>
</template>
<script setup>
	import { ref } from "vue"
	import { useRoute } from "vue-router"
	import * as Tone from "tone"
	import { io } from "socket.io-client"
	const keys = {
		white: [
			"C4",
			"_0",
			"D4",
			"_1",
			"E4",
			"F4",
			"_2",
			"G4",
			"_3",
			"A4",
			"_4",
			"B4"
		],
		black: [
			"C#4",
			"D#4",
			"F#4",
			"G#4",
			"A#4"
		]
	};
	const blackParentStyle = "position: absolute; transform: translate(-50%, calc(-25% + 0.5em)); z-index: 2000;";
	const gethex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	const userid = gethex(13);
	const notes = ref([]);
	const playing = ref([]);
	const pianoid = useRoute().params.id;
	const socket = io("wss://websocket-piano-server.herokuapp.com/api/socketio", {
		withCredentials: true
	});
	socket.on("connect", () => socket.join(id));
	const startNote = function(note) {
		if(!notes.value.includes(note)) {
			notes.value.push(note);
			socket.to(id).emit("note-start", {
				user: userid,
				note
			});
		}
	};
	const endNote = function(note) {
		if(notes.value.includes(note)) {
			notes.value.filter(e => !e == note);
			socket.to(id).emit("note-end", {
				user: userid,
				note
			});
		}
	}
	socket.on("note-start", function(stuff) {
		if(!playing.value[stuff.user]) {
			playing.value[stuff.user] = new Tone.PolySynth(Tone.Synth).toDestination();
		}
		playing.value[stuff.user].triggerAttack(stuff.note);
	});
	socket.on("note-end", function(stuff) {
		if(!playing.value[stuff.user]) {
			playing.value[stuff.user] = new Tone.PolySynth(Tone.Synth).toDestination();
		} else {
			playing.value[stuff.user].triggerRelease(stuff.note);
		}
	});
</script>
<style scoped>
.key-white {
    display: inline-block;
    height: 100%;
    aspect-ratio: 1/3;
    padding-top: calc(((var(--height) - 85px) * 0.325));
    text-align: center;
    border: 1px solid lightgray;
    transition: filter 0.1s;
}

.key-parent {
    display: inline-block;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    height: 50%;
}

.key-black {
    color: white;
    background-color: #333;
    height: 50%;
    aspect-ratio: 1/3;
    padding-top: calc((var(--height) / 8) - 1.5em);
    transform: translateY(calc(-50% - 0.5em));
    transition: filter 0.1s;
}
.key-white:active {
	filter: brightness(0.8);
}
.key-black:active {
	filter: brightness(1.2);
}
</style>
