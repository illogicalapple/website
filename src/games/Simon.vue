<template>
	<div class="wrapper">
		<!--div v-for="i in range(4)" :class="'square ' + i + ' ' + states.value[i]" :key="i" @click="clicked(i)"></div-->
	</div>
</template>
<!--script setup>
	import { ref } from "vue"
	const range = function(length) {
		return (new Array(length)).fill(0);
	}
	const wait = function(ms) {
		return new Promise((resolve, reject) {
			setTimeout(() => {
				resolve(true);
			}, ms);
		});
	}
	const states = ref([
		"empty",
		"empty",
		"empty",
		"empty"
	]);
	const clicked = function(index) {
	
	}
	async function run() {
		let sequence = [];
		for(i in range(12)) {
			states.value[i % 4] = "active";
			wait(50).then(r => {
				states.value[i % 4] = "empty";
			});
			await wait(50);
		}
		await wait(2000);
		while(true) {
			sequence.push(Math.floor(Math.random() * 4));
			for(let item of sequence) {
				states.value[item] = "active";
				await wait(500);
				states.value[item] = "empty";
				await wait(500);
			}
			
			await wait(2000);
		}
	}
</script>
<style scoped>
	div.active.square {
		filter: brightness(1.5)
	}
</style-->
