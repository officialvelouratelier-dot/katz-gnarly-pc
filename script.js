document.addEventListener('DOMContentLoaded', () => {
  // helper for local assets
  const asset = (file) => `assets/img/${file}`;

  // ---- Photocards (KATZ) ----
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

  // ... keep the rest of your existing code (rarity odds, handlePull, etc.) ...
});
