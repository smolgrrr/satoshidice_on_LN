var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var gapi=window.gapi=window.gapi||{};(function(){var d="push",g="replace",h="length",i="apply",j="join";var m=window,q=document,r=m.location,s=function(){},t=function(a,b,c){return a[b]=a[b]||c},u=function(a){for(var b=0;b<this[h];b++)if(this[b]===a)return b;return-1},v=function(a){for(var a=a.sort(),b=[],c=void 0,e=0;e<a[h];e++){var f=a[e];f!=c&&b[d](f);c=f}return b},w=function(){var a;if((a=Object.create)&&/\[native code\]/.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},x=t(m,"gapi",{});var B=function(){var a=r.href,b=A.h,c=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&c.exec(a))try{b=decodeURIComponent(a[2])}catch(e){}return b};var A;A=t(m,"___jsl",w());t(A,"I",0);var C=function(a){return t(t(A,"H",w()),a,w())};var D=w(),E=[];E[d](["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?A[b]=t(A,b,[]).concat(c):t(A,b,c)}if(a=a.u)b=t(A,"us",[]),b[d](a),(c=/^https:(.*)$/.exec(a))&&b[d]("http:"+c[1]),t(A,"u",a)}]);D.m=function(a){var b=A.ms||"https://web.archive.org/web/20120511220257/https://apis.google.com",a=a[0],c;if(!(c=!a))c=0<=a.indexOf("..");if(c)throw"Bad hint";return b+a};
var F=function(a){return a[j](",")[g](/\./g,"_")[g](/-/g,"_")},G=function(a,b){for(var c=[],e=0;e<a[h];++e){var f=a[e];f&&0>u.call(b,f)&&c[d](f)}return c},I=function(){var a=B();if(!a)throw"Bad hint";return a},J=function(a){var b=a.split(";"),c=D[b.shift()],b=c&&c(b);if(!b)throw"Bad hint:"+a;return b},L=function(a){"loading"!=q.readyState?K(a):q.write(['<script src="',a,'"><\/script>'][j](""))},K=function(a){var b=q.createElement("script");b.setAttribute("src",a);b.async="true";a=q.getElementsByTagName("script")[0];
a.parentNode.insertBefore(b,a)},M=function(a,b){var c=b&&b._c;if(c)for(var e=0;e<E[h];e++){var f=E[e][0],n=E[e][1];n&&Object.prototype.hasOwnProperty.call(c,f)&&n(c[f],a,b)}},N=function(){return!1},O=function(){return!0},P=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);M(a,c);var e=c.h||I(),f=c.callback,n=c.config,p=t(C(e),"r",[]).sort(),y=t(C(e),"L",[]).sort(),H=function(a){y[d][i](y,k);var b=((x||{}).config||{}).update;b?b(n):n&&t(A,"cu",[])[d](n);if(a){b=B();b=e===b?t(x,"_",
w()):w();b=t(C(e),"_",b);a(b)}f&&f();return 1},l=a?v(a.split(":")):[],k=G(l,y);if(!k[h])return H();var k=G(l,p),z=A.I++,o="loaded_"+z;if(!N(k,c,e,o)){x[o]=function(a){if(!a)return 0;var b=function(){x[o]=null;return H(a)};if(x["loaded_"+(z-1)])x[o]=b;else for(b();b=x["loaded_"+ ++z];)if(!b())break};if(!k[h])return x[o](s);l=J(e);l=l[g]("__features__",F(k))[g](/\/$/,"")+(p[h]?"/ed=1/exm="+F(p):"")+(O(e)?"/cb=gapi."+o:"");p[d][i](p,k);c.sync||m.___gapisync?L(l):K(l)}};x.load=P;var Q=function(a){var b=A.cm;return function(){b&&b();if(A.p)A.cm=Q(a);else{var c=a.shift();c&&P[i]({},c)}}},N=function(a,b,c,e){var f=t(A,"SL",[]);if(A.p)return f[d]([a[j](":"),b]),A.cm=Q(f),!0;if(O(c))return!1;if(A.LP)return f[d]([a[j](":"),b]),!0;A.LP=!0;A.cm=function(){x[e](function(){A.p=void 0;A.LP=!1;var a=f.shift();a&&P[i]({},a)})};A.p=a;return!1},O=function(a){return!/\/widget\/|ms=widget/.test(a)};})();
gapi.load("plusone-unsupported",{callback:window["gapi_onload"],_c:{"jsl":{"u":"https://web.archive.org/web/20120511220257/http://apis.google.com/js/plusone.js","ci":{"lexps":[34,38,65,36,40,44,15,45,17,48,52,57,63,62,30,60],"oauth-flow":{},"iframes":{"additnow":{"url":"https://web.archive.org/web/20120511220257/https://apis.google.com/additnow/additnow.html?bsv=p"},"plus":{"url":":socialhost:/u/:session_index:/_/pages/badge?bsv=p"},":socialhost:":"https://web.archive.org/web/20120511220257/https://plusone.google.com","configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator"},":signuphost:":"https://web.archive.org/web/20120511220257/https://plus.google.com","plusone":{"preloadUrl":["https://web.archive.org/web/20120511220257/https://ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite4-a67f741843ffc4220554c34bd01bb0bb.png"],"params":{"count":"","url":"","size":""},"url":":socialhost:/:session_prefix:_/+1/fastbutton?bsv=p"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&bsv=p"}},"googleapis.config":{"mobilesignupurl":"https://web.archive.org/web/20120511220257/https://m.google.com/app/plus/oob?"}},"h":"m;/_/apps-static/_/js/gapi/__features__/rt=j/ver=Nec4xg3wDg8.en_US./sv=1/am=!AuYF0E1N7E-Ine7KrA/d=1/rs=AItRSTMUSSt3OSnDgL9qnPccCbWYHQBtyg"}}});

}
/*
     FILE ARCHIVED ON 22:02:57 May 11, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:05:28 Feb 02, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.066
  exclusion.robots.policy: 0.056
  cdx.remote: 0.092
  esindex: 0.009
  LoadShardBlock: 231.776 (6)
  PetaboxLoader3.datanode: 79.076 (7)
  CDXLines.iter: 122.542 (3)
  load_resource: 100.39
  PetaboxLoader3.resolve: 37.794
*/