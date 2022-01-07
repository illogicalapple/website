import App from "./views/App.vue";
export let routes = [
	{
		path: "/",
	 	component: App,
	 	meta: {
			title: "illogicalapple",
			metaTags: [
				{
					name: "description",
					content: "my website"
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0"
				},
				{
					name: "author",
					content: "illogicalapple"
				},
				{
					name: "charset",
					content: "UTF-8"
				}
			]
		}
	}
];
