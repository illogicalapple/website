<template>
	<main id="content" style="--forty: calc(0.4 * var(--height));">
		<img src="/apples-cropped.png" style="height: 30vw; top: 50%; position: absolute; transform: translateY(-50%); left: 15vw; max-width: var(--forty); max-height: var(--forty);">
		<div class="text" style="left: calc(30vw + min(30vw, var(--forty))); position: absolute; width: 25vw; top: 50%; transform: translateY(-50%);">
			<h1> hi, <span class="home-blue-underline" style="position: relative;">it's me.</span></h1>
			<p style="font-size: 1.4em;">
				<style>
					.radi8-webring-container {
  						all: unset;
  						flex-direction: column;
  						padding: 1em;
					}
				</style>
				<script src="https://cdn.radi8.dev/ring.js" data-site-id="illogicalapple"></script>
			</p>
		</div>
		<a target="_blank" href="https://discord.gg/VADksDBydT">
			<img src="../assets/discord-logo.svg" style="position: fixed; bottom: 20px; height: 20px; left: 20px;">
		</a>
	</main>
</template>
