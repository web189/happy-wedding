// AOS
AOS.init({ duration: 800, once: true, offset: 50, easing: 'ease-out-cubic' });

// PETALS
(function () {
  var c = document.getElementById('petals');
  var sym = ['🌸', '🌺', '✿', '❋', '🌷'];
  for (var i = 0; i < 16; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    p.textContent = sym[i % sym.length];
    p.style.cssText = 'left:' + (Math.random() * 100) + '%;' +
      'font-size:' + (8 + Math.random() * 9) + 'px;' +
      'animation-duration:' + (9 + Math.random() * 11) + 's;' +
      'animation-delay:' + (Math.random() * 12) + 's';
    c.appendChild(p);
  }
}());

// SCROLL BAR
window.addEventListener('scroll', function () {
  var el = document.getElementById('sb');
  if (!el) return;
  var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  el.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// OPEN INVITE
function openInvite() {
  var cv  = document.getElementById('cover');
  var mn  = document.getElementById('main');
  var btn = document.getElementById('mBtn');
  cv.style.transition = 'opacity .7s ease, transform .7s ease';
  cv.style.opacity    = '0';
  cv.style.transform  = 'scale(1.04)';
  setTimeout(function () {
    cv.style.display = 'none';
    mn.style.display = 'block';
    if (btn) btn.style.display = 'flex';
    initDotNav();
    initParallax();
    AOS.refresh();
    var m = document.getElementById('music');
    if (m) { m.play().catch(function () {}); isPlaying = true; updBtn(); }
  }, 700);
}

// MUSIC
var isPlaying = false;
document.addEventListener('DOMContentLoaded', function () {
  var b = document.getElementById('mBtn');
  if (b) b.addEventListener('click', function () {
    var m = document.getElementById('music');
    if (!m) return;
    isPlaying ? m.pause() : m.play().catch(function () {});
    isPlaying = !isPlaying;
    updBtn();
  });
});
function updBtn() {
  var ic  = document.getElementById('mIco');
  var btn = document.getElementById('mBtn');
  if (!ic || !btn) return;
  ic.className = isPlaying ? 'fas fa-pause' : 'fas fa-music';
  btn.classList.toggle('on', isPlaying);
}

// PARALLAX
function initParallax() {
  var img = document.getElementById('heroImg');
  if (!img) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY < window.innerHeight)
      img.style.transform = 'translateY(' + (window.scrollY * 0.28) + 'px)';
  }, { passive: true });
}

// DOT NAV
var SECS = ['hero','about','couple','countdown','event','gallery','guestbook'];
function initDotNav() {
  var dots = document.querySelectorAll('.dot');
  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      var el = document.getElementById(d.dataset.t);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
  window.addEventListener('scroll', function () {
    var cur = 0;
    SECS.forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) cur = i;
    });
    dots.forEach(function (d, i) { d.classList.toggle('active', i === cur); });
  }, { passive: true });
}

// COUNTDOWN
(function () {
  var target = new Date('2026-06-20T08:00:00').getTime();
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var ids  = { td: Math.floor(diff / 86400000), th: Math.floor(diff % 86400000 / 3600000), tm: Math.floor(diff % 3600000 / 60000), ts: Math.floor(diff % 60000 / 1000) };
    for (var k in ids) { var e = document.getElementById(k); if (e) e.textContent = pad(ids[k]); }
  }
  tick();
  setInterval(tick, 1000);
}());

// LIGHTBOX
function openLB(src) {
  var lb  = document.getElementById('lb');
  var img = document.getElementById('lbimg');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  var lb = document.getElementById('lb');
  if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });

// COPY REK
function copyRek() {
  var num = document.getElementById('rek');
  var msg = document.getElementById('cpmsg');
  if (!num) return;
  function show() {
    if (!msg) return;
    msg.style.opacity = '1';
    setTimeout(function () { msg.style.opacity = '0'; }, 2500);
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(num.textContent).then(show).catch(show);
  } else {
    var r = document.createRange();
    r.selectNode(num);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    try { document.execCommand('copy'); } catch (e) {}
    window.getSelection().removeAllRanges();
    show();
  }
}

// GUESTBOOK
var AL = { hadir: '✅ Hadir', tidak: '❌ Tidak Hadir', belum: '🤔 Belum Pasti' };
function submitGuest(e) {
  e.preventDefault();
  var n    = document.getElementById('gname').value.trim();
  var a    = document.getElementById('gatt').value;
  var m    = document.getElementById('gmsg').value.trim();
  if (!n || !m) return;
  var list = document.getElementById('glist');
  var div  = document.createElement('div');
  div.className = 'gi2';
  div.innerHTML = '<div class="gn">💬 ' + esc(n) + '</div>' +
    '<span class="gbg">' + (AL[a] || '') + '</span>' +
    '<p class="gm">"' + esc(m) + '"</p>';
  list.prepend(div);
  e.target.reset();
  div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}