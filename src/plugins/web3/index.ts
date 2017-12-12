import Vue from 'vue'
import Web3 from 'web3'

declare global {
    interface Window {
      web3: any,
      web3Loading: boolean,
    }
}


declare module 'vue/types/vue' {
  interface Vue {
    $web3: any,
  }
}

const defaultFallback = "http://localhost:8545/";

function getWeb3(fallback:string) {
  let web3 = window.web3;
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(fallback));
  }
  try {
    if (web3.currentProvider.isConnected()) return web3;
  } catch (_) {
    return null;
  }
}

function waitForWeb3(options:any, cb:(Web3:any) => void) {
  const web3Fallback = options.web3Fallback || defaultFallback;
  function startWaiting() {
    const interval = setInterval(function() {
      let r = getWeb3(web3Fallback)
      if (r) {
        clearInterval(interval)
        cb(r);
      }
    }, 500);
  }
  if (window.web3Loading === true) {
    // Can't do on window load too late.
    startWaiting();
    return;
  }
  window.addEventListener('load', function() {
    window.web3Loading = true;
    startWaiting();
  });
}

export default {
  install (Vue:any) {
    Object.defineProperty(Vue.prototype, '$web3', {
      get () {
        return Object.freeze(getWeb3(defaultFallback));
      }
    })
  }
}
