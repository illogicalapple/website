import Home from "./views/Home.vue";
import NopeNothingHere from "./views/NopeNothingHere.vue";
export let routes = [
	{
		path: "/",
	 	component: Home,
		name: "home",
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
	},
	{
		path: "/404",
	 	component: NopeNothingHere,
		name: "404",
	 	meta: {
			title: "404: not found",
			metaTags: [
				{
					name: "description",
					content: "this is a 404 :D"
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0"
				},
				{
					name: "robots",
					content: "noindex"
				},
				{
					name: "charset",
					content: "UTF-8"
				}
			]
		}
	}
];
