"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const I=Math.PI/180,g=t=>t*I,T=t=>t/I,k=(t,o,e)=>{const n=Math.pow(2,e),s=t/n*360-180,i=Math.atan(Math.sinh(Math.PI*(1-2*o/n))),a=T(i);return{lng:s,lat:a}},p=(t,o,e)=>{const n=[];for(let s=e;s>0;s--){let i=0;const a=1<<s-1;t&a&&i++,o&a&&(i+=2),n.push(i)}return n.join("")},P=(t,o,e)=>{const n=k(t,o,e),s=k(t+1,o+1,e);return{west:n.lng,south:s.lat,east:s.lng,north:n.lat}},D=t=>{let o=0,e=0;const n=t.length;for(let s=n;s>0;s--){const i=1<<s-1;switch(t[n-s]){case"0":break;case"1":o|=i;break;case"2":e|=i;break;case"3":o|=i,e|=i;break;default:throw new Error("Invalid Quadkey digit sequence.")}}return{tileX:o,tileY:e}},h=t=>{const o=D(t);return P(o.tileX,o.tileY,t.length)},x=(t,o=0,e=0)=>{const n=h(t),s=n.east-n.west,i=n.north-n.south;return{lng:n.west+s*o,lat:n.south+i*e}},N=-85.05112878,Q=85.05112878,X=-180,q=180,y=(t,o,e)=>Math.min(Math.max(t,o),e),B=(t,o)=>{const n=Math.pow(2,o);return t<=0?0:t>=1?Math.trunc(n-1):Math.trunc(Math.floor((t+1e-14)*n))},M=(t,o)=>{const e=y(t,X,q),n=y(o,N,Q);return[e,n]},l=(t,o,e)=>{const[n,s]=M(t,o),i=(n+180)/360,a=Math.sin(s*Math.PI/180),u=.5-Math.log((1+a)/(1-a))/(4*Math.PI),c=B(i,e),r=B(u,e);return{tileX:c,tileY:r}},b=(t,o,e)=>{const n=l(t,o,e);return p(n.tileX,n.tileY,e)},w=(t,o,e)=>{const n=l(t,o,e);return P(n.tileX,n.tileY,e)},f=(t,o,e,n,s)=>{const i=[],a=l(t,n,s),u=l(e,o,s);for(let c=a.tileX;c<=u.tileX;c++)for(let r=a.tileY;r<=u.tileY;r++)i.push(p(c,r,s));return i},d=6378137,E=(t,o)=>{const[e,n]=M(t,o),s=d*g(e),i=d*Math.log(Math.tan(Math.PI*.25+.5*g(n)));return{x:s,y:i}},A=(t,o)=>{const e=T(t)/d,n=T(Math.PI*.5-2*Math.atan(Math.exp(-o/d))),[s,i]=M(e,n);return{lng:s,lat:i}},L={pointToQuadkey:b,pointToBoundingBox:w,quadkeyToPoint:x,quadkeyToBoundingBox:h,getQuadkeysInBoundingBox:f,pointToWebMercator:E,webMercatorToPoint:A};exports.getQuadkeysInBoundingBox=f;exports.pointToBoundingBox=w;exports.pointToQuadkey=b;exports.pointToWebMercator=E;exports.quadkeyToBoundingBox=h;exports.quadkeyToPoint=x;exports.tileMath=L;exports.webMercatorToPoint=A;
