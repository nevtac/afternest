(()=>{
  const current=document.currentScript;
  const mediaBase=current?new URL('../assets/media-v4/',current.src):new URL('assets/media-v4/',location.href);
  const spec={tablet:5};
  const media=window.AFTERNEST_MEDIA=window.AFTERNEST_MEDIA||{};

  function applyBrand(){
    document.querySelectorAll('.brand').forEach(link=>{
      if(link.closest('.workspace-side')||link.classList.contains('v4-brand')) return;
      link.classList.add('v4-brand');
      link.innerHTML='<span class="v4-wordmark"><span>After</span><span class="nest">Nest</span></span><span class="v4-wordmark-loc">San Francisco</span>';
    });
  }

  function applyImage(name){
    if(!media[name]) return;
    document.querySelectorAll(`[data-afternest-image="${name}"]`).forEach(img=>{
      img.classList.add('media-loading');
      img.src=media[name];
      if(img.complete){img.classList.remove('media-loading');img.classList.add('media-ready')}
      else img.addEventListener('load',()=>{img.classList.remove('media-loading');img.classList.add('media-ready')},{once:true});
    });
  }

  async function loadMedia(name,count){
    try{
      const chunks=await Promise.all(Array.from({length:count},(_,i)=>fetch(new URL(`${name}-${i+1}.txt`,mediaBase),{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(`${name} chunk ${i+1}`);return r.text()})));
      media[name]='data:image/webp;base64,'+chunks.join('').replace(/\s+/g,'');
      applyImage(name);
    }catch(err){console.warn('AfterNest high-resolution media load failed:',name,err)}
  }

  function start(){
    requestAnimationFrame(applyBrand);
    ['bus','handoff','volunteer'].forEach(applyImage);
    Object.entries(spec).forEach(([name,count])=>loadMedia(name,count));
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
