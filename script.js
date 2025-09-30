document.addEventListener('DOMContentLoaded', () => {
  const gdrive = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

  // Photocards
  const CARDS = [
    // MEPHI
    { id:'mephi-common',    name:'Mephi',  group:'KATZ', rarity:'common',    image:gdrive('1RG2g7mxXkmoBleahb9llCoa0ZXcuhXWU') },
    { id:'mephi-uncommon',  name:'Mephi',  group:'KATZ', rarity:'uncommon',  image:gdrive('14DeuuYpyGDxnkGfQoxy9ir_3-bWx5BF5') },
    { id:'mephi-rare',      name:'Mephi',  group:'KATZ', rarity:'rare',      image:gdrive('10fUV4ec7W3AWTRpPfePHPqzxMiveZawD') },
    { id:'mephi-legendary', name:'Mephi',  group:'KATZ', rarity:'legendary', image:gdrive('1PxZvTQKOHJIJsBCoyMEqFIAqAMd8a6-R') },

    // HONEY
    { id:'honey-common',    name:'Honey',  group:'KATZ', rarity:'common',    image:gdrive('17kWAO8Src0dsK7A-omcsYklpiZgKw3J7') },
    { id:'honey-uncommon',  name:'Honey',  group:'KATZ', rarity:'uncommon',  image:gdrive('1F80CeiYK86P_4S-Www80P6x8apFNIU3M') },
    { id:'honey-rare',      name:'Honey',  group:'KATZ', rarity:'rare',      image:gdrive('1zgDw2ye2QBDI-dWJFLktaDFcv8psp7BR') },
    { id:'honey-legendary', name:'Honey',  group:'KATZ', rarity:'legendary', image:gdrive('1wi2J1kYG2FR0GMErWPUvQ_SUNMnvFr5V') },

    // ANDREA
    { id:'andrea-common',    name:'Andrea', group:'KATZ', rarity:'common',    image:gdrive('1eNZ7WrrcXCNq6XHdtsSKbkKNHR49XAj7') },
    { id:'andrea-uncommon',  name:'Andrea', group:'KATZ', rarity:'uncommon',  image:gdrive('1hpGZ4EV1DB78ueE5bg-ldynnB8guf9t4') },
    { id:'andrea-rare',      name:'Andrea', group:'KATZ', rarity:'rare',      image:gdrive('1YiP1m9cKU3mQ1XE31xi0LwXk0gEhugZn') },
    { id:'andrea-legendary', name:'Andrea', group:'KATZ', rarity:'legendary', image:gdrive('1AXvb_CgHgkx9YhdKbdfe6DFx1dj3IJZC') },

    // VAL
    { id:'val-common',    name:'Val', group:'KATZ', rarity:'common',    image:gdrive('1r9raMyrNc6QcPhCqZZ0vkRkD6z9wB82x') },
    { id:'val-uncommon',  name:'Val', group:'KATZ', rarity:'uncommon',  image:gdrive('1DiEteNMM1qGz_2xdbUgz8Dvo6EhXG_Jn') },
    { id:'val-rare',      name:'Val', group:'KATZ', rarity:'rare',      image:gdrive('10thTBHf2Rmth9dnft4bY_jontXA6ybbd') },
    { id:'val-legendary', name:'Val', group:'KATZ', rarity:'legendary', image:gdrive('1qEj6U9LXMAQw6-o5_vHLRJA7-At8l2E1') },

    // YORI
    { id:'yori-common',    name:'Yori', group:'KATZ', rarity:'common',    image:gdrive('1GVAmdDGMjfDQ_XvpHlaOt0rRM3g5AmNM') },
    { id:'yori-uncommon',  name:'Yori', group:'KATZ', rarity:'uncommon',  image:gdrive('1zTK0ueak7Q4iEY5xj_3_y3Sg3w_cSzTo') },
    { id:'yori-rare',      name:'Yori', group:'KATZ', rarity:'rare',      image:gdrive('1rpRR2NDZTCRCbAGq1NfFY-AWj0J8_jIm') },
    { id:'yori-legendary', name:'Yori', group:'KATZ', rarity:'legendary', image:gdrive('1-OiAhrGMLRQKaRTcIpSUsnKISCc0lovL') },

    // RUBI
    { id:'rubi-common',    name:'Rubi', group:'KATZ', rarity:'common',    image:gdrive('1Km2ysr5Ryn7nsi-bB_MiXDHpws2x4QNg') },
    { id:'rubi-uncommon',  name:'Rubi', group:'KATZ', rarity:'uncommon',  image:gdrive('1JptjU_LruuHhDORFndrkI8X8hZA9kZKf') },
    { id:'rubi-rare',      name:'Rubi', group:'KATZ', rarity:'rare',      image:gdrive('1x5dqjwsX_YVnaFFnVmbgdYxB-M1vu5O3') },
    { id:'rubi-legendary', name:'Rubi', group:'KATZ', rarity:'legendary', image:gdrive('1lV8rfingKhCl3OP6-kyftyUF6R1czRAn') },
  ];

  // Odds: sum=100 (Legendary 25%)
  const RARITY_WEIGHTS = { common:40, uncommon:25, rare:10, legendary:25 };

  // DOM
  const lever = document.getElementById('lever');
  const pullBtn = document.getElementById('pullBtn');
  const againBtn = document.getElementById('againBtn');
  const saveBtn = document.getElementById('saveBtn');

  const card = document.getElementById('card');
  const pcImg = document.getElementById('pcImg');
  const pcName = document.getElementById('pcName');
  const pcGroup = document.getElementById('pcGroup');
  const pcRarity = document.getElementById('pcRarity');

  const sparkles = document.getElementById('sparkles');
  const recentList = document.getElementById('recentList');

  // Mini-game
  const mini = document.getElementById('minigame');
  const lyricPrompt = document.getElementById('lyricPrompt');
  const choiceWrap = document.getElementById('choiceWrap');
  const closeMini = document.getElementById('closeMini');
  const tokenCount = document.getElementById('tokenCount');
  const miniMsg = document.getElementById('miniMsg');

  // Sounds
  const sfxLever = document.getElementById('sfxLever');
  const sfxReveal = document.getElementById('sfxReveal');
  const sfxLegendary = document.getElementById('sfxLegendary');
  const sfxRight = document.getElementById('sfxRight');
  const sfxWrong = document.getElementById('sfxWrong');
  const sfxOut = document.getElementById('sfxOut');

  // State
  let isPulling = false;
  let currentCard = null;

  // Mini-game tokens
  let tokensLeft = 2; tokenCount.textContent = tokensLeft;

  const QUESTIONS = [
    { prompt: `“Everything's ____”`, correct: "gnarly", pool: ["gnarly","vibe","slay","lit"] },
    { prompt: `“Boba tea (____)”`, correct: "gnarly", pool: ["gnarly","sweet","cool","yum"] },
    { prompt: `“Oh, we're in a session tonight (____)”`, correct: "gang", pool: ["gang","gnarly","crew","ride"] },
    { prompt: `“Na-na-na, na-na-____ (gnarly)”`, correct: "gnarly", pool: ["gnarly","la-la","yeah","woah"] },
    { prompt: `“Don't talk to me, you're ____”`, correct: "gnarly", pool: ["gnarly","mean","loud","fake"] },
  ];

  function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }

  function buildChoices(q){
    choiceWrap.innerHTML = "";
    const four = shuffle([q.correct, ...q.pool]).slice(0,4);
    shuffle(four).forEach(text=>{
      const btn = document.createElement('button');
      btn.className = 'choice'; btn.type = 'button'; btn.textContent = text;
      btn.dataset.correct = String(text.toLowerCase() === q.correct.toLowerCase());
      btn.addEventListener('click', onChoose);
      choiceWrap.appendChild(btn);
    });
  }

  function pickQuestion(){ return QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)]; }

  function openMinigame(){
    if (tokensLeft <= 0){
      miniMsg.textContent = "Out of tokens. Refresh the page to try again.";
      Array.from(choiceWrap.children).forEach(c=> c.disabled = true);
    } else {
      miniMsg.textContent = "";
      const q = pickQuestion();
      lyricPrompt.textContent = q.prompt;
      buildChoices(q);
    }
    mini.classList.remove('hidden'); mini.setAttribute('aria-hidden','false');
  }
  function closeMinigame(){ mini.classList.add('hidden'); mini.setAttribute('aria-hidden','true'); }

  function onChoose(e){
    if (tokensLeft <= 0) return;
    const btn = e.currentTarget;
    const isCorrect = btn.dataset.correct === "true";

    tokensLeft -= 1; tokenCount.textContent = tokensLeft;
    Array.from(choiceWrap.children).forEach(c=> c.disabled = true);

    if (isCorrect){
      btn.classList.add('correct');
      miniMsg.textContent = "Correct! Bonus pull unlocked 🌟";
      sfxRight.currentTime = 0; sfxRight.play().catch(()=>{});
      setTimeout(()=>{ closeMinigame(); handlePull(); }, 600);
    } else {
      btn.classList.add('wrong');
      sfxWrong.currentTime = 0; sfxWrong.play().catch(()=>{});
      if (tokensLeft > 0){
        miniMsg.textContent = "Close! One token left — try a new lyric.";
        setTimeout(()=>{
          const q = pickQuestion(); lyricPrompt.textContent = q.prompt; buildChoices(q); miniMsg.textContent = "";
        }, 650);
      } else {
        miniMsg.textContent = "No tokens left — refresh the page to try again.";
        sfxOut.currentTime = 0; sfxOut.play().catch(()=>{});
      }
    }
  }

  // Utils
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  function weightedRandomRarity(){
    const r = Math.random()*100; let acc = 0;
    for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)){ acc += weight; if (r <= acc) return rarity; }
    return 'common';
  }

  function pickCard(){
    const target = weightedRandomRarity();
    const pool = CARDS.filter(c => c.rarity === target);
    const list = pool.length ? pool : CARDS;
    return list[Math.floor(Math.random()*list.length)];
  }

  function applyRarityStyles(rarity){
    card.classList.remove('common','uncommon','rare','legendary');
    card.classList.add(rarity);
    pcRarity.textContent = rarity[0].toUpperCase()+rarity.slice(1);
  }

  function spawnSparklesBurst(count=36){
    const rect = card.getBoundingClientRect();
    const stageRect = document.querySelector('.stage').getBoundingClientRect();
    const cx = rect.left - stageRect.left + rect.width/2;
    const cy = rect.top - stageRect.top + rect.height/2;
    for (let i=0;i<count;i++){
      const s = document.createElement('div');
      s.className = 'sparkle';
      const angle = Math.random()*Math.PI*2;
      const radius = 80 + Math.random()*120;
      s.style.left = `${cx}px`; s.style.top = `${cy}px`;
      s.style.setProperty('--dx', `${Math.cos(angle)*radius}px`);
      s.style.setProperty('--dy', `${Math.sin(angle)*radius}px`);
      sparkles.appendChild(s);
      s.addEventListener('animationend', ()=> s.remove());
    }
  }

  function addRecentThumb(cardData){
    const el = document.createElement('div');
    el.className = 'recent-thumb';
    el.innerHTML = `<img src="${cardData.image}" alt="${cardData.name} - ${cardData.group}"><span class="badge">${cardData.rarity[0].toUpperCase()}</span>`;
    recentList.prepend(el);
    while (recentList.children.length > 12) recentList.lastChild.remove();
  }

  function flipToBack(){ if (!card.classList.contains('is-flipped')) card.classList.add('is-flipped'); }

  function resetCard(){
    card.classList.remove('is-flipped','common','uncommon','rare','legendary');
    pcImg.removeAttribute('src'); pcName.textContent='—'; pcGroup.textContent='KATZ'; pcRarity.textContent='—';
  }

  async function handlePull(){
    if (isPulling) return; isPulling = true;
    try{
      lever.classList.add('is-pulled'); sfxLever.currentTime=0; sfxLever.play().catch(()=>{});
      await wait(500);

      const picked = pickCard(); currentCard = picked;
      pcImg.src = picked.image; pcName.textContent = picked.name; pcGroup.textContent = picked.group; applyRarityStyles(picked.rarity);

      sfxReveal.currentTime=0; sfxReveal.play().catch(()=>{}); flipToBack();

      if (picked.rarity === 'legendary'){
        sfxLegendary.currentTime=0; sfxLegendary.play().catch(()=>{});
        spawnSparklesBurst(76);
        if (tokensLeft > 0) openMinigame();
      } else if (picked.rarity === 'rare'){ spawnSparklesBurst(42); }
      else if (picked.rarity === 'uncommon'){ spawnSparklesBurst(30); }
      else { spawnSparklesBurst(22); }

      addRecentThumb(picked);
    } finally{
      await wait(350); lever.classList.remove('is-pulled'); isPulling = false;
    }
  }

  async function saveCurrentCard(){
    const node = card;
    const flipped = card.classList.contains('is-flipped');
    if (!flipped) card.classList.add('is-flipped');
    const scale = Math.min(2, Math.max(1, 800 / node.clientWidth));
    const canvas = await html2canvas(node, { backgroundColor: null, scale });
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a'); a.href = dataURL; a.download = `${(currentCard?.name || 'photocard').toLowerCase().replace(/\s+/g,'_')}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    if (!flipped) card.classList.remove('is-flipped');
  }

  // Listeners
  closeMini.addEventListener('click', closeMinigame);
  lever.addEventListener('click', handlePull);
  pullBtn.addEventListener('click', handlePull);
  card.addEventListener('click', ()=> card.classList.toggle('is-flipped'));
  againBtn.addEventListener('click', resetCard);
  saveBtn.addEventListener('click', saveCurrentCard);
  window.addEventListener('keydown', (e)=>{ if (e.code === 'Space') { e.preventDefault(); handlePull(); } });
});
