(()=>{const s=document.currentScript;if(!s)return;['hospital-polish.css','mobile-polish.css'].forEach(file=>{const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('../assets/'+file,s.src).href;document.head.appendChild(link)})})();

const AFTERNEST = {
  caseKey: 'afternest_cases_v1',
  volunteerKey: 'afternest_volunteers_v1',
  interestKey: 'afternest_interest_v1',
  seedCases: [
    {
      id:'AN-1048', initials:'MR', firstName:'Maria', lastName:'R.', ageBand:'75+', language:'Spanish', living:'Lives alone', caregiver:'No nearby caregiver', phone:'(415) 555-0148', contact:'Phone', status:'progress', navigator:'Sofia Alvarez', referredBy:'Demo hospital transition team', created:'2026-08-16',
      barriers:['Transportation','Language navigation','Technology'],
      tasks:[
        {name:'Confirm transportation for follow-up', category:'Transportation', status:'resolved'},
        {name:'Portal login and video visit practice', category:'Technology', status:'progress'},
        {name:'Non-clinical scheduling call in Spanish', category:'Language', status:'resolved'},
        {name:'Confirm community meal resource connection', category:'Basic needs', status:'open'}
      ],
      notes:'Illustrative demo case. No medical information is stored.'
    },
    {
      id:'AN-1051', initials:'JW', firstName:'James', lastName:'W.', ageBand:'65-74', language:'English', living:'Lives with roommate', caregiver:'Limited support', phone:'(415) 555-0187', contact:'Text', status:'open', navigator:'Maya Chen', referredBy:'Demo discharge coordinator', created:'2026-08-17',
      barriers:['Transportation','Caregiver support'],
      tasks:[
        {name:'Identify accessible ride option', category:'Transportation', status:'progress'},
        {name:'Confirm friend availability for grocery pickup', category:'Caregiver', status:'open'},
        {name:'Create question list for next provider call', category:'Organization', status:'resolved'}
      ],
      notes:'Illustrative demo case. No medical information is stored.'
    },
    {
      id:'AN-1053', initials:'LT', firstName:'Linh', lastName:'T.', ageBand:'75+', language:'Vietnamese', living:'Lives with spouse', caregiver:'Spouse has limited mobility', phone:'(415) 555-0120', contact:'Phone', status:'review', navigator:'Unassigned', referredBy:'Demo hospital social work team', created:'2026-08-18',
      barriers:['Language navigation','Technology','Food/basic needs'],
      tasks:[
        {name:'Match bilingual Navigator', category:'Language', status:'open'},
        {name:'Assess preferred non-app communication', category:'Technology', status:'open'},
        {name:'Review approved food resource options', category:'Basic needs', status:'open'}
      ],
      notes:'Illustrative demo case. No medical information is stored.'
    },
    {
      id:'AN-1041', initials:'EA', firstName:'Elena', lastName:'A.', ageBand:'65-74', language:'Spanish', living:'Lives with adult child', caregiver:'Caregiver works full time', phone:'(415) 555-0113', contact:'Phone', status:'resolved', navigator:'Sofia Alvarez', referredBy:'Demo transition team', created:'2026-08-12',
      barriers:['Transportation','Technology'],
      tasks:[
        {name:'Arrange transportation option', category:'Transportation', status:'resolved'},
        {name:'Set up portal access', category:'Technology', status:'resolved'},
        {name:'Confirm follow-up logistics', category:'Appointments', status:'resolved'}
      ],
      notes:'Illustrative demo case. No medical information is stored.'
    }
  ]
};

function safeParse(value, fallback){try{return JSON.parse(value) ?? fallback}catch{return fallback}}
function getLocalCases(){return safeParse(localStorage.getItem(AFTERNEST.caseKey),[])}
function saveLocalCases(cases){localStorage.setItem(AFTERNEST.caseKey,JSON.stringify(cases))}
function getAllCases(){return [...AFTERNEST.seedCases, ...getLocalCases()]}
function getVolunteers(){return safeParse(localStorage.getItem(AFTERNEST.volunteerKey),[])}
function saveVolunteers(items){localStorage.setItem(AFTERNEST.volunteerKey,JSON.stringify(items))}
function getInterests(){return safeParse(localStorage.getItem(AFTERNEST.interestKey),[])}
function saveInterests(items){localStorage.setItem(AFTERNEST.interestKey,JSON.stringify(items))}
function nextCaseId(){const all=getAllCases().map(c=>parseInt(String(c.id).replace(/\D/g,''),10)).filter(Boolean);return `AN-${Math.max(1053,...all)+1}`}
function prettyStatus(status){return ({open:'Needs action',progress:'In progress',resolved:'Resolved',escalated:'Escalated',review:'Needs review'})[status]||status}
function statusBadge(status){return `<span class="status ${status}">${prettyStatus(status)}</span>`}
function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}

