// SmoothScroll v1.2.1
// Licensed under the terms of the MIT license.
// People involved
//  - Balazs Galambosi (maintainer)  
//  - Patrick Brunner  (original idea)
//  - Michael Herf     (Pulse Algorithm)
//  - Justin Force     (Resurect)
// Scroll Variables (tweakable)
function init(){if(!document.body)return;var e=document.body,t=document.documentElement,n=window.innerHeight,r=e.scrollHeight;root=document.compatMode.indexOf("CSS")>=0?t:e;activeElement=e;initdone=!0;if(top!=self)frame=!0;else if(r>n&&(e.offsetHeight<=n||t.offsetHeight<=n)){var i=!1,s=function(){if(!i&&t.scrollHeight!=document.height){i=!0;setTimeout(function(){t.style.height=document.height+"px";i=!1},500)}};t.style.height="";setTimeout(s,10);addEvent("DOMNodeInserted",s);addEvent("DOMNodeRemoved",s);if(root.offsetHeight<=n){var o=document.createElement("div");o.style.clear="both";e.appendChild(o)}}if(document.URL.indexOf("mail.google.com")>-1){var u=document.createElement("style");u.innerHTML=".iu { visibility: hidden }";(document.getElementsByTagName("head")[0]||t).appendChild(u)}if(!fixedback&&!disabled){e.style.backgroundAttachment="scroll";t.style.backgroundAttachment="scroll"}}function scrollArray(e,t,n,r){r||(r=1e3);directionCheck(t,n);if(acceleration){var i=+(new Date),s=i-lastScroll;if(s<accelDelta){var o=(1+30/s)/2;if(o>1){o=Math.min(o,accelMax);t*=o;n*=o}}lastScroll=+(new Date)}que.push({x:t,y:n,lastX:t<0?.99:-0.99,lastY:n<0?.99:-0.99,start:+(new Date)});if(pending)return;var u=e===document.body,a=function(){var i=+(new Date),s=0,o=0;for(var f=0;f<que.length;f++){var l=que[f],c=i-l.start,h=c>=animtime,p=h?1:c/animtime;pulseAlgorithm&&(p=pulse(p));var d=l.x*p-l.lastX>>0,v=l.y*p-l.lastY>>0;s+=d;o+=v;l.lastX+=d;l.lastY+=v;if(h){que.splice(f,1);f--}}if(u)window.scrollBy(s,o);else{s&&(e.scrollLeft+=s);o&&(e.scrollTop+=o)}!t&&!n&&(que=[]);que.length?requestFrame(a,e,r/framerate+1):pending=!1};requestFrame(a,e,0);pending=!0}function wheel(e){initdone||init();var t=e.target,n=overflowingAncestor(t);if(!n||e.defaultPrevented||isNodeName(activeElement,"embed")||isNodeName(t,"embed")&&/\.pdf/i.test(t.src))return!0;var r=e.wheelDeltaX||0,i=e.wheelDeltaY||0;!r&&!i&&(i=e.wheelDelta||0);Math.abs(r)>1.2&&(r*=stepsize/120);Math.abs(i)>1.2&&(i*=stepsize/120);scrollArray(n,-r,-i);e.preventDefault()}function keydown(e){var t=e.target,n=e.ctrlKey||e.altKey||e.metaKey||e.shiftKey&&e.keyCode!==key.spacebar;if(/input|textarea|select|embed/i.test(t.nodeName)||t.isContentEditable||e.defaultPrevented||n)return!0;if(isNodeName(t,"button")&&e.keyCode===key.spacebar)return!0;var r,i=0,s=0,o=overflowingAncestor(activeElement),u=o.clientHeight;o==document.body&&(u=window.innerHeight);switch(e.keyCode){case key.up:s=-arrowscroll;break;case key.down:s=arrowscroll;break;case key.spacebar:r=e.shiftKey?1:-1;s=-r*u*.9;break;case key.pageup:s=-u*.9;break;case key.pagedown:s=u*.9;break;case key.home:s=-o.scrollTop;break;case key.end:var a=o.scrollHeight-o.scrollTop-u;s=a>0?a+10:0;break;case key.left:i=-arrowscroll;break;case key.right:i=arrowscroll;break;default:return!0}scrollArray(o,i,s);e.preventDefault()}function mousedown(e){activeElement=e.target}function setCache(e,t){for(var n=e.length;n--;)cache[uniqueID(e[n])]=t;return t}function overflowingAncestor(e){var t=[],n=root.scrollHeight;do{var r=cache[uniqueID(e)];if(r)return setCache(t,r);t.push(e);if(n===e.scrollHeight){if(!frame||root.clientHeight+10<n)return setCache(t,document.body)}else if(e.clientHeight+10<e.scrollHeight){overflow=getComputedStyle(e,"").getPropertyValue("overflow-y");if(overflow==="scroll"||overflow==="auto")return setCache(t,e)}}while(e=e.parentNode)}function addEvent(e,t,n){window.addEventListener(e,t,n||!1)}function removeEvent(e,t,n){window.removeEventListener(e,t,n||!1)}function isNodeName(e,t){return(e.nodeName||"").toLowerCase()===t.toLowerCase()}function directionCheck(e,t){e=e>0?1:-1;t=t>0?1:-1;if(direction.x!==e||direction.y!==t){direction.x=e;direction.y=t;que=[];lastScroll=0}}function pulse_(e){var t,n,r;e*=pulseScale;if(e<1)t=e-(1-Math.exp(-e));else{n=Math.exp(-1);e-=1;r=1-Math.exp(-e);t=n+r*(1-n)}return t*pulseNormalize}function pulse(e){if(e>=1)return 1;if(e<=0)return 0;pulseNormalize==1&&(pulseNormalize/=pulse_(1));return pulse_(e)}var framerate=150,animtime=1e3,stepsize=80,pulseAlgorithm=!0,pulseScale=8,pulseNormalize=1,acceleration=!0,accelDelta=10,accelMax=1,keyboardsupport=!0,disableKeyboard=!1,arrowscroll=50,exclude="",disabled=!1,frame=!1,direction={x:0,y:0},initdone=!1,fixedback=!0,root=document.documentElement,activeElement,key={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},que=[],pending=!1,lastScroll=+(new Date),cache={};setInterval(function(){cache={}},1e4);var uniqueID=function(){var e=0;return function(t){return t.uniqueID||(t.uniqueID=e++)}}(),requestFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e,t,n){window.setTimeout(e,n||1e3/60)}}();addEvent("mousedown",mousedown);addEvent("mousewheel",wheel);addEvent("load",init);