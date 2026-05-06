import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ServicesView from '../views/ServicesView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectDetailsView from '../views/ProjectDetailsView.vue';
import ContactView from '../views/ContactView.vue';
import TestimonialsView from '../views/TestimonialsView.vue';
import BlogView from '../views/BlogView.vue';
import BlogDetailsView from '../views/BlogDetailsView.vue';
import AdminView from '../views/AdminView.vue';
import AuthLoginView from '../views/AuthLoginView.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/projects/:id', name: 'project-details', component: ProjectDetailsView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:slug', name: 'blog-details', component: BlogDetailsView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/testimonials', name: 'testimonials', component: TestimonialsView },
  { path: '/login', name: 'login', component: AuthLoginView, meta: { authLayout: true } },
  { path: '/reset-password', name: 'reset-password', component: ResetPasswordView, meta: { authLayout: true } },
  { path: '/admin', name: 'admin', component: AdminView, meta: { adminLayout: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
});
