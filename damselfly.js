(() => {
  /* ====================================================================== */
  /* 30A. BEAUTIFUL DEMOISELLE SPECIMEN + INFORMATION                      */
  /* ====================================================================== */
  const DEMOISELLE = {
    name: 'Beautiful demoiselle',
    scientific: 'Calopteryx virgo meridionalis',
    meta: 'male · white-background specimen',
    preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Calopteryx_virgo_meridionalis_MHNT.jpg?width=1800',
    full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Calopteryx_virgo_meridionalis_MHNT.jpg',
    width: 3714,
    height: 3324,
    previewWidth: 1800,
    credit: 'Photo: Didier Descouens · CC BY-SA 4.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Calopteryx_virgo_meridionalis_MHNT.jpg',
    nav: ['overview', 'locality', 'habitat', 'size', 'wings', 'eyes', 'body', 'courtship', 'life', 'nymph'],
    information: {
      overview: { title: 'Beautiful demoiselle', text: 'Calopteryx virgo is a large, metallic damselfly. Males are especially striking: the body is metallic blue and the wings are dark and iridescent. This museum specimen belongs to the southern subspecies C. v. meridionalis and is displayed dorsally on a clean white background.', sourceLabel: 'British Dragonfly Society · Beautiful Demoiselle', sourceUrl: 'https://british-dragonflies.org.uk/species/beautiful-demoiselle/' },
      locality: { title: 'Locality', text: 'This male specimen was collected at Sainte-Croix-Volvestre in Ariège, France. The image comes from the entomology collection of the Muséum de Toulouse.', sourceLabel: 'Wikimedia Commons · specimen page', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Calopteryx_virgo_meridionalis_MHNT.jpg' },
      habitat: { title: 'Fast-flowing water', text: 'Beautiful Demoiselles are strongly associated with streams and rivers, especially flowing water with sand or gravel bottoms. Adults often perch on bankside vegetation close to breeding habitat.', sourceLabel: 'British Dragonfly Society · Beautiful Demoiselle', sourceUrl: 'https://british-dragonflies.org.uk/species/beautiful-demoiselle/' },
      size: { title: 'Size', text: 'Adults are about 45 millimetres long. Their very slender abdomen makes them look delicate, but the broad coloured wings give the insect a surprisingly large visual presence when perched or fluttering over a stream.', sourceLabel: 'British Dragonfly Society · Beautiful Demoiselle', sourceUrl: 'https://british-dragonflies.org.uk/species/beautiful-demoiselle/' },
      wings: { title: 'Dark iridescent wings', text: 'Male Beautiful Demoiselles have almost fully darkened wings. The colour is iridescent, so the same wing can appear nearly black, blue or metallic green depending on the angle of the light. Forewings and hindwings are similar in shape, a typical damselfly feature.', sourceLabel: 'British Dragonfly Society · demoiselles', sourceUrl: 'https://british-dragonflies.org.uk/british-demoiselles-not-american-tourists/' },
      eyes: { title: 'Widely separated eyes', text: 'Damselfly eyes are separated on the head rather than meeting across the top as they do in many dragonflies. The spacing is especially obvious in a clean dorsal specimen like this one.', sourceLabel: 'British Dragonfly Society · damselfly anatomy', sourceUrl: 'https://british-dragonflies.org.uk/odonata/damselflies/' },
      body: { title: 'Long segmented body', text: 'The adult body is narrow and delicate, with a long segmented abdomen trailing behind a compact thorax. The six legs and all four wings attach to the thorax, while the abdomen contains much of the digestive and reproductive system.', sourceLabel: 'British Dragonfly Society · damselfly anatomy', sourceUrl: 'https://british-dragonflies.org.uk/odonata/damselflies/' },
      courtship: { title: 'Wing displays', text: 'Male demoiselles use their conspicuous wings in visual signalling to rivals and females. Their fluttering flight and iridescent wing surfaces are therefore not just beautiful to us: they are part of the insects’ own communication system.', sourceLabel: 'British Dragonfly Society · demoiselle wing display', sourceUrl: 'https://british-dragonflies.org.uk/british-demoiselles-not-american-tourists/' },
      life: { title: 'Life cycle', text: 'Like all dragonflies and damselflies, the life cycle has three main stages: egg, aquatic larva or nymph, and adult. Damselflies lay eggs into plant material, and most of the life is spent underwater before the final emergence into the winged adult.', sourceLabel: 'British Dragonfly Society · life cycle', sourceUrl: 'https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/' },
      nymph: { title: 'Aquatic nymph', text: 'Damselfly nymphs are underwater predators. They have three fin-like caudal lamellae at the end of the abdomen that act as external gills, and an extendable hinged lower jaw that can shoot forward to seize prey. At the final moult the nymph climbs from the water and the adult emerges.', sourceLabel: 'British Dragonfly Society · life cycle', sourceUrl: 'https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/' }
    }
  };

  /* ====================================================================== */
  /* 30B. DOM + VIEW STATE                                                  */
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
  /* 31A. INFORMATION PANEL                                                 */
  /* ====================================================================== */
  function buildInfoNavigation() {
    const query = infoSearch.value.trim().toLowerCase();
    infoNav.replaceChildren();
    DEMOISELLE.nav.forEach(key => {
      const item = DEMOISELLE.information[key];
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
    const item = DEMOISELLE.information[key];
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
  /* 31B. COLLECTION + SPECIES MENU                                         */
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
  /* 32A. VIEWER + NATIVE-PIXEL ZOOM                                        */
  /* ====================================================================== */
  function constrainPosition() {
    const drawnWidth = DEMOISELLE.width * scale;
    const drawnHeight = DEMOISELLE.height * scale;
    x = drawnWidth <= stage.clientWidth ? (stage.clientWidth - drawnWidth) / 2 : clamp(x, stage.clientWidth - drawnWidth, 0);
    y = drawnHeight <= stage.clientHeight ? (stage.clientHeight - drawnHeight) / 2 : clamp(y, stage.clientHeight - drawnHeight, 0);
  }

  function setZoomLimits() {
    minScale = homeScale;
    maxScale = Math.max(minScale, fullReady ? 1 : DEMOISELLE.previewWidth / DEMOISELLE.width);
  }

  function render() {
    constrainPosition();
    subject.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    if (scale > homeScale * 1.08) requestFullResolution();
  }

  function homeView() {
    homeScale = Math.min(stage.clientWidth / DEMOISELLE.width, stage.clientHeight / DEMOISELLE.height);
    scale = homeScale;
    x = (stage.clientWidth - DEMOISELLE.width * scale) / 2;
    y = (stage.clientHeight - DEMOISELLE.height * scale) / 2;
    setZoomLimits();
    hideInformation();
    render();
  }

  function zoomAt(px, py, factor) {
    const nextScale = clamp(scale * factor, minScale, maxScale);
    if (nextScale === scale) return;
    const imageX = (px - x) / scale;
    const imageY = (py - y) / scale;
    scale = nextScale;
    x = px - imageX * scale;
    y = py - imageY * scale;
    hideInformation();
    render();
  }

  function pointInsideImage(clientX, clientY) {
    return clientX >= x && clientX <= x + DEMOISELLE.width * scale && clientY >= y && clientY <= y + DEMOISELLE.height * scale;
  }

  /* ====================================================================== */
  /* 32B. FULL-RESOLUTION UPGRADE                                           */
  /* ====================================================================== */
  function requestFullResolution() {
    if (fullRequested || fullReady) return;
    fullRequested = true;
    const highResolution = new Image();
    highResolution.decoding = 'async';
    highResolution.onload = () => {
      fullReady = true;
      source = 'full';
      subject.src = DEMOISELLE.full;
      setZoomLimits();
      render();
    };
    highResolution.onerror = () => { fullRequested = false; setZoomLimits(); };
    highResolution.src = DEMOISELLE.full;
  }

  /* ====================================================================== */
  /* 33A. IMAGE LOAD / FALLBACK                                             */
  /* ====================================================================== */
  subject.addEventListener('load', () => {
    if (source === 'preview' && !previewReady) {
      previewReady = true;
      homeView();
      loading.classList.add('hide');
      setTimeout(requestFullResolution, 4500);
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
      subject.src = DEMOISELLE.full;
      return;
    }
    loadingText.style.display = 'none';
    error.style.display = 'block';
  });

  /* ====================================================================== */
  /* 33B. PAN, PINCH AND TAP                                               */
  /* ====================================================================== */
  function beginGesture() {
    const points = [...pointers.values()];
    if (points.length === 1) {
      gesture = { type: 'pan', pointerX: points[0].x, pointerY: points[0].y, x, y };
      stage.classList.add('grabbing');
      return;
    }
    if (points.length >= 2) {
      multiTouch = true;
      tapCandidate = null;
      const centre = midpoint(points[0], points[1]);
      gesture = { type: 'pinch', distance: Math.max(1, distance(points[0], points[1])), scale, imageX: (centre.x - x) / scale, imageY: (centre.y - y) / scale };
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
      x = gesture.x + points[0].x - gesture.pointerX;
      y = gesture.y + points[0].y - gesture.pointerY;
      render();
      return;
    }
    if (points.length >= 2) {
      if (gesture?.type !== 'pinch') beginGesture();
      const centre = midpoint(points[0], points[1]);
      scale = clamp(gesture.scale * distance(points[0], points[1]) / gesture.distance, minScale, maxScale);
      x = centre.x - gesture.imageX * scale;
      y = centre.y - gesture.imageY * scale;
      hideInformation();
      render();
    }
  });

  function releasePointer(event) {
    const wasTap = tapCandidate?.id === event.pointerId && !tapCandidate.moved && !multiTouch;
    const tapX = event.clientX;
    const tapY = event.clientY;
    pointers.delete(event.pointerId);
    if (pointers.size) { beginGesture(); return; }
    gesture = null;
    stage.classList.remove('grabbing');
    if (wasTap) pointInsideImage(tapX, tapY) ? showInformation('overview') : hideInformation();
    tapCandidate = null;
    multiTouch = false;
  }

  stage.addEventListener('pointerup', releasePointer);
  stage.addEventListener('pointercancel', releasePointer);

  /* ====================================================================== */
  /* 33C. WHEEL / DOUBLE-CLICK / RESIZE                                     */
  /* ====================================================================== */
  stage.addEventListener('wheel', event => {
    event.preventDefault();
    const rect = stage.getBoundingClientRect();
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, Math.exp(-event.deltaY * 0.0015));
  }, { passive: false });

  stage.addEventListener('dblclick', event => {
    const rect = stage.getBoundingClientRect();
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, 1.8);
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(homeView, 100);
  });

  /* ====================================================================== */
  /* 34A. INITIALISE                                                        */
  /* ====================================================================== */
  subject.alt = 'Male Beautiful Demoiselle, Calopteryx virgo meridionalis, dorsal view on a white background';
  subject.style.width = `${DEMOISELLE.width}px`;
  subject.style.height = `${DEMOISELLE.height}px`;
  document.getElementById('photoCredit').textContent = DEMOISELLE.credit;
  document.getElementById('photoCredit').href = DEMOISELLE.creditUrl;
  buildInfoNavigation();
  subject.src = DEMOISELLE.preview;
})();