function renderHeader(active=''){
  return `
  <div class="presentation-bar"><div class="container"><div class="status-copy"><span>Proposed San Francisco pilot</span><span>Non-clinical recovery support</span></div><a href="partner-brief.html">Hospital partner brief →</a></div></div>
  <header class="site-header">
    <div class="container nav-shell">
      <a class="brand" href="index.html" aria-label="AfterNest home"><span class="brand-mark" aria-hidden="true"></span><span>AfterNest</span></a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a class="${active==='program'?'active':''}" href="program.html">Program</a>
        <a class="${active==='partners'?'active':''}" href="partners.html">Hospital partners</a>
        <a class="${active==='impact'?'active':''}" href="impact.html">Pilot outcomes</a>
        <a class="${active==='team'?'active':''}" href="team.html">Governance</a>
        <a class="${active==='volunteer'?'active':''}" href="volunteer.html">Navigators</a>
      </nav>
      <div class="nav-actions">
        <a class="button secondary small-btn" href="workspace.html">View operations</a>
        <a class="button primary small-btn" href="partners.html#pilot">Review pilot model</a>
      </div>
      <button class="mobile-menu-button" type="button" aria-label="Open menu" aria-controls="mobile-drawer" aria-expanded="false"><span></span></button>
    </div>
  </header>`;
}
function renderMobileDrawer(){return `<div class="mobile-drawer" id="mobile-drawer" aria-hidden="true"><div class="mobile-drawer-panel"><div class="mobile-drawer-top"><a class="brand" href="index.html"><span class="brand-mark"></span><span>AfterNest</span></a><button class="mobile-drawer-close" type="button" aria-label="Close menu">×</button></div><nav class="mobile-drawer-links" aria-label="Mobile navigation"><a href="program.html">Program</a><a href="partners.html">Hospital partners</a><a href="impact.html">Pilot outcomes</a><a href="team.html">Governance</a><a href="volunteer.html">Recovery Navigators</a><a href="workspace.html">Operations demo</a><a href="privacy.html">Privacy & scope</a></nav><div class="mobile-drawer-actions"><a class="button primary" href="partners.html#pilot">Review pilot model</a><a class="button secondary" href="intake.html">Walk through referral</a></div><p class="mobile-drawer-note">Proposed academic pilot concept. No hospital partnership or clinical outcome is represented as confirmed.</p></div></div>`}
function renderMobileBottomCTA(){return `<div class="mobile-bottom-cta" aria-label="Quick actions"><a class="button secondary" href="workspace.html">Operations</a><a class="button primary" href="partners.html#pilot">Pilot model</a></div>`}
function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div><a class="brand" href="index.html"><span class="brand-mark"></span><span>AfterNest</span></a><p style="margin-top:16px">A proposed hospital-linked nonprofit program focused on practical recovery execution after discharge.</p></div>
        <div class="footer-links"><b>Program</b><a href="program.html">Program model</a><a href="intake.html">Referral workflow</a><a href="workspace.html">Operations demo</a><a href="impact.html">Pilot outcomes</a><a href="training.html">Navigator standards</a></div>
        <div class="footer-links"><b>Organization</b><a href="partners.html">Hospital partners</a><a href="team.html">Governance</a><a href="roadmap.html">Pilot roadmap</a><a href="partner-brief.html">Partner brief</a><a href="privacy.html">Privacy & scope</a></div>
      </div>
      <div class="footer-bottom"><span>AfterNest · proposed pilot concept · San Francisco</span><span>Academic prototype for partner discussion. No hospital relationship or clinical outcome is represented as confirmed.</span></div>
    </div>
  </footer>`;
}
function mountChrome(){const active=document.body.dataset.page||'';const header=document.getElementById('site-header');if(header)header.innerHTML=renderHeader(active);const footer=document.getElementById('site-footer');if(footer)footer.innerHTML=renderFooter();document.body.insertAdjacentHTML('beforeend',renderMobileDrawer()+renderMobileBottomCTA())}
function initMobileNavigation(){const trigger=document.querySelector('.mobile-menu-button');const drawer=document.querySelector('.mobile-drawer');const close=document.querySelector('.mobile-drawer-close');if(!trigger||!drawer)return;const setOpen=open=>{trigger.setAttribute('aria-expanded',String(open));drawer.setAttribute('aria-hidden',String(!open));drawer.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''};trigger.addEventListener('click',()=>setOpen(true));close?.addEventListener('click',()=>setOpen(false));drawer.addEventListener('click',e=>{if(e.target===drawer)setOpen(false)});drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)})}
function initRevealMotion(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const targets=[...document.querySelectorAll('main > section, .card, .flow-step, .readiness-card, .team-card, .art-tile, .editorial-art')];targets.forEach((el,i)=>{if(el.closest('.hero-ui'))return;el.classList.add('reveal');if(i%4===1)el.classList.add('reveal-delay-1');if(i%4===2)el.classList.add('reveal-delay-2')});const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -40px'});targets.forEach(el=>observer.observe(el))}
function initInterestForms(){document.querySelectorAll('[data-interest-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form));const items=getInterests();items.push({...data,id:`IN-${Date.now()}`,created:new Date().toISOString(),demo:true});saveInterests(items);const out=form.querySelector('[data-form-message]');if(out)out.innerHTML='<div class="notice safe">Demo submission recorded in this browser. A production launch would route this through a secure, partner-approved backend.</div>';form.reset()})})}
document.addEventListener('DOMContentLoaded',()=>{mountChrome();initMobileNavigation();initRevealMotion();initInterestForms()});