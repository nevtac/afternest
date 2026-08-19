document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('volunteer-form');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form));
    const items=getVolunteers();
    items.push({...data,id:`NAV-${String(items.length+1).padStart(3,'0')}`,status:'Applicant',created:new Date().toISOString(),demo:true});
    saveVolunteers(items);
    document.getElementById('volunteer-message').innerHTML='<div class="notice safe">Demo application recorded in this browser. The Navigator workspace will reflect the updated applicant count.</div>';
    form.reset();
  });
});
