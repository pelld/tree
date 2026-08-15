(() => {
  /* ======================================================================== */
  /* 10A. IMAGE SOURCES AND NATIVE DIMENSIONS                                 */
  /* ======================================================================== */
  const PREVIEW = 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg?width=1800';
  const FULL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg';
  const FULL_WIDTH = 5053;
  const FULL_HEIGHT = 5718;
  const PREVIEW_WIDTH = 1800;

  /* ======================================================================== */
  /* 10B. DOM REFERENCES AND VIEW STATE                                       */
  /* ======================================================================== */
  const stage = document.getElementById('stage');
  const subject = document.getElementById('subject');
  const loading = document.getElementById('loading');
  const loadingText = document.getElementById('loadingText');
  const error = document.getElementById('error');
  const infoCard = document.getElementById('infoCard');
  const infoTitle = document.getElementById('infoTitle');
  const infoText = document.getElementById('infoText');
  const infoSource = document.getElementById('infoSource');

  let x = 0, y = 0, scale = 1, homeScale = 1, minScale = 1, maxScale = 1;
  let previewReady = false, fullReady = false, fullRequested = false, source = 'preview';
  let gesture = null, tapCandidate = null, multiTouch = false;
  const pointers = new Map();

  /* ======================================================================== */
  /* 11A. GENERAL SPECIES INFORMATION                                         */
  /* These topics only become visible after the beetle itself is tapped.      */
  /* ======================================================================== */
  const information = {
    overview: {
      title: 'Harlequin beetle',
      text: 'Acrocinus longimanus is a giant Neotropical longhorn beetle in the family Cerambycidae. Adults are boldly patterned and mainly active at night. This specimen is female; the species is especially famous for the extraordinary front legs of adult males.',
      sourceLabel: 'Smithsonian · species record',
      sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534'
    },
    range: {
      title: 'Range and habitat',
      text: 'The species ranges from Mexico through Central America and much of tropical South America, extending south into Argentina. Its reproduction is closely tied to recently dead, dying or damaged trees.',
      sourceLabel: 'Valle, Chatellenaz & Damborsky (2017)',
      sourceUrl: 'https://doi.org/10.15560/13.6.987'
    },
    life: {
      title: 'Life cycle',
      text: 'Females select recently dead or dying trees for egg laying. The larvae develop inside wood and feed there before pupating and eventually emerging as adults.',
      sourceLabel: 'Valle, Chatellenaz & Damborsky (2017)',
      sourceUrl: 'https://doi.org/10.15560/13.6.987'
    },
    behaviour: {
      title: 'Behaviour and sex differences',
      text: 'Adults are nocturnal. Males use their greatly elongated front legs in fights with rivals and while guarding females and suitable egg-laying sites. Sexual selection appears to have driven this extreme difference between the sexes.',
      sourceLabel: 'Zeh, Zeh & Tavakilian · Biotropica (1992)',
      sourceUrl: 'https://doi.org/10.2307/2388476'
    },
    hitchhikers: {
      title: 'Tiny hitchhikers',
      text: 'Harlequin beetles can carry pseudoscorpions — tiny arachnids that use the beetles as transport between dead trees. Some even mate on the beetle, turning it into a mobile transport system and mating arena.',
      sourceLabel: 'Annals of the Entomological Society of America · phoresy review',
      sourceUrl: 'https://academic.oup.com/aesa/article/115/3/219/6506186'
    },

    /* ---------------------------------------------------------------------- */
    /* 11B. ANATOMICAL INFORMATION                                            */
    /* ---------------------------------------------------------------------- */
    head: {
      title: 'Head',
      text: 'The head carries the compound eyes, mouthparts and antenna bases. The mandibles are the beetle’s main biting and manipulating mouthparts.',
      sourceLabel: 'Smithsonian · taxonomy',
      sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534'
    },
    antennae: {
      title: 'Antennae',
      text: 'This is a longhorn beetle: Cerambycidae are famous for conspicuously long antennae. They are sensory organs used to sample touch and chemical information.',
      sourceLabel: 'GBIF · Cerambycidae classification',
      sourceUrl: 'https://www.gbif.org/species/1118064'
    },
    pronotum: {
      title: 'Pronotum',
      text: 'The shield-like section immediately behind the head is the pronotum, covering the first segment of the thorax. The first pair of legs attaches here.',
      sourceLabel: 'Universidad Nacional de Colombia · morphology',
      sourceUrl: 'https://historianatural.unal.edu.co/expo1/escarabajo_eng.html'
    },
    forelegs: {
      title: 'Front legs',
      text: 'This specimen is female. Males develop much longer front legs and use them in fights and in guarding females and egg-laying sites.',
      sourceLabel: 'Zeh, Zeh & Tavakilian · Biotropica (1992)',
      sourceUrl: 'https://doi.org/10.2307/2388476'
    },
    legs: {
      title: 'Middle and hind legs',
      text: 'Like all insects, this beetle has three pairs of jointed legs. Claws at the tips help it grip bark and move across trunks and branches.',
      sourceLabel: 'Universidad Nacional de Colombia · species overview',
      sourceUrl: 'https://historianatural.unal.edu.co/expo1/escarabajo_eng.html'
    }
  };

  /* ======================================================================== */
  /* 11C. INVISIBLE LEARNABLE AREAS                                           */
  /* Coordinates are normalised to the full image. Nothing is drawn on top.   */
  /* The large body area opens the general overview; smaller structures give  */
  /* more specific anatomical information.                                    */
  /* ======================================================================== */
  const hotspots = [
    { key: 'head', regions: [{ type: 'ellipse', x: .50, y: .285, rx: .070, ry: .052 }] },
    { key: 'pronotum', regions: [{ type: 'ellipse', x: .50, y: .355, rx: .115, ry: .060 }] },
    { key: 'forelegs', regions: [
      { type: 'capsule', ax: .455, ay: .345, bx: .205, by: .225, r: .034 },
      { type: 'capsule', ax: .545, ay: .345, bx: .795, by: .225, r: .034 }
    ] },
    { key: 'antennae', regions: [
      { type: 'capsule', ax: .465, ay: .300, bx: .335, by: .430, r: .027 },
      { type: 'capsule', ax: .335, ay: .430, bx: .205, by: .680, r: .027 },
      { type: 'capsule', ax: .205, ay: .680, bx: .205, by: .885, r: .027 },
      { type: 'capsule', ax: .535, ay: .300, bx: .665, by: .430, r: .027 },
      { type: 'capsule', ax: .665, ay: .430, bx: .795, by: .680, r: .027 },
      { type: 'capsule', ax: .795, ay: .680, bx: .795, by: .885, r: .027 }
    ] },
    { key: 'legs', regions: [
      { type: 'capsule', ax: .435, ay: .430, bx: .285, by: .535, r: .032 },
      { type: 'capsule', ax: .565, ay: .430, bx: .715, by: .535, r: .032 },
      { type: 'capsule', ax: .430, ay: .625, bx: .300, by: .760, r: .032 },
      { type: 'capsule', ax: .570, ay: .625, bx: .700, by: .760, r: .032 }
    ] },
    { key: 'overview', regions: [{ type: 'ellipse', x: .50, y: .585, rx: .165, ry: .245 }] }
  ];

  /* ======================================================================== */
  /* 12A. HIT TESTING                                                         */
  /* ======================================================================== */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  function distanceToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy;
    const t = len2 ? clamp(((px - ax) * dx + (py - ay) * dy) / len2, 0, 1) : 0;
    return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
  }

  function inside(nx, ny, region) {
    if (region.type === 'ellipse') {
      const dx = (nx - region.x) / region.rx, dy = (ny - region.y) / region.ry;
      return dx * dx + dy * dy <= 1;
    }
    return distanceToSegment(nx, ny, region.ax, region.ay, region.bx, region.by) <= region.r;
  }

  function hotspotAt(clientX, clientY) {
    const nx = ((clientX - x) / scale) / FULL_WIDTH;
    const ny = ((clientY - y) / scale) / FULL_HEIGHT;
    if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return null;
    return hotspots.find(h => h.regions.some(r => inside(nx, ny, r))) || null;
  }

  /* ======================================================================== */
  /* 13A. INFORMATION CARD                                                    */
  /* ======================================================================== */
  function showInformation(key) {
    const item = information[key];
    if (!item) return;
    infoTitle.textContent = item.title;
    infoText.textContent = item.text;
    infoSource.textContent = item.sourceLabel;
    infoSource.href = item.sourceUrl;
    infoCard.classList.add('open');
    infoCard.setAttribute('aria-hidden', 'false');
  }

  function hideInformation() {
    infoCard.classList.remove('open');
    infoCard.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('infoClose').addEventListener('click', hideInformation);
  document.getElementById('infoNav').addEventListener('click', event => {
    const button = event.target.closest('button[data-info-key]');
    if (button) showInformation(button.dataset.infoKey);
  });

  /* ======================================================================== */
  /* 14A. VIEW, ZOOM AND NATIVE-PIXEL LIMIT                                   */
  /* ======================================================================== */
  function constrain() {
    const w = FULL_WIDTH * scale, h = FULL_HEIGHT * scale;
    x = w <= stage.clientWidth ? (stage.clientWidth - w) / 2 : clamp(x, stage.clientWidth - w, 0);
    y = h <= stage.clientHeight ? (stage.clientHeight - h) / 2 : clamp(y, stage.clientHeight - h, 0);
  }

  function setZoomLimits() {
    minScale = homeScale;
    maxScale = Math.max(minScale, fullReady ? 1 : PREVIEW_WIDTH / FULL_WIDTH);
  }

  function render() {
    constrain();
    subject.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    if (scale > homeScale * 1.08) requestFullResolution();
  }

  function home() {
    homeScale = Math.min(stage.clientWidth / FULL_WIDTH, stage.clientHeight / FULL_HEIGHT);
    scale = homeScale;
    x = (stage.clientWidth - FULL_WIDTH * scale) / 2;
    y = (stage.clientHeight - FULL_HEIGHT * scale) / 2;
    setZoomLimits();
    hideInformation();
    render();
  }

  function zoomAt(px, py, factor) {
    const next = clamp(scale * factor, minScale, maxScale);
    if (next === scale) return;
    const imageX = (px - x) / scale, imageY = (py - y) / scale;
    scale = next;
    x = px - imageX * scale;
    y = py - imageY * scale;
    hideInformation();
    render();
  }

  /* ======================================================================== */
  /* 15A. LOAD THE FULL 5053 × 5718 ORIGINAL IN THE BACKGROUND               */
  /* ======================================================================== */
  function requestFullResolution() {
    if (fullRequested || fullReady) return;
    fullRequested = true;
    const high = new Image();
    high.decoding = 'async';
    high.onload = () => {
      fullReady = true;
      source = 'full';
      subject.src = FULL;
      setZoomLimits();
      render();
    };
    high.onerror = () => { fullRequested = false; setZoomLimits(); };
    high.src = FULL;
  }

  /* ======================================================================== */
  /* 16A. PAN, PINCH AND TAP RECOGNITION                                      */
  /* A tap is accepted only if it moves less than 10px and never becomes a    */
  /* multi-touch gesture, so panning and pinching do not open information.    */
  /* ======================================================================== */
  function beginGesture() {
    const pts = [...pointers.values()];
    if (pts.length === 1) {
      gesture = { type: 'pan', px: pts[0].x, py: pts[0].y, x, y };
      stage.classList.add('grabbing');
    } else if (pts.length >= 2) {
      multiTouch = true;
      tapCandidate = null;
      const centre = midpoint(pts[0], pts[1]);
      gesture = {
        type: 'pinch',
        distance: Math.max(1, distance(pts[0], pts[1])),
        scale,
        imageX: (centre.x - x) / scale,
        imageY: (centre.y - y) / scale
      };
    }
  }

  stage.addEventListener('pointerdown', event => {
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
    } else if (pts.length >= 2) {
      if (gesture?.type !== 'pinch') beginGesture();
      const centre = midpoint(pts[0], pts[1]);
      scale = clamp(gesture.scale * distance(pts[0], pts[1]) / gesture.distance, minScale, maxScale);
      x = centre.x - gesture.imageX * scale;
      y = centre.y - gesture.imageY * scale;
      render();
    }
  });

  function releasePointer(event) {
    const wasTap = tapCandidate?.id === event.pointerId && !tapCandidate.moved && !multiTouch && pointers.size === 1;
    const tapX = event.clientX, tapY = event.clientY;
    pointers.delete(event.pointerId);

    if (pointers.size) return beginGesture();
    gesture = null;
    stage.classList.remove('grabbing');

    if (wasTap) {
      const hotspot = hotspotAt(tapX, tapY);
      hotspot ? showInformation(hotspot.key) : hideInformation();
    }

    tapCandidate = null;
    multiTouch = false;
  }

  stage.addEventListener('pointerup', releasePointer);
  stage.addEventListener('pointercancel', releasePointer);

  /* ======================================================================== */
  /* 16B. DESKTOP HOVER DISCOVERY — STILL NO VISIBLE MARKERS                  */
  /* ======================================================================== */
  stage.addEventListener('pointermove', event => {
    if (!pointers.size && event.pointerType !== 'touch') stage.classList.toggle('hotspot', Boolean(hotspotAt(event.clientX, event.clientY)));
  });
  stage.addEventListener('pointerleave', () => stage.classList.remove('hotspot'));

  /* ======================================================================== */
  /* 17A. ZOOM WITHOUT AN ON-SCREEN ZOOM BOX                                  */
  /* ======================================================================== */
  stage.addEventListener('wheel', event => {
    event.preventDefault();
    const rect = stage.getBoundingClientRect();
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, Math.exp(-event.deltaY * .0015));
  }, { passive: false });

  stage.addEventListener('dblclick', event => {
    const rect = stage.getBoundingClientRect();
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, 1.8);
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(home, 100);
  });

  /* ======================================================================== */
  /* 18A. INITIAL LOAD                                                        */
  /* ======================================================================== */
  subject.onload = () => {
    if (!previewReady) {
      previewReady = true;
      home();
      loading.classList.add('hide');
      setTimeout(() => loading.remove(), 450);
    }
  };

  subject.onerror = () => {
    if (source === 'preview') {
      source = 'full';
      subject.src = FULL;
    } else {
      loadingText.style.display = 'none';
      error.style.display = 'block';
    }
  };

  subject.src = PREVIEW;
  if ('requestIdleCallback' in window) requestIdleCallback(requestFullResolution, { timeout: 6000 });
  else setTimeout(requestFullResolution, 6000);
})();
