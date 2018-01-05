// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import TaxethError from './errors.js';

import axios from 'axios';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

const cacheKey = (request) => { return `CACHE::${request.url}`; };
const cacheStorage = window.sessionStorage;

axios.interceptors.request.use(request => {
  const key = cacheKey(request);
  if (request.method !== 'get') return request;

  const hit = cacheStorage.getItem(key);
  if (!hit) return request;

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
}, error => Promise.reject(TaxethError(error)));

axios.interceptors.response.use(response => {
  if (response.status > 200 || response.config.method !== 'get') return response;

  // TODO: Avoid re-caching when it's already cached?
  const key = cacheKey(response.config);
  cacheStorage.setItem(key, JSON.stringify(response.data));
  return response;
}, error => Promise.reject(TaxethError(error)));
