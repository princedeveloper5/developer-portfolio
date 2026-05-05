import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ServicesView from '../views/ServicesView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import ContactView from '../views/ContactView.vue';
import TestimonialsView from '../views/TestimonialsView.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/projects/:id', name: 'project-detail', component: ProjectDetailView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/testimonials', name: 'testimonials', component: TestimonialsView },
  { path: '/admin', name: 'admin', component: AdminView, meta: { adminLayout: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
});
