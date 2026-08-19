(()=>{
  const script=document.currentScript;
  const mediaBase=script?new URL('../assets/media-v5/',script.src):new URL('assets/media-v5/',location.href);
  const media=window.AFTERNEST_MEDIA=window.AFTERNEST_MEDIA||{};

  function applyBrand(){
    document.querySelectorAll('.brand').forEach(link=>{
      if(link.closest('.workspace-side')||link.classList.contains('v5-brand')) return;
      link.classList.add('v5-brand');
      link.innerHTML='<span class="v5-wordmark"><span>After</span><span class="nest">Nest</span></span><span class="v5-wordmark-loc">San Francisco</span>';
    });
  }

  function setImage(img,src,fallbackName){
    if(!src)return false;
    img.classList.remove('media-ready');
    img.onerror=()=>{
      img.onerror=null;
      if(fallbackName&&media[fallbackName]&&img.src!==media[fallbackName]){
        img.src=media[fallbackName];
        return;
      }
      img.style.opacity='0';
    };
    img.onload=()=>{img.classList.add('media-ready')};
    img.src=src;
    if(img.complete&&img.naturalWidth){img.classList.add('media-ready')}
    return true;
  }

  function applyImage(name){
    if(!media[name])return;
    document.querySelectorAll(`[data-afternest-image="${name}"]`).forEach(img=>setImage(img,media[name],name==='volunteer'?'heroHQ':null));
  }

  async function loadHero(){
    try{
      const chunks=await Promise.all([1,2,3,4].map(i=>fetch(new URL(`hero-${i}.txt`,mediaBase),{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(`hero chunk ${i}`);return r.text()})));
      media.heroHQ='data:image/webp;base64,'+chunks.join('').replace(/\s+/g,'');
      applyImage('heroHQ');
      document.querySelectorAll('[data-afternest-image="volunteer"]').forEach(img=>{
        if(!img.classList.contains('media-ready')&&!img.naturalWidth)setImage(img,media.heroHQ,null);
      });
    }catch(err){console.warn('AfterNest HQ hero media failed to load',err)}
  }

  function start(){
    requestAnimationFrame(applyBrand);
    ['bus','handoff','volunteer'].forEach(applyImage);
    loadHero();
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
