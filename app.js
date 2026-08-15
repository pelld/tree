(() => {
  /* ======================================================================== */
  /* 10A. CREATURE COLLECTION                                                 */
  /* Each creature owns its image, dimensions, credits, information topics    */
  /* and invisible clickable anatomy. Adding a third creature later only      */
  /* requires another entry here plus one selector button in index.html.       */
  /* ======================================================================== */
  const SPECIES = {
    beetle: {
      name: 'Harlequin beetle',
      scientific: 'Acrocinus longimanus',
      meta: 'focus stacked · female',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg',
      width: 5053,
      height: 5718,
      previewWidth: 1800,
      alt: 'Female harlequin beetle, Acrocinus longimanus, viewed from above',
      aria: 'High-resolution focus-stacked photograph of a female harlequin beetle',
      credit: 'Photo: Didier Descouens · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Acrocinus_longimanus_MHNT_femelle.jpg',
      nav: ['overview', 'range', 'life', 'behaviour', 'hitchhikers'],
      information: {
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
          text: 'Harlequin beetles can carry pseudoscorpions — tiny arachnids that use the beetles as transport between dead trees. Some even mate on the beetle, turning it into both transport and a mating arena.',
          sourceLabel: 'Annals of the Entomological Society of America · phoresy review',
          sourceUrl: 'https://academic.oup.com/aesa/article/115/3/219/6506186'
        },
        head: {
          title: 'Head',
          text: 'The head carries the compound eyes, mouthparts and antenna bases. The mandibles are the beetle’s main biting and manipulating mouthparts.',
          sourceLabel: 'Smithsonian · species record',
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
      },
      hotspots: [
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
      ]
    },

    moth: {
      name: 'Giant peacock moth',
      scientific: 'Saturnia pyri',
      meta: 'focus stacked · male',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saturnia_pyri_MHNT_dos.jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saturnia_pyri_MHNT_dos.jpg',
      width: 5630,
      height: 3742,
      previewWidth: 1800,
      alt: 'Male giant peacock moth, Saturnia pyri, dorsal view with wings spread',
      aria: 'High-resolution focus-stacked photograph of a male giant peacock moth',
      credit: 'Photo: Didier Descouens · CC BY-SA 4.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Saturnia_pyri_MHNT_dos.jpg',
      nav: ['overview', 'range', 'life', 'adult', 'eyespots'],
      information: {
        overview: {
          title: 'Giant peacock moth',
          text: 'Saturnia pyri is a giant silk moth in the family Saturniidae and the largest moth in Europe. Its broad grey-brown wings carry four conspicuous eye-like markings, one on each wing.',
          sourceLabel: 'LPO · Grand paon de nuit',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        range: {
          title: 'Range and habitat',
          text: 'The giant peacock moth occurs across southern and parts of central Europe, North Africa and western Asia. It is associated with open woodland, scrub, parks, gardens and traditional orchards.',
          sourceLabel: 'LPO · Grand paon de nuit',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        life: {
          title: 'Life cycle',
          text: 'Eggs are laid on host plants. The caterpillar becomes very large and green, feeding on fruit trees and other deciduous trees before pupating inside a tough silken cocoon. The pupa can overwinter before the adult emerges.',
          sourceLabel: 'LPO · Grand paon de nuit',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        adult: {
          title: 'A brief adult life',
          text: 'Adults are crepuscular and nocturnal. They have no functional feeding proboscis, so the adult moth does not eat; it lives on reserves accumulated as a caterpillar. Males use their large feathered antennae to detect females over long distances.',
          sourceLabel: 'LPO · Grand paon de nuit',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        eyespots: {
          title: 'Four “peacock eyes”',
          text: 'Each of the four wings carries a large ocellus — an eye-like ringed marking. These striking spots give the species its common name and are among its easiest identification features.',
          sourceLabel: 'LPO · identification',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        head: {
          title: 'Head',
          text: 'The small head sits between the heavily furred thorax and the antennae. In the adult giant peacock moth the mouthparts are reduced and there is no functional proboscis for feeding.',
          sourceLabel: 'LPO · adult biology',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        antennae: {
          title: 'Feathered antennae',
          text: 'This specimen is male. The broad, feather-like antennae provide a large sensory surface for detecting sex pheromones released by females.',
          sourceLabel: 'LPO · reproduction',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        wings: {
          title: 'Wings',
          text: 'The apparent colour and pattern are produced by countless microscopic scales covering the wing membranes. The four broad wings together can span well over 15 centimetres in a large individual.',
          sourceLabel: 'LPO · description',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        abdomen: {
          title: 'Abdomen',
          text: 'The abdomen is densely clothed in hair-like scales. Adult energy reserves are finite because the moth cannot feed, so the adult stage is devoted largely to finding a mate and reproducing.',
          sourceLabel: 'LPO · adult biology',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        }
      },
      hotspots: [
        { key: 'head', regions: [{ type: 'ellipse', x: .50, y: .385, rx: .045, ry: .045 }] },
        { key: 'antennae', regions: [
          { type: 'capsule', ax: .485, ay: .390, bx: .415, by: .285, r: .035 },
          { type: 'capsule', ax: .515, ay: .390, bx: .585, by: .285, r: .035 }
        ] },
        { key: 'eyespots', regions: [
          { type: 'ellipse', x: .305, y: .360, rx: .060, ry: .075 },
          { type: 'ellipse', x: .695, y: .360, rx: .060, ry: .075 },
          { type: 'ellipse', x: .345, y: .610, rx: .055, ry: .070 },
          { type: 'ellipse', x: .655, y: .610, rx: .055, ry: .070 }
        ] },
        { key: 'abdomen', regions: [{ type: 'ellipse', x: .50, y: .610, rx: .050, ry: .200 }] },
        { key: 'wings', regions: [
          { type: 'ellipse', x: .300, y: .500, rx: .245, ry: .330 },
          { type: 'ellipse', x: .700, y: .500, rx: .245, ry: .330 }
        ] },
        { key: 'overview', regions: [{ type: 'ellipse', x: .50, y: .520, rx: .405, ry: .385 }] }
      ]
    }
  };

  /* ======================================================================== */
  /* 10B. DOM REFERENCES                                                      */
  /* ======================================================================== */
  const stage = document.getElementById('stage');
  const subject = document.getElementById('subject');
  const speciesButton = document.getElementById('speciesButton');
  const speciesMenu = document.getElementById('speciesMenu');
  const speciesName = document.getElementById('speciesName');
  const speciesMeta = document.getElementById('speciesMeta');
  const photoCredit = document.getElementById('photoCredit');
  const infoCard = document.getElementById('infoCard');
  const infoTitle = document.getElementById('infoTitle');
  const infoText = document.getElementById('infoText');
  const infoNav = document.getElementById('infoNav');
  const infoSource = document.getElementById('infoSource');
  const loading = document.getElementById('loading');
  const loadingText = document.getElementById('loadingText');
  const error = document.getElementById('error');

  /* ======================================================================== */
  /* 10C. CURRENT SPECIES, VIEW AND INPUT STATE                               */
  /* ======================================================================== */
  let speciesKey = 'beetle';
  let current = SPECIES[speciesKey];
  let loadToken = 0;
  let idleLoadHandle = null;

  let x = 0;
  let y = 0;
  let scale = 1;
  let homeScale = 1;
  let minScale = 1;
  let maxScale = 1;

  let previewReady = false;
  let fullReady = false;
  let fullRequested = false;
  let source = 'preview';

  let gesture = null;
  let tapCandidate = null;
  let multiTouch = false;
  const pointers = new Map();

  /* ======================================================================== */
  /* 11A. SMALL MATH HELPERS                                                  */
  /* ======================================================================== */
  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
  const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  function distanceToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;
    const t = lengthSquared ? clamp(((px - ax) * dx + (py - ay) * dy) / lengthSquared, 0, 1) : 0;
    return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
  }

  /* ======================================================================== */
  /* 12A. INVISIBLE HOTSPOT HIT TESTING                                       */
  /* All coordinates are normalised, so the same logic survives every zoom    */
  /* level and every screen size. Nothing is ever drawn over the photograph.   */
  /* ======================================================================== */
  function insideRegion(nx, ny, region) {
    if (region.type === 'ellipse') {
      const dx = (nx - region.x) / region.rx;
      const dy = (ny - region.y) / region.ry;
      return dx * dx + dy * dy <= 1;
    }

    return distanceToSegment(nx, ny, region.ax, region.ay, region.bx, region.by) <= region.r;
  }

  function hotspotAt(clientX, clientY) {
    const nx = ((clientX - x) / scale) / current.width;
    const ny = ((clientY - y) / scale) / current.height;

    if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return null;
    return current.hotspots.find(hotspot => hotspot.regions.some(region => insideRegion(nx, ny, region))) || null;
  }

  /* ======================================================================== */
  /* 13A. INFORMATION CARD                                                    */
  /* The source is the final element in the card, beneath the general-topic    */
  /* buttons, as requested.                                                    */
  /* ======================================================================== */
  function buildInfoNavigation() {
    infoNav.replaceChildren();

    current.nav.forEach(key => {
      const item = current.information[key];
      if (!item) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.infoKey = key;
      button.textContent = item.title;
      infoNav.appendChild(button);
    });
  }

  function showInformation(key) {
    const item = current.information[key];
    if (!item) return;

    infoTitle.textContent = item.title;
    infoText.textContent = item.text;
    infoSource.textContent = `Source: ${item.sourceLabel}`;
    infoSource.href = item.sourceUrl;

    infoNav.querySelectorAll('button').forEach(button => {
      button.classList.toggle('active', button.dataset.infoKey === key);
    });

    infoCard.classList.add('open');
    infoCard.setAttribute('aria-hidden', 'false');
  }

  function hideInformation() {
    infoCard.classList.remove('open');
    infoCard.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('infoClose').addEventListener('click', hideInformation);
  infoNav.addEventListener('click', event => {
    const button = event.target.closest('button[data-info-key]');
    if (button) showInformation(button.dataset.infoKey);
  });

  /* ======================================================================== */
  /* 13B. SPECIES SWITCHER                                                    */
  /* The title is the switcher. The menu exists only while it is being used.  */
  /* ======================================================================== */
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
    const button = event.target.closest('button[data-species]');
    if (!button) return;
    switchSpecies(button.dataset.species);
  });

  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#speciesPanel')) setSpeciesMenu(false);
  });

  /* ======================================================================== */
  /* 14A. POSITION CONSTRAINTS + SHARPNESS-AWARE ZOOM LIMIT                   */
  /* The original source caps at scale = 1, so the browser never goes beyond   */
  /* one CSS pixel per source pixel. Before the original arrives, the preview  */
  /* has its own lower native-pixel ceiling.                                   */
  /* ======================================================================== */
  function constrainPosition() {
    const drawnWidth = current.width * scale;
    const drawnHeight = current.height * scale;

    x = drawnWidth <= stage.clientWidth ? (stage.clientWidth - drawnWidth) / 2 : clamp(x, stage.clientWidth - drawnWidth, 0);
    y = drawnHeight <= stage.clientHeight ? (stage.clientHeight - drawnHeight) / 2 : clamp(y, stage.clientHeight - drawnHeight, 0);
  }

  function setZoomLimits() {
    minScale = homeScale;
    maxScale = Math.max(minScale, fullReady ? 1 : current.previewWidth / current.width);
  }

  function render() {
    constrainPosition();
    subject.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

    if (scale > homeScale * 1.08) requestFullResolution();
  }

  function home() {
    homeScale = Math.min(stage.clientWidth / current.width, stage.clientHeight / current.height);
    scale = homeScale;
    x = (stage.clientWidth - current.width * scale) / 2;
    y = (stage.clientHeight - current.height * scale) / 2;
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

  /* ======================================================================== */
  /* 15A. FULL-RESOLUTION UPGRADE                                             */
  /* A token prevents a slow image from the previous species replacing the    */
  /* newly selected species after the user switches.                          */
  /* ======================================================================== */
  function requestFullResolution() {
    if (fullRequested || fullReady) return;

    fullRequested = true;
    const requestToken = loadToken;
    const requestedSpecies = speciesKey;
    const highResolution = new Image();
    highResolution.decoding = 'async';

    highResolution.onload = () => {
      if (requestToken !== loadToken || requestedSpecies !== speciesKey) return;
      fullReady = true;
      source = 'full';
      subject.src = current.full;
      setZoomLimits();
      render();
    };

    highResolution.onerror = () => {
      if (requestToken !== loadToken || requestedSpecies !== speciesKey) return;
      fullRequested = false;
      setZoomLimits();
    };

    highResolution.src = current.full;
  }

  function scheduleFullResolution() {
    const requestToken = loadToken;
    const run = () => {
      if (requestToken === loadToken) requestFullResolution();
    };

    if ('requestIdleCallback' in window) idleLoadHandle = requestIdleCallback(run, { timeout: 6000 });
    else idleLoadHandle = setTimeout(run, 5000);
  }

  /* ======================================================================== */
  /* 15B. APPLY A SPECIES                                                     */
  /* ======================================================================== */
  function switchSpecies(key) {
    if (!SPECIES[key]) return;

    loadToken += 1;
    speciesKey = key;
    current = SPECIES[key];

    previewReady = false;
    fullReady = false;
    fullRequested = false;
    source = 'preview';
    pointers.clear();
    gesture = null;
    tapCandidate = null;
    multiTouch = false;

    if (idleLoadHandle !== null) {
      if ('cancelIdleCallback' in window) cancelIdleCallback(idleLoadHandle);
      else clearTimeout(idleLoadHandle);
      idleLoadHandle = null;
    }

    hideInformation();
    setSpeciesMenu(false);
    buildInfoNavigation();

    document.title = `${current.name} — high-detail creature zoom`;
    speciesName.textContent = current.name;
    speciesMeta.innerHTML = `<i>${current.scientific}</i> · ${current.meta}`;
    stage.setAttribute('aria-label', current.aria);
    subject.alt = current.alt;
    subject.style.width = `${current.width}px`;
    subject.style.height = `${current.height}px`;

    photoCredit.textContent = current.credit;
    photoCredit.href = current.creditUrl;

    speciesMenu.querySelectorAll('button[data-species]').forEach(button => {
      button.classList.toggle('active', button.dataset.species === speciesKey);
    });

    loading.classList.remove('hide');
    loadingText.style.display = '';
    error.style.display = 'none';
    loadingText.textContent = `Loading ${current.name.toLowerCase()}…`;

    subject.src = current.preview;
  }

  /* ======================================================================== */
  /* 16A. IMAGE LOAD / ERROR HANDLING                                         */
  /* ======================================================================== */
  subject.addEventListener('load', () => {
    if (source === 'preview' && !previewReady) {
      previewReady = true;
      home();
      loading.classList.add('hide');
      scheduleFullResolution();
    }
  });

  subject.addEventListener('error', () => {
    if (source === 'preview') {
      source = 'full';
      fullRequested = true;
      subject.src = current.full;
      return;
    }

    loadingText.style.display = 'none';
    error.style.display = 'block';
  });

  /* ======================================================================== */
  /* 17A. START PAN OR PINCH                                                  */
  /* ======================================================================== */
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
      gesture = {
        type: 'pinch',
        distance: Math.max(1, distance(points[0], points[1])),
        scale,
        imageX: (centre.x - x) / scale,
        imageY: (centre.y - y) / scale
      };
      stage.classList.add('grabbing');
    }
  }

  /* ======================================================================== */
  /* 17B. POINTER DOWN / MOVE                                                 */
  /* A tap is accepted only if it moves less than 10px and never becomes a    */
  /* multi-touch gesture, so dragging and pinching never open information.    */
  /* ======================================================================== */
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
    if (!pointers.has(event.pointerId)) {
      if (event.pointerType === 'mouse') stage.classList.toggle('hotspot', Boolean(hotspotAt(event.clientX, event.clientY)));
      return;
    }

    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (tapCandidate?.id === event.pointerId && Math.hypot(event.clientX - tapCandidate.x, event.clientY - tapCandidate.y) > 10) {
      tapCandidate.moved = true;
    }

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
      const nextScale = clamp(gesture.scale * distance(points[0], points[1]) / gesture.distance, minScale, maxScale);
      scale = nextScale;
      x = centre.x - gesture.imageX * scale;
      y = centre.y - gesture.imageY * scale;
      hideInformation();
      render();
    }
  });

  /* ======================================================================== */
  /* 17C. POINTER UP / TAP-TO-LEARN                                           */
  /* ======================================================================== */
  function releasePointer(event) {
    const wasTap = tapCandidate?.id === event.pointerId && !tapCandidate.moved && !multiTouch;
    const tapX = event.clientX;
    const tapY = event.clientY;

    pointers.delete(event.pointerId);

    if (pointers.size) beginGesture();
    else {
      gesture = null;
      stage.classList.remove('grabbing');

      if (wasTap) {
        const hotspot = hotspotAt(tapX, tapY);
        if (hotspot) showInformation(hotspot.key);
        else hideInformation();
      }

      tapCandidate = null;
      multiTouch = false;
    }
  }

  stage.addEventListener('pointerup', releasePointer);
  stage.addEventListener('pointercancel', releasePointer);

  /* ======================================================================== */
  /* 18A. WHEEL + DOUBLE-CLICK ZOOM                                           */
  /* There is deliberately no permanent zoom control on the page.             */
  /* ======================================================================== */
  stage.addEventListener('wheel', event => {
    event.preventDefault();
    const rect = stage.getBoundingClientRect();
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, Math.exp(-event.deltaY * 0.0015));
  }, { passive: false });

  stage.addEventListener('dblclick', event => {
    const rect = stage.getBoundingClientRect();
    zoomAt(event.clientX - rect.left, event.clientY - rect.top, 1.8);
  });

  /* ======================================================================== */
  /* 18B. RESIZE                                                              */
  /* ======================================================================== */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(home, 100);
  });

  /* ======================================================================== */
  /* 19A. INITIALISE THE COLLECTION                                           */
  /* ======================================================================== */
  switchSpecies('beetle');
})();
