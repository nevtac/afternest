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

function safeParse(value, fallback){
  try{return JSON.parse(value) ?? fallback}catch{return fallback}
}
function getLocalCases(){return safeParse(localStorage.getItem(AFTERNEST.caseKey),[])}
function saveLocalCases(cases){localStorage.setItem(AFTERNEST.caseKey,JSON.stringify(cases))}
function getAllCases(){return [...AFTERNEST.seedCases, ...getLocalCases()]}
function getVolunteers(){return safeParse(localStorage.getItem(AFTERNEST.volunteerKey),[])}
function saveVolunteers(items){localStorage.setItem(AFTERNEST.volunteerKey,JSON.stringify(items))}
function getInterests(){return safeParse(localStorage.getItem(AFTERNEST.interestKey),[])}
function saveInterests(items){localStorage.setItem(AFTERNEST.interestKey,JSON.stringify(items))}
function nextCaseId(){
  const all=getAllCases().map(c=>parseInt(String(c.id).replace(/\D/g,''),10)).filter(Boolean);
  return `AN-${Math.max(1053,...all)+1}`;
}
function prettyStatus(status){return ({open:'Needs action',progress:'In progress',resolved:'Resolved',escalated:'Escalated',review:'Needs review'})[status]||status}
function statusBadge(status){return `<span class="status ${status}">${prettyStatus(status)}</span>`}
function escapeHtml(value=''){
  return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function renderHeader(active=''){
  return `
  <header class="site-header">
    <div class="container nav-shell">
      <a class="brand" href="index.html" aria-label="AfterNest home"><span class="brand-mark" aria-hidden="true"></span><span>AfterNest</span></a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a class="${active==='program'?'active':''}" href="program.html">Program</a>
        <a class="${active==='partners'?'active':''}" href="partners.html">Hospitals & sponsors</a>
        <a class="${active==='volunteer'?'active':''}" href="volunteer.html">Volunteer</a>
        <a class="${active==='impact'?'active':''}" href="impact.html">Pilot impact</a>
        <a class="${active==='team'?'active':''}" href="team.html">Team</a>
      </nav>
      <div class="nav-actions">
        <a class="button secondary small-btn" href="workspace.html">Demo workspace</a>
        <a class="button primary small-btn" href="intake.html">Refer a patient</a>
      </div>
    </div>
  </header>`;
}
function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div><a class="brand" href="index.html"><span class="brand-mark"></span><span>AfterNest</span></a><p style="margin-top:16px">A proposed nonprofit recovery support program helping vulnerable patients address practical barriers between hospital discharge and recovery at home.</p></div>
        <div class="footer-links"><b>Program</b><a href="program.html">How it works</a><a href="intake.html">Referral intake</a><a href="volunteer.html">Recovery Navigators</a><a href="resources.html">Resource directory</a><a href="training.html">Navigator handbook</a></div>
        <div class="footer-links"><b>Organization</b><a href="partners.html">Hospitals & sponsors</a><a href="team.html">Team & governance</a><a href="impact.html">Pilot impact</a><a href="roadmap.html">Pilot roadmap</a><a href="partner-brief.html">Partner brief</a><a href="privacy.html">Privacy & scope</a></div>
      </div>
      <div class="footer-bottom"><span>AfterNest academic pilot prototype · Team Big Brains · MGMT 3538</span><span>Prototype only. Not medical care. Do not enter diagnoses, medications, symptoms, or other sensitive medical information.</span></div>
    </div>
  </footer>`;
}
function mountChrome(){
  const active=document.body.dataset.page||'';
  const header=document.getElementById('site-header'); if(header) header.innerHTML=renderHeader(active);
  const footer=document.getElementById('site-footer'); if(footer) footer.innerHTML=renderFooter();
}
function initInterestForms(){
  document.querySelectorAll('[data-interest-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form));
      const items=getInterests();
      items.push({...data,id:`IN-${Date.now()}`,created:new Date().toISOString(),demo:true});
      saveInterests(items);
      const out=form.querySelector('[data-form-message]');
      if(out) out.innerHTML='<div class="notice safe">Demo submission recorded in this browser. A production launch would route this to the AfterNest team through a secure backend.</div>';
      form.reset();
    })
  })
}
document.addEventListener('DOMContentLoaded',()=>{mountChrome();initInterestForms()});
