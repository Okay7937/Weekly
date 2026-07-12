/* =============================================
   Weekly Workout – script.js
   Weekly repeating program (Mon–Sun)
   Auto-selects today's day. Tracks per-week history.
   ============================================= */
'use strict';

/* ══════════════════════════════════════════
   ANIMATION LIBRARY  (160×160 viewBox stickmen)
══════════════════════════════════════════ */
const ANIMS = {
  'pushup': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes pu-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}.pu-b{animation:pu-b 1.4s ease-in-out infinite;transform-origin:80px 100px;}</style>
    <line x1="20" y1="130" x2="140" y2="130" class="sk-skin sk-ground"/>
    <g class="pu-b"><line x1="55" y1="100" x2="105" y2="100" class="sk-skin"/><circle cx="112" cy="93" r="10" class="sk-skin"/><line x1="55" y1="100" x2="50" y2="128" class="sk-skin"/><line x1="70" y1="100" x2="65" y2="128" class="sk-skin"/><line x1="55" y1="100" x2="40" y2="128" class="sk-skin sk-accent"/><line x1="75" y1="100" x2="60" y2="128" class="sk-skin sk-accent"/></g>
  </svg>`,
  'pike-pushup': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes pk-h{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}.pk-g{animation:pk-h 1.4s ease-in-out infinite;transform-origin:80px 110px;}</style>
    <line x1="20" y1="135" x2="140" y2="135" class="sk-skin sk-ground"/>
    <g class="pk-g"><circle cx="80" cy="65" r="10" class="sk-skin"/><line x1="80" y1="75" x2="80" y2="108" class="sk-skin"/><line x1="80" y1="108" x2="55" y2="133" class="sk-skin"/><line x1="80" y1="108" x2="105" y2="133" class="sk-skin"/><line x1="80" y1="88" x2="55" y2="110" class="sk-skin sk-accent"/><line x1="80" y1="88" x2="105" y2="110" class="sk-skin sk-accent"/></g>
  </svg>`,
  'diamond-pushup': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes dp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}.dp-b{animation:dp-b 1.4s ease-in-out infinite;transform-origin:80px 105px;}</style>
    <line x1="20" y1="130" x2="140" y2="130" class="sk-skin sk-ground"/>
    <g class="dp-b"><line x1="55" y1="103" x2="108" y2="103" class="sk-skin"/><circle cx="115" cy="96" r="10" class="sk-skin"/><line x1="55" y1="103" x2="50" y2="128" class="sk-skin"/><line x1="72" y1="103" x2="67" y2="128" class="sk-skin"/><line x1="62" y1="103" x2="52" y2="126" class="sk-skin sk-accent"/><line x1="72" y1="103" x2="62" y2="126" class="sk-skin sk-accent"/></g>
  </svg>`,
  'decline-pushup': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes dc-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}.dc-b{animation:dc-b 1.4s ease-in-out infinite;transform-origin:80px 95px;}</style>
    <rect x="95" y="108" width="40" height="12" rx="4" fill="rgba(108,99,255,0.25)" stroke="rgba(108,99,255,0.5)" stroke-width="1.5"/>
    <line x1="20" y1="130" x2="140" y2="130" class="sk-skin sk-ground"/>
    <g class="dc-b"><line x1="50" y1="105" x2="108" y2="90" class="sk-skin"/><circle cx="116" cy="83" r="10" class="sk-skin"/><line x1="50" y1="105" x2="100" y2="108" class="sk-skin"/><line x1="65" y1="101" x2="110" y2="108" class="sk-skin"/><line x1="60" y1="103" x2="40" y2="125" class="sk-skin sk-accent"/><line x1="72" y1="100" x2="55" y2="125" class="sk-skin sk-accent"/></g>
  </svg>`,
  'plank': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes pl-s{0%,100%{transform:translateY(0)}25%{transform:translateY(-2px)}75%{transform:translateY(2px)}}.pl-g{animation:pl-s 0.6s ease-in-out infinite;transform-origin:80px 105px;}</style>
    <line x1="20" y1="130" x2="140" y2="130" class="sk-skin sk-ground"/>
    <g class="pl-g"><line x1="40" y1="105" x2="118" y2="105" class="sk-skin"/><circle cx="126" cy="98" r="10" class="sk-skin"/><line x1="40" y1="105" x2="36" y2="128" class="sk-skin"/><line x1="56" y1="105" x2="52" y2="128" class="sk-skin"/><line x1="40" y1="105" x2="36" y2="125" class="sk-skin sk-accent"/><line x1="56" y1="105" x2="60" y2="125" class="sk-skin sk-accent"/></g>
  </svg>`,
  'squat': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes sq-g{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(18px) scaleY(0.82)}}.sq-g{animation:sq-g 1.4s ease-in-out infinite;transform-origin:80px 115px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <g class="sq-g"><circle cx="80" cy="60" r="11" class="sk-skin"/><line x1="80" y1="71" x2="80" y2="105" class="sk-skin"/><line x1="80" y1="82" x2="52" y2="95" class="sk-skin sk-accent"/><line x1="80" y1="82" x2="108" y2="95" class="sk-skin sk-accent"/><line x1="80" y1="105" x2="60" y2="138" class="sk-skin"/><line x1="80" y1="105" x2="100" y2="138" class="sk-skin"/></g>
  </svg>`,
  'split-squat': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes bss-g{0%,100%{transform:translateY(0)}50%{transform:translateY(16px)}}.bss-g{animation:bss-g 1.4s ease-in-out infinite;transform-origin:75px 110px;}</style>
    <rect x="105" y="110" width="35" height="12" rx="3" fill="rgba(108,99,255,0.25)" stroke="rgba(108,99,255,0.5)" stroke-width="1.5"/>
    <line x1="20" y1="135" x2="140" y2="135" class="sk-skin sk-ground"/>
    <g class="bss-g"><circle cx="80" cy="60" r="11" class="sk-skin"/><line x1="80" y1="71" x2="80" y2="105" class="sk-skin"/><line x1="80" y1="85" x2="58" y2="98" class="sk-skin sk-accent"/><line x1="80" y1="85" x2="102" y2="98" class="sk-skin sk-accent"/><line x1="80" y1="105" x2="55" y2="133" class="sk-skin"/><line x1="80" y1="105" x2="118" y2="110" class="sk-skin"/></g>
  </svg>`,
  'lunge': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes lu-g{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}.lu-g{animation:lu-g 1.2s ease-in-out infinite;transform-origin:80px 105px;}</style>
    <line x1="20" y1="138" x2="140" y2="138" class="sk-skin sk-ground"/>
    <g class="lu-g"><circle cx="80" cy="62" r="11" class="sk-skin"/><line x1="80" y1="73" x2="80" y2="105" class="sk-skin"/><line x1="80" y1="83" x2="60" y2="95" class="sk-skin sk-accent"/><line x1="80" y1="83" x2="100" y2="95" class="sk-skin sk-accent"/><line x1="80" y1="105" x2="50" y2="136" class="sk-skin"/><line x1="80" y1="105" x2="110" y2="136" class="sk-skin"/></g>
  </svg>`,
  'calf-raise': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes cr-g{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}.cr-g{animation:cr-g 1s ease-in-out infinite;transform-origin:80px 125px;}</style>
    <line x1="20" y1="138" x2="140" y2="138" class="sk-skin sk-ground"/>
    <g class="cr-g"><circle cx="80" cy="58" r="11" class="sk-skin"/><line x1="80" y1="69" x2="80" y2="108" class="sk-skin"/><line x1="80" y1="82" x2="60" y2="90" class="sk-skin sk-accent"/><line x1="80" y1="82" x2="100" y2="90" class="sk-skin sk-accent"/><line x1="80" y1="108" x2="68" y2="136" class="sk-skin"/><line x1="80" y1="108" x2="92" y2="136" class="sk-skin"/></g>
  </svg>`,
  /* ── PULL-UP ── */
  'pullup': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes pu2-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}.pu2-b{animation:pu2-b 1.4s ease-in-out infinite;transform-origin:80px 90px;}</style>
    <!-- bar -->
    <rect x="20" y="22" width="120" height="8" rx="4" fill="rgba(108,99,255,0.3)" stroke="#a78bfa" stroke-width="1.5"/>
    <!-- hands on bar -->
    <circle cx="58" cy="26" r="5" fill="#a78bfa"/>
    <circle cx="102" cy="26" r="5" fill="#a78bfa"/>
    <g class="pu2-b">
      <circle cx="80" cy="60" r="11" class="sk-skin"/>
      <line x1="80" y1="71" x2="80" y2="108" class="sk-skin"/>
      <line x1="80" y1="84" x2="58" y2="95" class="sk-skin sk-accent"/>
      <line x1="80" y1="84" x2="102" y2="95" class="sk-skin sk-accent"/>
      <!-- arms up to bar -->
      <line x1="58" y1="95" x2="58" y2="30" class="sk-skin sk-accent"/>
      <line x1="102" y1="95" x2="102" y2="30" class="sk-skin sk-accent"/>
      <line x1="80" y1="108" x2="70" y2="138" class="sk-skin"/>
      <line x1="80" y1="108" x2="90" y2="138" class="sk-skin"/>
    </g>
  </svg>`,
  /* ── CHIN-UP ── */
  'chinup': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes cu-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}.cu-b{animation:cu-b 1.4s ease-in-out infinite;transform-origin:80px 90px;}</style>
    <rect x="20" y="22" width="120" height="8" rx="4" fill="rgba(255,101,132,0.3)" stroke="#ff6584" stroke-width="1.5"/>
    <circle cx="62" cy="26" r="5" fill="#ff6584"/>
    <circle cx="98" cy="26" r="5" fill="#ff6584"/>
    <g class="cu-b">
      <circle cx="80" cy="60" r="11" class="sk-skin"/>
      <line x1="80" y1="71" x2="80" y2="108" class="sk-skin"/>
      <line x1="80" y1="84" x2="62" y2="95" class="sk-skin" style="stroke:#ff6584"/>
      <line x1="80" y1="84" x2="98" y2="95" class="sk-skin" style="stroke:#ff6584"/>
      <line x1="62" y1="95" x2="62" y2="30" class="sk-skin" style="stroke:#ff6584"/>
      <line x1="98" y1="95" x2="98" y2="30" class="sk-skin" style="stroke:#ff6584"/>
      <line x1="80" y1="108" x2="70" y2="138" class="sk-skin"/>
      <line x1="80" y1="108" x2="90" y2="138" class="sk-skin"/>
    </g>
  </svg>`,
  /* ── DEAD HANG ── */
  'dead-hang': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes dh-s{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}.dh-g{animation:dh-s 2s ease-in-out infinite;transform-origin:80px 30px;}</style>
    <rect x="20" y="22" width="120" height="8" rx="4" fill="rgba(108,99,255,0.3)" stroke="#a78bfa" stroke-width="1.5"/>
    <circle cx="58" cy="26" r="5" fill="#a78bfa"/>
    <circle cx="102" cy="26" r="5" fill="#a78bfa"/>
    <g class="dh-g">
      <line x1="58" y1="30" x2="58" y2="55" class="sk-skin sk-accent"/>
      <line x1="102" y1="30" x2="102" y2="55" class="sk-skin sk-accent"/>
      <circle cx="80" cy="68" r="11" class="sk-skin"/>
      <line x1="80" y1="79" x2="80" y2="118" class="sk-skin"/>
      <line x1="80" y1="92" x2="58" y2="58" class="sk-skin sk-accent"/>
      <line x1="80" y1="92" x2="102" y2="58" class="sk-skin sk-accent"/>
      <line x1="80" y1="118" x2="70" y2="148" class="sk-skin"/>
      <line x1="80" y1="118" x2="90" y2="148" class="sk-skin"/>
    </g>
  </svg>`,
  /* ── HANGING KNEE RAISE ── */
  'hanging-knee': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes hk-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-70deg)}}.hk-legs{animation:hk-l 1.4s ease-in-out infinite;transform-origin:80px 108px;}</style>
    <rect x="20" y="18" width="120" height="8" rx="4" fill="rgba(108,99,255,0.3)" stroke="#a78bfa" stroke-width="1.5"/>
    <circle cx="58" cy="22" r="5" fill="#a78bfa"/>
    <circle cx="102" cy="22" r="5" fill="#a78bfa"/>
    <!-- static upper body -->
    <line x1="58" y1="26" x2="58" y2="52" class="sk-skin sk-accent"/>
    <line x1="102" y1="26" x2="102" y2="52" class="sk-skin sk-accent"/>
    <circle cx="80" cy="64" r="11" class="sk-skin"/>
    <line x1="80" y1="75" x2="80" y2="108" class="sk-skin"/>
    <line x1="80" y1="88" x2="58" y2="54" class="sk-skin sk-accent"/>
    <line x1="80" y1="88" x2="102" y2="54" class="sk-skin sk-accent"/>
    <!-- animated legs -->
    <g class="hk-legs">
      <line x1="80" y1="108" x2="68" y2="140" class="sk-skin"/>
      <line x1="80" y1="108" x2="92" y2="140" class="sk-skin"/>
    </g>
  </svg>`,
  /* ── SUPERMAN HOLD ── */
  'superman': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes sm-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.sm-g{animation:sm-b 1.6s ease-in-out infinite;transform-origin:80px 88px;}</style>
    <!-- floor -->
    <rect x="20" y="108" width="120" height="6" rx="3" fill="rgba(108,99,255,0.15)" stroke="rgba(108,99,255,0.3)" stroke-width="1"/>
    <g class="sm-g">
      <!-- body horizontal -->
      <line x1="30" y1="90" x2="120" y2="90" class="sk-skin"/>
      <circle cx="128" cy="84" r="10" class="sk-skin"/>
      <!-- arms extended forward (superman pose) -->
      <line x1="30" y1="90" x2="18" y2="78" class="sk-skin sk-accent"/>
      <line x1="42" y1="90" x2="30" y2="78" class="sk-skin sk-accent"/>
      <!-- legs lifted -->
      <line x1="90" y1="90" x2="95" y2="106" class="sk-skin"/>
      <line x1="105" y1="90" x2="110" y2="106" class="sk-skin"/>
    </g>
  </svg>`,
  /* ── LAT STRETCH ── */
  'lat-stretch': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes ls-a{0%,100%{transform:rotate(0deg)}50%{transform:rotate(20deg)}}.ls-a{animation:ls-a 2s ease-in-out infinite;transform-origin:80px 80px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <circle cx="80" cy="55" r="11" class="sk-skin"/>
    <line x1="80" y1="66" x2="80" y2="108" class="sk-skin"/>
    <g class="ls-a">
      <line x1="80" y1="80" x2="110" y2="65" class="sk-skin sk-accent"/>
      <line x1="80" y1="80" x2="52" y2="90" class="sk-skin sk-accent"/>
    </g>
    <line x1="80" y1="108" x2="65" y2="138" class="sk-skin"/>
    <line x1="80" y1="108" x2="95" y2="138" class="sk-skin"/>
  </svg>`,
  /* ── CHILD'S POSE ── */
  'childs-pose': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes cp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.cp-g{animation:cp-b 3s ease-in-out infinite;transform-origin:80px 100px;}</style>
    <rect x="20" y="120" width="120" height="6" rx="3" fill="rgba(108,99,255,0.15)" stroke="rgba(108,99,255,0.3)" stroke-width="1"/>
    <g class="cp-g">
      <!-- kneeling, bent forward -->
      <circle cx="118" cy="90" r="10" class="sk-skin"/>
      <!-- back curved down -->
      <path d="M108 96 Q80 105 45 118" class="sk-skin" fill="none"/>
      <!-- arms stretched forward on floor -->
      <line x1="90" y1="106" x2="40" y2="118" class="sk-skin sk-accent"/>
      <line x1="95" y1="110" x2="48" y2="122" class="sk-skin sk-accent"/>
      <!-- knees/shins -->
      <line x1="108" y1="96" x2="100" y2="120" class="sk-skin"/>
      <line x1="115" y1="100" x2="108" y2="122" class="sk-skin"/>
    </g>
  </svg>`,
  /* ── LEG SWING ── */
  'leg-swing': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes ls2-l{0%,100%{transform:rotate(-45deg)}50%{transform:rotate(45deg)}}.ls2-l{animation:ls2-l 0.9s ease-in-out infinite;transform-origin:80px 108px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <circle cx="80" cy="60" r="11" class="sk-skin"/>
    <line x1="80" y1="71" x2="80" y2="108" class="sk-skin"/>
    <line x1="80" y1="84" x2="60" y2="96" class="sk-skin sk-accent"/>
    <line x1="80" y1="84" x2="100" y2="96" class="sk-skin sk-accent"/>
    <line x1="80" y1="108" x2="70" y2="138" class="sk-skin"/>
    <g class="ls2-l"><line x1="80" y1="108" x2="90" y2="138" class="sk-skin sk-accent"/></g>
  </svg>`,
  /* ── ARM CIRCLES ── */
  'arm-circles': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes ac-l{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes ac-r{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}.ac-la{animation:ac-l 1.2s linear infinite;transform-origin:80px 88px;}.ac-ra{animation:ac-r 1.2s linear infinite;transform-origin:80px 88px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <circle cx="80" cy="60" r="11" class="sk-skin"/>
    <line x1="80" y1="71" x2="80" y2="112" class="sk-skin"/>
    <line x1="80" y1="112" x2="65" y2="138" class="sk-skin"/>
    <line x1="80" y1="112" x2="95" y2="138" class="sk-skin"/>
    <g class="ac-la"><line x1="80" y1="88" x2="48" y2="88" class="sk-skin sk-accent"/><circle cx="48" cy="88" r="4" fill="#a78bfa"/></g>
    <g class="ac-ra"><line x1="80" y1="88" x2="112" y2="88" class="sk-skin sk-accent"/><circle cx="112" cy="88" r="4" fill="#6c63ff"/></g>
  </svg>`,
  /* ── CYCLING ── */
  'cycling': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes cy-w{100%{transform:rotate(360deg)}}@keyframes cy-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(180deg)}}.cy-wl{animation:cy-w 1.2s linear infinite;transform-origin:52px 108px;}.cy-wr{animation:cy-w 1.2s linear infinite;transform-origin:108px 108px;}.cy-l1{animation:cy-l 0.8s linear infinite;transform-origin:80px 98px;}.cy-l2{animation:cy-l 0.8s linear infinite reverse;transform-origin:80px 98px;}</style>
    <g class="cy-wl"><circle cx="52" cy="108" r="22" class="sk-skin"/><line x1="52" y1="86" x2="52" y2="130" class="sk-skin" style="opacity:.3"/><line x1="30" y1="108" x2="74" y2="108" class="sk-skin" style="opacity:.3"/></g>
    <g class="cy-wr"><circle cx="108" cy="108" r="22" class="sk-skin"/><line x1="108" y1="86" x2="108" y2="130" class="sk-skin" style="opacity:.3"/><line x1="86" y1="108" x2="130" y2="108" class="sk-skin" style="opacity:.3"/></g>
    <line x1="52" y1="108" x2="80" y2="78" class="sk-skin"/><line x1="80" y1="78" x2="108" y2="108" class="sk-skin"/><line x1="80" y1="78" x2="95" y2="90" class="sk-skin"/>
    <circle cx="88" cy="62" r="10" class="sk-skin"/>
    <line x1="88" y1="72" x2="80" y2="90" class="sk-skin"/>
    <line x1="80" y1="90" x2="68" y2="80" class="sk-skin sk-accent"/>
    <line x1="80" y1="90" x2="94" y2="80" class="sk-skin sk-accent"/>
    <g class="cy-l1"><line x1="80" y1="98" x2="70" y2="112" class="sk-skin"/></g>
    <g class="cy-l2"><line x1="80" y1="98" x2="90" y2="112" class="sk-skin"/></g>
  </svg>`,
  /* ── WALK ── */
  'walk': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes wk-la{0%,100%{transform:rotate(-25deg)}50%{transform:rotate(25deg)}}@keyframes wk-ra{0%,100%{transform:rotate(25deg)}50%{transform:rotate(-25deg)}}@keyframes wk-ll{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(30deg)}}@keyframes wk-rl{0%,100%{transform:rotate(30deg)}50%{transform:rotate(-30deg)}}.wk-la{animation:wk-la 0.7s ease-in-out infinite;transform-origin:80px 88px;}.wk-ra{animation:wk-ra 0.7s ease-in-out infinite;transform-origin:80px 88px;}.wk-ll{animation:wk-ll 0.7s ease-in-out infinite;transform-origin:80px 110px;}.wk-rl{animation:wk-rl 0.7s ease-in-out infinite;transform-origin:80px 110px;}</style>
    <line x1="20" y1="138" x2="140" y2="138" class="sk-skin sk-ground"/>
    <circle cx="80" cy="62" r="11" class="sk-skin"/>
    <line x1="80" y1="73" x2="80" y2="110" class="sk-skin"/>
    <g class="wk-la"><line x1="80" y1="88" x2="60" y2="110" class="sk-skin sk-accent"/></g>
    <g class="wk-ra"><line x1="80" y1="88" x2="100" y2="110" class="sk-skin sk-accent"/></g>
    <g class="wk-ll"><line x1="80" y1="110" x2="65" y2="136" class="sk-skin"/></g>
    <g class="wk-rl"><line x1="80" y1="110" x2="95" y2="136" class="sk-skin"/></g>
  </svg>`,
  /* ── STRETCH (generic) ── */
  'stretch': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes st-g{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.88)}}.st-g{animation:st-g 3s ease-in-out infinite;transform-origin:80px 100px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <g class="st-g"><circle cx="80" cy="52" r="11" class="sk-skin"/><line x1="80" y1="63" x2="80" y2="105" class="sk-skin"/><line x1="80" y1="78" x2="46" y2="88" class="sk-skin sk-accent"/><line x1="80" y1="78" x2="114" y2="88" class="sk-skin sk-accent"/><line x1="80" y1="105" x2="58" y2="138" class="sk-skin"/><line x1="80" y1="105" x2="102" y2="138" class="sk-skin"/></g>
  </svg>`,
  'quad-stretch': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes qs-l{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}.qs-l{animation:qs-l 1.5s ease-in-out infinite;transform-origin:80px 108px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <circle cx="80" cy="60" r="11" class="sk-skin"/>
    <line x1="80" y1="71" x2="80" y2="108" class="sk-skin"/>
    <line x1="80" y1="84" x2="60" y2="96" class="sk-skin sk-accent"/>
    <line x1="80" y1="84" x2="104" y2="100" class="sk-skin sk-accent"/>
    <line x1="80" y1="108" x2="72" y2="138" class="sk-skin"/>
    <g class="qs-l"><line x1="80" y1="108" x2="100" y2="118" class="sk-skin"/><line x1="100" y1="118" x2="105" y2="98" class="sk-skin"/></g>
  </svg>`,
  'hamstring-stretch': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes hs-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-18deg)}}.hs-t{animation:hs-t 2s ease-in-out infinite;transform-origin:80px 108px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <g class="hs-t"><circle cx="80" cy="60" r="11" class="sk-skin"/><line x1="80" y1="71" x2="80" y2="108" class="sk-skin"/><line x1="80" y1="84" x2="55" y2="90" class="sk-skin sk-accent"/><line x1="80" y1="84" x2="105" y2="90" class="sk-skin sk-accent"/></g>
    <line x1="80" y1="108" x2="60" y2="138" class="sk-skin"/>
    <line x1="80" y1="108" x2="100" y2="138" class="sk-skin"/>
  </svg>`,
  'chest-stretch': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes cs-a{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-30deg)}}.cs-la{animation:cs-a 2s ease-in-out infinite;transform-origin:80px 86px;}.cs-ra{animation:cs-a 2s ease-in-out infinite reverse;transform-origin:80px 86px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <circle cx="80" cy="60" r="11" class="sk-skin"/>
    <line x1="80" y1="71" x2="80" y2="110" class="sk-skin"/>
    <g class="cs-la"><line x1="80" y1="86" x2="46" y2="86" class="sk-skin sk-accent"/></g>
    <g class="cs-ra"><line x1="80" y1="86" x2="114" y2="86" class="sk-skin sk-accent"/></g>
    <line x1="80" y1="110" x2="66" y2="138" class="sk-skin"/>
    <line x1="80" y1="110" x2="94" y2="138" class="sk-skin"/>
  </svg>`,
  'shoulder-stretch': () => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes ss-a{0%,100%{transform:rotate(0deg)}50%{transform:rotate(25deg)}}.ss-a{animation:ss-a 2s ease-in-out infinite;transform-origin:80px 86px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <circle cx="80" cy="60" r="11" class="sk-skin"/>
    <line x1="80" y1="71" x2="80" y2="110" class="sk-skin"/>
    <g class="ss-a"><line x1="80" y1="86" x2="108" y2="86" class="sk-skin sk-accent"/><line x1="80" y1="86" x2="55" y2="94" class="sk-skin sk-accent"/></g>
    <line x1="80" y1="110" x2="66" y2="138" class="sk-skin"/>
    <line x1="80" y1="110" x2="94" y2="138" class="sk-skin"/>
  </svg>`
};
function getAnim(key) {
  if (ANIMS[key]) return ANIMS[key]();
  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <style>@keyframes gn-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}.gn-b{animation:gn-b 1.4s ease-in-out infinite;transform-origin:80px 100px;}</style>
    <line x1="20" y1="140" x2="140" y2="140" class="sk-skin sk-ground"/>
    <g class="gn-b"><circle cx="80" cy="60" r="11" class="sk-skin"/><line x1="80" y1="71" x2="80" y2="108" class="sk-skin"/><line x1="80" y1="82" x2="55" y2="98" class="sk-skin sk-accent"/><line x1="80" y1="82" x2="105" y2="98" class="sk-skin sk-accent"/><line x1="80" y1="108" x2="65" y2="138" class="sk-skin"/><line x1="80" y1="108" x2="95" y2="138" class="sk-skin"/></g>
  </svg>`;
}

/* ══════════════════════════════════════════
   WEEKLY DATE HELPERS
   The program is 7 days, Mon=0 … Sun=6.
   We figure out "which weekday is today" and
   map it to a dayIndex (0-6). Progress is stored
   per calendar-date so every week is fresh.
══════════════════════════════════════════ */
const DAYS_LONG  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

/* JS Date.getDay(): 0=Sun,1=Mon…6=Sat → remap to Mon=0…Sun=6 */
function todayWeekdayIndex() {
  const d = new Date().getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1;   // Mon=0…Sun=6
}

function dateString(d) {
  return d.toISOString().slice(0, 10);
}

/* Returns Monday of the current week */
function thisWeekMonday() {
  const d   = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = (day === 0) ? -6 : 1 - day; // shift to Monday
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon;
}

/* Returns the calendar date for weekday index (0=Mon) in the current week */
function dateForWeekday(wdIdx) {
  const mon = thisWeekMonday();
  const d   = new Date(mon);
  d.setDate(mon.getDate() + wdIdx);
  return dateString(d);
}

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
const DEFAULT_SETTINGS = {
  darkMode: true, sound: true, vibration: true,
  backpackWeight: 8, restAdjust: 0
};

let workoutData = null;
let settings    = {};
/* progress: keyed by date string "YYYY-MM-DD" → { completed, duration, calories, dayIndex } */
let progress    = {};
let history     = [];
let calOffset   = 0;

let session = {
  dayIndex: 0, phaseIndex: 0, exerciseIndex: 0, setIndex: 0,
  state: 'idle',
  startTime: null, totalSeconds: 0, exercisesDone: 0,
  timerInterval: null, restInterval: null, clockInterval: null, prepInterval: null,
  timerTotal: 0, timerRemaining: 0,
  restTotal: 0, restRemaining: 0,
  pausedTimer: false, pausedRest: false,
  restPendingAction: 'next_set',
  _restOnFinish: null
};

/* ══════════════════════════════════════════
   LOCAL STORAGE
══════════════════════════════════════════ */
const LS = {
  get:  k      => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set:  (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  load() {
    settings = { ...DEFAULT_SETTINGS, ...(LS.get('wc_settings') || {}) };
    progress = LS.get('wc_progress') || {};
    history  = LS.get('wc_history')  || [];
  },
  save()        { LS.set('wc_settings', settings); LS.set('wc_progress', progress); LS.set('wc_history', history); },
  saveSession() {
    LS.set('wc_session', {
      dayIndex: session.dayIndex, phaseIndex: session.phaseIndex,
      exerciseIndex: session.exerciseIndex, setIndex: session.setIndex,
      totalSeconds: session.totalSeconds, exercisesDone: session.exercisesDone,
      startTime: session.startTime, restPendingAction: session.restPendingAction,
      sessionDate: dateString(new Date())
    });
  },
  clearSession() { localStorage.removeItem('wc_session'); }
};

/* ══════════════════════════════════════════
   AUDIO
══════════════════════════════════════════ */
const SoundFX = {
  ctx: null,
  getCtx() { if (!this.ctx) { try { this.ctx = new (window.AudioContext||window.webkitAudioContext)(); } catch {} } return this.ctx; },
  beep(freq=880,dur=0.12,type='sine') {
    if (!settings.sound) return;
    const ctx=this.getCtx(); if(!ctx) return;
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value=freq; o.type=type;
    g.gain.setValueAtTime(0.3,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    o.start(ctx.currentTime); o.stop(ctx.currentTime+dur);
  },
  restFinish() { [660,880,1100].forEach((f,i)=>setTimeout(()=>this.beep(f,0.18),i*130)); },
  tick()  { this.beep(440,0.06,'square'); },
  done()  { this.beep(1320,0.3); setTimeout(()=>this.beep(1100,0.2),160); },
  prep(n) { this.beep(n>1?660:1100,0.15); }
};
function vibrate(p) { if(settings.vibration&&navigator.vibrate) navigator.vibrate(p); }

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function getDay(i)     { return workoutData.days[i]; }
function getPhase(d,p) { const day=getDay(d); if(p===0) return day.warmup||[]; if(p===1) return day.exercises; if(p===2) return day.cooldown||[]; return []; }
function getCurrentExercise() { return getPhase(session.dayIndex,session.phaseIndex)[session.exerciseIndex]||null; }
function countTotalExercises(di) { const d=getDay(di); return (d.warmup?.length||0)+d.exercises.length+(d.cooldown?.length||0); }
function getRestDuration(ex)  { return Math.max(0,(ex.rest??60)+(settings.restAdjust||0)); }
function formatTime(s) { const t=Math.max(0,Math.floor(s)),m=Math.floor(t/60),r=t%60; return `${m.toString().padStart(2,'0')}:${r.toString().padStart(2,'0')}`; }
function estimateCalories(s,type) { const m={push:7,legs:8,pull:7,cardio:10,full:8,recovery:3,rest:1}; return Math.round(((m[type]||6)*70*s)/3600); }
function peekNextExercise() {
  const ph=getPhase(session.dayIndex,session.phaseIndex),ni=session.exerciseIndex+1;
  if(ni<ph.length) return ph[ni];
  return getPhase(session.dayIndex,session.phaseIndex+1)[0]||null;
}

/* ══════════════════════════════════════════
   SCREEN ROUTER
══════════════════════════════════════════ */
const Screens = {
  go(id) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(`screen-${id}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.screen===id));
  }
};

/* ══════════════════════════════════════════
   HOME  (weekly view)
══════════════════════════════════════════ */
function renderHome() {
  if(!workoutData) return;

  const todayIdx    = todayWeekdayIndex();   // 0=Mon…6=Sun
  const today       = dateString(new Date());

  /* This week's completion: how many days this week are done */
  const thisWeekDone = DAYS_LONG.map((_,i)=>{
    const d = dateForWeekday(i);
    return progress[d]?.completed ? 1 : 0;
  }).reduce((a,b)=>a+b, 0);

  const totalDays = 7;
  const pct = Math.round((thisWeekDone / totalDays) * 100);

  /* Progress ring – shows this week's completion */
  const circ=2*Math.PI*54, fill=document.getElementById('progress-ring-fill');
  if(fill){ fill.setAttribute('stroke-dasharray',circ); fill.setAttribute('stroke-dashoffset',circ-(circ*pct/100)); }
  document.getElementById('progress-pct').textContent = pct+'%';
  document.getElementById('progress-sub').textContent = `${thisWeekDone} of 7 days this week`;

  /* Weekday chips */
  const grid=document.getElementById('day-grid'); if(!grid) return;
  grid.innerHTML='';
  DAYS_SHORT.forEach((label,i)=>{
    const d     = dateForWeekday(i);
    const chip  = document.createElement('button');
    chip.className   = 'day-chip';

    /* Two-line chip: day name + workout title */
    const dayData = workoutData.days[i];
    chip.innerHTML = `<span class="chip-day">${label}</span><span class="chip-icon">${dayData.icon}</span>`;

    if(progress[d]?.completed)           chip.classList.add('completed');
    if(i === todayIdx && !progress[d]?.completed) chip.classList.add('current');
    if(i === todayIdx)                   chip.classList.add('today');

    chip.addEventListener('click', ()=>startDay(i));
    grid.appendChild(chip);
  });

  /* Stats */
  const streak    = calcStreak();
  const totalSec  = history.reduce((a,h)=>a+(h.duration||0),0);
  const totalKcal = history.reduce((a,h)=>a+(h.calories ||0),0);
  document.getElementById('stat-streak').textContent = streak+'🔥';
  document.getElementById('stat-time').textContent   = formatTime(totalSec);
  document.getElementById('stat-kcal').textContent   = totalKcal;

  /* Today label in greeting */
  const greetEl = document.querySelector('.greeting');
  if(greetEl) {
    const dayData = workoutData.days[todayIdx];
    greetEl.textContent = `${DAYS_LONG[todayIdx]} · ${dayData.title}`;
  }
}

function calcStreak() {
  if(!history.length) return 0;
  const dates=[...new Set(history.map(h=>h.date))].sort().reverse();
  const today=dateString(new Date());
  let streak=0, expected=today;
  for(const d of dates){
    if(d===expected){ streak++; const dt=new Date(expected); dt.setDate(dt.getDate()-1); expected=dateString(dt); }
    else break;
  }
  return streak;
}

/* ══════════════════════════════════════════
   START DAY
══════════════════════════════════════════ */
function startDay(dayIndex) {
  clearInterval(session.clockInterval); clearInterval(session.timerInterval);
  clearInterval(session.restInterval);  clearInterval(session.prepInterval);

  const saved = LS.get('wc_session');
  /* Only resume if same day AND same calendar date (not a different week) */
  const todayStr = dateString(new Date());
  if(saved && saved.dayIndex===dayIndex && saved.sessionDate===todayStr) {
    Object.assign(session,{ ...saved, state:'idle', timerInterval:null, restInterval:null, clockInterval:null, prepInterval:null, pausedTimer:false, pausedRest:false });
  } else {
    Object.assign(session,{ dayIndex, phaseIndex:0, exerciseIndex:0, setIndex:0, totalSeconds:0, exercisesDone:0,
      startTime:Date.now(), restPendingAction:'next_set', state:'idle',
      timerInterval:null, restInterval:null, clockInterval:null, prepInterval:null, pausedTimer:false, pausedRest:false });
    LS.saveSession();
  }
  hideRestTimer(false);
  renderWorkout();
  Screens.go('workout');
}

/* ══════════════════════════════════════════
   WORKOUT PLAYER
══════════════════════════════════════════ */
function renderWorkout() {
  const day=getDay(session.dayIndex), ex=getCurrentExercise();
  if(!ex){ finishWorkout(); return; }

  const wdLabel = DAYS_LONG[session.dayIndex];
  document.getElementById('workout-day-title').textContent=`${wdLabel} · ${day.title}`;
  document.getElementById('workout-day-icon').textContent=day.icon;

  const pb=document.getElementById('phase-badge');
  pb.textContent=['Warm Up','Workout','Cool Down'][session.phaseIndex];
  pb.className='phase-badge '+['phase-warmup','phase-workout','phase-cooldown'][session.phaseIndex];

  const totalEx=countTotalExercises(session.dayIndex);
  let doneCnt=0; for(let p=0;p<session.phaseIndex;p++) doneCnt+=getPhase(session.dayIndex,p).length;
  doneCnt+=session.exerciseIndex;
  document.getElementById('workout-progress-fill').style.width=`${Math.round((doneCnt/totalEx)*100)}%`;

  const animWrap=document.getElementById('ex-anim');
  if(animWrap) animWrap.innerHTML=getAnim(ex.anim||'');

  document.getElementById('ex-name').textContent=ex.name;
  const noteEl=document.getElementById('ex-note');
  noteEl.textContent=ex.note||''; noteEl.style.display=ex.note?'block':'none';

  /* For "Max reps" exercises show MAX instead of number */
  const isMax = ex.reps === 0;
  document.getElementById('set-indicator').textContent=ex.sets>1?`Set ${session.setIndex+1} of ${ex.sets}`:'';
  renderSetDots(ex);

  const repsDisplay=document.getElementById('reps-display'), timerDisplay=document.getElementById('timer-display');
  const actionZone=document.getElementById('action-zone');

  if(ex.type==='reps'){
    repsDisplay.classList.remove('hidden'); timerDisplay.classList.add('hidden');
    document.getElementById('big-number').textContent = isMax ? 'MAX' : ex.reps;
    document.getElementById('big-label').textContent  = isMax ? 'REPS' : 'REPS';
    actionZone.innerHTML=`
      <button class="btn-start" id="btn-main">▶ Start</button>
      <div class="nav-btns-row">
        <button class="btn-secondary" id="btn-prev-ex">← Prev</button>
        <button class="btn-secondary" id="btn-skip-set">Skip Set →</button>
      </div>`;
    document.getElementById('btn-main').addEventListener('click', handleRepsAction);
  } else {
    repsDisplay.classList.add('hidden'); timerDisplay.classList.remove('hidden');
    if(session.state!=='active') renderCircularTimer(ex.duration, ex.duration);
    actionZone.innerHTML=`
      <button class="btn-start" id="btn-main">▶ Start Timer</button>
      <div class="nav-btns-row">
        <button class="btn-secondary" id="btn-pause-ex">⏸ Pause</button>
        <button class="btn-secondary" id="btn-skip-set">Skip Set →</button>
      </div>`;
    document.getElementById('btn-main').addEventListener('click', handleTimerAction);
    document.getElementById('btn-pause-ex').addEventListener('click', handlePauseTimer);
  }
  document.getElementById('btn-skip-set')?.addEventListener('click', skipCurrentSet);
  document.getElementById('btn-prev-ex')?.addEventListener('click',  prevExercise);

  if(!session.clockInterval){
    session.clockInterval=setInterval(()=>{ session.totalSeconds++; LS.saveSession(); },1000);
  }
}

function renderSetDots(ex) {
  const c=document.getElementById('set-dots'); if(!c) return; c.innerHTML='';
  if(ex.sets<=1) return;
  for(let i=0;i<ex.sets;i++){
    const d=document.createElement('div'); d.className='set-dot';
    if(i<session.setIndex) d.classList.add('done');
    else if(i===session.setIndex) d.classList.add('active');
    d.textContent=i+1; c.appendChild(d);
  }
}

function renderCircularTimer(remaining, total) {
  const circ=2*Math.PI*88, fill=document.getElementById('ctimer-fill');
  if(fill){ fill.setAttribute('stroke-dasharray',circ); fill.setAttribute('stroke-dashoffset',circ-(circ*(Math.max(0,remaining)/(total||1)))); }
  const el=document.getElementById('ctimer-seconds'); if(el) el.textContent=formatTime(remaining);
}

/* ── REPS FLOW ── */
function handleRepsAction() {
  const ex=getCurrentExercise();
  SoundFX.getCtx();
  if(session.state!=='active'){
    session.state='active';
    const btn=document.getElementById('btn-main');
    btn.textContent='✓ Done'; btn.classList.add('green');
    vibrate(50);
  } else {
    session.state='idle';
    SoundFX.done(); vibrate([50,30,50]);
    session.exercisesDone++;
    completeSet(ex);
  }
}

/* ── TIMER FLOW with 5s PREP ── */
function handleTimerAction() {
  if(session.state==='active'||session.state==='prep') return;
  SoundFX.getCtx();
  startPrepCountdown(getCurrentExercise());
}

function startPrepCountdown(ex) {
  session.state='prep';
  const btn=document.getElementById('btn-main');
  if(btn){ btn.textContent='Get ready…'; btn.disabled=true; }
  let count=5;
  const animWrap=document.getElementById('ex-anim');
  const showPrep=n=>{
    let ol=document.getElementById('prep-overlay');
    if(!ol){ ol=document.createElement('div'); ol.id='prep-overlay'; ol.className='prep-overlay'; animWrap.style.position='relative'; animWrap.appendChild(ol); }
    ol.style.animation='none'; ol.offsetHeight; ol.style.animation=''; ol.textContent=n;
  };
  showPrep(count); SoundFX.prep(count);
  clearInterval(session.prepInterval);
  session.prepInterval=setInterval(()=>{
    count--;
    if(count>0){ showPrep(count); SoundFX.prep(count); }
    else {
      clearInterval(session.prepInterval); session.prepInterval=null;
      const ol=document.getElementById('prep-overlay'); if(ol) ol.remove();
      session.state='active';
      session.timerTotal=ex.duration; session.timerRemaining=ex.duration; session.pausedTimer=false;
      if(btn){ btn.textContent='⏹ Running…'; btn.disabled=true; }
      runExerciseTimer(ex);
    }
  },1000);
}

function runExerciseTimer(ex) {
  clearInterval(session.timerInterval);
  session.timerInterval=setInterval(()=>{
    if(session.pausedTimer) return;
    session.timerRemaining--;
    renderCircularTimer(session.timerRemaining,session.timerTotal);
    if(session.timerRemaining<=3&&session.timerRemaining>0) SoundFX.tick();
    if(session.timerRemaining<=0){
      clearInterval(session.timerInterval); session.timerInterval=null;
      session.state='idle'; SoundFX.done(); vibrate([50,30,50]);
      session.exercisesDone++; completeSet(ex);
    }
  },1000);
}

function handlePauseTimer() {
  if(session.state==='prep') return;
  session.pausedTimer=!session.pausedTimer;
  const btn=document.getElementById('btn-pause-ex');
  if(btn) btn.textContent=session.pausedTimer?'▶ Resume':'⏸ Pause';
}

/* ══════════════════════════════════════════
   SET / EXERCISE ADVANCEMENT
══════════════════════════════════════════ */
function completeSet(ex) {
  clearInterval(session.timerInterval); session.timerInterval=null;
  const setsLeft=ex.sets-(session.setIndex+1);
  if(setsLeft>0){
    session.restPendingAction='next_set'; LS.saveSession();
    const rd=getRestDuration(ex);
    if(rd>0) showRestTimer(rd,ex,()=>{ session.setIndex++; session.state='idle'; LS.saveSession(); renderWorkout(); });
    else { session.setIndex++; session.state='idle'; LS.saveSession(); renderWorkout(); }
  } else {
    session.restPendingAction='next_exercise'; LS.saveSession();
    const nextEx=peekNextExercise(), rd=getRestDuration(ex);
    if(nextEx&&rd>0) showRestTimer(rd,nextEx,()=>{ session.setIndex=0; session.state='idle'; moveToNextExercise(); renderWorkout(); });
    else { session.setIndex=0; session.state='idle'; moveToNextExercise(); renderWorkout(); }
  }
}

function skipCurrentSet() {
  clearInterval(session.timerInterval); session.timerInterval=null;
  clearInterval(session.prepInterval);  session.prepInterval=null;
  const ol=document.getElementById('prep-overlay'); if(ol) ol.remove();
  session.state='idle'; session.pausedTimer=false;
  const ex=getCurrentExercise(); if(!ex) return;
  const setsLeft=ex.sets-(session.setIndex+1);
  if(setsLeft>0){ session.setIndex++; LS.saveSession(); renderWorkout(); }
  else { session.setIndex=0; moveToNextExercise(); LS.saveSession(); renderWorkout(); }
}

function moveToNextExercise() {
  const phase=getPhase(session.dayIndex,session.phaseIndex);
  session.exerciseIndex++;
  if(session.exerciseIndex>=phase.length){
    session.exerciseIndex=0; session.phaseIndex++;
    while(session.phaseIndex<=2 && getPhase(session.dayIndex,session.phaseIndex).length===0) session.phaseIndex++;
    if(session.phaseIndex>2){ finishWorkout(); return; }
  }
  session.state='idle'; LS.saveSession();
}

function prevExercise() {
  clearInterval(session.timerInterval); session.timerInterval=null;
  clearInterval(session.restInterval);  session.restInterval=null;
  clearInterval(session.prepInterval);  session.prepInterval=null;
  const ol=document.getElementById('prep-overlay'); if(ol) ol.remove();
  hideRestTimer(false);
  session.setIndex=0; session.state='idle'; session.pausedTimer=false;
  if(session.exerciseIndex>0) session.exerciseIndex--;
  else if(session.phaseIndex>0){ session.phaseIndex--; const prev=getPhase(session.dayIndex,session.phaseIndex); session.exerciseIndex=Math.max(0,prev.length-1); }
  LS.saveSession(); renderWorkout();
}

/* ══════════════════════════════════════════
   REST TIMER
══════════════════════════════════════════ */
function showRestTimer(duration,nextEx,onFinish) {
  session.state='rest'; session.restTotal=duration; session.restRemaining=duration;
  session.pausedRest=false; session._restOnFinish=onFinish;
  document.getElementById('rest-overlay').classList.add('visible');
  const nameEl=document.getElementById('rest-next-name'); if(nameEl) nameEl.textContent=nextEx?.name||'Continue';
  const pb=document.getElementById('btn-rest-pause'); if(pb) pb.textContent='⏸ Pause';
  renderRestCircle(duration,duration);
  clearInterval(session.restInterval);
  session.restInterval=setInterval(()=>{
    if(session.pausedRest) return;
    session.restRemaining--;
    renderRestCircle(session.restRemaining,session.restTotal);
    if(session.restRemaining<=3&&session.restRemaining>0) SoundFX.tick();
    if(session.restRemaining<=0){
      clearInterval(session.restInterval); session.restInterval=null;
      SoundFX.restFinish(); vibrate([100,50,100,50,200]);
      hideRestTimer(true);
    }
  },1000);
}

function renderRestCircle(remaining,total) {
  const circ=2*Math.PI*88, fill=document.getElementById('rest-ring-fill');
  if(fill){ fill.setAttribute('stroke-dasharray',circ); fill.setAttribute('stroke-dashoffset',circ-(circ*(Math.max(0,remaining)/(total||1)))); }
  const el=document.getElementById('rest-seconds'); if(el) el.textContent=formatTime(remaining);
}

function hideRestTimer(fireCallback) {
  clearInterval(session.restInterval); session.restInterval=null;
  document.getElementById('rest-overlay').classList.remove('visible');
  const cb=session._restOnFinish; session._restOnFinish=null; session.state='idle';
  if(fireCallback&&cb) cb();
}

/* ══════════════════════════════════════════
   FINISH WORKOUT
══════════════════════════════════════════ */
function finishWorkout() {
  clearInterval(session.clockInterval); clearInterval(session.timerInterval);
  clearInterval(session.restInterval);  clearInterval(session.prepInterval);
  session.clockInterval=session.timerInterval=session.restInterval=session.prepInterval=null;

  const day=getDay(session.dayIndex), dur=session.totalSeconds, cal=estimateCalories(dur,day.type);
  const today=dateString(new Date());

  /* Mark this weekday as done for today's date */
  progress[today]={ completed:true, dayIndex:session.dayIndex, date:today, duration:dur, calories:cal };
  history.push({ dayIndex:session.dayIndex, title:day.title, icon:day.icon, type:day.type,
    weekday: DAYS_LONG[session.dayIndex], duration:dur, calories:cal,
    exercises:session.exercisesDone, date:today, ts:Date.now() });
  LS.save(); LS.clearSession();

  document.getElementById('complete-time').textContent     =formatTime(dur);
  document.getElementById('complete-exercises').textContent=session.exercisesDone;
  document.getElementById('complete-kcal').textContent     =cal;
  document.getElementById('complete-day').textContent      =`${DAYS_LONG[session.dayIndex]} – ${day.title}`;
  Screens.go('complete');
  launchConfetti();
}

/* ══════════════════════════════════════════
   CONFETTI
══════════════════════════════════════════ */
function launchConfetti() {
  const canvas=document.getElementById('confetti-canvas'), ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const colors=['#6c63ff','#ff6584','#43e97b','#ffd60a','#a78bfa','#38f9d7'];
  const p=Array.from({length:120},()=>({x:Math.random()*canvas.width,y:-20,vx:(Math.random()-.5)*4,vy:Math.random()*3+2,size:Math.random()*8+4,color:colors[Math.floor(Math.random()*colors.length)],rot:Math.random()*Math.PI*2,rotV:(Math.random()-.5)*.2}));
  let frames=0;
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    p.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.06;p.rot+=p.rotV;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.5);ctx.restore();});
    if(++frames<180) requestAnimationFrame(draw); else ctx.clearRect(0,0,canvas.width,canvas.height);
  })();
}

/* ══════════════════════════════════════════
   HISTORY
══════════════════════════════════════════ */
function renderHistory() {
  const list=document.getElementById('history-list'); list.innerHTML='';
  if(!history.length){ list.innerHTML=`<div class="empty-state"><div class="big">🏆</div><p>Complete your first workout to see it here!</p></div>`; renderCalendar(); return; }
  [...history].reverse().forEach(h=>{
    const item=document.createElement('div'); item.className='history-item glass fade-in';
    item.innerHTML=`<div class="history-icon">${h.icon}</div><div class="history-text"><h3>${h.weekday} – ${h.title}</h3><p>${h.date} · ${h.exercises} exercises</p></div><div class="history-meta"><div class="dur">${formatTime(h.duration)}</div><div class="kcal">${h.calories} kcal</div></div>`;
    list.appendChild(item);
  });
  renderCalendar();
}

function renderCalendar() {
  const now=new Date(), d=new Date(now.getFullYear(),now.getMonth()+calOffset,1);
  const year=d.getFullYear(), month=d.getMonth();
  document.getElementById('cal-label').textContent=d.toLocaleString('default',{month:'long',year:'numeric'});
  const worked=new Set(history.map(h=>h.date)), today=dateString(now);
  const dim=new Date(year,month+1,0).getDate(), first=new Date(year,month,1).getDay();
  const grid=document.getElementById('cal-grid'); grid.innerHTML='';
  for(let i=0;i<first;i++){const b=document.createElement('div');b.className='cal-day empty';grid.appendChild(b);}
  for(let day=1;day<=dim;day++){
    const ds=`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const el=document.createElement('div'); el.className='cal-day'; el.textContent=day;
    if(ds===today) el.classList.add('today'); else if(worked.has(ds)) el.classList.add('worked');
    grid.appendChild(el);
  }
}

/* ══════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════ */
function renderSettings() {
  document.getElementById('tog-sound').checked=settings.sound;
  document.getElementById('tog-vibration').checked=settings.vibration;
  document.getElementById('tog-dark').checked=settings.darkMode;
  document.getElementById('weight-val').textContent=settings.backpackWeight+' kg';
  document.getElementById('rest-val').textContent=settings.restAdjust>=0?`+${settings.restAdjust}s`:`${settings.restAdjust}s`;
}
function bindSettings() {
  document.getElementById('tog-sound').addEventListener('change',e=>{settings.sound=e.target.checked;LS.save();});
  document.getElementById('tog-vibration').addEventListener('change',e=>{settings.vibration=e.target.checked;LS.save();});
  document.getElementById('tog-dark').addEventListener('change',e=>{settings.darkMode=e.target.checked;LS.save();});
  document.getElementById('weight-minus').addEventListener('click',()=>{settings.backpackWeight=Math.max(0,settings.backpackWeight-1);document.getElementById('weight-val').textContent=settings.backpackWeight+' kg';LS.save();});
  document.getElementById('weight-plus').addEventListener('click',()=>{settings.backpackWeight=Math.min(40,settings.backpackWeight+1);document.getElementById('weight-val').textContent=settings.backpackWeight+' kg';LS.save();});
  document.getElementById('rest-minus').addEventListener('click',()=>{settings.restAdjust=Math.max(-30,(settings.restAdjust||0)-10);document.getElementById('rest-val').textContent=settings.restAdjust>=0?`+${settings.restAdjust}s`:`${settings.restAdjust}s`;LS.save();});
  document.getElementById('rest-plus').addEventListener('click',()=>{settings.restAdjust=Math.min(120,(settings.restAdjust||0)+10);document.getElementById('rest-val').textContent=settings.restAdjust>=0?`+${settings.restAdjust}s`:`${settings.restAdjust}s`;LS.save();});
  document.getElementById('btn-reset-progress').addEventListener('click',()=>{if(confirm('Reset all progress?')){progress={};history=[];LS.save();LS.clearSession();renderHome();alert('Progress reset.');}});
}

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function bindNav() {
  document.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const sc=btn.dataset.screen; Screens.go(sc);
      if(sc==='home')     renderHome();
      if(sc==='history')  renderHistory();
      if(sc==='settings') renderSettings();
    });
  });

  /* Continue = today's workout */
  document.getElementById('btn-continue')?.addEventListener('click',()=>{
    startDay(todayWeekdayIndex());
  });
  /* "New Week" just resets this week's progress (keeps history) */
  document.getElementById('btn-new-cycle')?.addEventListener('click',()=>{
    if(confirm('Clear this week\'s progress? History is kept.')) {
      /* Remove only this week's date entries from progress */
      DAYS_LONG.forEach((_,i)=>{ const d=dateForWeekday(i); delete progress[d]; });
      LS.save(); LS.clearSession(); renderHome();
    }
  });

  document.getElementById('cal-prev')?.addEventListener('click',()=>{calOffset--;renderCalendar();});
  document.getElementById('cal-next')?.addEventListener('click',()=>{calOffset++;renderCalendar();});

  document.getElementById('btn-workout-back')?.addEventListener('click',()=>{
    if(confirm('Exit workout? Progress is saved.')){
      clearInterval(session.clockInterval); clearInterval(session.timerInterval); clearInterval(session.prepInterval);
      session.clockInterval=session.timerInterval=session.prepInterval=null;
      hideRestTimer(false); Screens.go('home'); renderHome();
    }
  });
  document.getElementById('btn-rest-pause')?.addEventListener('click',()=>{
    session.pausedRest=!session.pausedRest;
    const btn=document.getElementById('btn-rest-pause'); if(btn) btn.textContent=session.pausedRest?'▶ Resume':'⏸ Pause';
  });
  document.getElementById('btn-rest-skip')?.addEventListener('click',()=>hideRestTimer(true));
  document.getElementById('btn-go-home')?.addEventListener('click',()=>{Screens.go('home');renderHome();});
}

