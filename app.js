AOS.init({
  duration:1200,
  once:true
});

/* OPEN INVITE */
function openInvite(){
  document.getElementById("cover").style.display = "none";
  document.getElementById("main").style.display = "block";

  const music = document.getElementById("music");
  if(music){
    music.play();
  }
}

/* COUNTDOWN */
const targetDate = new Date("2026-06-20").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const diff = targetDate - now;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const m = Math.floor((diff%(1000*60*60))/(1000*60));
  const s = Math.floor((diff%(1000*60))/1000);

  const timer = document.getElementById("timer");
  if(timer){
    timer.innerHTML = `${d} Hari ${h} Jam ${m} Menit ${s} Detik`;
  }
},1000);

/* LIGHTBOX */
function openLightbox(img){
  document.getElementById("lightbox").style.display="flex";
  document.getElementById("lightbox-img").src = img.src;
}

function closeLightbox(){
  document.getElementById("lightbox").style.display="none";
}

/* COPY REKENING */
function copyRek(){
  const rek = document.getElementById("rekNumber").innerText;
  navigator.clipboard.writeText(rek);

  const msg = document.getElementById("copyMsg");
  const card = document.querySelector(".gift-card");

  msg.style.opacity = "1";
  card.style.animation = "shake 0.4s";

  setTimeout(()=>{
    msg.style.opacity = "0";
    card.style.animation = "giftGlow 3s infinite alternate";
  },2000);
}

/* BUKU TAMU */
const form = document.getElementById("guestForm");
const list = document.getElementById("guestList");

if(form){
  form.addEventListener("submit",function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const msg = document.getElementById("message").value;

    const div = document.createElement("div");
    div.classList.add("guest-item");
    div.innerHTML = `<strong>${name}</strong><br>${msg}`;

    list.prepend(div);
    form.reset();
  });
}