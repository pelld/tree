(() => {
  /* ====================================================================== */
  /* 20A. MANTIS SPECIMEN + INFORMATION                                    */
  /* ====================================================================== */
  const MANTIS = {
    name: 'Praying mantis',
    scientific: 'Stagmatoptera supplicaria',
    meta: 'wings open · male',
    preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Stagmatoptera_supplicaria_MHNT_male_vol.jpg?width=1800',
    full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Stagmatoptera_supplicaria_MHNT_male_vol.jpg',
    width: 4032,
    height: 4176,
    previewWidth: 1800,
    credit: 'Photo: Didier Descouens · CC BY-SA 4.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Stagmatoptera_supplicaria_MHNT_male_vol.jpg',
    nav: ['overview', 'locality', 'hunting', 'forelegs', 'eyes', 'head', 'wings', 'camouflage', 'life', 'ootheca'],
    information: {
      overview: { title: 'Praying mantis', text: 'Stagmatoptera supplicaria is a tropical praying mantis. This male museum specimen is displayed with its wings open, making both the raptorial forelegs and the normally folded flight surfaces unusually easy to inspect at high zoom.', sourceLabel: 'Wikimedia Commons · specimen page', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stagmatoptera_supplicaria_MHNT_male_vol.jpg' },
      locality: { title: 'Locality', text: 'This specimen was collected near Kourou in French Guiana, at the summit of Mont des Singes. It belongs to a tropical South American mantis species.', sourceLabel: 'Wikimedia Commons · specimen locality', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stagmatoptera_supplicaria_MHNT_male_vol.jpg' },
      hunting: { title: 'Ambush predator', text: 'Most mantids are ambush predators. They remain still until prey comes close, then strike rapidly. Their widely spaced compound eyes support binocular vision, helping them judge distance before committing to an attack.', sourceLabel: 'Smithsonian Q?rius · mantid feeding', sourceUrl: 'https://qrius.si.edu/taxonomy/term/11865' },
      forelegs: { title: 'Raptorial forelegs', text: 'The front legs are specialised prey-catching weapons. They fold beneath the body in the familiar prayer-like pose and are lined with sharp spines. During a strike they snap forward, grip and impale prey before drawing it toward the mouth.', sourceLabel: 'Smithsonian Q?rius · mantid feeding', sourceUrl: 'https://qrius.si.edu/taxonomy/term/11865' },
      eyes: { title: 'Binocular eyes', text: 'Mantids have large compound eyes set far apart on the head. Their overlapping fields of view provide useful depth perception and help an ambush predator estimate how far away moving prey is.', sourceLabel: 'Smithsonian Q?rius · mantid feeding', sourceUrl: 'https://qrius.si.edu/taxonomy/term/11865' },
      head: { title: 'Mobile head', text: 'A mantis can swivel its head through a very wide arc, allowing it to track movement without shifting the whole body. The triangular head carries the large eyes, antennae and chewing mouthparts.', sourceLabel: 'Smithsonian Q?rius · mantid feeding', sourceUrl: 'https://qrius.si.edu/taxonomy/term/11865' },
      wings: { title: 'Wings', text: 'Adult mantids have two pairs of wings. The tougher forewings protect the broader hind wings, which provide much of the flight surface. This specimen is displayed in a flying position, so the hidden hind-wing structure is visible rather than folded away.', sourceLabel: 'Wikimedia Commons · flying-position specimen', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stagmatoptera_supplicaria_MHNT_male_vol.jpg' },
      camouflage: { title: 'Camouflage', text: 'Mantids commonly rely on camouflage while waiting for prey and avoiding predators. Across the order, body shapes and colours can resemble leaves, twigs, bark or flowers, allowing a conspicuous predator to disappear into vegetation.', sourceLabel: 'Smithsonian · mantis natural history', sourceUrl: 'https://www.si.edu/object/archives/components/sova-eepa-1973-001-ref14366' },
      life: { title: 'Life cycle', text: 'Mantids undergo incomplete metamorphosis: eggs hatch into nymphs that resemble small wingless adults, and each moult brings them closer to the mature form. There is no caterpillar-like larval stage and no pupa.', sourceLabel: 'Smithsonian NMNH · insect development', sourceUrl: 'https://naturalhistory.si.edu/visit/accessibility/audio-and-visual-description/insect-zoo-audio-description-tour' },
      ootheca: { title: 'Egg case', text: 'Female mantises lay eggs inside a protective foamy case called an ootheca, usually attached to stems or other firm surfaces. The case hardens around the eggs and protects the developing young until the nymphs emerge.', sourceLabel: 'Smithsonian Gardens · praying mantis', sourceUrl: 'https://gardens.si.edu/exhibitions/traveling/habitat/where-do-insects-live/' }
    }
  };

  /* ====================================================================== */
  /* 20B. DOM + VIEW STATE                                                  */
  /* ====================================================================== */
  const stage = document.getElementById('stage');
  const subject = document.getElementById('subject');
  const speciesButton = document.getElementById('speciesButton');
  const speciesMenu = document.getElementById('speciesMenu');
  const infoCard = document.getElementById('infoCard');
  const infoTitle = document.getElementById('infoTitle');
  const infoText = document.getElementById('infoText');
  const infoSearch = document.getElementById('infoSearch');
  const infoNav = document.getElementById('infoNav');
  const infoSource = document.getElementById('infoSource');
  const loading = document.getElementById('loading');
  const loadingText = document.getElementById('loadingText');
  const error = document.getElementById('error');

  let selectedInfoKey = 'overview';
  let x = 0, y = 0, scale = 1, homeScale = 1, minScale = 1, maxScale = 1;
  let previewReady = false, fullReady = false, fullRequested = false, source = 'preview';
  let gesture = null, tapCandidate = null, multiTouch = false;
  const pointers = new Map();
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  /* ====================================================================== */
  /* 21A. INFORMATION PANEL                                                 */
  /* ====================================================================== */
  function buildInfoNavigation() {
    const query = infoSearch.value.trim().toLowerCase();
    infoNav.replaceChildren();
    MANTIS.nav.forEach(key => {
      const item = MANTIS.information[key];
      if (query && !`${item.title} ${item.text}`.toLowerCase().includes(query)) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.infoKey = key;
      button.textContent = item.title;
      button.classList.toggle('active', key === selectedInfoKey);
      infoNav.appendChild(button);
    });
    if (!infoNav.children.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No topics match that search.';
      infoNav.appendChild(empty);
    }
  }

  function showInformation(key) {
    const item = MANTIS.information[key];
    if (!item) return;
    selectedInfoKey = key;
    infoTitle.textContent = item.title;
    infoText.textContent = item.text;
    infoSource.textContent = `Source: ${item.sourceLabel}`;
    infoSource.href = item.sourceUrl;
    buildInfoNavigation();
    infoCard.classList.add('open');
    infoCard.setAttribute('aria-hidden', 'false');
  }

  function hideInformation() {
    infoCard.classList.remove('open');
    infoCard.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('infoClose').addEventListener('click', hideInformation);
  infoSearch.addEventListener('input', buildInfoNavigation);
  infoNav.addEventListener('click', event => {
    const button = event.target.closest('button[data-info-key]');
    if (button) showInformation(button.dataset.infoKey);
  });

  /* ====================================================================== */
  /* 21B. COLLECTION + SPECIES NAVIGATION                                   */
  /* ====================================================================== */
  document.getElementById('collectionButton').addEventListener('click', () => { location.href = './'; });

  function setSpeciesMenu(open) {
    speciesMenu.classList.toggle('open', open);
    speciesMenu.setAttribute('aria-hidden', String(!open));
    speciesButton.setAttribute('aria-expanded', String(open));
  }

  speciesButton.addEventListener('click', event => {
    event.stopPropagation();
    setSpeciesMenu(!speciesMenu.classList.contains('open'));
  });

  speciesMenu.addEventListener('click', event => {
    const button = event.target.closest('button[data-href]');
    if (button) location.href = button.dataset.href;
  });

  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#speciesPanel')) setSpeciesMenu(false);
  });

  /* ====================================================================== */
  /* 22A. ZOOM + PAN                                                        */
  /* ====================================================================== */
  function inside(cx, cy) {
    return cx >= x && cx <= x + MANTIS.width * scale && cy >= y && cy <= y + MANTIS.height * scale;
  }

  function constrain() {
    const w = MANTIS.width * scale;
    const h = MANTIS.height * scale;
    x = w <= stage.clientWidth ? (stage.clientWidth - w) / 2 : clamp(x, stage.clientWidth - w, 0);
    y = h <= stage.clientHeight ? (stage.clientHeight - h) / 2 : clamp(y, stage.clientHeight - h, 0);
  }

  function setLimits() {
    minScale = homeScale;
    maxScale = Math.max(minScale, fullReady ? 1 : MANTIS.previewWidth / MANTIS.width);
  }

  function render() {
    constrain();
    subject.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    if (scale > homeScale * 1.08) requestFull();
  }

  function home() {
    homeScale = Math.min(stage.clientWidth / MANTIS.width, stage.clientHeight / MANTIS.height);
    scale = homeScale;
    x = (stage.clientWidth - MANTIS.width * scale) / 2;
    y = (stage.clientHeight - MANTIS.height * scale) / 2;
    setLimits();
    hideInformation();
    render();
  }

  function zoomAt(px, py, factor) {
    const next = clamp(scale * factor, minScale, maxScale);
    if (next === scale) return;
    const ix = (px - x) / scale;
    const iy = (py - y) / scale;
    scale = next;
    x = px - ix * scale;
    y = py - iy * scale;
    hideInformation();
    render();
  }

  function requestFull() {
    if (fullRequested || fullReady) return;
    fullRequested = true;
    const hi = new Image();
    hi.decoding = 'async';
    hi.onload = () => {
      fullReady = true;
      source = 'full';
      subject.src = MANTIS.full;
      setLimits();
      render();
    };
    hi.onerror = () => { fullRequested = false; setLimits(); };
    hi.src = MANTIS.full;
  }

  /* ====================================================================== */
  /* 22B. IMAGE LOAD                                                        */
  /* ====================================================================== */
  subject.addEventListener('load', () => {
    if (source === 'preview' && !previewReady) {
      previewReady = true;
      home();
      loading.classList.add('hide');
      setTimeout(requestFull, 4500);
      return;
    }
    if (source === 'full' && !previewReady) {
      previewReady = true;
      fullReady = true;
      home();
      loading.classList.add('hide');
    }
  });

  subject.addEventListener('error', () => {
    if (source === 'preview') {
      source = 'full';
      fullRequested = true;
      subject.src = MANTIS.full;
      return;
    }
    loadingText.style.display = 'none';
    error.style.display = 'block';
  });

  /* ====================================================================== */
  /* 23A. TOUCH / POINTER GESTURES                                           */
  /* ====================================================================== */
  function beginGesture() {
    const pts = [...pointers.values()];
    if (pts.length === 1) {
      gesture = { type: 'pan', px: pts[0].x, py: pts[0].y, x, y };
      stage.classList.add('grabbing');
      return;
    }
    if (pts.length >= 2) {
      multiTouch = true;
      tapCandidate = null;
      const centre = midpoint(pts[0], pts[1]);
      gesture = { type: 'pinch', d: Math.max(1, distance(pts[0], pts[1])), scale, ix: (centre.x - x) / scale, iy: (centre.y - y) / scale };
      stage.classList.add('grabbing');
    }
  }

  stage.addEventListener('pointerdown', event => {
    setSpeciesMenu(false);
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 1) {
      tapCandidate = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
      multiTouch = false;
    }
    beginGesture();
  });

  stage.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (tapCandidate?.id === event.pointerId && Math.hypot(event.clientX - tapCandidate.x, event.clientY - tapCandidate.y) > 10) tapCandidate.moved = true;
    const pts = [...pointers.values()];
    if (pts.length === 1 && gesture?.type === 'pan') {
      x = gesture.x + pts[0].x - gesture.px;
      y = gesture.y + pts[0].y - gesture.py;
      render();
      return;
    }
    if (pts.length >= 2) {
      if (gesture?.type !== 'pinch') beginGesture();
      const centre = midpoint(pts[0], pts[1]);
      scale = clamp(gesture.scale * distance(pts[0], pts[1]) / gesture.d, minScale, maxScale);
      x = centre.x - gesture.ix * scale;
      y = centre.y - gesture.iy * scale;
      hideInformation();
      render();
    }
  });

  function release(event) {
    const wasTap = tapCandidate?.id === event.pointerId && !tapCandidate.moved && !multiTouch;
    const tx = event.clientX, ty = event.clientY;
    pointers.delete(event.pointerId);
    if (pointers.size) return beginGesture();
    gesture = null;
    stage.classList.remove('grabbing');
    if (wasTap) inside(tx, ty) ? showInformation('overview') : hideInformation();
    tapCandidate = null;
    multiTouch = false;
  }

  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  stage.addEventListener('wheel', event => {
    event.preventDefault();
    const r = stage.getBoundingClientRect();
    zoomAt(event.clientX - r.left, event.clientY - r.top, Math.exp(-event.deltaY * 0.0015));
  }, { passive: false });

  stage.addEventListener('dblclick', event => {
    const r = stage.getBoundingClientRect();
    zoomAt(event.clientX - r.left, event.clientY - r.top, 1.8);
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(home, 100);
  });

  /* ====================================================================== */
  /* 24A. INITIALISE                                                        */
  /* ====================================================================== */
  document.title = `${MANTIS.name} — high-detail creature zoom`;
  document.getElementById('speciesName').textContent = MANTIS.name;
  document.getElementById('speciesMeta').innerHTML = `<i>${MANTIS.scientific}</i> · ${MANTIS.meta}`;
  document.getElementById('photoCredit').textContent = MANTIS.credit;
  document.getElementById('photoCredit').href = MANTIS.creditUrl;
  subject.alt = 'Male Stagmatoptera supplicaria praying mantis with wings open on a white background';
  subject.style.width = `${MANTIS.width}px`;
  subject.style.height = `${MANTIS.height}px`;
  buildInfoNavigation();
  subject.src = MANTIS.preview;
})();