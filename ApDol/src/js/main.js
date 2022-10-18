/* paralax */

let m2 = document.getElementById('m2');
let m3 = document.getElementById('m3');
let cloud1 = document.getElementById('cloud1');
let cloud2 = document.getElementById('cloud2');
let cloud3 = document.getElementById('cloud3');
let text = document.getElementById('text');
let msec = document.getElementById('msec');


window.addEventListener('scroll', function(){
  let value = window.scrollY;
  let laptop = window.matchMedia("(min-width: 1450px)");
  let widescreen = window.matchMedia("(min-width: 1200px)");
  let tablet = window.matchMedia("(min-width: 768px)");
  let phone = window.matchMedia("(min-width: 480px)");

  if (laptop.matches) { 
    m2.style.top = 475 + value * 0.05 + 'px';
    m3.style.top = 390 + value * -0.3 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100+ value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 340 + value * 0.2 + 'px';
    cloud2.style.bottom = -325 + value * 0.2 + 'px';
    cloud3.style.bottom = -15 + value * 0.2 + 'px';
    text.style.top = 415 + value * 0.3 + 'px';
    msec.style.minHeight = 1785 + value * -0.3 + 'px';
  }  else if (widescreen.matches) { 
    m2.style.top = 350 + value * 0.05 + 'px';
    m3.style.top = 200 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100+ value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 240 + value * 0.1 + 'px';
    cloud2.style.bottom = -240 + value * 0.1 + 'px';
    cloud3.style.bottom = -15 + value * 0.1 + 'px';
    text.style.top = 220 + value * 0.3 + 'px';
    msec.style.minHeight = 1205 + value * -0.2 + 'px';
  }  else if (tablet.matches) {
    m2.style.top = 265 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100+ value * -0.3 + 'px';
    cloud3.style.right = -300 + value * -0.3 + 'px';
    cloud1.style.bottom = 240 + value * 0.1 + 'px';
    cloud2.style.bottom = -240 + value * 0.1 + 'px';
    cloud3.style.bottom = -40 + value * 0.1 + 'px';
    text.style.top = 120 + value * 0.3 + 'px';
    msec.style.minHeight = 940 + value * -0.2 + 'px';
  } else if (phone.matches) {
    m2.style.top = 185 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100+ value * -0.3 + 'px';
    cloud3.style.right = -100 + value * -0.3 + 'px';
    cloud1.style.bottom = 80 + value * 0.1 + 'px';
    cloud2.style.bottom = -140 + value * 0.1 + 'px';
    cloud3.style.bottom = -40 + value * 0.1 + 'px';
    text.style.top = 160 + value * 0.3 + 'px';
    msec.style.minHeight = 640 + value * -0.2 + 'px';
  } else {
    m2.style.top = 185 + value * 0.05 + 'px';
    m3.style.top = 100 + value * -0.2 + 'px';
    cloud1.style.left = -60 + value * -0.3 + 'px';
    cloud2.style.left = -100+ value * -0.3 + 'px';
    cloud3.style.right = -100 + value * -0.3 + 'px';
    cloud1.style.bottom = 80 + value * 0.1 + 'px';
    cloud2.style.bottom = -70 + value * 0.1 + 'px';
    cloud3.style.bottom = value * 0.1 + 'px';
    text.style.top = 160 + value * 0.3 + 'px';
    msec.style.minHeight = 640 + value * -0.2 + 'px';
  }
})


/* ///// */