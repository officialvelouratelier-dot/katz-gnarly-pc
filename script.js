console.log('[KATZ] script.js loaded');

window.addEventListener('error', e => {
  console.error('[KATZ] Global error:', e.message, e.filename, e.lineno);
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('[KATZ] DOM ready');

  // ---------- Helpers / Data ----------
  const asset = (file) => `assets/img/${file}`;

  // Photocards (local PNG paths)
  const CARDS = [
    // MEPHI
    { id:'mephi-common',    name:'Mephi',  group:'KATZ', rarity:'common',    image:asset('mephi-common.png') },
    { id:'mephi-uncommon',  name:'Mephi',  group:'KATZ', rarity:'uncommon',  image:asset('mephi-uncommon.png') },
    { id:'mephi-rare',      name:'Mephi',  group:'KATZ', rarity:'rare',      image:asset('mephi-rare.png') },
    { id:'mephi-legendary', name:'Mephi',  group:'KATZ', rarity:'legendary', image:asset('mephi-legendary.png') },

    // HONEY
    { id:'honey-common',    name:'Honey',  group:'KATZ', rarity:'common',    image:asset('honey-common.png') },
    { id:'honey-uncommon',  name:'Honey',  group:'KATZ', rarity:'uncommon',  image:asset('honey-uncommon.png') },
    { id:'honey-rare',      name:'Honey',  group:'KATZ', rarity:'rare',      image:asset('honey-rare.png') },
    { id:'honey-legendary', name:'Honey',  group:'KATZ', rarity:'legendary', image:asset('honey-legendary.png') },

    // ANDREA
    { id:'andrea-common',    name:'Andrea', group:'KATZ', rarity:'common',    image:asset('andrea-common.png') },
    { id:'andrea-uncommon',  name:'Andrea', group:'KATZ', rarity:'uncommon',  image:asset('andrea-uncommon.png') },
    { id:'andrea-rare',      name:'Andrea', group:'KATZ', rarity:'rare',      image:asset('andrea-rare.png') },
    { id:'andrea-legendary', name:'Andrea', group:'KATZ', rarity:'legendary', image:asset('andrea-legendary.png') },

    // VAL
    { id:'val-common',    name:'Val', group:'KATZ', rarity:'common',    image:asset('val-common.png') },
    { id:'val-uncommon',  name:'Val', group:'KATZ', rarity:'uncommon',  image:asset('val-uncommon.png') },
    { id:'val-rare',      name:'Val', group:'KATZ', rarity:'rare',      image:asset('val-rare.png') },
    { id:'val-legendary', name:'Val', group:'KATZ', rarity:'legendary', image:asset('val-legendary.png') },

    // YORI
    { id:'yori-common',    name:'Yori', group:'KATZ', rarity:'common',    image:asset('yori-common.png') },
    { id:'yori-uncommon',  name:'Yori', group:'KATZ', rarity:'uncommon',  image:asset('yori-uncommon.png') },
    { id:'yori-rare',      name:'Yori', group:'KATZ', rarity:'rare',      image:asset('yori-rare.png') },
    { id:'yori-legendary', name:'Yori', group:'KATZ', rarity:'legendary', image:asset('yori-legendary.png') },

    // RUBI
    { id:'rubi-common',    name:'Rubi', group:'KATZ', rarity:'common',    image:asset('rubi-common.png') },
    { id:'rubi-uncommon',  name:'Rubi', group:'KATZ', rarity:'uncommon',  image:asset('rubi-uncommon.png') },
    { id:'rubi-rare',      name:'Rubi', group:'KATZ', rarity:'rare',      image:asset('rubi-rare.png') },
    { id:'rubi-legendary', name:'Rubi', group:'KATZ', rarity:'legendary', image:asset('rubi-legendary.png') },
  ];

  // Rarity odds (sum = 100)
  const RARITY_WEIGHTS = { common:40, uncommon:25, rare:10, legendary:25 };

  // Mini-game questions (multiple-choice)
  const QUESTIONS = [
    { prompt: `“Everything's ____”`, correct: "gnarly", pool: ["gnarly","vibe","slay","lit"] },
    { prompt: `“Boba tea (____)”`, correct: "gnarly", pool: ["gnarly","sweet","cool","yum"] },
    { prompt: `“Oh, we're in a session tonight (____)”`, correct: "gang", pool: ["gang","gnarly","crew","ride"] },
    { prompt: `“Na-na-na, na-na-____ (gnarly)”`, correct: "gnarly", pool: ["gnarly","la-la","yeah","woah"] },
    { prompt: `“Don't talk to me, you're ____”`, correct: "gnarly", pool: ["gnarly","mean","loud","fake"] },
  ];

  // ---------- DOM ----------
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

  // sounds already in your HTML
  const sfxLever = document.getElementById('sfxLever');
  const sfxReveal = document.getElementById('sfxReveal');
  const sfxLegendary = document.getElementById('sfxLegendary');
  const sfxRight = document.getElementById('sfxRight');
  const sfxWrong = document.getElementById('sfxWrong');
  const sfxOut = document.getElementById('sfxOut');

  // Mini-game modal DOM
  const mini = document.getElementById('minigame');
  const lyricPrompt = document.getElementById('lyricPrompt');
  const choiceWrap = document.getElementById('choiceWrap');
  const closeMini = document.getElementById('closeMini');
  const tokenCount = document.getElementById('tokenCount');
  const miniMsg = document.getElementById('miniMsg');

  // ---------- State ----------
  let isPulling = false;
  let currentCard = null;

  // Mini-game tokens
  let tokensLeft = 2;
  if (tokenCount) tokenCount.textContent = tokensLeft;

  // ---------- Utils ----------
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  function weightedRandomRarity(){
    const r = Math.random() * 100;
    let acc = 0;
    for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)){
      acc += weight;
      if (r <= acc) return rarity;
    }
    return 'common';
  }

  function pickCard(){
    const target = weightedRandomRarity();
    const pool = CARDS.filter(c => c.rarity === target);
    const list = pool.length ? pool : CARDS;
    return list[Math.floor(Math.random()*list.length)];
  }

  function applyRarityStyles(rarity){
    card.classList.remove('common','uncommon','rare','legendary','is-flipped');
    card.classList.add(rarity);
    pcRarity.textContent = rarity[0].toUpperCase()+rarity.slice(1);
  }

  function flipToBack(){
    if (!card.classList.contains('is-flipped')) card.classList.add('is-flipped');
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
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;
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

  function resetCard(){
    card.classList.remove('is-flipped','common','uncommon','rare','legendary');
    pcImg.removeAttribute('src');
    pcName.textContent = '—';
    pcGroup.textContent = 'KATZ';
    pcRarity.textContent = '—';
  }

  // ---------- Mini-game ----------
  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }

  function pickQuestion(){ return QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)]; }

  function buildChoices(q){
    choiceWrap.innerHTML = '';
    const choices = shuffle([q.correct, ...q.pool]).slice(0,4);
    shuffle(choices).forEach(text=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice';
      btn.textContent = text;
      btn.dataset.correct = String(text.toLowerCase() === q.correct.toLowerCase());
      btn.addEventListener('click', onChoose);
      choiceWrap.appendChild(btn);
    });
  }

  function openMinigame(){
    if (!mini) return;
    if (tokensLeft <= 0){
      miniMsg.textContent = "Out of tokens. Refresh the page to try again.";
      Array.from(choiceWrap.children).forEach(c => c.disabled = true);
    } else {
      miniMsg.textContent = "";
      const q = pickQuestion();
      lyricPrompt.textContent = q.prompt;
      buildChoices(q);
    }
    mini.classList.remove('hidden');
    mini.setAttribute('aria-hidden','false');
  }

  function closeMinigame(){
    if (!mini) return;
    mini.classList.add('hidden');
    mini.setAttribute('aria-hidden','true');
  }

  function onChoose(e){
    if (tokensLeft <= 0) return;
    const btn = e.currentTarget;
    const isCorrect = btn.dataset.correct === 'true';

    tokensLeft -= 1;
    if (tokenCount) tokenCount.textContent = tokensLeft;

    Array.from(choiceWrap.children).forEach(c => c.disabled = true);

    if (isCorrect){
      btn.classList.add('correct');
      miniMsg.textContent = "Correct! Bonus pull unlocked 🌟";
      try { sfxRight.currentTime = 0; sfxRight.play(); } catch {}
      setTimeout(()=>{ closeMinigame(); handlePull(/*fromMini*/true); }, 600);
    } else {
      btn.classList.add('wrong');
      try { sfxWrong.currentTime = 0; sfxWrong.play(); } catch {}
      if (tokensLeft > 0){
        miniMsg.textContent = "Close! One token left — new lyric coming up…";
        setTimeout(()=>{
          const q = pickQuestion();
          lyricPrompt.textContent = q.prompt;
          buildChoices(q);
          miniMsg.textContent = "";
        }, 650);
      } else {
        miniMsg.textContent = "No tokens left — refresh the page to try again.";
        try { sfxOut.currentTime = 0; sfxOut.play(); } catch {}
      }
    }
  }

  // ---------- Pull flow ----------
  async function handlePull(fromMini=false){
    if (isPulling) return;
    isPulling = true;

    // start animation
    resetCard();
    try { sfxLever.currentTime = 0; sfxLever.play(); } catch {}
    lever?.classList.add('pulled');
    await wait(500);
    lever?.classList.remove('pulled');

    // pick & reveal
    const picked = pickCard();
    currentCard = picked;

    await wait(400);
    pcImg.src = picked.image;
    pcName.textContent = picked.name;
    pcGroup.textContent = picked.group;
    applyRarityStyles(picked.rarity);
    flipToBack();

    try { sfxReveal.currentTime = 0; sfxReveal.play(); } catch {}

    // rarity effects + mini-game for legendary
    if (picked.rarity === 'legendary'){
      try { sfxLegendary.currentTime = 0; sfxLegendary.play(); } catch {}
      spawnSparklesBurst(80);
      // only open the mini-game if this pull did not already come *from* the mini-game
      if (!fromMini && tokensLeft > 0){
        openMinigame();
      }
    } else if (picked.rarity === 'rare'){
      spawnSparklesBurst(50);
    } else if (picked.rarity === 'uncommon'){
      spawnSparklesBurst(30);
    } else {
      spawnSparklesBurst(18);
    }

    addRecentThumb(picked);
    isPulling = false;
  }

  // ---------- Save card (PNG, with fallback) ----------
  async function saveCurrentCard(){
    try { if (typeof sfxSave !== 'undefined') { sfxSave.currentTime = 0; sfxSave.play(); } } catch {}
    const node = card;
    const wasFlipped = card.classList.contains('is-flipped');
    if (!wasFlipped) card.classList.add('is-flipped');
    try {
      const scale = Math.min(2, Math.max(1, 800 / node.clientWidth));
      const canvas = await html2canvas(node, { backgroundColor: null, scale, useCORS: true });
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = `${(currentCard?.name || 'photocard').toLowerCase().replace(/\s+/g,'_')}.png`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (err) {
      const a = document.createElement('a');
      a.href = currentCard?.image || '#';
      a.download = `${(currentCard?.name || 'photocard').toLowerCase().replace(/\s+/g,'_')}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      console.warn('Canvas save failed, fallback used:', err);
    } finally {
      if (!wasFlipped) card.classList.remove('is-flipped');
    }
  }

  // ---------- Events ----------
  pullBtn.addEventListener('click', () => handlePull(false));
  againBtn.addEventListener('click', resetCard);
  saveBtn.addEventListener('click', saveCurrentCard);
  card.addEventListener('click', () => card.classList.toggle('is-flipped'));
  if (closeMini) closeMini.addEventListener('click', closeMinigame);
  window.addEventListener('keydown', (e)=>{ if (e.code === 'Space') { e.preventDefault(); handlePull(false); } });

  console.log('[KATZ] ready ✓');
});
