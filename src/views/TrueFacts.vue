<template>
	<main id="content">
		<div class="fact-wrapper">
			<div class="fact" style="padding: 40px; margin-bottom: 40px;">
				<header>
					<h1 style="font-size: 1.7em;">
						fact number
						<span class="number">
							{{ getNumber() }}
							<span class="underline"></span>
						</span>
					</h1>
				</header>
				<span class="text" v-text="getText()"></span>
			</div>
			<a href="javascript:void(0)" class="nother fact please blue" @click="another()" style="padding: 40px;">i want another fact</a>
		</div>
	</main>
</template>
<script setup>
	import { ref } from "vue"
	import Repetition from "../modules/facts/delayed-repetition.js"
	import facts from "../modules/facts/facts.js"
	const repetition = new Repetition(facts, 3);
	const params = new URLSearchParams(location.search);
	const number = ref("");
	const text = ref("");
	number.value = params.get("id") || String(facts.indexOf(repetition.random(true)) + 1);
	text.value = facts[Number(number.value) - 1];
	console.log(number.value);
	console.log(text.value);
	const another = function() {
		number.value = String(facts.indexOf(repetition.random(true)) + 1);
		text.value = facts[Number(number.value) - 1];
		console.log(number.value);
		console.log(text.value);
	};
	const getText = () => text.value;
	const getNumber = () => number.value;
</script>
<style scoped>
	a.nother.fact.please /* lolz */ {
		color: var(--secondary);
	}
	div.fact header {
		display: inline-block;
		width: 100%;
	}
	div.fact {
		display: inline-block;
		width: 100%;
		border-bottom: 1px solid lightgray;
	}
	div.fact-wrapper {
		width: 40%;
		min-width: min(500px, 100vw);
		position: absolute;
		top: 50%;
		left: 30%;
		transform: translateY(-50%);
	}
	span.number .underline {
		display: block;
		margin: auto;
		margin-top: -0.65em;
		height: 0.5em;
		background-color: #007fff;
		width: calc(100% - 20px);
		position: absolute;
		left: 10px;
		z-index: -1;
	}
	span.number {
		position: relative;
		display: inline-block;
	}
</style>
