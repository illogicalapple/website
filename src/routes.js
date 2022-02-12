import Home from "./views/Home.vue"
import NopeNothingHere from "./views/NopeNothingHere.vue"
import Blog from "./views/Blog.vue"
import BlogPost from "./views/BlogPost.vue"
import Piano from "./views/Piano.vue"
import Scribble from "./views/Scribble.vue"
import LogicalKumquat from "./views/classmates/LogicalKumquat.vue"
export let routes = [
	{
		path: "/",
	 	component: Home,
		name: "home",
	 	meta: {
			title: "illogicalapple",
			metaTags: [{
				name: "description",
				content: "my website"
			}]
		}
	},
	{
		path: "/scribble",
	 	component: Scribble,
		name: "scribble",
	 	meta: {
			title: "scribble",
			metaTags: [{
				name: "description",
				content: "destroys your drawing for you... you're welcome"
			}]
		}
	},
	{
		path: "/blog",
		component: Blog,
		name: "blog",
		meta: {
			title: "blog",
			metaTags: [{
				name: "description",
				content: "my blog"
			}]
		}
	},
	{
		path: "/online-piano/:id",
		component: Piano,
		name: "online piano",
		meta: {
			title: "online piano",
			metaTags: [{
				name: "description",
				content: "a piano thats online"
			}]
		}
	},
	/*{
		path: "/online-piano",
		component: JoinPiano,
		name: "online piano",
		meta: {
			title: "online piano",
			metaTags: [{
				name: "description",
				content: "a piano thats online"
			}]
		}
	},*/
	{
		path: "/blog/:postName",
		component: BlogPost,
		name: "blog post",
		meta: {
			title: "loading... "
		}
	},
	{
		path: "/classmates/logicalkumquat",
		component: LogicalKumquat,
		name: "logicalkumquat",
		meta: {
			title: "logicalkumquat"
		}
	},
	{
		path: "/:pathMatch(.*)*",
	 	component: NopeNothingHere,
		name: "404",
	 	meta: {
			title: "404: not found",
			metaTags: [{
				name: "robots",
				content: "noindex"
			}]
		}
	}
];
