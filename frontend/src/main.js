import { createApp } from 'vue';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.vue';
import router from './router';
import '../css/font-awesome.min.css';
import './styles.css';
import './styles/seo-preview.css';
import './styles/image-cropper.css';
import './styles/analytics.css';
import './styles/reorder.css';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.08,
  wheelMultiplier: 0.9,
  smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

createApp(App).use(router).mount('#app');
