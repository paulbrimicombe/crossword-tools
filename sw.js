if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,o)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const f=e=>t(e,n),l={module:{uri:n},exports:r,require:f};s[n]=Promise.all(i.map((e=>l[e]||f(e)))).then((e=>(o(...e),r)))}}define(["./workbox-aa228440"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"2eaf0168.js",revision:"1b0038cdf43ad236f49b08c6f3b14ebc"},{url:"assets/site.webmanifest",revision:"e82924b073fb1ff375e29f47d0ab0302"},{url:"index.html",revision:"bf1f64d64dd5f0337caa669d85c3798f"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/crossword-tools/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map