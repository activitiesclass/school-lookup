/* Theme preferences only; no search data is stored. */
(()=>{
'use strict';
const themes=['emerald','ocean','violet','night'];
const root=document.documentElement;
let theme='emerald',paused=false;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
try{const saved=localStorage.getItem('schoolLookupTheme');if(themes.includes(saved))theme=saved;else if(saved==='dark')theme='night';paused=localStorage.getItem('schoolLookupMotion')==='paused';}catch{}
root.dataset.theme=theme;
root.dataset.motion=paused||reduced.matches?'paused':'running';
document.addEventListener('DOMContentLoaded',()=>{
 const select=document.getElementById('themeSelect');
 const motion=document.getElementById('motionToggle');
 select.value=theme;
 select.addEventListener('change',()=>{theme=themes.includes(select.value)?select.value:'emerald';root.dataset.theme=theme;closeAll();try{localStorage.setItem('schoolLookupTheme',theme);}catch{}});
 function syncMotion(){const off=paused||reduced.matches;root.dataset.motion=off?'paused':'running';motion.setAttribute('aria-pressed',String(off));motion.setAttribute('aria-label',off?'تشغيل حركة الشعار':'إيقاف حركة الشعار');motion.title=motion.getAttribute('aria-label');motion.querySelector('span').textContent=off?'▷':'Ⅱ';}
 syncMotion();
 motion.addEventListener('click',()=>{if(reduced.matches){paused=true;syncMotion();return;}paused=!paused;syncMotion();try{localStorage.setItem('schoolLookupMotion',paused?'paused':'running');}catch{}});
 reduced.addEventListener('change',syncMotion);
 const controls=[...document.querySelectorAll('[data-hint]')];
 let pinned=null;
 function show(button,visible){document.getElementById(button.dataset.hint).hidden=!visible;button.setAttribute('aria-expanded',String(visible));}
 function closeAll(){controls.forEach(button=>show(button,false));pinned=null;}
 controls.forEach(button=>{
  button.addEventListener('mouseenter',()=>show(button,true));
  button.addEventListener('mouseleave',()=>{if(pinned!==button&&document.activeElement!==button)show(button,false);});
  button.addEventListener('focus',()=>show(button,true));
  button.addEventListener('blur',()=>{if(pinned!==button)show(button,false);});
  button.addEventListener('click',()=>{const wasPinned=pinned===button;closeAll();if(!wasPinned){pinned=button;show(button,true);}});
 });
 document.addEventListener('click',event=>{if(!event.target.closest('[data-hint]'))closeAll();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
});
})();
