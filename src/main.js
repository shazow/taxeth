// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import axios from 'axios';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

const cacheKey = (request) => { return `CACHE::${request.url}`; };
const cacheStorage = window.sessionStorage;

axios.interceptors.request.use(request => {
  const key = cacheKey(request);
  if (request.method !== 'get') return request;

  const hit = cacheStorage.getItem(key);
  if (!hit) return request;

  console.log('loading from cache ' + key);
  request.adapter = () => {
    return Promise.resolve({
      data: JSON.parse(hit),
      status: request.status,
      statusText: request.statusText,
      headers: request.headers,
      config: request,
      request: request,
    });
  };

  return request;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => {
  if (response.status > 200 || response.config.method !== 'get') return response;

  const key = cacheKey(response.config);
  console.log('caching ' + key);
  cacheStorage.setItem(key, JSON.stringify(response.data));
  return response;
}, error => Promise.reject(error));
