<template>
	<data data-home></data>
	<main id="content">
		<div class="text" style="position: absolute; transform: translateY(-50%); top: calc(50% + 50px); left: 10vw; width: calc(80vw - (100vh - 50px) / 1.509765625); font-size: 1.4em;">
			<h1 class="red"> Hello. </h1>
			<p style="padding: 0px; margin: 0px;">
				My name is <span class="red">
					illogicalapple
				</span> and I am an <span class="red">
					apple. 
				</span>
				I started making <router-link to="true-facts" style="color: var(--orange);">true-facts</router-link> in <time datetime="2020-12">
					December 2020,
				</time> and I made some other fun <router-link to="my-stuff" style="color: var(--orange);">stuff</router-link> later.
				I really like making stuff.
				<br> <br> Hope you enjoy!
			</p>
		</div>
		<img src="/apple-image.jpg" style="position: absolute; bottom: 0px; right: 0px; height: calc(100vh - 50px); z-index: -1;" class="apple" alt="Apple">
	</main>
</template>
