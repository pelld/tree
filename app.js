(() => {
  /* ======================================================================== */
  /* 10A. CREATURE COLLECTION                                                 */
  /* Each creature owns its image sources, native dimensions, credit and      */
  /* detailed reading topics. There are deliberately NO anatomical hotspots.  */
  /* ======================================================================== */
  const SPECIES = {
    /* ---------------------------------------------------------------------- */
    /* 10A-1. HARLEQUIN BEETLE                                                */
    /* ---------------------------------------------------------------------- */
    beetle: {
      name: 'Harlequin beetle',
      scientific: 'Acrocinus longimanus',
      meta: 'focus stacked',
      aria: 'High-resolution focus-stacked photograph of a harlequin beetle',
      alt: 'Female harlequin beetle, Acrocinus longimanus, viewed from above',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acrocinus_longimanus_MHNT_femelle.jpg',
      width: 5053,
      height: 5718,
      previewWidth: 1800,
      credit: 'Photo: Didier Descouens · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Acrocinus_longimanus_MHNT_femelle.jpg',
      defaultInfo: 'overview',
      nav: ['overview', 'range', 'size', 'life', 'behaviour', 'pattern', 'bodyplan', 'head', 'antennae', 'pronotum', 'elytra', 'legs', 'hitchhikers'],
      information: {
        overview: {
          title: 'Harlequin beetle',
          text: 'Acrocinus longimanus is a large Neotropical longhorn beetle in the family Cerambycidae. Its cream, orange-red and black pattern makes it one of the most distinctive tropical beetles. Adults are mainly nocturnal and spend much of their time on trunks and branches. This photograph shows a female; males are even more extraordinary because their front legs can become dramatically elongated.',
          sourceLabel: 'Smithsonian · species record',
          sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534'
        },
        range: {
          title: 'Range and habitat',
          text: 'Harlequin beetles occur from Mexico through Central America and across a large part of tropical South America, extending south into Argentina. They are forest insects, but their reproduction is especially tied to freshly dead, dying or damaged trees. Those trees provide both a meeting place for adults and the wood in which the next generation develops.',
          sourceLabel: 'Valle, Chatellenaz & Damborsky (2017)',
          sourceUrl: 'https://doi.org/10.15560/13.6.987'
        },
        size: {
          title: 'Size',
          text: 'The species is a genuinely large beetle. Body length is several centimetres even before the long antennae and legs are considered. Males can look much larger than females because the front legs are disproportionately extended, so total span is a poor guide to body size. The female shown here has the more compact leg proportions.',
          sourceLabel: 'Smithsonian · species record',
          sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534'
        },
        life: {
          title: 'Life cycle',
          text: 'Females select recently dead, dying or weakened trees for egg laying. After hatching, the larvae bore into the wood and feed there, hidden from view, for most of their development. They eventually pupate within the timber and later emerge as winged adults. The conspicuous adult therefore represents only the mobile reproductive phase of a life largely spent inside wood.',
          sourceLabel: 'Valle, Chatellenaz & Damborsky (2017)',
          sourceUrl: 'https://doi.org/10.15560/13.6.987'
        },
        behaviour: {
          title: 'Behaviour and sex differences',
          text: 'Adults are primarily nocturnal. Males use their exceptionally long front legs in contests with rival males and while guarding females or suitable egg-laying sites. The exaggerated male limbs are a striking example of sexual selection: a structure can become extreme not because it helps ordinary movement, but because it improves success in competition for mates.',
          sourceLabel: 'Zeh, Zeh & Tavakilian · Biotropica (1992)',
          sourceUrl: 'https://doi.org/10.2307/2388476'
        },
        pattern: {
          title: 'Colour and pattern',
          text: 'The harlequin pattern is built from sharply contrasting black, pale yellow or cream and orange-red areas across the upper surface. The exact appearance varies between individuals, but the bold mosaic is characteristic enough to inspire the common name. At high zoom you can also see that the apparently smooth coloured fields are textured parts of the beetle’s hardened exoskeleton.',
          sourceLabel: 'Smithsonian · species record',
          sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534'
        },
        bodyplan: {
          title: 'Body plan',
          text: 'Like every beetle, the harlequin beetle has a head, a three-part thorax and an abdomen. Three pairs of legs attach to the thorax. The first pair of wings has been transformed into hardened covers called elytra; the delicate flight wings fold beneath them. That beetle body plan combines strong armour with the ability to fly.',
          sourceLabel: 'Universidad Nacional de Colombia · species overview',
          sourceUrl: 'https://historianatural.unal.edu.co/expo1/escarabajo_eng.html'
        },
        head: {
          title: 'Head',
          text: 'The head carries the compound eyes, the bases of the long antennae and the biting mouthparts. The mandibles are robust structures used to grip and manipulate material. Because the antennae originate close to the eyes, the front of a longhorn beetle can look crowded and highly mechanical when magnified.',
          sourceLabel: 'Smithsonian · species record',
          sourceUrl: 'https://www.si.edu/object/giant-harlequin-beetle-harlequin-beetle:nmnheducation_10866534'
        },
        antennae: {
          title: 'Antennae',
          text: 'Cerambycidae are called longhorn beetles because long antennae are one of the family’s defining features. The many jointed segments form sensitive organs for touch and chemical detection. Antennae help the beetle investigate bark, orient itself in darkness and detect biologically important chemical cues without needing to see them.',
          sourceLabel: 'GBIF · Cerambycidae classification',
          sourceUrl: 'https://www.gbif.org/species/1118064'
        },
        pronotum: {
          title: 'Pronotum',
          text: 'The pronotum is the shield-like upper plate immediately behind the head. It belongs to the first thoracic segment, the segment that carries the front pair of legs. Its shape, markings and surface texture are useful identification features in beetles, and under magnification it forms a clear structural transition between head and wing cases.',
          sourceLabel: 'Universidad Nacional de Colombia · morphology',
          sourceUrl: 'https://historianatural.unal.edu.co/expo1/escarabajo_eng.html'
        },
        elytra: {
          title: 'Elytra and flight wings',
          text: 'The patterned structures covering most of the back are the elytra — the hardened first pair of wings. They act as armour for the soft abdomen and the folded flight wings beneath. When the beetle flies, the elytra lift away from the body while the much thinner hind wings unfold and provide the actual aerodynamic surface.',
          sourceLabel: 'Universidad Nacional de Colombia · species overview',
          sourceUrl: 'https://historianatural.unal.edu.co/expo1/escarabajo_eng.html'
        },
        legs: {
          title: 'Legs',
          text: 'Like all insects, the beetle has six jointed legs. Strong claws at the ends help it grip irregular bark and branches. In females the three pairs are relatively balanced; in adult males the front pair can become enormously elongated and are used in competitive interactions as well as movement. The difference between the sexes is one of the species’ most remarkable features.',
          sourceLabel: 'Zeh, Zeh & Tavakilian · Biotropica (1992)',
          sourceUrl: 'https://doi.org/10.2307/2388476'
        },
        hitchhikers: {
          title: 'Tiny hitchhikers',
          text: 'Harlequin beetles can carry pseudoscorpions — tiny arachnids that cling to the much larger beetle and use it as transport between dead trees. This relationship is called phoresy. Some pseudoscorpions even court and mate while travelling, meaning a single beetle can function simultaneously as aircraft, meeting place and mating arena for organisms only a fraction of its size.',
          sourceLabel: 'Annals of the Entomological Society of America · phoresy review',
          sourceUrl: 'https://academic.oup.com/aesa/article/115/3/219/6506186'
        }
      }
    },

    /* ---------------------------------------------------------------------- */
    /* 10A-2. GIANT PEACOCK MOTH — NATURAL BACKGROUND                        */
    /* ---------------------------------------------------------------------- */
    moth: {
      name: 'Giant peacock moth',
      scientific: 'Saturnia pyri',
      meta: 'natural photograph',
      aria: 'High-resolution photograph of a giant peacock moth on a natural background',
      alt: 'Giant peacock moth, Saturnia pyri, resting with its wings open',
      preview: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saturnia_pyri_(Giant_Peacock_moth).jpg?width=1800',
      full: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saturnia_pyri_(Giant_Peacock_moth).jpg',
      width: 9248,
      height: 6944,
      previewWidth: 1800,
      credit: 'Photo: Vegard Nossum · CC BY-SA 4.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Saturnia_pyri_(Giant_Peacock_moth).jpg',
      defaultInfo: 'overview',
      nav: ['overview', 'range', 'size', 'life', 'caterpillar', 'adult', 'pheromones', 'head', 'antennae', 'wings', 'scales', 'eyespots', 'abdomen'],
      information: {
        overview: {
          title: 'Giant peacock moth',
          text: 'Saturnia pyri is the largest moth in Europe and one of the most impressive members of the giant silk moth family Saturniidae. Its broad grey-brown wings, thick furry body and four enormous eye-like markings make it unmistakable. Adults fly mainly around dusk and at night, and the adult stage is surprisingly brief compared with the long period spent growing as a caterpillar.',
          sourceLabel: 'LPO · Grand paon de nuit',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        range: {
          title: 'Range and habitat',
          text: 'The giant peacock moth occurs across southern Europe and parts of central Europe, as well as North Africa and western Asia. It favours landscapes containing suitable deciduous host trees: traditional orchards, gardens, parks, open woodland and scrub can all provide habitat. The species is not native to Britain, although occasional records have occurred there.',
          sourceLabel: 'LPO · Grand paon de nuit',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        size: {
          title: 'Europe’s largest moth',
          text: 'A large giant peacock moth can exceed 15 centimetres in wingspan, and exceptional individuals approach 20 centimetres. That makes the species large enough to be briefly mistaken for a small bird or bat when it flies at dusk. Much of this apparent size comes from the expansive wings; the central body remains comparatively compact.',
          sourceLabel: 'LPO · description',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        life: {
          title: 'Life cycle',
          text: 'Females lay eggs on or near suitable food plants. The caterpillars hatch, grow through several stages and eventually become very large green larvae. When growth is complete, a caterpillar spins a strong silken cocoon and pupates. The species commonly overwinters as a pupa, with the adult moth emerging when conditions are suitable the following spring.',
          sourceLabel: 'LPO · life cycle',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        caterpillar: {
          title: 'The caterpillar',
          text: 'The larva looks very different from the adult. It becomes a huge green caterpillar decorated with rows of turquoise-blue tubercles bearing hairs. It feeds on the leaves of a variety of deciduous trees, including fruit trees such as pear, apple and plum. All of the energy required for the non-feeding adult stage must ultimately be collected during this growing phase.',
          sourceLabel: 'LPO · caterpillar description',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        adult: {
          title: 'A brief adult life',
          text: 'The adult moth has no functional feeding proboscis and therefore does not eat. It survives entirely on energy reserves accumulated while it was a caterpillar. Adult life is consequently short and highly focused: emerge, locate a mate, reproduce and, for the female, place eggs where the next generation can find suitable food.',
          sourceLabel: 'LPO · adult biology',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        pheromones: {
          title: 'Finding a mate by scent',
          text: 'Female giant peacock moths release sex pheromones into the air. Males can detect extraordinarily small amounts of those chemicals and follow the scent plume toward a female. This long-range chemical communication explains why the male’s antennae are so elaborate: they provide an enormous sensory surface for detecting molecules carried on the wind.',
          sourceLabel: 'LPO · reproduction',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        head: {
          title: 'Head',
          text: 'The head is small compared with the vast wings and furry thorax. It carries the compound eyes and the bases of the antennae. The adult mouthparts are reduced and there is no functional feeding proboscis, a reminder that this stage is not designed for feeding and growth but for dispersal and reproduction.',
          sourceLabel: 'LPO · adult biology',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        antennae: {
          title: 'Feathered antennae',
          text: 'Male giant peacock moths have spectacular comb-like or feathered antennae. Each side branch increases the total sensory surface area, creating an extremely sensitive chemical detector. The antennae allow males to recognise and track female pheromones over long distances, even when the female is hidden and the night is dark.',
          sourceLabel: 'LPO · reproduction',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        wings: {
          title: 'Wings',
          text: 'Four broad wings create the moth’s enormous span. The forewings and hindwings overlap at rest, making the whole animal look almost like one continuous patterned surface. The wings are thin membranes strengthened by veins, but from above that structure is hidden beneath a dense covering of microscopic scales that create the visible colours and patterns.',
          sourceLabel: 'LPO · description',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        scales: {
          title: 'Wing scales',
          text: 'The colours are not painted onto a smooth wing. Lepidoptera — moths and butterflies — are named for the tiny scales that overlap across their wings like roof tiles. Different scales carry pigments and microscopic structures, building up the mottled greys, browns, cream bands and coloured eyespots. At high magnification the apparently continuous design resolves into a textured surface.',
          sourceLabel: 'LPO · species description',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        eyespots: {
          title: 'Four “peacock eyes”',
          text: 'Every wing bears a large ocellus — an eye-like marking with concentric dark, pale and reddish rings. These four spots give the moth its common name. Eyespots are widely interpreted as defensive signals: when suddenly revealed they may startle a predator, draw an attack away from the body or make the moth look like something larger and less straightforward to tackle.',
          sourceLabel: 'LPO · identification',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        },
        abdomen: {
          title: 'Abdomen',
          text: 'The abdomen is thick and densely clothed in hair-like scales. It contains the reproductive organs and, critically, part of the energy reserve carried over from larval life. Because the adult cannot refuel by eating, every flight and reproductive activity spends a finite resource accumulated before the moth ever emerged from its cocoon.',
          sourceLabel: 'LPO · adult biology',
          sourceUrl: 'https://www.lpo.fr/decouvrir-la-nature/fiches-especes/fiches-especes/invertebres/papillons/grand-paon-de-nuit'
        }
      }
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
  const infoSearch = document.getElementById('infoSearch');
  const infoNav = document.getElementById('infoNav');
  const infoSource = document.getElementById('infoSource');
  const loading = document.getElementById('loading');
  const loadingText = document.getElementById('loadingText');
  const error = document.getElementById('error');

  /* ======================================================================== */
  /* 10C. CURRENT CREATURE, VIEW AND INPUT STATE                              */
  /* ======================================================================== */
  let speciesKey = 'beetle';
  let current = SPECIES[speciesKey];
  let selectedInfoKey = current.defaultInfo;
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

  /* ======================================================================== */
  /* 12A. SEARCHABLE INFORMATION MENU                                         */
  /* Anatomy and general biology are deliberately treated the same way:       */
  /* open the guide, then choose or search the topic you want.                */
  /* ======================================================================== */
  function buildInfoNavigation() {
    const query = infoSearch.value.trim().toLowerCase();
    infoNav.replaceChildren();

    current.nav.forEach(key => {
      const item = current.information[key];
      if (!item) return;

      const searchableText = `${item.title} ${item.text}`.toLowerCase();
      if (query && !searchableText.includes(query)) return;

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

  function showInformation(key = current.defaultInfo) {
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

  infoNav.addEventListener('click', event => {
    const button = event.target.closest('button[data-info-key]');
    if (button) showInformation(button.dataset.infoKey);
  });

  infoSearch.addEventListener('input', buildInfoNavigation);

  /* ======================================================================== */
  /* 12B. SPECIES SWITCHER                                                    */
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
    if (button) switchSpecies(button.dataset.species);
  });

  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#speciesPanel')) setSpeciesMenu(false);
  });

  /* ======================================================================== */
  /* 13A. IMAGE BOUNDS, POSITION CONSTRAINTS AND NATIVE-PIXEL LIMIT           */
  /* A tap anywhere inside the displayed photograph opens the guide. There    */
  /* are no body-part hit tests.                                              */
  /* ======================================================================== */
  function pointInsideImage(clientX, clientY) {
    return clientX >= x && clientX <= x + current.width * scale && clientY >= y && clientY <= y + current.height * scale;
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
  /* 14A. FULL-RESOLUTION UPGRADE                                             */
  /* The preview arrives quickly. The original is loaded later, then the      */
  /* zoom ceiling rises to scale = 1: one source pixel per CSS pixel.         */
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
  /* 14B. APPLY A CREATURE                                                    */
  /* ======================================================================== */
  function switchSpecies(key) {
    if (!SPECIES[key]) return;

    loadToken += 1;
    speciesKey = key;
    current = SPECIES[key];
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

  /* ======================================================================== */
  /* 15A. IMAGE LOAD / FALLBACK HANDLING                                      */
  /* ======================================================================== */
  subject.addEventListener('load', () => {
    if (source === 'preview' && !previewReady) {
      previewReady = true;
      home();
      loading.classList.add('hide');
      scheduleFullResolution();
      return;
    }

    /* If the preview failed and we fell directly back to the original, make  */
    /* sure the viewer still initialises rather than remaining on Loading….    */
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
      subject.src = current.full;
      return;
    }

    loadingText.style.display = 'none';
    error.style.display = 'block';
  });

  /* ======================================================================== */
  /* 16A. START PAN OR PINCH                                                  */
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
  /* 16B. POINTER DOWN / MOVE                                                 */
  /* A tap is accepted only when it moves less than 10px and never becomes a  */
  /* multi-touch gesture, so dragging and pinching do not open the guide.     */
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
    if (!pointers.has(event.pointerId)) return;

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
  /* 16C. POINTER UP — TAP ANYWHERE ON THE IMAGE TO OPEN                      */
  /* ======================================================================== */
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

  /* ======================================================================== */
  /* 17A. WHEEL + DOUBLE-CLICK ZOOM                                           */
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
  /* 17B. RESIZE                                                              */
  /* ======================================================================== */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(home, 100);
  });

  /* ======================================================================== */
  /* 18A. INITIALISE THE COLLECTION                                           */
  /* ======================================================================== */
  switchSpecies('beetle');
})();
