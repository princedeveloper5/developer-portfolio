import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.css';
import './styles/seo-preview.css';
import './styles/image-cropper.css';
import './styles/analytics.css';
import './styles/reorder.css';

createApp(App).use(router).mount('#app');
