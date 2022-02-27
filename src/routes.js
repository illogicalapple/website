// me
import Home from "./views/Home.vue"
import NopeNothingHere from "./views/NopeNothingHere.vue"
import Blog from "./views/Blog.vue"
import BlogPost from "./views/BlogPost.vue"
import Piano from "./views/Piano.vue"
import Scribble from "./views/Scribble.vue"
import TrueFacts from "./views/TrueFacts.vue"

// classmates
import IllogicalBanana from "./views/classmates/IllogicalBanana.vue"
import Potato from "./views/classmates/Potato.vue"
import Iciclin from "./views/classmates/Iciclin.vue"
import SmileyShrimps from "./views/classmates/SmileyShrimps.vue"

// boring
import Navbar from "./components/Navbar.vue" // change navbar with _navbar

// code
let _routes = [
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
		path: "/true-facts",
		component: TrueFacts,
		name: "true facts",
		meta: {
			title: "true facts",
			metaTags: [{
				name: "description",
				content: "facts teachers will hate"
			}]
		}
	},
	{
		path: "/facts",
		redirect: "/true-facts"
	},
	{
		path: "/completely-true-facts",
		redirect: "/true-facts"
	},
	{
		path: "/blog/:postName",
		component: BlogPost,
		name: "blog post",
		meta: {
			title: "loading... "
		}
	},
	{
		path: "/classmates/illogicalbanana",
		component: IllogicalBanana,
		name: "illogicalbanana",
		meta: {
			title: "illogicalbanana"
		}
	},
	{
		path: "/classmates/potato",
		component: Potato,
		name: "potato",
		meta: {
			title: "potato"
		}
	},
	{
		path: "/classmates/iciclin",
		component: Iciclin,
		name: "Iciclin",
		meta: {
			title: "Iciclin"
		}
	},
	{
		path: "/classmates/smileyshrimps",
		component: SmileyShrimps,
		name: "smileyshrimps",
		meta: {
			title: "smileyshrimps"
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
export let routes = _routes.map(e => (e.redirect ? e : {
	path: e.path,
	name: e.name,
	meta: e.meta,
	components: {
		default: e.component || e.components.default,
		navbar: (e.components || {}).navbar || e._navbar || Navbar
	}
}));
