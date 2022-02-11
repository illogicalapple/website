<template>
	<main id="content"
		@keydown.space="toggleScribble()"
		@keydown.ctrl.s.prevent="download('image')"
		@keydown.ctrl.shift.s.prevent="download('json')"
		@keydown.ctrl.o.prevent="upload()"
	>
		<canvas
			id="drawing"
			ref="canvas"
			@touchstart="handleMouseDown($event)"
			@touchmove.prevent="handleMouseMove($event)"
			@touchend="handleMouseUp($event)"
			@touchcancel="handleMouseUp($event)"
			@mousedown="handleMouseDown($event)"
			@mousemove.prevent="handleMouseMove($event)"
			@mouseup="handleMouseUp($event)"
			@load="onWindowResize()"
		></canvas>
		<footer class="menu-wrapper">
			<div class="menu-flexbox">
				<div class="color"></div>
				<img src="../assets/scribble/normal.svg" @click="toggleScribble(false)">
				<img src="../assets/scribble/scribblified.svg" @click="toggleScribble(true)">
			</div>
			<a style="opacity: 0; display: inline-block; width: 0px; height: 0px;" ref="downloadAnchor" download></a>
		</footer>
	</main>
</template>
<script setup>
	import { compress, decompress } from "../modules/scribble/compress.js" // compress, decompress
	import { ref, onBeforeUnmount, onMounted } from "vue"
	import { onBeforeRouteLeave } from "vue-router"
	import { saveAs } from "file-saver"
	const drawing = ref({
		title: "untitled",
		destroy: 20,
		frames: [[]]
	});
	const scribbled = ref(false);
	const downloadAnchor = ref(null);
	const canvas = ref(null);
	const interval = ref(null);
	const warp = (e, s, a) => [e[0] + Math.sin(Date.now() * s + e[1]) * a, e[1] + Math.sin(Date.now() * s + e[0]) * a];
	const location = function(event) { // get location of the touch/mouse event
		if(event instanceof TouchEvent) {
			return [ (event.touches[0] || event.changedTouches[0]).clientX, (event.touches[0] || event.changedTouches[0]).clientY - 85 ]; // single touch im not bothering to do multiple :p
		} else {
			return [ event.clientX, event.clientY - 85 ];
		}
	}
	const target = ref(null);
	const mouse = ref(false);
	const oldPosition = ref(false);
	const render = function() {
		canvas.value.width += 0;
		let rendering = drawing.value.frames[0];
		let destroyed = scribbled.value;
		let context = canvas.value.getContext("2d");
		context.strokeStyle = "black";
		context.lineCap = "round";
		context.lineWidth = 5;
		context.beginPath();
		let down = false;
		let _warp = destroyed ? warp : e => e
		let position = false;
		rendering.forEach(e => {
			if(e == "DOWN") { down = true; return; }
			if(e == "UP") { down = false; return; }
			if(down) {
				context.beginPath();
				context.moveTo(...(position || e));
				position = _warp(e, 0.01, 20);
				context.lineTo(..._warp(e, 0.01, 20));
				context.stroke();
			} else {
				context.moveTo(..._warp(e, 0.01, 20));
				position = _warp(e, 0.01, 20);
			}
		});
		return context;
	};
	const addLine = function(context, position) {
		if(position == "DOWN") { mouse.value = true; return; }
		if(position == "UP") { mouse.value = false; return; }
		if(mouse.value) {
			context.beginPath();
			context.moveTo(...(oldPosition.value || position));
			oldPosition.value = position;
			context.lineTo(...position);
			context.stroke();
		} else {
			context.moveTo(...position);
			oldPosition.value = position;
		}
	};
	const toggleScribble = function(bob) {
		scribbled.value = bob ?? !scribbled.value;
		if(interval.value && !scribbled.value) {
			clearInterval(interval.value);
			interval.value = null;
			render();
		}
		if(!interval.value && scribbled.value) {
			interval.value = setInterval(render, 33);
		}
	};
	const upload = () => null;
	const download = function(type) {
		switch(type) {
			case "image":
				render();
				let uri1 = canvas.value.toDataURL("image/png");
				downloadAnchor.value.href = uri1;
				downloadAnchor.value.click();
				break;
			case "json":
				let uri2 = "data:application/json;," + encodeURIComponent(compress(drawing.value));
				downloadAnchor.value.href = uri2;
				downloadAnchor.value.click();
				break;
		}
	};
	const handleMouseDown = function(event) {
		if(!target.value) target.value = render();
		const position = location(event);
		drawing.value.frames[0].push(position);
		addLine(target.value, position);
		drawing.value.frames[0].push("DOWN");
		addLine(target.value, "DOWN");
	};
	const handleMouseUp = function(event) {
		if(!target.value) target.value = render();
		const position = location(event);
		drawing.value.frames[0].push(position);
		addLine(target.value, position);
		drawing.value.frames[0].push("UP");
		addLine(target.value, "UP");
	};
	const handleMouseMove = function(event) {
		if(!target.value) target.value = render();
		const position = location(event);
		if(mouse.value) { drawing.value.frames[0].push(position); addLine(target.value, position); }
	};
	const onWindowResize = function() {
		canvas.value.width = window.innerWidth;
		canvas.value.height = window.innerHeight - (85 * 2);
		render();
	}
	onMounted(function() {
		window.addEventListener("load", onWindowResize);
		window.addEventListener("resize", onWindowResize);
		setTimeout(onWindowResize, 200); // to ensure the page has actually loaded
	});
	onBeforeUnmount(function() {
		clearInterval(interval.value);
		interval.value = null;
		window.removeEventListener("load", onWindowResize);
		window.removeEventListener("resize", onWindowResize);
	});
	window.onbeforeunload = () => "do you really want to leave? your edits will be lost";
	onBeforeRouteLeave((to, from) => {
		const answer = window.confirm("do you really want to leave? your edits will be lost");
		if(!answer) return false;
	});
</script>
<style scoped>
	footer.menu-wrapper {
		height: 85px;
		position: absolute;
		bottom: 0px;
		left: 0px;
		padding-left: 30px;
		display: block;
		border-top: 1px solid lightgray;
		width: 100%;
	}
	div.menu-flexbox {
		display: flex;
		flex-wrap: nowrap;
		gap: 30px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	div.menu-flexbox > * {
		height: 30px;
		width: 30px;
		position: relative;
		top: 50%;
	}
	div.color {
		border-radius: 50%;
		background-color: black;
	}
</style>
