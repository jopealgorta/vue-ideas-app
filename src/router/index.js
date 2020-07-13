import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Chats from '../views/Chats.vue';
import Notifications from '../views/Notifications.vue';
import Chat from '../views/Chat.vue';
import CreateIdea from '../views/CreateIdea.vue';
import Idea from '../views/Idea.vue';
import MyIdeas from '../views/MyIdeas.vue';
import LikedIdeas from '../views/LikedIdeas.vue';
import Configuration from '../views/Configuration.vue';
import ErrorView from '../views/Error.vue';
// import axios from 'axios';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { requiresAuth: true }
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup
	},
	{
		path: '/notifications',
		name: 'Notifications',
		component: Notifications,
		meta: { requiresAuth: true }
	},
	{
		path: '/chats',
		name: 'Chats',
		component: Chats,
		meta: { requiresAuth: true }
	},
	{
		path: '/chat',
		name: 'Chat',
		component: Chat,
		meta: { requiresAuth: true }
	},
	{
		path: '/create-idea',
		name: 'CreateIdea',
		component: CreateIdea,
		meta: { requiresAuth: true }
	},
	{
		path: '/idea',
		name: 'Idea',
		component: Idea,
		meta: { requiresAuth: true }
	},
	{
		path: '/my-ideas',
		name: 'MyIdeas',
		component: MyIdeas,
		meta: { requiresAuth: true }
	},
	{
		path: '/liked-ideas',
		name: 'LikedIdeas',
		component: LikedIdeas,
		meta: { requiresAuth: true }
	},
	{
		path: '/me',
		name: 'Configuration',
		component: Configuration,
		meta: { requiresAuth: true }
	},
	{
		path: '/error',
		name: 'Error',
		component: ErrorView
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('username') == null) {
			return next('/login');
		}
	}
	next();
});

export default router;
