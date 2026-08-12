
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const menuBtn = $('.menu-btn');
const navLinks = $('.nav-links');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click', ()=>{
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));

const sideTrigger = $('.side-trigger');
const sidePanel = $('.side-panel');
if(sideTrigger && sidePanel){
  sideTrigger.addEventListener('click', ()=>{
    const open = sidePanel.classList.toggle('open');
    sideTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click',(e)=>{
    if(!sidePanel.contains(e.target) && !sideTrigger.contains(e.target)) sidePanel.classList.remove('open');
  });
}

function telegramMessage(){
  const text = encodeURIComponent("Hi Digital Atom! I’m interested in getting a website. Please share the details and next steps.");
  // Uses Telegram's share endpoint so it works without exposing or requiring a personal phone number.
  return `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`;
}
$$('[data-telegram]').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.preventDefault();
    window.open(telegramMessage(),'_blank','noopener,noreferrer');
  });
});

const form = $('#concernForm');
if(form){
  const status = $('#formStatus');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Digital Atom enquiry — ${data.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\n\nConcern / requirement:\n${data.get('message')}`
    );
    // No form data is stored by this static site. It opens the user's email client.
    window.location.href = `mailto:hello@digitalatom.in?subject=${subject}&body=${body}`;
    status.textContent = 'Your email app should open with the enquiry filled in.';
  });
}

$$('[data-year]').forEach(el=>el.textContent = new Date().getFullYear());
