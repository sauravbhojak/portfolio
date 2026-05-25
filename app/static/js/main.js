const $=s=>document.querySelector(s);

const role=$("#role"),roles=["FastAPI Development","REST API Architecture","Automation Pipelines","Python Backend Systems"];
let i=0;setInterval(()=>{role.classList.add("out");setTimeout(()=>{i=(i+1)%roles.length;role.textContent=roles[i];role.classList.remove("out")},320)},2400);

const io=new IntersectionObserver(items=>items.forEach(x=>x.isIntersecting&&x.target.classList.add("show")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

const toast=msg=>{const el=document.createElement("div");el.className="toast";el.textContent=msg;$("#toast").append(el);setTimeout(()=>el.remove(),3000)};
$("#contact-form").addEventListener("submit",async e=>{
  e.preventDefault();
  const form=e.currentTarget,btn=form.querySelector("button"),note=$("#form-note");
  btn.disabled=true;btn.textContent="Sending...";
  try{
    const res=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
    if(!res.ok)throw Error();
    form.reset();note.textContent="Thanks, your message has been sent.";toast("Message sent.");
  }catch{note.textContent="Please check the form and try again.";toast("Unable to send message.");}
  btn.disabled=false;btn.textContent="Send Message";
});
