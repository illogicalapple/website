<template>
	<textarea @input="change($event)" v-model="value">{{ stuff }}</textarea>
	<!-- stuff is gotten from localstorage and hopefully later mongodb but probably not cause im lazy -->
</template>
<script setup>
	import { ref, onMounted, onBeforeUnmount, watch } from "vue";
	import { useRoute } from "vue-router";
	const route = useRoute();
	const id = route.params.id; // to get stuff out of localstorage :p
	const doc = ref("");
	const old = ref(null);
	const changed = ref(false);
	const intervals = ref([]);
	const change = function(event) {
		changed.value = true;
	};
	const loadDiff = function(a, b, reversed) {
		var start = 0;
		var end = 0;
		if(a.length > b.length) {
			return ["-", loadDiff(b, a, true)[1]];
		} else {
			if(a.length == b.length) return ["="];
			while(a[start] == b[start] && start < b.length - 1) {
				start++;
			}
			while(a[a.length - end] == b[b.length - end] && 1 < end) {
				end++;
			}
			end = (b.length - 1) - end;
			return ["+", `${start}||${end}`];
		}
	};
	onMounted(() => {
		intervals.value.push(setInterval(() => {
			if(changed.value) {
				const element = window.document.querySelector("textarea");
				axios.post("https://docs-server.vercel.app/api/send", {
					id: id,
					action: "set",
					message: JSON.stringify({
						"value": String(value),
						"cursor": [element.selectionStart, element.selectionEnd]
					})
				});
			}
			old.value = value;
			changed.value = false;
		}, 200));
	});
	onBeforeUnmount(() => {
		intervals.value.forEach((e, i) => {
			clearInterval(e);
		});
	});
</script>
