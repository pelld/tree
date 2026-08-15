(() => {
  /* ====================================================================== */
  /* 10A. CREATURE DATA                                                     */
  /* Every creature uses a high-resolution white-background specimen.       */
  /* There are deliberately no anatomical hotspots: tap the image, then    */
  /* explore anatomy and biology from the searchable information panel.     */
  /* ====================================================================== */
  const CREATURES = {
    /* -------------------------------------------------------------------- */
    /* 10A-1. HARLEQUIN BEETLE                                              */
    /* -------------------------------------------------------------------- */
    beetle: {
      name: 'Harlequin beetle', scientific: 'Acrocinus longimanus', meta: 'focus stacked',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg',
      width: 5053, height: 5718, previewWidth: 1800,
      credit: 'Photo: Didier Descouens · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Acrocinus_longimanus_MHNT_femelle.jpg',
      aria: 'High-resolution harlequin beetle photograph on a white background',
      alt: 'Female harlequin beetle on a white background', defaultInfo: 'overview',
      nav: ['overview', 'range', 'life', 'pattern', 'head', 'antennae', 'elytra', 'legs', 'hitchhikers'],
      information: {
        overview: { title: 'Harlequin beetle', text: 'Acrocinus longimanus is a large Neotropical longhorn beetle with a striking cream, orange-red and black pattern. Adults are mainly nocturnal and spend much of their time on trunks and branches. This photographed specimen is female; males can have much more exaggerated front legs.', sourceLabel: 'Smithsonian · species record', sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534' },
        range: { title: 'Range and habitat', text: 'It occurs from Mexico through Central America and across much of tropical South America. It is associated with forest habitats, especially weakened, dying or recently dead trees, which provide both meeting places for adults and food for developing larvae.', sourceLabel: 'Valle, Chatellenaz & Damborsky (2017)', sourceUrl: 'https://doi.org/10.15560/13.6.987' },
        life: { title: 'Life cycle', text: 'Eggs are laid on suitable wood. Larvae bore into the timber and spend most of their development hidden there, feeding and growing before pupating and emerging as adults. The visible adult is therefore only the final reproductive stage of a much longer wood-boring life.', sourceLabel: 'Valle, Chatellenaz & Damborsky (2017)', sourceUrl: 'https://doi.org/10.15560/13.6.987' },
        pattern: { title: 'Colour and pattern', text: 'The dramatic surface pattern is why the species is called the harlequin beetle. At high zoom the apparently flat colour fields resolve into textured parts of the hardened exoskeleton rather than smooth painted surfaces.', sourceLabel: 'Smithsonian · species record', sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534' },
        head: { title: 'Head', text: 'The head carries compound eyes, the bases of the long antennae and strong biting mouthparts. In close view it looks densely engineered, with the antennae arising close to the eyes and the mandibles creating a powerful front end.', sourceLabel: 'Smithsonian · species record', sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534' },
        antennae: { title: 'Antennae', text: 'As a longhorn beetle, this species has exceptionally long antennae. These segmented structures are major sensory organs for touch and chemical detection and help the beetle explore bark and detect biologically important cues.', sourceLabel: 'GBIF · Cerambycidae', sourceUrl: 'https://www.gbif.org/species/1118064' },
        elytra: { title: 'Elytra', text: 'The patterned covers over the back are elytra: the hardened first pair of wings. They protect the folded flight wings and abdomen beneath. When the beetle flies, the true aerodynamic wings unfold from underneath.', sourceLabel: 'Universidad Nacional de Colombia · species overview', sourceUrl: 'https://historianatural.unal.edu.co/expo1/escarabajo_eng.html' },
        legs: { title: 'Legs', text: 'Like all insects it has six jointed legs. Strong claws help it grip bark and branches. In males the front legs can become extremely elongated and are used in contests as well as locomotion.', sourceLabel: 'Zeh, Zeh & Tavakilian · Biotropica (1992)', sourceUrl: 'https://doi.org/10.2307/2388476' },
        hitchhikers: { title: 'Tiny hitchhikers', text: 'Harlequin beetles sometimes transport pseudoscorpions, tiny arachnids that cling to the much larger beetle and use it as a vehicle between dead trees. This relationship is called phoresy.', sourceLabel: 'Annals of the Entomological Society of America · phoresy review', sourceUrl: 'https://academic.oup.com/aesa/article/115/3/219/6506186' }
      }
    },

    /* -------------------------------------------------------------------- */
    /* 10A-2. BLUE MORPHO BUTTERFLY                                         */
    /* -------------------------------------------------------------------- */
    butterfly: {
      name: 'Blue morpho butterfly', scientific: 'Morpho helenor', meta: 'white-background specimen',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Morpho_helenor_helenor_MHNT_dos.jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Morpho_helenor_helenor_MHNT_dos.jpg',
      width: 4437, height: 3689, previewWidth: 1800,
      credit: 'Photo: Didier Descouens · CC BY-SA 4.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Morpho_helenor_helenor_MHNT_dos.jpg',
      aria: 'High-resolution blue morpho butterfly photograph on a white background',
      alt: 'Blue morpho butterfly, Morpho helenor, dorsal view on a white background', defaultInfo: 'overview',
      nav: ['overview', 'range', 'size', 'life', 'head', 'antennae', 'wings', 'scales', 'blue'],
      information: {
        overview: { title: 'Blue morpho butterfly', text: 'Morpho helenor is one of the best-known Neotropical blue morpho butterflies. Even as a museum specimen on plain white it appears almost luminous because the upper wing surface reflects intense blue. Morphos are iconic tropical butterflies, famous for both their size and the visual effect created by their colour.', sourceLabel: 'Wikimedia Commons · specimen page', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Morpho_helenor_helenor_MHNT_dos.jpg' },
        range: { title: 'Range and habitat', text: 'Morpho helenor occurs in the Neotropics, from parts of Central America into tropical South America. It is associated with humid forest habitats including lowland rainforest and forest edges. The specimen shown here was collected in French Guiana.', sourceLabel: 'Wikimedia Commons · specimen page', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Morpho_helenor_helenor_MHNT_dos.jpg' },
        size: { title: 'Size', text: 'Blue morphos are large butterflies with broad wings. Their scale alone makes them conspicuous, and in life the combination of size and colour creates a memorable flight impression as bright blue surfaces repeatedly catch the light.', sourceLabel: 'Morpho helenor · species overview', sourceUrl: 'https://en.wikipedia.org/wiki/Morpho_helenor' },
        life: { title: 'Life cycle', text: 'Like other butterflies, Morpho helenor passes through egg, caterpillar, pupa and adult stages. The larva is the main feeding and growing stage; the pupa is a period of radical reorganisation; and the adult seen here is the winged reproductive stage.', sourceLabel: 'Butterfly · life-cycle overview', sourceUrl: 'https://en.wikipedia.org/wiki/Butterfly' },
        head: { title: 'Head and eyes', text: 'The head carries compound eyes, antennae and the coiled proboscis. Compound eyes are built from many repeating visual units, giving butterflies excellent motion detection and a very different visual experience from our own.', sourceLabel: 'Butterfly · anatomy overview', sourceUrl: 'https://en.wikipedia.org/wiki/Butterfly' },
        antennae: { title: 'Antennae', text: 'Butterfly antennae are characteristically clubbed at their tips. They are important sensory organs involved in smell, orientation and the detection of air movement.', sourceLabel: 'Butterfly · anatomy overview', sourceUrl: 'https://en.wikipedia.org/wiki/Butterfly' },
        wings: { title: 'Wings', text: 'The butterfly has two forewings and two hindwings. Together they form both the flight surface and the main visual display. Veins support the wings while a dense covering of tiny scales creates their colour and texture.', sourceLabel: 'Wikimedia Commons · specimen page', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Morpho_helenor_helenor_MHNT_dos.jpg' },
        scales: { title: 'Wing scales', text: 'Butterfly wings are covered in countless tiny overlapping scales. Under magnification the surface is not smooth at all: it becomes a layered mosaic of minute structures.', sourceLabel: 'Butterfly · wing structure overview', sourceUrl: 'https://en.wikipedia.org/wiki/Butterfly' },
        blue: { title: 'Where the blue comes from', text: 'Much of the brilliant morpho blue is structural colour rather than simple pigment. Microscopic architecture in the wing scales reflects blue wavelengths strongly, producing the shimmering effect for which morphos are famous.', sourceLabel: 'Structural colour · overview', sourceUrl: 'https://en.wikipedia.org/wiki/Structural_coloration' }
      }
    },

    /* -------------------------------------------------------------------- */
    /* 10A-3. COMMON COCKCHAFER                                             */
    /* -------------------------------------------------------------------- */
    cockchafer: {
      name: 'Common cockchafer', scientific: 'Melolontha melolontha', meta: 'white-background specimen',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Melolontha_melolontha_MHNT.jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Melolontha_melolontha_MHNT.jpg',
      width: 3485, height: 5648, previewWidth: 1800,
      credit: 'Photo: Didier Descouens · CC BY-SA 4.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Melolontha_melolontha_MHNT.jpg',
      aria: 'High-resolution common cockchafer photograph on a white background',
      alt: 'Male common cockchafer, Melolontha melolontha, dorsal view on a white background', defaultInfo: 'overview',
      nav: ['overview', 'size', 'adult', 'life', 'antennae', 'head', 'thorax', 'elytra', 'legs', 'grubs'],
      information: {
        overview: { title: 'Common cockchafer', text: 'Melolontha melolontha — the common cockchafer or May bug — is a large scarab beetle. The adult has reddish-brown wing cases, a hairy body and extraordinary fan-like antennae. The specimen shown here is male, which is especially useful because the male antennae have the larger sensory fans.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        size: { title: 'Size', text: 'Adults are roughly 2.5–3 centimetres long, making the common cockchafer one of the larger familiar beetles in Britain. The combination of a bulky body, strong legs and large antennae makes it appear even more substantial when viewed close up.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        adult: { title: 'Adult life', text: 'Adult cockchafers live for only about five or six weeks. During this short phase they search for mates and feed on leaves in treetops. They fly mainly at dusk on warm evenings, produce a noticeable humming sound and are strongly attracted to lights.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        life: { title: 'Life cycle', text: 'Most of a cockchafer’s life happens underground. The larvae spend several years in the soil before pupating and emerging as adults. This means the conspicuous flying beetle is only a brief final stage after a much longer hidden juvenile life.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        antennae: { title: 'Fan-like antennae', text: 'The orange antennae end in a remarkable fan of movable plates called lamellae. They dramatically increase the sensory surface area. Males have larger fans than females, helping them detect chemical cues while searching for mates.', sourceLabel: 'Woodland Trust · cockchafer beetle', sourceUrl: 'https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/animals/beetles/cockchafer-beetle/' },
        head: { title: 'Head', text: 'The compact head carries the compound eyes, chewing mouthparts and the bases of those elaborate antennae. At high magnification the contrast between the smooth eye, articulated antenna and heavily sculptured mouthparts becomes particularly clear.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        thorax: { title: 'Hairy thorax', text: 'The thorax is densely covered with fine hairs and contains the muscles that power the legs and wings. Its texture contrasts strongly with the smoother brown wing cases behind it, making it one of the most rewarding areas to inspect at full resolution.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        elytra: { title: 'Elytra and wings', text: 'The reddish-brown covers over the back are hardened forewings called elytra. They protect the more delicate flight wings underneath. When the beetle flies, the elytra lift while the membranous hind wings unfold and do the aerodynamic work.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' },
        legs: { title: 'Legs and claws', text: 'Six sturdy jointed legs carry prominent spines and hooked claws for gripping vegetation and rough surfaces. At close range the legs look far more mechanical than they do to the naked eye, with sharply defined joints, hairs and claws.', sourceLabel: 'Wikimedia Commons · specimen page', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Melolontha_melolontha_MHNT.jpg' },
        grubs: { title: 'Underground grubs', text: 'Cockchafer larvae are large white C-shaped grubs with brown heads and six legs. They live underground for three to four years and feed on plant roots. In large numbers they can damage grassland and crops, while also providing food for other animals.', sourceLabel: 'Natural History Museum · cockchafer guide', sourceUrl: 'https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html' }
      }
    }
  };

  /* ====================================================================== */
  /* 10B. DOM REFERENCES                                                    */
  /* ====================================================================== */
  const homeScreen = document.getElementById('homeScreen');
  const viewerShell = document.getElementById('viewerShell');
  const collectionButton = document.getElementById('collectionButton');
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
  const infoSearch = document.getElementById('infoSearch');
  const infoNav = document.getElementById('infoNav');
  const infoSource = document.getElementById('infoSource');
  const loading = document.getElementById('loading');
  const loadingText = document.getElementById('loadingText');
  const error = document.getElementById('error');

  /* ====================================================================== */
  /* 10C. CURRENT CREATURE + VIEW STATE                                     */
  /* ====================================================================== */
  let speciesKey = null;
  let current = null;
  let selectedInfoKey = null;
  let loadToken = 0;
  let idleLoadHandle = null;
  let x = 0, y = 0, scale = 1, homeScale = 1, minScale = 1, maxScale = 1;
  let previewReady = false, fullReady = false, fullRequested = false, source = 'preview';
  let gesture = null, tapCandidate = null, multiTouch = false;
  const pointers = new Map();
  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
  const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  /* ====================================================================== */
  /* 11A. HOME / VIEWER ROUTING                                             */
  /* The root URL is the collection. Hashes create useful deep links and    */
  /* allow the browser Back button to return naturally to the home page.    */
  /* ====================================================================== */
  function showCollection() {
    loadToken += 1;
    if (idleLoadHandle !== null) {
      if ('cancelIdleCallback' in window) cancelIdleCallback(idleLoadHandle);
      else clearTimeout(idleLoadHandle);
      idleLoadHandle = null;
    }
    pointers.clear();
    gesture = null;
    tapCandidate = null;
    multiTouch = false;
    setSpeciesMenu(false);
    hideInformation();
    viewerShell.hidden = true;
    homeScreen.hidden = false;
    document.body.classList.remove('viewer-mode');
    document.body.classList.add('home-mode');
    document.title = 'Natural history close-up collection';
  }

  function showViewer(key) {
    if (!CREATURES[key]) {
      showCollection();
      return;
    }
    homeScreen.hidden = true;
    viewerShell.hidden = false;
    document.body.classList.remove('home-mode');
    document.body.classList.add('viewer-mode');
    switchSpecies(key);
  }

  function routeFromHash() {
    const key = location.hash.replace(/^#/, '').trim();
    if (CREATURES[key]) showViewer(key);
    else showCollection();
  }

  document.querySelectorAll('[data-open-species]').forEach(button => {
    button.addEventListener('click', () => { location.hash = button.dataset.openSpecies; });
  });

  collectionButton.addEventListener('click', () => {
    history.pushState(null, '', `${location.pathname}${location.search}`);
    showCollection();
  });

  window.addEventListener('hashchange', routeFromHash);
  window.addEventListener('popstate', routeFromHash);

  /* ====================================================================== */
  /* 11B. INFORMATION PANEL                                                 */
  /* ====================================================================== */
  function buildInfoNavigation() {
    if (!current) return;
    const query = infoSearch.value.trim().toLowerCase();
    infoNav.replaceChildren();
    current.nav.forEach(key => {
      const item = current.information[key];
      if (!item) return;
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
    if (!current) return;
    const item = current.information[key];
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
  /* 11C. SPECIES SWITCHER                                                  */
  /* ====================================================================== */
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
    const next = button.dataset.species;
    if (next === speciesKey) setSpeciesMenu(false);
    else location.hash = next;
  });

  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#speciesPanel')) setSpeciesMenu(false);
  });

  /* ====================================================================== */
  /* 12A. VIEWER + SHARPNESS-AWARE ZOOM                                    */
  /* ====================================================================== */
  function pointInsideImage(clientX, clientY) {
    return current && clientX >= x && clientX <= x + current.width * scale && clientY >= y && clientY <= y + current.height * scale;
  }

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

  function homeView() {
    if (!current || viewerShell.hidden) return;
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

  /* ====================================================================== */
  /* 12B. FULL-RESOLUTION UPGRADE                                           */
  /* ====================================================================== */
  function requestFullResolution() {
    if (!current || fullRequested || fullReady) return;
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
    const run = () => { if (requestToken === loadToken) requestFullResolution(); };
    if ('requestIdleCallback' in window) idleLoadHandle = requestIdleCallback(run, { timeout: 6000 });
    else idleLoadHandle = setTimeout(run, 5000);
  }

  /* ====================================================================== */
  /* 12C. APPLY A CREATURE                                                  */
  /* ====================================================================== */
  function switchSpecies(key) {
    if (!CREATURES[key]) return;
    loadToken += 1;
    speciesKey = key;
    current = CREATURES[key];
    selectedInfoKey = current.defaultInfo;
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
    infoSearch.value = '';
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

  /* ====================================================================== */
  /* 13A. IMAGE LOAD / FALLBACK                                             */
  /* ====================================================================== */
  subject.addEventListener('load', () => {
    if (source === 'preview' && !previewReady) {
      previewReady = true;
      homeView();
      loading.classList.add('hide');
      scheduleFullResolution();
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
      subject.src = current.full;
      return;
    }
    loadingText.style.display = 'none';
    error.style.display = 'block';
  });

  /* ====================================================================== */
  /* 13B. PAN, PINCH AND TAP                                               */
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
    if (pointers.size) {
      beginGesture();
      return;
    }
    gesture = null;
    stage.classList.remove('grabbing');
    if (wasTap) {
      if (pointInsideImage(tapX, tapY)) showInformation(current.defaultInfo);
      else hideInformation();
    }
    tapCandidate = null;
    multiTouch = false;
  }

  stage.addEventListener('pointerup', releasePointer);
  stage.addEventListener('pointercancel', releasePointer);

  /* ====================================================================== */
  /* 13C. WHEEL / DOUBLE-CLICK / RESIZE                                     */
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
    if (!viewerShell.hidden) resizeTimer = setTimeout(homeView, 100);
  });

  /* ====================================================================== */
  /* 14A. INITIALISE                                                        */
  /* No creature is selected automatically: root navigation starts at home. */
  /* ====================================================================== */
  routeFromHash();
})();