/* ══════════════════════════════════════════
   PWA
══════════════════════════════════════════ */
let deferredInstall=null;
function initPWA() {
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault(); deferredInstall=e;
    const banner=document.getElementById('install-banner');
    if(banner&&!localStorage.getItem('pwa-dismissed')) setTimeout(()=>banner.classList.add('visible'),2000);
  });
  document.getElementById('btn-install')?.addEventListener('click',()=>{
    if(deferredInstall){deferredInstall.prompt();deferredInstall.userChoice.then(()=>{deferredInstall=null;});}
    document.getElementById('install-banner').classList.remove('visible');
  });
  document.getElementById('btn-install-close')?.addEventListener('click',()=>{
    document.getElementById('install-banner').classList.remove('visible');
    localStorage.setItem('pwa-dismissed','1');
  });
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/Weekly/service-worker.js',{scope:'/Weekly/'}).catch(()=>{});
  }
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
async function init() {
  LS.load();
  try { const res=await fetch('./workout.json'); workoutData=await res.json(); }
  catch { document.body.innerHTML='<p style="color:white;padding:40px;font-family:sans-serif">⚠️ Could not load workout.json. Serve via a local server or GitHub Pages.</p>'; return; }
  bindNav(); bindSettings(); initPWA(); renderHome(); Screens.go('home');

  /* Resume banner */
  const saved=LS.get('wc_session');
  const todayStr=dateString(new Date());
  if(saved && saved.sessionDate===todayStr){
    const day=workoutData.days[saved.dayIndex];
    const banner=document.createElement('div');
    banner.style.cssText='position:fixed;bottom:80px;left:20px;right:20px;z-index:99;padding:14px 18px;background:rgba(108,99,255,0.95);border-radius:16px;display:flex;align-items:center;gap:12px;color:#fff;font-weight:600;font-size:14px;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(108,99,255,0.4)';
    banner.innerHTML=`<span style="flex:1">▶ ${DAYS_LONG[saved.dayIndex]} · ${day.title} in progress</span>
      <button onclick="this.parentElement.remove();startDay(${saved.dayIndex})" style="border:none;background:rgba(255,255,255,0.2);color:#fff;padding:8px 14px;border-radius:10px;font-weight:700;cursor:pointer">Resume</button>
      <button onclick="this.parentElement.remove()" style="border:none;background:none;color:rgba(255,255,255,0.6);font-size:20px;cursor:pointer;padding:0 4px">×</button>`;
    document.body.appendChild(banner);
    setTimeout(()=>banner.remove(),8000);
  }
}

window.startDay=startDay;
document.addEventListener('DOMContentLoaded',init);
