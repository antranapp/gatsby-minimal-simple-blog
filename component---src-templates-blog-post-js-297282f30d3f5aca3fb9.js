(self.webpackChunkAnTran=self.webpackChunkAnTran||[]).push([[989],{3265:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#080808","images":{"fallback":{"src":"/static/26a15cfd94caded4c1e7fc28188e1485/edb2b/profile-pic.jpg","srcSet":"/static/26a15cfd94caded4c1e7fc28188e1485/edb2b/profile-pic.jpg 80w,\\n/static/26a15cfd94caded4c1e7fc28188e1485/39164/profile-pic.jpg 160w","sizes":"80px"},"sources":[{"srcSet":"/static/26a15cfd94caded4c1e7fc28188e1485/d9027/profile-pic.avif 80w,\\n/static/26a15cfd94caded4c1e7fc28188e1485/8a7fe/profile-pic.avif 160w","type":"image/avif","sizes":"80px"},{"srcSet":"/static/26a15cfd94caded4c1e7fc28188e1485/a5f1e/profile-pic.webp 80w,\\n/static/26a15cfd94caded4c1e7fc28188e1485/36fad/profile-pic.webp 160w","type":"image/webp","sizes":"80px"}]},"width":80,"height":80}')},7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.default=e.exports,e.exports.__esModule=!0},3646:function(e,t,n){var r=n(7228);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,n){var r=n(3646),a=n(6860),o=n(379),i=n(8206);e.exports=function(e){return r(e)||a(e)||o(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},379:function(e,t,n){var r=n(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},7246:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7294),a=n(5444),o=n(2778),i=function(){var e,t,i=(0,a.useStaticQuery)("3257411868"),l=null===(e=i.site.siteMetadata)||void 0===e?void 0:e.author,c=null===(t=i.site.siteMetadata)||void 0===t?void 0:t.social;return r.createElement("div",{className:"bio"},r.createElement(o.S,{className:"bio-avatar",layout:"fixed",formats:["AUTO","WEBP","AVIF"],src:"../../images/profile-pic.jpeg",width:80,height:80,quality:95,alt:"Profile picture",__imageData:n(3265)}),(null==l?void 0:l.name)&&r.createElement("p",null,"Personal blog by  "," ",r.createElement("a",{href:"https://twitter.com/"+((null==c?void 0:c.twitter)||"")},l.name),r.createElement("br",null),(null==l?void 0:l.summary)||null))}},7523:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7294),a=n(5414),o=n(5444),i=function(e){var t,n,i,l=e.description,c=e.lang,s=e.meta,u=e.title,f=(0,o.useStaticQuery)("2841359383").site,d=l||f.siteMetadata.description,p=null===(t=f.siteMetadata)||void 0===t?void 0:t.title;return r.createElement(a.q,{htmlAttributes:{lang:c},title:u,titleTemplate:p?"%s | "+p:null,meta:[{name:"description",content:d},{property:"og:title",content:u},{property:"og:description",content:d},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:(null===(n=f.siteMetadata)||void 0===n||null===(i=n.social)||void 0===i?void 0:i.twitter)||""},{name:"twitter:title",content:u},{name:"twitter:description",content:d}].concat(s)})};i.defaultProps={lang:"en",meta:[],description:""};var l=i},9348:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(9756),a=n(7294),o=n(5444);function i(e){var t,n=e.url,i=e.text,l=e.count;(0,r.Z)(e,["url","text","count"]);return null!=l&&(t="  ("+l+")"),a.createElement(o.Link,{className:"tag",to:n},"#",i,t)}i.defaultProps={count:null};var l=i},9558:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var r=n(7294),a=n(5444),o=n(7246),i=n(3419),l=n(7523),c=n(9756),s=n(9348);function u(e){var t=e.tags,n=e.baseUrl;(0,c.Z)(e,["tags","baseUrl"]);return r.createElement("span",{className:"tags"},t.map((function(e){return r.createElement(s.Z,{key:e,text:e,url:n+"/"+e})})).reduce((function(e,t){return[e,", ",t]})))}u.defaultProps={baseUrl:""};var f=u,d=n(5512);var p=function(e){var t=e.translationsLink,n=(e.langKey,(0,c.Z)(e,["translationsLink","langKey"]));return null==t||0===t.length?null:r.createElement("div",Object.assign({className:"translation-root"},n),(0,d.w)("tTransationAvailable"),t.map((function(e){var t=e.name,n=e.url;return r.createElement(a.Link,{key:t,to:n,className:"translation-link"},t)})))};var m=function(e){var t=e.headings;return r.createElement("div",{className:"toc"},r.createElement("h4",null,"Table of Contents"),r.createElement("nav",{dangerouslySetInnerHTML:{__html:t}}))},g=n(4183),v=function(e){var t,n=e.data,c=e.pageContext,s=e.location,u=n.markdownRemark,d=n.site.siteMetadata.title,v=c.previous,y=c.next,h=c.translationsLink,b=(0,g.Jr)(),x=b.lang,E=b.homeLink;return u.frontmatter.tags&&(t=r.createElement(f,{tags:u.frontmatter.tags,baseUrl:E+"tags"})),r.createElement(i.Z,{location:s,title:d},r.createElement(l.Z,{title:u.frontmatter.title,description:u.frontmatter.description||u.excerpt}),r.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},r.createElement("header",null,r.createElement("h1",{itemProp:"headline"},u.frontmatter.title),r.createElement("p",null,r.createElement("span",{className:"published-date"},u.frontmatter.date)," • ",r.createElement("span",{className:"reading-time"},u.fields.readingTime.text)," • ",t),r.createElement(p,{translationsLink:h,langKey:x,style:{margin:"-0.5rem 0 1.5rem"}})),u.frontmatter.toc&&!!u.tableOfContents&&r.createElement(m,{headings:u.tableOfContents}),r.createElement("section",{dangerouslySetInnerHTML:{__html:u.html},itemProp:"articleBody"}),r.createElement("hr",null),r.createElement("footer",null,r.createElement(o.Z,null))),r.createElement("nav",{className:"blog-post-nav"},r.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},r.createElement("li",null,v&&r.createElement(a.Link,{to:v.fields.slug,rel:"prev"},"← ",v.frontmatter.title)),r.createElement("li",null,y&&r.createElement(a.Link,{to:y.fields.slug,rel:"next"},y.frontmatter.title," →")))))}},8415:function(e,t,n){var r=n(319);e.exports={formatReadingTime:function(e){var t=Math.round(e),n=Math.round(e/5);return n>5?new Array(Math.round(n/Math.E)).fill("🍱").join("")+" "+t+" min read":new Array(n||1).fill("☕️").join("")+" "+t+" min read"},formatPostDate:function(e,t){var n;if("function"!=typeof Date.prototype.toLocaleDateString)return e;e=new Date(e);var a=[t,{day:"numeric",month:"long",year:"numeric"}].filter(Boolean);return(n=e).toLocaleDateString.apply(n,r(a))},haveSameItem:function(e,t){if(void 0===e&&(e=[]),void 0===t&&(t=[]),null==e||null==t)return!1;var n=new Set([].concat(r(e),r(t)));return r(n).length<e.length+t.length},getPreviousNextNode:function(e,t){var n,r;return e.length>0&&t>-1&&(n=t<=0?null:e[t-1].node,r=t===e.length-1?null:e[t+1].node),{previous:n,next:r}},kebabCase:function(e){return function(e){return/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g.test(e)}(e)?e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-"):e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase()}}},5512:function(e,t,n){"use strict";n.d(t,{w:function(){return a}});var r=n(4183),a=(n(8415),function(e){var t=(0,r.Jr)(),n=t.lang,a=t.messages,o=a[e];if(null==o)return console.error("MessageId ["+e+"] is not exist!!\n    You should add it to config/locales/"+n+".js"),e;if("function"==typeof o){for(var i=arguments.length,l=new Array(i>1?i-1:0),c=1;c<i;c++)l[c-1]=arguments[c];return o.apply(void 0,l)}return o})}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-297282f30d3f5aca3fb9.js.map