document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('intake-form'); if(!form) return;
  let step=1;
  const pages=[...form.querySelectorAll('.form-page')];
  const indicators=[...document.querySelectorAll('[data-step-indicator]')];
  function show(n){step=n;pages.forEach(p=>p.classList.toggle('active',Number(p.dataset.step)===step));indicators.forEach(i=>i.classList.toggle('active',Number(i.dataset.stepIndicator)===step));if(step===4) renderReview();window.scrollTo({top:document.querySelector('.page-section').offsetTop-70,behavior:'smooth'});}
  function validateCurrent(){
    const active=pages.find(p=>Number(p.dataset.step)===step); const required=[...active.querySelectorAll('[required]')];
    for(const el of required){if(!el.checkValidity()){el.reportValidity();return false}}
    if(step===2 && !form.querySelector('input[name="barriers"]:checked')){alert('Select at least one practical barrier for the demo referral.');return false}
    return true;
  }
  form.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{if(validateCurrent()) show(Math.min(4,step+1))}));
  form.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>show(Math.max(1,step-1))));
  function getFormData(){
    const fd=new FormData(form); const barriers=fd.getAll('barriers'); const obj=Object.fromEntries(fd); obj.barriers=barriers; return obj;
  }
  function renderReview(){
    const d=getFormData(); const target=document.getElementById('review-card');
    target.innerHTML=`<span class="pill">Non-clinical referral</span><h3 style="margin-top:18px">${escapeHtml(d.firstName||'Patient')} ${escapeHtml((d.lastName||'').slice(0,1))}.</h3><div class="detail-kv"><div class="kv"><small>Preferred language</small><b>${escapeHtml(d.language||'Not provided')}</b></div><div class="kv"><small>Living situation</small><b>${escapeHtml(d.living||'Not provided')}</b></div><div class="kv"><small>Caregiver</small><b>${escapeHtml(d.caregiver||'Not provided')}</b></div><div class="kv"><small>Contact</small><b>${escapeHtml(d.contact||'Not provided')}</b></div></div><h4 style="margin:22px 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:#78909a">Requested practical support</h4><div class="detail-tags">${(d.barriers||[]).map(x=>`<span class="pill">${escapeHtml(x)}</span>`).join('')}</div><div class="notice" style="margin-bottom:0">No diagnosis, medication, symptom, procedure, lab, or treatment information is requested by this prototype.</div>`;
  }
  function tasksFor(barriers,other){
    const map={
      'Transportation':'Identify transportation option and verify arrangement',
      'Technology':'Assess digital access and support required technology',
      'Language navigation':'Match preferred-language non-clinical navigation support',
      'Caregiver support':'Confirm caregiver availability and practical coordination needs',
      'Food/basic needs':'Review approved food and basic-needs resource options',
      'Appointment logistics':'Confirm date, time, location, directions, and practical logistics',
      'Resource follow-through':'Contact approved resource and verify next practical step',
      'Organization':'Build practical recovery to-do list and question list for care team'
    };
    const tasks=(barriers||[]).map(b=>({name:map[b]||b,category:b,status:'open'}));
    if(other?.trim()) tasks.push({name:`Other non-clinical need: ${other.trim()}`,category:'Other',status:'open'});
    return tasks;
  }
  form.addEventListener('submit',e=>{
    e.preventDefault(); if(!validateCurrent()) return;
    const d=getFormData(); const id=nextCaseId();
    const newCase={id,initials:`${(d.firstName||'P')[0]||'P'}${(d.lastName||'X')[0]||'X'}`.toUpperCase(),firstName:d.firstName,lastName:`${d.lastName}.`,ageBand:d.ageBand,language:d.language,living:d.living,caregiver:d.caregiver,phone:d.phone,contact:d.contact,status:'review',navigator:'Unassigned',referredBy:d.referredBy||'Demo referral',created:new Date().toISOString().slice(0,10),barriers:d.barriers||[],tasks:tasksFor(d.barriers,d.otherNeed),escalation:d.escalation||'Partner-defined clinical escalation contact',notes:'Created through the AfterNest academic prototype. No medical information should be stored.'};
    const cases=getLocalCases();cases.push(newCase);saveLocalCases(cases);localStorage.setItem('afternest_last_case',id);
    pages.forEach(p=>p.classList.remove('active'));indicators.forEach(i=>i.classList.remove('active'));document.getElementById('intake-success').classList.add('active');document.getElementById('case-confirmation').innerHTML=`<b>${id}</b> · ${escapeHtml(newCase.firstName)} ${escapeHtml(newCase.lastName)} · ${newCase.tasks.length} practical support task${newCase.tasks.length===1?'':'s'} generated.`;document.getElementById('patient-plan-link').href=`my-plan.html?id=${encodeURIComponent(id)}`;
  });
});
