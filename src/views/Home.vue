<template>
	<data :value="currentHolidays.join(' ')"></data>
	<main id="content" style="--forty: calc(0.4 * var(--height));">
		<img src="/apples-cropped.png" style="height: 30vw; top: 50%; position: absolute; transform: translateY(-50%); left: 15vw; max-width: var(--forty); max-height: var(--forty);">
		<div class="text" style="left: calc(30vw + min(30vw, var(--forty))); position: absolute; width: 25vw; top: 50%; transform: translateY(-50%);">
			<h1> hi, <span class="home-blue-underline" style="position: relative;">it's me.</span></h1>
			<p style="font-size: 1.4em;">
				pray for ukraine
			</p>
		</div>
		<a target="_blank" href="https://discord.gg/VADksDBydT">
			<img src="../assets/discord-logo.svg" style="position: fixed; bottom: 20px; height: 20px; left: 20px;">
		</a>
	</main>
	<Suspense>
	  <Fireworks v-if="currentHolidays.includes('4thjuly')" />
	</Suspense>
	<Suspense><Fireworks /></Suspense> <!-- for testing: remove later -->
</template>
<script setup>
	import Fireworks from "../components/holidays/Fireworks.vue"
	const holidays = {
		"7/4": ["4thjuly"]
	}
	const currentHolidays = holidays[`${(new Date).getMonth()}/${(new Date).getDate()}`];
</script>
<style scoped>
  data[value~=4thjuly] ~ main * {
  	color: white;
  }
  data[value~=4thjuly] ~ main {
  	background-color: #121212;
  }
  main * {
  	color: white !important; /* for testing-- remove later */
  }
  main {
  	background-color: #121212;
  }
</style>
