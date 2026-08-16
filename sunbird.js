(() => {
  /* ====================================================================== */
  /* 40A. AMETHYST SUNBIRD DATA                                             */
  /* ====================================================================== */
  const BIRD = {
    name: 'Amethyst sunbird',
    scientific: 'Chalcomitra amethystina',
    preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amethyst_sunbird,_Chalcomitra_amethystina,_male_at_Loodswaai,_Gauteng,_South_Africa._-_50613935926.jpg?width=1800',
    full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amethyst_sunbird,_Chalcomitra_amethystina,_male_at_Loodswaai,_Gauteng,_South_Africa._-_50613935926.jpg',
    width: 2647,
    height: 2647,
    previewWidth: 1800,
    credit: 'Photo: Derek Keats · CC BY 2.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Amethyst_sunbird,_Chalcomitra_amethystina,_male_at_Loodswaai,_Gauteng,_South_Africa._-_50613935926.jpg',
    nav: ['overview', 'range', 'plumage', 'bill', 'eyes', 'feathers', 'wings', 'diet', 'pollination', 'breeding'],
    information: {
      overview: { title: 'Amethyst sunbird', text: 'Chalcomitra amethystina is an African sunbird. The male is much darker and more iridescent than the female, with glossy black plumage, metallic highlights and a long curved bill. This photograph shows a male against a clean white background, making the feather edges, bill and eye especially easy to inspect.', sourceLabel: 'Biodiversity Explorer · Amethyst sunbird', sourceUrl: 'https://www.biodiversityexplorer.info/birds/nectariniidae/chalcomitra_amethystina.htm' },
      range: { title: 'Range and habitat', text: 'The species occurs widely in Africa south of the equator, from East Africa through central and southern Africa. It favours woodland, forest edge, bushveld and well-planted gardens, and may move locally to follow flowering plants and other rich food sources.', sourceLabel: 'Biodiversity Explorer · distribution and habitat', sourceUrl: 'https://www.biodiversityexplorer.info/birds/nectariniidae/chalcomitra_amethystina.htm' },
      plumage: { title: 'Iridescent male plumage', text: 'Adult males are largely black but carry metallic green and amethyst-red to purple iridescence around the forehead, throat and shoulders. The colour changes with lighting angle because glossy feather structures reflect light differently as the bird moves.', sourceLabel: 'South Africa · Amethyst sunbird appearance', sourceUrl: 'https://southafrica.co.za/amethyst-sunbird.html' },
      bill: { title: 'Long curved bill', text: 'The bill is slender and curves downward, a shape well suited to probing tubular flowers for nectar. Sunbirds can feed while perched and may also hover briefly in front of flowers, although they are not hummingbirds and belong to a completely different bird family.', sourceLabel: 'Oiseaux.net · feeding behaviour', sourceUrl: 'https://www.oiseaux.net/en/oiseaux/amethyst.sunbird.html' },
      eyes: { title: 'Eyes', text: 'The dark eye sits high on the side of the head and gives the bird a broad field of view. For a fast-moving feeder that moves among branches and flowers, vision is important for locating food, judging gaps and detecting rivals or predators.', sourceLabel: 'Wikimedia Commons · photograph', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Amethyst_sunbird,_Chalcomitra_amethystina,_male_at_Loodswaai,_Gauteng,_South_Africa._-_50613935926.jpg' },
      feathers: { title: 'Feathers', text: 'At high zoom the bird stops looking like a smooth black shape and resolves into overlapping feathers of different sizes and textures. Contour feathers streamline the body, while finer feathers provide insulation. The glossy areas demonstrate how feather structure can create strong visual effects without changing the basic feather material.', sourceLabel: 'Wikimedia Commons · photograph', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Amethyst_sunbird,_Chalcomitra_amethystina,_male_at_Loodswaai,_Gauteng,_South_Africa._-_50613935926.jpg' },
      wings: { title: 'Wings', text: 'The folded wings lie tight against the sides of the body. Flight feathers are long, stiff and asymmetrical compared with body feathers, producing the aerodynamic surfaces needed for fast, agile flight between flowering plants and exposed perches.', sourceLabel: 'Biodiversity Explorer · behaviour', sourceUrl: 'https://www.biodiversityexplorer.info/birds/nectariniidae/chalcomitra_amethystina.htm' },
      diet: { title: 'Nectar, insects and spiders', text: 'Nectar is a major food source, but the Amethyst sunbird also eats insects and spiders. It may glean small prey from leaves and branches or catch flying insects, giving it a much broader diet than the long flower-feeding bill might suggest.', sourceLabel: 'Biodiversity Explorer · food', sourceUrl: 'https://www.biodiversityexplorer.info/birds/nectariniidae/chalcomitra_amethystina.htm' },
      pollination: { title: 'A pollinating bird', text: 'When sunbirds push their bills and heads into flowers, pollen can be transferred onto their feathers and then carried to another flower. African sunbirds are important pollinators for many plants, including species useful to people.', sourceLabel: 'Ornithological Applications · African sunbird pollination', sourceUrl: 'https://academic.oup.com/condor/article/122/2/duz070/5771327' },
      breeding: { title: 'Breeding and nest', text: 'The female builds the nest and lays the eggs. Amethyst sunbirds are associated with a hanging enclosed nest built from plant material and often bound with spider web. The sexes look very different, with the female much browner and less iridescent than the male shown here.', sourceLabel: 'South Africa · breeding', sourceUrl: 'https://southafrica.co.za/amethyst-sunbird.html' }
    }
  };

  /* ====================================================================== */
  /* 40B. DOM + VIEW STATE                                                  */
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
  const photoCredit = document.getElementById('photoCredit');

  let selectedInfoKey = 'overview';
  let x = 0, y = 0, scale = 1, homeScale = 1, minScale = 1, maxScale = 1;
  let previewReady = false, fullReady = false, fullRequested = false, source = 'preview';
  let gesture = null, tapCandidate = null, multiTouch = false;
  const pointers = new Map();
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  /* ====================================================================== */
  /* 41A. INFORMATION PANEL                                                 */
  /* ====================================================================== */
  function buildInfoNavigation() {
    const query = infoSearch.value.trim().toLowerCase();
    infoNav.replaceChildren();
    BIRD.nav.forEach(key => {
      const item = BIRD.information[key];
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
    const item = BIRD.information[key];
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
  /* 41B. COLLECTION + SPECIES MENU                                         */
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
  /* 42A. VIEWER + NATIVE-PIXEL ZOOM                                       */
  /* ====================================================================== */
  function insideImage(cx, cy) {
    return cx >= x && cx <= x + BIRD.width * scale && cy >= y && cy <= y + BIRD.height * scale;
  }

  function constrain() {
    const dw = BIRD.width * scale, dh = BIRD.height * scale;
    x = dw <= stage.clientWidth ? (stage.clientWidth - dw) / 2 : clamp(x, stage.clientWidth - dw, 0);
    y = dh <= stage.clientHeight ? (stage.clientHeight - dh) / 2 : clamp(y, stage.clientHeight - dh, 0);
  }

  function setLimits() {
    minScale = homeScale;
    maxScale = Math.max(minScale, fullReady ? 1 : BIRD.previewWidth / BIRD.width);
  }

  function render() {
    constrain();
    subject.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    if (scale > homeScale * 1.08) requestFull();
  }

  function homeView() {
    homeScale = Math.min(stage.clientWidth / BIRD.width, stage.clientHeight / BIRD.height);
    scale = homeScale;
    x = (stage.clientWidth - BIRD.width * scale) / 2;
    y = (stage.clientHeight - BIRD.height * scale) / 2;
    setLimits();
    hideInformation();
    render();
  }

  function zoomAt(px, py, factor) {
    const next = clamp(scale * factor, minScale, maxScale);
    if (next === scale) return;
    const ix = (px - x) / scale, iy = (py - y) / scale;
    scale = next;
    x = px - ix * scale;
    y = py - iy * scale;
    hideInformation();
    render();
  }

  /* ====================================================================== */
  /* 42B. HIGH-RESOLUTION LOAD                                              */
  /* ====================================================================== */
  function requestFull() {
    if (fullRequested || fullReady) return;
    fullRequested = true;
    const hi = new Image();
    hi.decoding = 'async';
    hi.onload = () => {
      fullReady = true;
      source = 'full';
      subject.src = BIRD.full;
      setLimits();
      render();
    };
    hi.onerror = () => { fullRequested = false; setLimits(); };
    hi.src = BIRD.full;
  }

  subject.addEventListener('load', () => {
    if (source === 'preview' && !previewReady) {
      previewReady = true;
      homeView();
      loading.classList.add('hide');
      setTimeout(requestFull, 4500);
      return;
    }
    if (source === 'full' && !previewReady) {
      previewReady = true;
      fullReady = true;
      homeView();
      loading.classList.add('hide');
    }
  });

  subject.addEventListener('error', () => {
    if (source === 'preview') {
      source = 'full';
      fullRequested = true;
      subject.src = BIRD.full;
      return;
    }
    loadingText.style.display = 'none';
    error.style.display = 'block';
  });

  /* ====================================================================== */
  /* 43A. PAN, PINCH, TAP                                                  */
  /* ====================================================================== */
  function beginGesture() {
    const points = [...pointers.values()];
    if (points.length === 1) {
      gesture = { type: 'pan', px: points[0].x, py: points[0].y, x, y };
      stage.classList.add('grabbing');
      return;
    }
    if (points.length >= 2) {
      multiTouch = true;
      tapCandidate = null;
      const centre = midpoint(points[0], points[1]);
      gesture = { type: 'pinch', d: Math.max(1, distance(points[0], points[1])), s: scale, ix: (centre.x - x) / scale, iy: (centre.y - y) / scale };
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
    const points = [...pointers.values()];
    if (points.length === 1 && gesture?.type === 'pan') {
      x = gesture.x + points[0].x - gesture.px;
      y = gesture.y + points[0].y - gesture.py;
      render();
      return;
    }
    if (points.length >= 2) {
      if (gesture?.type !== 'pinch') beginGesture();
      const centre = midpoint(points[0], points[1]);
      scale = clamp(gesture.s * distance(points[0], points[1]) / gesture.d, minScale, maxScale);
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
    if (wasTap) insideImage(tx, ty) ? showInformation('overview') : hideInformation();
    tapCandidate = null;
    multiTouch = false;
  }

  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  /* ====================================================================== */
  /* 43B. WHEEL / DOUBLE-CLICK / RESIZE                                     */
  /* ====================================================================== */
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
    resizeTimer = setTimeout(homeView, 100);
  });

  /* ====================================================================== */
  /* 44A. INITIALISE                                                        */
  /* ====================================================================== */
  photoCredit.textContent = BIRD.credit;
  photoCredit.href = BIRD.creditUrl;
  subject.alt = 'Male Amethyst sunbird, Chalcomitra amethystina, on a white background';
  subject.style.width = `${BIRD.width}px`;
  subject.style.height = `${BIRD.height}px`;
  buildInfoNavigation();
  subject.src = BIRD.preview;
})();