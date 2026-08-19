(()=>{
  const script=document.currentScript;
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href=script?new URL('../assets/home-v6.css',script.src).href:'assets/home-v6.css';
  document.head.appendChild(css);

  function applyMedia(){
    const media=window.AFTERNEST_MEDIA||{};
    document.querySelectorAll('[data-afternest-image="tablet"]').forEach(img=>{
      if(!media.tablet)return;
      img.onload=()=>img.classList.add('media-ready');
      img.onerror=()=>{img.style.opacity='0'};
      img.src=media.tablet;
      if(img.complete&&img.naturalWidth)img.classList.add('media-ready');
    });
  }

  function start(){
    applyMedia();
    requestAnimationFrame(()=>document.body.classList.add('v6-ready'));
    const updateHeader=()=>document.body.classList.toggle('v6-scrolled',window.scrollY>24);
    updateHeader();
    window.addEventListener('scroll',updateHeader,{passive:true});
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
