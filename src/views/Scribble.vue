<template>
	<main id="content"
		@keyup.space="toggleScribble()"
		@keyup.ctrl.s.prevent="download('image')"
		@keyup.ctrl.shift.s.prevent="download('json')"
		@keyup.ctrl.o.prevent="upload()"
	>
		<canvas
			id="drawing"
			ref="canvas"
			@touchstart="handleMouseDown($event)"
			@touchmove.prevent="handleMouseMove($event)"
			@touchend="handleMouseUp($event)"
			@mousedown="handleMouseDown($event)"
			@mousemove.prevent="handleMouseMove($event)"
			@mouseup="handleMouseUp($event)"
		></canvas>
		<footer class="menu-wrapper">
			<div class="menu-flexbox">
				<div class="color"></div>
				<img src="../assets/scribble/normal.svg" @click="toggleScribble(false)">
				<img src="../assets/scribble/scribblified.svg" @click="toggleScribble(true)">
			</div>
			<a style="opacity: 0; display: inline-block; width: 0px; height: 0px;" ref="downloadAnchor" download>
		</footer>
	</main>
</template>
<script setup>
	import * from "../modules/scribble/compress.js" // compress, decompress
	import { ref, onMounted, onBeforeUnmount } from "vue"
	const drawing = ref({
		title: "untitled",
		destroy: 20,
		frames: [[]]
	});
	const scribbled = ref(false);
	const downloadAnchor = ref(null);
	const canvas = ref(null);
	const interval = ref(null);
	const toggleScribble = function(bob) {
		scribbled.value = bob || !scribbled.value;
		if(interval.value && !scribbled.value) {
			clearInterval(interval.value);
			interval.value = null;
		}
		if(!interval.value && scribbled.value) {
			interval.value = setInterval(render, 33);
		}
	};
	const warp = (e, s, a) => [e[0] + Math.sin(Date.now() * s + e[1]) * a, e[1] + Math.sin(Date.now() * s + e[0]) * a];
	const location = function(event) { // get location of the touch/mouse event
		if(event instanceof TouchEvent) {
			return [ event.touches[0].clientX, event.touches[0].clientY ]; // single touch im not bothering to do multiple :p
		} else {
			return [ event.clientX, event.clientY ];
		}
	}
	const render = function(draw, destroy) {
		let rendering = draw || drawing.value.frames[0];
		let destroyed = destroy || scribbled.value;
		let context = canvas.getContext("2d");
		let moved = false;
		context.beginPath();
		let down = false;
		let _warp = destroyed ? warp : e => e
		rendering.forEach(e => {
			if(e == "DOWN") { down = true; moved = false; return; }
			if(e == "UP") { down = false; return; }
			if(down) {
				if(!moved) context.moveTo(...e);
				moved = true;
				context.lineTo(..._warp(e, 0.01, 20));
				context.stroke();
			} else {
				context.moveTo(..._warp(e, 0.01, 20));
			}
		});
	};
	const upload = () => null;
	const download = function(type) {
		switch(type) {
			case "image":
				render();
				let uri = canvas.toDataURL("image/png");
				downloadAnchor.href = uri;
				downloadAnchor.click();
				break;
			case "json":
				let uri = "data:application/json;," + encodeURIComponent(compress(drawing.value));
				downloadAnchor.href = uri;
				downloadAnchor.click();
				break;
		}
	};
	const handleMouseDown = function(event) {
		const position = location(event);
		drawing.value.frames[0].push(position);
		drawing.value.frames[0].push("DOWN");
		if(!scribbled.value) render();
	};
	const handleMouseUp = function(event) {
		const position = location(event);
		drawing.value.frames[0].push(position);
		drawing.value.frames[0].push("UP");
		if(!scribbled.value) render();
	};
	const handleMouseMove = function(event) {
		const position = location(event);
		drawing.value.frames[0].push(position);
		if(!scribbled.value) render();
	};
	onBeforeUnmount(function() {
		clearInterval(interval.value);
		interval.value = null;
	});
</script>
<style scoped>
	footer.menu-wrapper {
		height: 85px;
		position: absolute;
		bottom: 0px;
		left: 0px;
		padding-left: 30px;
	}
	div.menu-flexbox {
		display: flex;
		flex-wrap: nowrap;
		gap: 30px;
	}
	div.menu-flexbox > * {
		height: 30px;
		width: 30px;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	div.color {
		border-radius: 50%;
		background-color: black;
	}
</style>
