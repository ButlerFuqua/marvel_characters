if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return i[e]||(c=new Promise(async c=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=c}else importScripts(e),c()})),c.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},c=(c,i)=>{Promise.all(c.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(c)};self.define=(c,n,a)=>{i[c]||(i[c]=Promise.resolve().then(()=>{let i={};const s={uri:location.origin+c.slice(1)};return Promise.all(n.map(c=>{switch(c){case"exports":return i;case"module":return s;default:return e(c)}})).then(e=>{const c=a(...e);return i.default||(i.default=c),i})}))}}define("./sw.js",["./workbox-432e0d0b"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/702ae048cb9f5b15eb7b7e5a7fd56df3f8185ef6.97a50018001e344261fd.js",revision:"4446a7c959fa94b6685b1cd222acaf85"},{url:"/_next/static/chunks/commons.5c95a99e785c2d97892c.js",revision:"b812cfd52622dc87ed037f37ef562c68"},{url:"/_next/static/chunks/framework.98c1b221acb34aa9927b.js",revision:"0b711c3e02b0095b778e8d3a6cd216d2"},{url:"/_next/static/runtime/main-dc0a6a72d0589415c67c.js",revision:"1246153d5a6cf66b067c771b19a7340a"},{url:"/_next/static/runtime/polyfills-b99df05233331b7e84b8.js",revision:"1b5ec1b9807ae2baa33f8ee10bdd7f98"},{url:"/_next/static/runtime/webpack-b65cab0b00afd201cbda.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/_next/static/t2SXkRc_M3jdRYxIPsQcs/_buildManifest.js",revision:"3413de627f3f283012cb677429cf81c1"},{url:"/_next/static/t2SXkRc_M3jdRYxIPsQcs/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/t2SXkRc_M3jdRYxIPsQcs/pages/_app.js",revision:"3ba60375ce289c05665475e199c223bb"},{url:"/_next/static/t2SXkRc_M3jdRYxIPsQcs/pages/_error.js",revision:"45a8f378760eee0c07fbebf51bd69ac2"},{url:"/_next/static/t2SXkRc_M3jdRYxIPsQcs/pages/characters/%5Bid%5D.js",revision:"9a31837618d556713f77a2353ed86c01"},{url:"/_next/static/t2SXkRc_M3jdRYxIPsQcs/pages/index.js",revision:"2a90ff67fc383023dc17e4d1427f665f"},{url:"/android-chrome-192x192.png",revision:"672334cc991005438802aa60df33985b"},{url:"/android-chrome-512x512.png",revision:"5529d90b61cc26ca732b5eb339ff608a"},{url:"/apple-touch-icon.png",revision:"718ca86d80483066758f69fd214798ad"},{url:"/favicon-16x16.png",revision:"1da2fb5f47c46591605857664e7835ee"},{url:"/favicon-32x32.png",revision:"32109b4d1f96ae803f96bc34a312d3b2"},{url:"/favicon.ico",revision:"57aac5076112ef6f41aee6dfbcfbbae0"},{url:"/icon/android-icon-192x192-dunplab-manifest-6326.ico",revision:"2ee753d39c6f10b1c82de59fb35941f1"},{url:"/icon/apple-icon-114x114-dunplab-manifest-6326.ico",revision:"53763f0cf98b07367d521f9ef589f9d8"},{url:"/icon/apple-icon-120x120-dunplab-manifest-6326.ico",revision:"3c90d7be6e566090151f3872647b8961"},{url:"/icon/apple-icon-144x144-dunplab-manifest-6326.ico",revision:"bbd399bd2d9ede422e65293858866fc9"},{url:"/icon/apple-icon-152x152-dunplab-manifest-6326.ico",revision:"7a6377c81912808443a6112bf3ae6348"},{url:"/icon/apple-icon-180x180-dunplab-manifest-6326.ico",revision:"44c2cc64c0c6b74cf89edec410db2177"},{url:"/icon/apple-icon-57x57-dunplab-manifest-6326.ico",revision:"8f7a66942417adbab60b1b1e204b8374"},{url:"/icon/apple-icon-60x60-dunplab-manifest-6326.ico",revision:"c7c661b26714fe886538cb0f5e6f3f30"},{url:"/icon/apple-icon-72x72-dunplab-manifest-6326.ico",revision:"2fb16a62709ac3ac972622eb175b2e55"},{url:"/icon/apple-icon-76x76-dunplab-manifest-6326.ico",revision:"293920fb0c91cc41dc6cb430abcd1fc2"},{url:"/icon/favicon-16x16-dunplab-manifest-6326.ico",revision:"45cfd8bd801b5ac30ff5d97c833a8397"},{url:"/icon/favicon-32x32-dunplab-manifest-6326.ico",revision:"54c41df600b4993282a5aaeb0e3d2003"},{url:"/icon/favicon-96x96-dunplab-manifest-6326.ico",revision:"2d8c1130c0038bbec6fe26ef8bdf463b"},{url:"/manifest.json",revision:"cbb6255b62cea0011cea1f77d7d49737"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
