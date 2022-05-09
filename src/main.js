const { createApp } = require('vue');

import $ from 'jquery';
import App from './App.vue';

const $ = require('jquery');
window.$ = $;

createApp(App).mount('#app');
