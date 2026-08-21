document.addEventListener('DOMContentLoaded',()=>{
  const list=document.getElementById('case-list'), detail=document.getElementById('case-detail'), metrics=document.getElementById('workspace-metrics'), filter=document.getElementById('case-filter'); if(!list) return;
  let selected=null;
  const navigators=['Unassigned','Maya Chen','Sofia Alvarez','Jordan Patel'];
  function all(){return getAllCases()}
  function renderMetrics(){
    const cases=all(), active=cases.filter(c=>c.status!=='resolved').length, open=cases.flatMap(c=>c.tasks||[]).filter(t=>t.status==='open').length, resolved=cases.flatMap(c=>c.tasks||[]).filter(t=>t.status==='resolved').length, volunteers=getVolunteers().length;
    metrics.innerHTML=`<div class="metric"><small>Active patients</small><b>${active}</b><span>Illustrative + local demo referrals</span></div><div class="metric"><small>Open practical tasks</small><b>${open}</b><span>Needs action</span></div><div class="metric"><small>Resolved tasks</small><b>${resolved}</b><span>Verified in demo workflow</span></div><div class="metric"><small>Navigator applicants</small><b>${volunteers}</b><span>Local demo submissions</span></div>`;
  }
  function renderList(){
    const f=filter.value; const cases=all().filter(c=>f==='all'||c.status===f);
    list.innerHTML=cases.map(c=>`<div class="case-row" data-id="${c.id}"><div><strong>${escapeHtml(c.firstName)} ${escapeHtml(c.lastName)}</strong><small>${c.id} · ${escapeHtml(c.language||'Language not set')}</small></div><div><strong>${escapeHtml(c.navigator||'Unassigned')}</strong><small>Recovery Navigator</small></div><div><strong>${(c.tasks||[]).filter(t=>t.status==='resolved').length}/${(c.tasks||[]).length}</strong><small>Tasks resolved</small></div><div>${statusBadge(c.status)}</div></div>`).join('') || '<div class="detail-empty"><b>No cases match this filter.</b></div>';
    list.querySelectorAll('[data-id]').forEach(row=>row.addEventListener('click',()=>{selected=row.dataset.id;renderDetail()}));
  }
  function caseById(id){return all().find(c=>c.id===id)}
  function saveCase(updated){
    const seed=AFTERNEST.seedCases.find(c=>c.id===updated.id);
    if(seed){
      const locals=getLocalCases(); const idx=locals.findIndex(c=>c.id===updated.id); if(idx>=0) locals[idx]=updated; else locals.push(updated); saveLocalCases(locals);
    } else {const locals=getLocalCases(); const idx=locals.findIndex(c=>c.id===updated.id); if(idx>=0){locals[idx]=updated;saveLocalCases(locals)}}
  }
  function resolvedRatio(c){const tasks=c.tasks||[]; if(!tasks.length)return 0;return Math.round(tasks.filter(t=>t.status==='resolved').length/tasks.length*100)}
  function recalcStatus(c){
    const tasks=c.tasks||[]; if(tasks.length&&tasks.every(t=>t.status==='resolved')) c.status='resolved'; else if(tasks.some(t=>t.status==='escalated')) c.status='escalated'; else if(tasks.some(t=>t.status==='progress'||t.status==='resolved')) c.status='progress'; else c.status=c.navigator==='Unassigned'?'review':'open';
  }
  function renderDetail(){
    const c=caseById(selected); if(!c) return;
    detail.innerHTML=`<div class="detail-head"><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><span class="small">${c.id}</span><h3>${escapeHtml(c.firstName)} ${escapeHtml(c.lastName)}</h3></div>${statusBadge(c.status)}</div><div class="detail-tags">${(c.barriers||[]).map(b=>`<span class="pill">${escapeHtml(b)}</span>`).join('')}</div><div class="resolution-bar"><div><small>NON-CLINICAL RECOVERY SUPPORT PLAN</small><b>${resolvedRatio(c)}% of practical tasks resolved</b></div><div class="progress-ring" style="background:conic-gradient(var(--mint) 0 ${resolvedRatio(c)}%,rgba(255,255,255,.12) ${resolvedRatio(c)}% 100%)"><span>${resolvedRatio(c)}%</span></div></div></div><div class="detail-section"><h4>Practical profile</h4><div class="detail-kv"><div class="kv"><small>Language</small><b>${escapeHtml(c.language||'')}</b></div><div class="kv"><small>Living situation</small><b>${escapeHtml(c.living||'')}</b></div><div class="kv"><small>Caregiver</small><b>${escapeHtml(c.caregiver||'')}</b></div><div class="kv"><small>Preferred contact</small><b>${escapeHtml(c.contact||'')}</b></div></div></div><div class="detail-section"><h4>Navigator assignment</h4><select id="navigator-select" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:10px;background:#fff">${navigators.map(n=>`<option ${n===c.navigator?'selected':''}>${n}</option>`).join('')}</select></div><div class="detail-section"><h4>Practical support tasks</h4><div id="task-editor">${(c.tasks||[]).map((t,i)=>`<div class="task-mini"><div><b>${escapeHtml(t.name)}</b><small>${escapeHtml(t.category)}</small></div><select data-task="${i}"><option value="open" ${t.status==='open'?'selected':''}>Needs action</option><option value="progress" ${t.status==='progress'?'selected':''}>In progress</option><option value="resolved" ${t.status==='resolved'?'selected':''}>Resolved</option><option value="escalated" ${t.status==='escalated'?'selected':''}>Escalated</option></select></div>`).join('')}</div></div><div class="detail-section"><h4>Referral & scope</h4><p class="small">Referred by: ${escapeHtml(c.referredBy||'Demo referral')}</p><p class="small">${escapeHtml(c.notes||'No clinical information should be stored in this prototype.')}</p><a class="button secondary small-btn" href="my-plan.html?id=${encodeURIComponent(c.id)}">Open patient-facing plan</a></div>`;
    document.getElementById('navigator-select').addEventListener('change',e=>{c.navigator=e.target.value;recalcStatus(c);saveCase(c);renderMetrics();renderList();renderDetail()});
    detail.querySelectorAll('[data-task]').forEach(sel=>sel.addEventListener('change',e=>{c.tasks[Number(e.target.dataset.task)].status=e.target.value;recalcStatus(c);saveCase(c);renderMetrics();renderList();renderDetail()}));
  }
  filter.addEventListener('change',renderList); renderMetrics();renderList();
  const last=localStorage.getItem('afternest_last_case'); if(last&&caseById(last)){selected=last;renderDetail()} else if(all()[0]){selected=all()[0].id;renderDetail()}
});
