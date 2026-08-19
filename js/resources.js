const resources=[
  {cat:'Transportation',name:'Accessible Ride Coordination',desc:'Illustrative partner-approved option for accessible local transportation and appointment travel planning.',meta:['San Francisco','Phone support','Eligibility varies']},
  {cat:'Transportation',name:'Community Volunteer Ride Network',desc:'Illustrative community transportation resource for non-emergency trips when eligibility and coverage are confirmed.',meta:['Community partner','Advance scheduling']},
  {cat:'Technology',name:'Digital Access Coaching',desc:'Illustrative support for portal basics, video visits, password recovery, and device confidence.',meta:['Phone or in person','Older adults']},
  {cat:'Technology',name:'Low-Cost Connectivity Resource',desc:'Illustrative directory entry for approved connectivity or device-assistance programs.',meta:['Eligibility varies','Digital access']},
  {cat:'Food',name:'Home-Delivered Meal Resource',desc:'Illustrative community meal option for patients who have difficulty shopping or preparing food during recovery.',meta:['Delivery','Eligibility varies']},
  {cat:'Food',name:'Neighborhood Grocery Support',desc:'Illustrative short-term grocery and basic-needs resource for qualifying community members.',meta:['Local','Basic needs']},
  {cat:'Language',name:'Community Language Navigation Partner',desc:'Illustrative non-clinical language-navigation resource. Clinical interpretation remains with qualified healthcare services.',meta:['Multilingual','Non-clinical']},
  {cat:'Language',name:'Hospital Qualified Interpreter Services',desc:'Placeholder for the hospital’s approved clinical interpretation pathway when a medical conversation requires qualified language services.',meta:['Clinical','Partner-defined']},
  {cat:'Caregiver',name:'Caregiver Support & Respite Directory',desc:'Illustrative resource for caregiver education, respite options, and community support.',meta:['Caregiver','Community']},
  {cat:'Caregiver',name:'Senior Support Navigation',desc:'Illustrative partner directory entry for older adults needing ongoing community support beyond the AfterNest period.',meta:['Older adults','Long-term handoff']}
];
document.addEventListener('DOMContentLoaded',()=>{
  const grid=document.getElementById('resource-grid'); if(!grid)return; const buttons=[...document.querySelectorAll('[data-filter]')];
  function render(cat='all'){grid.innerHTML=resources.filter(r=>cat==='all'||r.cat===cat).map(r=>`<article class="resource-card"><span class="resource-cat">${escapeHtml(r.cat)}</span><h3>${escapeHtml(r.name)}</h3><p>${escapeHtml(r.desc)}</p><div class="resource-meta">${r.meta.map(m=>`<span>${escapeHtml(m)}</span>`).join('')}</div></article>`).join('')}
  buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)}));render();
});
