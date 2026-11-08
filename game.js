import * as THREE from "three";

const PROFILE = {
  name: "Sarah",
  title: "A creative mind with a soft spot for little worlds.",
  introduction: "Welcome to my corner of the internet! I made this little world as a playful way to share the things I create, the skills I'm growing, and the ideas I can't stop thinking about.",
  about: [
    "I believe the best things are made with curiosity, care, and a little bit of magic. This garden is a work in progress—just like all of us.",
    "Use the paths to wander between my story, creative toolkit, projects, and favorite corners of the internet. Thanks for being here.",
  ],
  interests: ["Creative projects", "Cozy game worlds", "Making things on the internet", "Cherry blossoms"],
  skills: [
    { title: "Design & visuals", items: ["Visual storytelling", "Color & type", "Moodboards", "UI / UX"] },
    { title: "Web & creative code", items: ["HTML & CSS", "JavaScript", "Interactive websites", "Three.js"] },
    { title: "Making & sharing", items: ["Idea to prototype", "Creative direction", "Portfolio building", "Always learning"] },
  ],
  projects: [
    {
      name: "A little world of my own",
      kind: "Interactive portfolio",
      description: "An explorable 3D cherry blossom island with cozy details, curious little creatures, and all the things I want to share.",
      tags: ["Three.js", "Creative coding", "In progress"],
      url: "",
    },
    {
      name: "Your next favorite thing",
      kind: "Project placeholder",
      description: "Replace this card in game.js with a project you are proud of, a screenshot, and a link.",
      tags: ["Add your project", "Add your tools"],
      url: "",
    },
    {
      name: "A work in progress",
      kind: "Project placeholder",
      description: "A good home for a class project, experiment, collaboration, or the thing you are building next.",
      tags: ["Add your project", "Add your tools"],
      url: "",
    },
  ],
  socials: [
    { name: "Instagram", label: "@yourhandle", url: "" },
    { name: "GitHub", label: "github.com/yourhandle", url: "" },
    { name: "LinkedIn", label: "Your profile", url: "" },
    { name: "Pinterest", label: "Your boards", url: "" },
  ],
  journey: [
    { date: "The beginning", title: "Where it started", description: "Add a little about how you got started and what sparked your interest." },
    { date: "Along the way", title: "Things I've learned", description: "Add a class, first project, important lesson, or a favorite collaboration." },
    { date: "Right now", title: "What I'm growing", description: "Share what you are learning, making, or looking forward to next." },
  ],
  email: "",
};

const canvas = document.querySelector("#world");
const shell = document.querySelector(".game-shell");
const locationName = document.querySelector("#location-name");
const prompt = document.querySelector("#nearby-prompt");
const promptLabel = prompt.querySelector("span");
const toast = document.querySelector("#toast");
const panel = document.querySelector("#info-panel");
const panelKicker = document.querySelector("#panel-kicker");
const panelTitle = document.querySelector("#panel-title");
const panelContent = document.querySelector("#panel-content");
const closeButton = document.querySelector("#close-panel");
const soundButton = document.querySelector("#sound-toggle");
const skyToggle = document.querySelector("#sky-toggle");
const hudToggle = document.querySelector("#hud-toggle");
const introCard = document.querySelector("#intro-card");
const mapCanvas = document.querySelector("#world-map");
const mapContext = mapCanvas.getContext("2d");
const petalCount = document.querySelector("#petal-count");
const mapToggle = document.querySelector("#map-toggle");
const qualityToggle = document.querySelector("#quality-toggle");
const animalPanel = document.querySelector("#animal-panel");
const animalClose = document.querySelector("#animal-close");
const animalPortrait = document.querySelector("#animal-portrait");
const animalTitle = document.querySelector("#animal-title");
const animalHearts = document.querySelector("#animal-hearts");
const animalChatLog = document.querySelector("#animal-chat-log");
const animalChatForm = document.querySelector("#animal-chat-form");
const animalMessageInput = document.querySelector("#animal-message");
const animalLineKind = document.querySelector("#animal-line-kind");
const animalStatus = document.querySelector("#animal-status");
const animalTalkButton = document.querySelector("#animal-talk");
const animalPetButton = document.querySelector("#animal-pet");
const povToggle = document.querySelector("#pov-toggle");
const wishPanel = document.querySelector("#wish-panel");
const wishClose = document.querySelector("#wish-close");
const wishForm = document.querySelector("#wish-form");
const wishInput = document.querySelector("#wish-input");
const wishList = document.querySelector("#wish-list");
const keys = new Set();
const touchDirections = new Set();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clock = new THREE.Clock();
const dummy = new THREE.Object3D();
const cloudColorScratch = new THREE.Color();
const cloudEventColorScratch = new THREE.Color();
const auroraRoseScratch = new THREE.Color("#ff74cb");
const auroraVioletScratch = new THREE.Color("#9b83ff");
const auroraMintScratch = new THREE.Color("#75f3d4");
const sections = new Map();
const interactables = [];
const worldLabels = [];
const mobs = [];
const flyingLanterns = [];
const fireflies = [];
const gardenMotes = [];
const worldBlockers = [];
const treeTrunkBlockers = [];
const staticLanternSites = [];
const blossomTreeSources = [];
const wishes = [];
const petals = [];
const geometryCache = new Map();
const materialCache = new Map();
const treeBatches = new Map();
const blossomPetals = [];
const blossomCenters = [];
const plantBatches = new Map();
const lanternMaterials = new Set();
const lanternBlossomMatrices = [];
const lanternBlossomColors = [];
const collectibles = [];
const sectionVisits = new Set();
const keysBlockedByPanel = new Set(["w", "a", "s", "d", "shift", "arrowup", "arrowdown", "arrowleft", "arrowright", "e", " "]);

let renderer;
let scene;
let camera;
let player;
let playerShadow;
let playerLegs = [];
let playerArms = [];
let playerHead;
let playerEyes = [];
let playerMouth;
let playerSmile;
let playerBlinkUntil = 0;
let playerNextBlink = 2.4;
let petalMesh;
let collectibleMesh;
let grassInstances;
let pebbleMaterial;
let sunLight;
let fillLight;
let skyStars;
let skySparkles;
let skyAurora;
let skyGalaxy;
let skyClouds;
const skyCloudPuffs = [];
const skyCloudDrifts = [];
const flyingBirds = [];
const meteorStreaks = [];
const grassBlades = [];
let meteorShowerUntil = 0;
let nextMeteorSpawn = 0;
let auroraEventMix = 0;
let skyEventIndex = -1;
let skyEventStartedAt = 0;
let skyEventEndsAt = 0;
let nextSkyEventAt = 16;
let activeSkyEvent = null;
let skyEventMix = 0;
let viewingBench;
let benchSeatPosition;
let sunGlow;
let sunBody;
let moonGlow;
let moonBody;
let moonCraterMaterial;
let celestialGroup;
let moonGroup;
let skyMaterial;
let activeSection = null;
let activeAnimal = null;
let wishPanelOpen = false;
let sittingAtBench = false;
let nearest = null;
let yaw = 0;
let firstPersonYaw = 0;
let cameraPitch = -.55;
let firstPerson = false;
let flyLanternSpawnTimer = 1.5;
let dragging = false;
let pointerStart = null;
let lastToastTimer;
let audioContext;
let soundTimer;
let musicEnabled = false;
let musicStep = 0;
let skyMode = "auto";
let dayNightMix = 1;
let displayedDayNightMix = 1;
let jumpVelocity = 0;
let jumpHeight = 0;
let mapUpdateTime = 0;
let collectedPetals = 0;
let qualityMode = "auto";
let cameraZoom = 24;
let skyLabel = "";
let flyingLanternMeshes;
let fireflyMesh;
let fireflyGlowMesh;
let gardenMoteCores;
let gardenMoteGlows;
const butterflies = [];
let fountainGlow;
let fountainHalo;
let fountainWaterMaterial;
let fountainStreamMaterial;
let fountainRipples = [];
let fountainGlowSprite;
let fountainWishUntil = 0;
let fountainWishStartedAt = -10;
let wishCoin;
let wishSequence = null;
const crystalClusters = [];
let wishSparkles = [];
const lanternGlowMaterials = new Set();

const isSmallScreen = () => window.innerWidth < 760;
const isLowPowerDevice = () => navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const DAY_SKY = new THREE.Color("#93849a");
const NIGHT_SKY = new THREE.Color("#171e38");
const DAY_FOG = new THREE.Color("#8a7785");
const NIGHT_FOG = new THREE.Color("#283249");
const DAY_HEMI = new THREE.Color("#fff0d1");
const NIGHT_HEMI = new THREE.Color("#9eabd5");
const DAY_GROUND = new THREE.Color("#62724f");
const NIGHT_GROUND = new THREE.Color("#283751");
const DAY_SUNLIGHT = new THREE.Color("#ffdda1");
const NIGHT_SUNLIGHT = new THREE.Color("#aab8f0");
const SKY_EVENTS = [
  { name: "Starry Night", phase: "night", duration: 22, stars: .65, tint: "#9bb5ff", horizon: "#34456e", horizonMix: .12 },
  { name: "Rose Nebula", phase: "night", duration: 20, nebula: .9, tint: "#e878cf", horizon: "#60395f", horizonMix: .12 },
  { name: "Violet Nebula", phase: "night", duration: 21, nebula: 1, tint: "#a17df1", horizon: "#453b75", horizonMix: .12 },
  { name: "Pink Aurora", phase: "night", duration: 19, aurora: 1, auroraColors: ["#ff75c7", "#ad83ff", "#ffcfed"], tint: "#f49bdc", horizon: "#653864", horizonMix: .1 },
  { name: "Mint Aurora", phase: "night", duration: 19, aurora: 1, auroraColors: ["#8bffdb", "#83aaff", "#b2fff3"], tint: "#8cebd9", horizon: "#315b63", horizonMix: .1 },
  { name: "Meteor Shower", phase: "night", duration: 8, meteors: true, nebula: .25, tint: "#b8c5ff", horizon: "#354267", horizonMix: .08 },
  { name: "Falling Star", phase: "night", duration: 5, fallingStar: true, stars: .5, tint: "#ffe3b2", horizon: "#57445e", horizonMix: .08 },
  { name: "Moon Halo", phase: "night", duration: 18, moonHalo: 1.5, stars: .2, tint: "#ffd1e7", horizon: "#573c60", horizonMix: .1 },
  { name: "Moonbow", phase: "night", duration: 18, moonHalo: 1.25, moonColor: "#c5e1ff", nebula: .18, tint: "#b8caff", horizon: "#384a70", horizonMix: .12 },
  { name: "Golden Sunrise", phase: "dawn", duration: 18, tint: "#ffc46f", horizon: "#ff9c53", horizonMix: .82, cloudColor: "#ffd58e" },
  { name: "Rose Sunrise", phase: "dawn", duration: 18, tint: "#ff9ac6", horizon: "#f47dac", horizonMix: .72, cloudColor: "#ffbad8" },
  { name: "Ember Sunset", phase: "dusk", duration: 20, tint: "#ff9363", horizon: "#fb654f", horizonMix: .88, cloudColor: "#ffad78" },
  { name: "Luminous Cloud Sea", phase: "any", duration: 20, cloudGlow: .8, nebula: .3, tint: "#d9c1ff", horizon: "#d69cdc", horizonMix: .28, cloudColor: "#efc9ff" },
];
const SKY_EVENT_MUSIC = {
  "Starry Night": { root: 62, motif: [0, 7, 12, 14, 12, 7, 4, 7], waveform: "sine" },
  "Rose Nebula": { root: 65, motif: [0, 3, 7, 10, 12, 10, 7, 3], waveform: "triangle" },
  "Violet Nebula": { root: 58, motif: [0, 5, 8, 12, 15, 12, 8, 5], waveform: "sine" },
  "Pink Aurora": { root: 67, motif: [0, 4, 9, 12, 16, 12, 9, 4], waveform: "triangle" },
  "Mint Aurora": { root: 60, motif: [0, 5, 9, 14, 17, 14, 9, 5], waveform: "sine" },
  "Meteor Shower": { root: 55, motif: [0, 7, 10, 14, 19, 14, 10, 7], waveform: "triangle" },
  "Falling Star": { root: 69, motif: [12, 9, 7, 4, 0, 4, 7, 9], waveform: "sine" },
  "Moon Halo": { root: 64, motif: [0, 7, 11, 14, 11, 7, 5, 7], waveform: "sine" },
  Moonbow: { root: 57, motif: [0, 4, 7, 11, 14, 11, 7, 4], waveform: "triangle" },
  "Golden Sunrise": { root: 62, motif: [0, 4, 7, 9, 12, 9, 7, 4], waveform: "triangle" },
  "Rose Sunrise": { root: 65, motif: [0, 3, 7, 9, 12, 9, 7, 3], waveform: "sine" },
  "Ember Sunset": { root: 59, motif: [0, 3, 7, 10, 12, 10, 7, 3], waveform: "triangle" },
  "Luminous Cloud Sea": { root: 60, motif: [0, 4, 9, 12, 16, 14, 9, 4], waveform: "sine" },
};

const sectionData = [
  { id: "about", name: "About me", short: "MY STORY", x: -6.5, z: 11.26, color: 0xe7a6bb, symbol: "✿" },
  { id: "skills", name: "Skills garden", short: "MY TOOLKIT", x: 6.5, z: 11.26, color: 0xb5c89b, symbol: "✧" },
  { id: "projects", name: "Project grove", short: "THINGS I'VE MADE", x: 13, z: 0, color: 0xe7bb8e, symbol: "✦" },
  { id: "journey", name: "My journey", short: "LITTLE MILESTONES", x: 6.5, z: -11.26, color: 0xe8c5a5, symbol: "↟" },
  { id: "socials", name: "Social pond", short: "FIND ME ELSEWHERE", x: -6.5, z: -11.26, color: 0xb9c9dd, symbol: "♡" },
  { id: "contact", name: "Wish tree", short: "SAY HELLO", x: -13, z: 0, color: 0xd7b8d7, symbol: "✉" },
];
const VIEWING_DECK_Z = 26.5;
const STATIC_LANTERN_SPACING = 5.4;
const FOUNTAIN_WALK_SURFACES = [
  [0, 4.08],
  [.17, 4.08],
  [.5, 3.746],
  [.69, 3.746],
  [.706, 3.865],
  [.72, 3.865],
  [.84, 3.069],
  [.994, 3.069],
  [1.16, 3.2],
  [1.42, 3.303],
  [1.5, 2.7],
  [1.645, 2.001],
  [1.85, 2.1],
  [2.12, 2.27],
  [2.35, 2.389],
  [2.58, 1.62],
  [2.82, 1.01],
  [5.18, 1.01],
  [5.3, 1.01],
  [5.49, 1.18],
  [5.68, 1.18],
  [6.5, .56],
];

function terrainHeightAt(x, z) {
  const fade = THREE.MathUtils.smoothstep(Math.hypot(x, z), 0, 7);
  const broadRise = Math.sin(x * .24 + z * .08) * Math.cos(z * .2 - x * .11);
  const fineRise = Math.sin(x * .47 + z * .31) * .28 + Math.cos(z * .43 - x * .19) * .22;
  return (broadRise * .12 + fineRise * .035) * fade;
}

function walkingSurfaceHeightAt(x, z) {
  if (Math.abs(x) <= 3.5 && Math.abs(z - VIEWING_DECK_Z) <= 2.6) return .84;
  const radius = Math.hypot(x, z);
  if (radius > FOUNTAIN_WALK_SURFACES[FOUNTAIN_WALK_SURFACES.length - 1][0]) return .56 + terrainHeightAt(x, z);
  for (let index = 1; index < FOUNTAIN_WALK_SURFACES.length; index++) {
    const [outerRadius, outerHeight] = FOUNTAIN_WALK_SURFACES[index];
    if (radius > outerRadius) continue;
    const [innerRadius, innerHeight] = FOUNTAIN_WALK_SURFACES[index - 1];
    const amount = (radius - innerRadius) / (outerRadius - innerRadius);
    return THREE.MathUtils.lerp(innerHeight, outerHeight, amount);
  }
  return FOUNTAIN_WALK_SURFACES[0][1];
}

function makeMaterial(color, options = {}) {
  const key = JSON.stringify([color, options]);
  if (!materialCache.has(key)) {
    materialCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: .88, ...options }));
  }
  return materialCache.get(key);
}

function getBoxGeometry(size) {
  const key = size.join(",");
  if (!geometryCache.has(key)) geometryCache.set(key, new THREE.BoxGeometry(...size));
  return geometryCache.get(key);
}

function getCylinderGeometry(radiusTop, radiusBottom, height, segments) {
  const key = `cylinder:${radiusTop}:${radiusBottom}:${height}:${segments}`;
  if (!geometryCache.has(key)) geometryCache.set(key, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments));
  return geometryCache.get(key);
}

function getSphereGeometry() {
  const key = "sphere:1:8:6";
  if (!geometryCache.has(key)) geometryCache.set(key, new THREE.SphereGeometry(1, 8, 6));
  return geometryCache.get(key);
}

function addMesh(parent, geometry, material, position, options = {}) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  if (options.scale) mesh.scale.set(...options.scale);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  parent.add(mesh);
  return mesh;
}

function addBox(parent, position, size, color, options = {}) {
  return addMesh(
    parent,
    getBoxGeometry(size),
    color?.isMaterial ? color : makeMaterial(color, options.material),
    position,
    options,
  );
}

function addCylinder(parent, position, radiusTop, radiusBottom, height, color, segments = 8, options = {}) {
  return addMesh(
    parent,
    getCylinderGeometry(radiusTop, radiusBottom, height, segments),
    color?.isMaterial ? color : makeMaterial(color, options.material),
    position,
    options,
  );
}

function addTextSprite(text, color = "#fff4ef") {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 512;
  labelCanvas.height = 128;
  const labelContext = labelCanvas.getContext("2d");
  labelContext.fillStyle = "rgba(35,34,52,.84)";
  labelContext.beginPath();
  labelContext.roundRect(16, 16, 480, 96, 25);
  labelContext.fill();
  labelContext.strokeStyle = "rgba(255,235,239,.5)";
  labelContext.lineWidth = 3;
  labelContext.stroke();
  labelContext.fillStyle = color;
  labelContext.font = "600 38px 'DM Sans', sans-serif";
  labelContext.textAlign = "center";
  labelContext.textBaseline = "middle";
  labelContext.fillText(text, 256, 65);
  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(4.25, 1.07, 1);
  return sprite;
}

function createStationBoardTexture(data, palette) {
  const boardCanvas = document.createElement("canvas");
  boardCanvas.width = 768;
  boardCanvas.height = 320;
  const context = boardCanvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 768, 320);
  gradient.addColorStop(0, palette.light);
  gradient.addColorStop(.52, palette.base);
  gradient.addColorStop(1, palette.deep);
  context.fillStyle = gradient;
  context.fillRect(0, 0, boardCanvas.width, boardCanvas.height);

  context.fillStyle = "rgba(255,255,255,.13)";
  context.beginPath();
  context.ellipse(384, 55, 330, 92, 0, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = palette.trim;
  context.lineWidth = 9;
  context.strokeRect(17, 17, 734, 286);
  context.strokeStyle = "rgba(255,255,255,.72)";
  context.lineWidth = 3;
  context.strokeRect(28, 28, 712, 264);

  const drawBlossom = (x, y, radius, rotation = 0) => {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    for (let petal = 0; petal < 5; petal++) {
      const angle = (petal / 5) * Math.PI * 2;
      context.beginPath();
      context.ellipse(Math.cos(angle) * radius * .72, Math.sin(angle) * radius * .72, radius * .48, radius * .3, angle, 0, Math.PI * 2);
      context.fillStyle = petal % 2 ? palette.flower : palette.trim;
      context.fill();
    }
    context.beginPath();
    context.arc(0, 0, radius * .19, 0, Math.PI * 2);
    context.fillStyle = "#ffe6a4";
    context.fill();
    context.restore();
  };
  const drawSprig = (points) => {
    context.beginPath();
    context.moveTo(points[0], points[1]);
    context.quadraticCurveTo(points[2], points[3], points[4], points[5]);
    context.strokeStyle = palette.deep;
    context.lineWidth = 5;
    context.stroke();
    drawBlossom(points[0], points[1], 17, -.2);
    drawBlossom(points[2], points[3], 12, .4);
    drawBlossom(points[4], points[5], 19, .1);
  };

  if (data.id === "about" || data.id === "contact") {
    drawSprig([92, 252, 144, 220, 207, 135]);
    drawSprig([674, 252, 624, 224, 564, 135]);
  } else if (data.id === "skills" || data.id === "journey") {
    for (const [x, y, size] of [[95, 78, 16], [675, 77, 18], [116, 255, 13], [650, 252, 15]]) {
      context.save();
      context.translate(x, y);
      context.rotate(Math.PI / 4);
      context.fillStyle = palette.trim;
      context.fillRect(-size / 2, -size / 2, size, size);
      context.restore();
    }
  } else {
    drawSprig([82, 248, 147, 205, 198, 139]);
    drawBlossom(675, 89, 26, .3);
    drawBlossom(632, 252, 15, -.4);
  }

  const titleSize = data.name.length > 12 ? 66 : 78;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `700 ${titleSize}px Georgia, serif`;
  context.lineWidth = 10;
  context.strokeStyle = "rgba(112,60,93,.42)";
  context.strokeText(data.name, 384, 137);
  context.fillStyle = palette.ink;
  context.fillText(data.name, 384, 132);
  context.font = "600 27px sans-serif";
  context.fillStyle = palette.deep;
  context.letterSpacing = "5px";
  context.fillText(data.short, 384, 220);
  context.letterSpacing = "0px";

  const texture = new THREE.CanvasTexture(boardCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function seeded(index, salt = 1) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createWorld() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#37354e");
  scene.fog = new THREE.FogExp2("#4a465d", .012);

  camera = new THREE.PerspectiveCamera(43, window.innerWidth / window.innerHeight, .1, 180);
  camera.position.set(0, 20, 32);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: !isLowPowerDevice(), alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPowerDevice() ? 1 : 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = false;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;

  fillLight = new THREE.HemisphereLight("#fff1d2", "#43574b", 2.15);
  sunLight = new THREE.DirectionalLight("#ffe1b0", 2.4);
  sunLight.position.set(-15, 27, 11);
  scene.add(fillLight, sunLight);

  createSky();
  createIsland();
  createSkyClouds();
  createFlyingBirds();
  createPaths();
  createPond();
  createDecorations();
  createViewingBench();
  flushLanternBlossoms();
  sectionData.forEach(createStation);
  flushTreeBatches();
  flushPlantBatches();
  createPlayer();
  createMobs();
  createFlyingLanterns();
  createFireflies();
  createFallingPetals();
  createCollectibles();
  createGardenMotes();
  createButterflies();
}

function makeGlowTexture(inner, outer) {
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = 128;
  glowCanvas.height = 128;
  const context = glowCanvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 63);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(.24, inner);
  gradient.addColorStop(1, outer);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(glowCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createSky() {
  skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: true,
    fog: false,
    toneMapped: false,
    uniforms: {
      dayMix: { value: 1 },
      sunsetMix: { value: 0 },
      eventMix: { value: 0 },
      nebulaMix: { value: 0 },
      eventTint: { value: new THREE.Color("#ffffff") },
      eventHorizon: { value: new THREE.Color("#ffffff") },
      eventHorizonMix: { value: 0 },
      dayTop: { value: new THREE.Color("#596582") },
      dayHorizon: { value: new THREE.Color("#f0b5a9") },
      sunsetTop: { value: new THREE.Color("#34445e") },
      sunsetHorizon: { value: new THREE.Color("#ff6a32") },
      nightTop: { value: new THREE.Color("#090d25") },
      nightHorizon: { value: new THREE.Color("#27213f") },
      twilight: { value: new THREE.Color("#ffb35e") },
    },
    vertexShader: `
      varying float vHeight;
      varying vec3 vDirection;
      void main() {
        vHeight = normalize(position).y;
        vDirection = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float dayMix;
      uniform float sunsetMix;
      uniform float eventMix;
      uniform float nebulaMix;
      uniform vec3 eventTint;
      uniform vec3 eventHorizon;
      uniform float eventHorizonMix;
      uniform vec3 dayTop;
      uniform vec3 dayHorizon;
      uniform vec3 sunsetTop;
      uniform vec3 sunsetHorizon;
      uniform vec3 nightTop;
      uniform vec3 nightHorizon;
      uniform vec3 twilight;
      varying float vHeight;
      varying vec3 vDirection;
      void main() {
        vec3 top = mix(nightTop, dayTop, dayMix);
        vec3 horizon = mix(nightHorizon, dayHorizon, dayMix);
        top = mix(top, sunsetTop, sunsetMix);
        horizon = mix(horizon, sunsetHorizon, sunsetMix);
        float gradient = smoothstep(-0.2, 0.68, vHeight);
        float horizonBand = smoothstep(-0.12, 0.2, vHeight) * (1.0 - smoothstep(0.2, 0.62, vHeight));
        vec3 sky = mix(horizon, top, gradient);
        sky = mix(sky, twilight, horizonBand * (0.18 + sunsetMix * 0.58));
        sky = mix(sky, eventTint, eventMix * 0.12);
        sky = mix(sky, eventHorizon, horizonBand * eventMix * eventHorizonMix);
        float galaxyCenter = 0.34 + sin(vDirection.x * 5.2) * 0.075;
        float galaxyBand = exp(-pow((vDirection.y - galaxyCenter) * 5.2, 2.0));
        float galaxyClouds = 0.58 + 0.2 * sin(vDirection.x * 31.0 + vDirection.z * 17.0)
          + 0.14 * sin(vDirection.z * 53.0 - vDirection.x * 19.0);
        vec3 milkyRose = mix(vec3(0.20, 0.17, 0.36), vec3(0.65, 0.34, 0.56), clamp(galaxyClouds, 0.0, 1.0));
        vec3 eventNebula = mix(vec3(0.32, 0.08, 0.38), eventTint, 0.72);
        float nebulaClouds = 0.5 + 0.28 * sin(vDirection.x * 23.0 + vDirection.z * 13.0)
          + 0.22 * sin(vDirection.z * 37.0 - vDirection.x * 17.0 + vDirection.y * 8.0);
        float nebulaShape = smoothstep(0.16, 0.9, nebulaClouds) * exp(-pow((vDirection.y - galaxyCenter) * 3.2, 2.0));
        sky += milkyRose * galaxyBand * (1.0 - dayMix) * 0.34;
        sky += eventNebula * nebulaShape * nebulaMix * 0.62;
        gl_FragColor = vec4(sky, 1.0);
      }
    `,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(120, 32, 16), skyMaterial);
  dome.frustumCulled = false;
  dome.renderOrder = -100;
  scene.add(dome);

  const starPositions = [];
  for (let i = 0; i < 1120; i++) {
    const angle = seeded(i, 66) * Math.PI * 2;
    const elevation = .08 + seeded(i, 67) * .92;
    const radius = 72;
    starPositions.push(
      Math.cos(angle) * radius * Math.sqrt(1 - elevation * elevation),
      elevation * radius,
      Math.sin(angle) * radius * Math.sqrt(1 - elevation * elevation),
    );
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: "#fff1d2",
    size: .2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  skyStars = new THREE.Points(starGeometry, starMaterial);
  skyStars.frustumCulled = false;
  scene.add(skyStars);

  const sparklePositions = [];
  for (let i = 0; i < 42; i++) {
    const angle = seeded(i, 69) * Math.PI * 2;
    const elevation = .12 + seeded(i, 70) * .87;
    const radius = 70;
    sparklePositions.push(
      Math.cos(angle) * radius * Math.sqrt(1 - elevation * elevation),
      elevation * radius,
      Math.sin(angle) * radius * Math.sqrt(1 - elevation * elevation),
    );
  }
  const sparkleGeometry = new THREE.BufferGeometry();
  sparkleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(sparklePositions, 3));
  skySparkles = new THREE.Points(sparkleGeometry, new THREE.PointsMaterial({
    color: "#fff5ff",
    size: .62,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  }));
  skySparkles.frustumCulled = false;
  scene.add(skySparkles);

  skyAurora = new THREE.Mesh(
    new THREE.CylinderGeometry(104, 104, 58, 128, 12, true),
    new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        nightMix: { value: 0 },
        rose: { value: new THREE.Color("#ff74cb") },
        violet: { value: new THREE.Color("#9b83ff") },
        mint: { value: new THREE.Color("#75f3d4") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float nightMix;
        uniform vec3 rose;
        uniform vec3 violet;
        uniform vec3 mint;
        varying vec2 vUv;
        void main() {
          float drift = time * 0.045;
          float wave = 0.54
            + sin(vUv.x * 10.0 + drift) * 0.055
            + sin(vUv.x * 21.0 - drift * 1.4) * 0.022;
          float folds = sin(vUv.x * 34.0 + sin(vUv.y * 8.0 + drift) * 1.6 + drift * 2.0);
          float curtain = smoothstep(0.06, 0.24, vUv.y)
            * (1.0 - smoothstep(0.78, 0.98, vUv.y));
          float ribbons = smoothstep(0.22, 0.95, folds) * curtain;
          float veil = exp(-abs(vUv.y - wave) * 13.0) * curtain;
          float alpha = (ribbons * 0.22 + veil * 0.25) * nightMix;
          vec3 color = mix(rose, violet, smoothstep(0.05, 0.72, vUv.x));
          color = mix(color, mint, smoothstep(0.58, 0.98, vUv.x) * 0.7);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: false,
      toneMapped: false,
    }),
  );
  skyAurora.position.set(0, 37, 0);
  skyAurora.frustumCulled = false;
  skyAurora.renderOrder = -1;
  scene.add(skyAurora);
  createMeteorStreaks();
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: "#ffe8a6",
    fog: false,
    toneMapped: false,
    transparent: true,
    opacity: 1,
  });
  sunBody = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 16), sunMaterial);
  sunBody.position.set(0, 42, -80);
  sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture("rgba(255,215,142,.76)", "rgba(255,200,120,0)"),
    transparent: true,
    depthWrite: false,
    fog: false,
    toneMapped: false,
    opacity: 1,
  }));
  sunGlow.position.copy(sunBody.position);
  sunGlow.scale.set(24, 24, 1);

  celestialGroup = new THREE.Group();
  celestialGroup.add(sunBody, sunGlow);
  scene.add(celestialGroup);
  moonGroup = new THREE.Group();
  moonGroup.position.set(0, 42, -80);
  celestialGroup.add(moonGroup);
  moonBody = new THREE.Mesh(
    new THREE.SphereGeometry(3.35, 40, 28),
    new THREE.MeshStandardMaterial({
      color: "#ffd1e7",
      emissive: "#d96fba",
      emissiveIntensity: .72,
      roughness: .82,
      metalness: 0,
      fog: false,
      transparent: true,
      opacity: 0,
    }),
  );
  moonGroup.add(moonBody);
  moonCraterMaterial = new THREE.MeshStandardMaterial({
    color: "#d88ab7",
    emissive: "#8f467c",
    emissiveIntensity: .22,
    roughness: 1,
    transparent: true,
    opacity: 0,
  });
  for (const [x, y, radius] of [[-1.5, .9, .54], [.92, .35, .42], [-.55, -1.45, .35], [1.25, 1.72, .26], [-2.1, -1.1, .31], [1.9, -.95, .38], [-.2, 2.1, .24]]) {
    const surfaceZ = Math.sqrt(3.35 * 3.35 - x * x - y * y);
    const crater = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), moonCraterMaterial);
    crater.position.set(x, y, surfaceZ + .025);
    crater.scale.set(radius, radius * .72, .055);
    moonGroup.add(crater);
  }
  moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture("rgba(255,169,220,.76)", "rgba(239,126,207,0)"),
    transparent: true,
    depthWrite: false,
    fog: false,
    toneMapped: false,
    opacity: 0,
  }));
  moonGlow.position.copy(moonGroup.position);
  moonGlow.scale.set(34, 34, 1);
  celestialGroup.add(moonGlow);
  scene.add(camera);
}

function createSkyClouds() {
  const count = 112;
  const geometry = new THREE.SphereGeometry(1, 12, 8);
  const material = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: .36,
    depthWrite: false,
    fog: false,
  });
  skyClouds = new THREE.InstancedMesh(geometry, material, count);
  skyClouds.frustumCulled = false;
  const dayPalette = ["#d8d7e1", "#c5cad7", "#eee1db", "#d9d4df"];
  const sunsetPalette = ["#e99569", "#ffcb87", "#c58c87", "#f2ae79"];
  const nightPalette = ["#77748e", "#6f7890", "#987a98", "#716b89"];
  skyCloudDrifts.length = 0;
  skyCloudPuffs.length = 0;
  for (let cluster = 0; cluster < 16; cluster++) {
    const angle = (cluster / 16) * Math.PI * 2;
    const radius = 18 + seeded(cluster, 461) * 26;
    skyCloudDrifts.push({
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      phase: seeded(cluster, 491) * Math.PI * 2,
      speed: .045 + seeded(cluster, 493) * .03,
      driftX: 2.2 + seeded(cluster, 497) * 1.8,
      driftZ: 1.6 + seeded(cluster, 499) * 1.4,
    });
  }
  for (let i = 0; i < count; i++) {
    const cluster = Math.floor(i / 7);
    const puff = i % 7;
    const angle = (cluster / 16) * Math.PI * 2;
    const clusterRadius = 18 + seeded(cluster, 461) * 26;
    const offset = (seeded(i, 463) - .5) * 8;
    const baseX = Math.cos(angle) * clusterRadius - Math.sin(angle) * offset;
    const baseY = 20 + seeded(cluster, 467) * 9 + Math.sin(puff * 1.4) * .35;
    const baseZ = Math.sin(angle) * clusterRadius + Math.cos(angle) * offset;
    const scale = new THREE.Vector3(
      3.2 + seeded(i, 469) * 4.8,
      .34 + seeded(i, 471) * .68,
      1.8 + seeded(i, 473) * 3.2,
    );
    const paletteIndex = i % dayPalette.length;
    skyCloudPuffs.push({
      cluster,
      baseX,
      baseY,
      baseZ,
      scale,
      rotationY: angle - Math.PI / 2,
      dayColor: new THREE.Color(dayPalette[paletteIndex]),
      sunsetColor: new THREE.Color(sunsetPalette[paletteIndex]),
      nightColor: new THREE.Color(nightPalette[paletteIndex]),
    });
    dummy.position.set(baseX, baseY, baseZ);
    dummy.rotation.set(0, angle - Math.PI / 2, 0);
    dummy.scale.copy(scale);
    dummy.updateMatrix();
    skyClouds.setMatrixAt(i, dummy.matrix);
    skyClouds.setColorAt(i, skyCloudPuffs[i].dayColor);
  }
  skyClouds.instanceMatrix.needsUpdate = true;
  if (skyClouds.instanceColor) skyClouds.instanceColor.needsUpdate = true;
  scene.add(skyClouds);
}

function updateSkyClouds(time) {
  cloudEventColorScratch.set(activeSkyEvent?.cloudColor || activeSkyEvent?.tint || "#ffffff");
  skyCloudPuffs.forEach((puff, index) => {
    const drift = skyCloudDrifts[puff.cluster];
    const phase = time * drift.speed + drift.phase;
    dummy.position.set(
      puff.baseX + Math.sin(phase) * drift.driftX,
      puff.baseY + Math.sin(phase * .8 + index * .12) * .3,
      puff.baseZ + Math.cos(phase * .72) * drift.driftZ,
    );
    dummy.rotation.set(0, puff.rotationY, 0);
    dummy.scale.copy(puff.scale);
    dummy.updateMatrix();
    skyClouds.setMatrixAt(index, dummy.matrix);
    cloudColorScratch.copy(puff.nightColor)
      .lerp(puff.dayColor, dayNightMix)
      .lerp(puff.sunsetColor, skyMaterial.uniforms.sunsetMix.value)
      .lerp(cloudEventColorScratch, skyEventMix * (activeSkyEvent?.cloudGlow ? .72 : .36));
    skyClouds.setColorAt(index, cloudColorScratch);
  });
  skyClouds.instanceMatrix.needsUpdate = true;
  if (skyClouds.instanceColor) skyClouds.instanceColor.needsUpdate = true;
}

function createFlyingBirds() {
  const birdCount = isSmallScreen() || isLowPowerDevice() ? 4 : 7;
  const bodyMaterial = makeMaterial("#55445d", { roughness: .8 });
  const wingMaterials = [
    makeMaterial("#71566f", { roughness: .84 }),
    makeMaterial("#8a607d", { roughness: .82 }),
    makeMaterial("#625775", { roughness: .84 }),
  ];
  const beakMaterial = makeMaterial("#e5b878", { roughness: .7 });
  for (let i = 0; i < birdCount; i++) {
    const group = new THREE.Group();
    const scale = .72 + seeded(i, 509) * .35;
    addMesh(group, getSphereGeometry(), bodyMaterial, [0, 0, 0], {
      scale: [.14 * scale, .12 * scale, .34 * scale],
      castShadow: false,
    });
    addMesh(group, getSphereGeometry(), bodyMaterial, [0, .025 * scale, .27 * scale], {
      scale: [.105 * scale, .1 * scale, .11 * scale],
      castShadow: false,
    });
    addMesh(group, new THREE.ConeGeometry(.045 * scale, .16 * scale, 5), beakMaterial, [0, .005 * scale, .39 * scale], {
      rotation: [Math.PI / 2, 0, 0],
      castShadow: false,
    });
    for (let feather = -1; feather <= 1; feather++) {
      addMesh(group, getSphereGeometry(), bodyMaterial, [feather * .075 * scale, -.005 * scale, -.35 * scale], {
        scale: [.045 * scale, .035 * scale, .22 * scale],
        rotation: [0, feather * -.15, feather * .18],
        castShadow: false,
      });
    }

    const wings = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(side * .075 * scale, .025 * scale, -.015 * scale);
      group.add(pivot);
      addMesh(pivot, getSphereGeometry(), wingMaterials[i % wingMaterials.length], [side * .23 * scale, 0, 0], {
        scale: [.32 * scale, .045 * scale, .14 * scale],
        rotation: [0, side * -.12, side * .08],
        castShadow: false,
      });
      addMesh(pivot, getSphereGeometry(), wingMaterials[i % wingMaterials.length], [side * .42 * scale, -.008 * scale, -.08 * scale], {
        scale: [.19 * scale, .032 * scale, .09 * scale],
        rotation: [0, side * -.24, side * .13],
        castShadow: false,
      });
      wings.push({ pivot, side });
    }
    scene.add(group);
    flyingBirds.push({
      group,
      wings,
      phase: seeded(i, 521) * Math.PI * 2,
      speed: .12 + seeded(i, 523) * .08,
      radiusX: 15 + seeded(i, 527) * 12,
      radiusZ: 13 + seeded(i, 529) * 12,
      height: 9 + seeded(i, 531) * 8,
      scale,
    });
  }
}

function updateFlyingBirds(time) {
  for (const bird of flyingBirds) {
    const flight = time * bird.speed + bird.phase;
    const x = Math.cos(flight) * bird.radiusX;
    const z = Math.sin(flight) * bird.radiusZ;
    bird.group.position.set(x, bird.height + Math.sin(flight * 2.1) * .42, z);
    bird.group.rotation.y = Math.atan2(
      -Math.sin(flight) * bird.radiusX,
      Math.cos(flight) * bird.radiusZ,
    );
    bird.group.rotation.z = Math.sin(flight) * .12;
    bird.wings.forEach(({ pivot, side }) => {
      pivot.rotation.z = side * Math.sin(time * 8.5 + bird.phase) * .52;
    });
  }
}

function createMeteorStreaks() {
  const colors = ["#fff0f8", "#ffc9e6", "#d9d4ff", "#fff1d2", "#ffacd9"];
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(6), 3));
    const material = new THREE.LineBasicMaterial({
      color: colors[i],
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
    });
    const line = new THREE.Line(geometry, material);
    line.frustumCulled = false;
    line.visible = false;
    scene.add(line);
    meteorStreaks.push({ line, active: false, elapsed: 0, duration: 0, x: 0, y: 0, z: -80, vx: 0, vy: 0 });
  }
}

function launchMeteor(time) {
  const meteor = meteorStreaks.find((streak) => !streak.active)
    || meteorStreaks.reduce((oldest, streak) => streak.elapsed > oldest.elapsed ? streak : oldest);
  meteor.active = true;
  meteor.elapsed = 0;
  meteor.duration = .65 + Math.random() * .55;
  meteor.x = -34 + Math.random() * 68;
  meteor.y = 34 + Math.random() * 25;
  meteor.z = -80;
  meteor.vx = (Math.random() - .5) * 50;
  meteor.vy = -35 - Math.random() * 27;
  meteor.startTime = time;
  meteor.line.visible = true;
}

function startSkyEvent(time) {
  const cycle = ((time / 180) % 1 + 1) % 1;
  const phase = dayNightMix < .32
    ? "night"
    : dayNightMix > .68
      ? "day"
      : Math.sin(cycle * Math.PI * 2) < 0 ? "dawn" : "dusk";
  const candidates = SKY_EVENTS
    .map((event, index) => ({ event, index }))
    .filter(({ event, index }) => (
      index !== skyEventIndex
      && (event.phase === phase || event.phase === "any")
    ));
  if (!candidates.length) return;
  const selected = candidates[Math.floor(Math.random() * candidates.length)];
  skyEventIndex = selected.index;
  activeSkyEvent = { ...selected.event, fallingStarTriggered: false };
  skyEventStartedAt = time;
  skyEventEndsAt = time + selected.event.duration;
  if (selected.event.meteors) {
    meteorShowerUntil = skyEventEndsAt;
    nextMeteorSpawn = time;
  }
  if (selected.event.fallingStar) {
    launchMeteor(time);
    activeSkyEvent.fallingStarTriggered = true;
  }
  showToast(`Sky event: ${selected.event.name} ✨`);
}

function updateCelestialEvents(time, delta) {
  const night = THREE.MathUtils.smoothstep(1 - dayNightMix, .12, .5);
  if (activeSkyEvent && time >= skyEventEndsAt + 3) {
    activeSkyEvent = null;
    skyEventMix = 0;
    nextSkyEventAt = time + 10 + Math.random() * 12;
  }
  if (!activeSkyEvent && time >= nextSkyEventAt) startSkyEvent(time);
  skyEventMix = activeSkyEvent
    ? THREE.MathUtils.smoothstep(time, skyEventStartedAt, skyEventStartedAt + 2.2)
      * (1 - THREE.MathUtils.smoothstep(time, skyEventEndsAt - 3, skyEventEndsAt + 3))
    : 0;
  const skyUniforms = skyMaterial.uniforms;
  skyUniforms.eventMix.value = skyEventMix;
  skyUniforms.nebulaMix.value = (activeSkyEvent?.nebula || 0) * skyEventMix;
  skyUniforms.eventTint.value.set(activeSkyEvent?.tint || "#ffffff");
  skyUniforms.eventHorizon.value.set(activeSkyEvent?.horizon || "#ffffff");
  skyUniforms.eventHorizonMix.value = activeSkyEvent?.horizonMix || 0;
  const auroraTarget = activeSkyEvent?.aurora ? 1 : .22;
  auroraEventMix = THREE.MathUtils.damp(auroraEventMix, auroraTarget * night, 1.2, delta);
  const auroraColors = activeSkyEvent?.auroraColors || ["#ff74cb", "#9b83ff", "#75f3d4"];
  skyAurora.material.uniforms.rose.value.set("#ff74cb").lerp(auroraRoseScratch.set(auroraColors[0]), skyEventMix);
  skyAurora.material.uniforms.violet.value.set("#9b83ff").lerp(auroraVioletScratch.set(auroraColors[1]), skyEventMix);
  skyAurora.material.uniforms.mint.value.set("#75f3d4").lerp(auroraMintScratch.set(auroraColors[2]), skyEventMix);
  skyAurora.material.uniforms.nightMix.value = night * (.2 + auroraEventMix * .8);

  if (night > .55 && time < meteorShowerUntil && time >= nextMeteorSpawn) {
    launchMeteor(time);
    nextMeteorSpawn = time + .48 + Math.random() * .62;
  }
  if (activeSkyEvent?.fallingStar && !activeSkyEvent.fallingStarTriggered && skyEventMix > .2) {
    launchMeteor(time);
    activeSkyEvent.fallingStarTriggered = true;
  }
  meteorStreaks.forEach((meteor) => {
    if (!meteor.active) return;
    meteor.elapsed = time - meteor.startTime;
    const progress = meteor.elapsed / meteor.duration;
    if (progress >= 1 || night < .2) {
      meteor.active = false;
      meteor.line.visible = false;
      return;
    }
    const headX = meteor.x + meteor.vx * meteor.elapsed;
    const headY = meteor.y + meteor.vy * meteor.elapsed;
    const tailSeconds = .28;
    const positions = meteor.line.geometry.attributes.position;
    positions.setXYZ(0, headX - meteor.vx * tailSeconds, headY - meteor.vy * tailSeconds, meteor.z);
    positions.setXYZ(1, headX, headY, meteor.z);
    positions.needsUpdate = true;
    meteor.line.material.opacity = night * Math.sin(Math.PI * progress) * .95;
  });
}

function updateDayNight(time, delta) {
  let targetMix = 1;
  if (skyMode === "night") targetMix = 0;
  else if (skyMode === "auto") {
    const cycle = ((time / 180) % 1 + 1) % 1;
    targetMix = .5 + .5 * Math.cos(cycle * Math.PI * 2);
  }
  displayedDayNightMix = THREE.MathUtils.damp(displayedDayNightMix, targetMix, .75, delta);
  dayNightMix = displayedDayNightMix;

  scene.background.copy(NIGHT_SKY).lerp(DAY_SKY, dayNightMix);
  scene.fog.color.copy(NIGHT_FOG).lerp(DAY_FOG, dayNightMix);
  skyMaterial.uniforms.dayMix.value = dayNightMix;
  skyMaterial.uniforms.sunsetMix.value = THREE.MathUtils.smoothstep(dayNightMix, .32, .49)
    * (1 - THREE.MathUtils.smoothstep(dayNightMix, .51, .68));
  fillLight.color.copy(NIGHT_HEMI).lerp(DAY_HEMI, dayNightMix);
  fillLight.groundColor.copy(NIGHT_GROUND).lerp(DAY_GROUND, dayNightMix);
  fillLight.intensity = .55 + dayNightMix * 1.65;
  sunLight.color.copy(NIGHT_SUNLIGHT).lerp(DAY_SUNLIGHT, dayNightMix);
  sunLight.intensity = .34 + dayNightMix * 2.15;
  sunLight.position.set(-18 + (1 - dayNightMix) * 37, 12 + dayNightMix * 16, 11);

  const starBoost = (activeSkyEvent?.stars || 0) * skyEventMix;
  const moonHaloBoost = (activeSkyEvent?.moonHalo || 0) * skyEventMix;
  skyStars.material.opacity = THREE.MathUtils.clamp((1 - dayNightMix) * (1 + starBoost), 0, 1);
  skyStars.material.size = .18 + (1 - dayNightMix) * .045 + Math.sin(time * 1.7) * .008 + starBoost * .025;
  skySparkles.material.opacity = THREE.MathUtils.clamp(
    (1 - dayNightMix) * (.76 + Math.sin(time * 2.4) * .12) + starBoost * .5,
    0,
    1,
  );
  skyAurora.material.uniforms.time.value = time;
  skyAurora.material.uniforms.nightMix.value = THREE.MathUtils.smoothstep(1 - dayNightMix, .35, .9) * (.2 + auroraEventMix * .8);
  const isDay = dayNightMix >= .5;
  sunBody.visible = isDay;
  sunGlow.visible = isDay;
  moonGroup.visible = !isDay;
  moonGlow.visible = !isDay;
  sunGlow.material.opacity = isDay ? 1 : 0;
  moonGlow.material.opacity = isDay ? 0 : .82 + moonHaloBoost * .24;
  moonBody.material.emissiveIntensity = .48 + (1 - dayNightMix) * .88;
  moonBody.material.color.set("#ffd1e7").lerp(new THREE.Color("#fff0e8"), dayNightMix * .25);
  moonGlow.material.color.set(activeSkyEvent?.moonColor || "#ffb5df");
  moonGlow.scale.setScalar(30 + (1 - dayNightMix) * 8 + moonHaloBoost * 8);
  sunBody.material.opacity = isDay ? 1 : 0;
  moonBody.material.opacity = isDay ? 0 : 1;
  moonCraterMaterial.opacity = isDay ? 0 : 1;
  skyClouds.material.opacity = .24 + dayNightMix * .2 + (activeSkyEvent?.cloudGlow || 0) * skyEventMix * .16;
  if (pebbleMaterial) pebbleMaterial.emissiveIntensity = .035 + (1 - dayNightMix) * .13;
  for (const material of lanternMaterials) material.emissiveIntensity = .28 + (1 - dayNightMix) * 3.2;
  for (const material of lanternGlowMaterials) material.opacity = .12 + (1 - dayNightMix) * .78;
  if (fountainWaterMaterial) fountainWaterMaterial.emissiveIntensity = .22 + (1 - dayNightMix) * .75;
  if (fountainStreamMaterial) fountainStreamMaterial.emissiveIntensity = .4 + (1 - dayNightMix) * .9;
  if (fountainGlowSprite) fountainGlowSprite.material.opacity = .24 + (1 - dayNightMix) * .56;
  fountainRipples.forEach(({ material }, index) => {
    material.opacity = .12 + (1 - dayNightMix) * .28 + Math.sin(time * 1.4 + index) * .035;
  });
  const isNight = dayNightMix < .45;
  const fullLabel = skyMode === "auto"
    ? (isNight ? "🌙 Night · Auto" : "☀ Day · Auto")
    : skyMode === "night" ? "🌙 Night" : "☀ Day";
  const label = isSmallScreen() ? (isNight ? "🌙" : "☀") : fullLabel;
  if (label !== skyLabel) {
    skyToggle.textContent = label;
    skyToggle.setAttribute("aria-label", `${fullLabel}. Press to change sky and music.`);
    skyLabel = label;
  }
}

function createIsland() {
  const terrainSegments = 48;
  const terrainRings = 16;
  const terrainGeometry = new THREE.BufferGeometry();
  const terrainVertices = [0, 0, 0];
  const terrainIndices = [];
  const terrainColors = [];
  const terrainPalette = ["#4e7656", "#567b59", "#5d805b", "#4b714f"];
  const addTerrainVertex = (x, z, vertex) => {
    terrainVertices.push(x, -z, terrainHeightAt(x, z));
    const color = new THREE.Color(terrainPalette[Math.floor(seeded(vertex, 541) * terrainPalette.length)]);
    color.multiplyScalar(.94 + seeded(vertex, 547) * .12);
    terrainColors.push(color.r, color.g, color.b);
  };
  addTerrainVertex(0, 0, 0);
  for (let ring = 1; ring <= terrainRings; ring++) {
    const radius = 26.5 * ring / terrainRings;
    for (let segment = 0; segment < terrainSegments; segment++) {
      const angle = segment / terrainSegments * Math.PI * 2;
      addTerrainVertex(Math.cos(angle) * radius, Math.sin(angle) * radius, (ring - 1) * terrainSegments + segment + 1);
    }
  }
  for (let segment = 0; segment < terrainSegments; segment++) {
    const next = (segment + 1) % terrainSegments;
    terrainIndices.push(0, next + 1, segment + 1);
  }
  for (let ring = 1; ring < terrainRings; ring++) {
    const innerStart = 1 + (ring - 1) * terrainSegments;
    const outerStart = 1 + ring * terrainSegments;
    for (let segment = 0; segment < terrainSegments; segment++) {
      const next = (segment + 1) % terrainSegments;
      const inner = innerStart + segment;
      const innerNext = innerStart + next;
      const outer = outerStart + segment;
      const outerNext = outerStart + next;
      terrainIndices.push(inner, outerNext, outer, inner, innerNext, outerNext);
    }
  }
  terrainGeometry.setAttribute("position", new THREE.Float32BufferAttribute(terrainVertices, 3));
  terrainGeometry.setAttribute("color", new THREE.Float32BufferAttribute(terrainColors, 3));
  terrainGeometry.setIndex(terrainIndices);
  terrainGeometry.computeVertexNormals();
  addMesh(scene, terrainGeometry, makeMaterial("#ffffff", {
    vertexColors: true,
    flatShading: true,
    roughness: 1,
  }), [0, .56, 0], { rotation: [-Math.PI / 2, 0, 0] });

  const ringRadii = [26.25, 25.5, 23.2, 19.5, 15, 10.5, 6, 2.6, .12];
  const ringHeights = [.34, -1.5, -4.1, -7, -10.2, -13.1, -16.1, -18.3, -19.5];
  const segments = 16;
  const rockPositions = [];
  const rockColors = [];
  const rockIndices = [];
  const rockPalette = ["#514957", "#655460", "#75616b", "#594c5b", "#827077"];
  for (let ring = 0; ring < ringRadii.length; ring++) {
    for (let segment = 0; segment < segments; segment++) {
      const angle = (segment / segments) * Math.PI * 2;
      const uneven = 1 + .035 * Math.sin(angle * 5 + ring * .8) + .022 * Math.cos(angle * 9 - ring);
      const radius = ringRadii[ring] * uneven;
      const height = ringHeights[ring] + Math.sin(angle * 4 + ring * 1.7) * (ring === 0 ? .08 : .32);
      rockPositions.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      const shade = new THREE.Color(rockPalette[Math.floor(seeded(ring * segments + segment, 29) * rockPalette.length)]);
      shade.multiplyScalar(.86 + seeded(ring * segments + segment, 31) * .28);
      rockColors.push(shade.r, shade.g, shade.b);
    }
  }
  for (let ring = 0; ring < ringRadii.length - 1; ring++) {
    for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      const top = ring * segments + segment;
      const topNext = ring * segments + next;
      const bottom = (ring + 1) * segments + segment;
      const bottomNext = (ring + 1) * segments + next;
      rockIndices.push(top, bottom, topNext, topNext, bottom, bottomNext);
    }
  }
  const rockGeometry = new THREE.BufferGeometry();
  rockGeometry.setAttribute("position", new THREE.Float32BufferAttribute(rockPositions, 3));
  rockGeometry.setAttribute("color", new THREE.Float32BufferAttribute(rockColors, 3));
  rockGeometry.setIndex(rockIndices);
  rockGeometry.computeVertexNormals();
  addMesh(
    scene,
    rockGeometry,
    makeMaterial("#ffffff", { vertexColors: true, flatShading: true, roughness: 1, side: THREE.DoubleSide }),
    [0, 0, 0],
    { castShadow: false, receiveShadow: false },
  );

  const cliffPalette = [
    "#4f6342", "#665047", "#75545a", "#514956", "#45475f", "#55516c",
  ];
  const cliffBatches = cliffPalette.map((color) => ({
    material: makeMaterial(color, { roughness: 1, flatShading: true }),
    matrices: [],
  }));
  const cliffLayers = 7;
  for (let layer = 0; layer < cliffLayers; layer++) {
    const around = layer < 2 ? 18 : 16;
    for (let block = 0; block < around; block++) {
      const seed = layer * 31 + block;
      const angle = (block / around) * Math.PI * 2 + (layer % 2) * Math.PI / around;
      const progress = layer / (cliffLayers - 1);
      const radius = 25.3 - progress * 5.4 + (seeded(seed, 81) - .5) * 1.2;
      const y = .04 - layer * .98 + (seeded(seed, 83) - .5) * .5;
      const colorIndex = layer === 0
        ? (seeded(seed, 85) > .25 ? 0 : 1)
        : Math.min(5, 1 + Math.min(4, Math.floor(progress * 5)) + (seeded(seed, 87) > .76 ? 1 : 0));
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      dummy.rotation.set(0, -angle, (seeded(seed, 89) - .5) * .08);
      dummy.scale.set(
        2.7 + seeded(seed, 91) * 1.2,
        1.05 + seeded(seed, 93) * .62,
        1.6 + seeded(seed, 95) * .85,
      );
      dummy.updateMatrix();
      cliffBatches[colorIndex].matrices.push(dummy.matrix.clone());
    }
  }
  cliffBatches.forEach(({ material, matrices }) => {
    if (!matrices.length) return;
    const blocks = new THREE.InstancedMesh(getBoxGeometry([1, 1, 1]), material, matrices.length);
    matrices.forEach((matrix, index) => blocks.setMatrixAt(index, matrix));
    blocks.instanceMatrix.needsUpdate = true;
    blocks.castShadow = false;
    blocks.receiveShadow = false;
    scene.add(blocks);
  });

  const rockSpurMaterial = makeMaterial("#625566", { roughness: 1, flatShading: true });
  for (let i = 0; i < 13; i++) {
    const angle = seeded(i, 37) * Math.PI * 2;
    const radius = 8 + seeded(i, 41) * 11;
    const length = 2.2 + seeded(i, 43) * 4.3;
    let surfaceY = ringHeights[ringHeights.length - 1];
    for (let ring = 0; ring < ringRadii.length - 1; ring++) {
      if (radius > ringRadii[ring] || radius < ringRadii[ring + 1]) continue;
      const progress = (ringRadii[ring] - radius) / (ringRadii[ring] - ringRadii[ring + 1]);
      surfaceY = THREE.MathUtils.lerp(ringHeights[ring], ringHeights[ring + 1], progress);
      break;
    }
    const spur = addMesh(
      scene,
      new THREE.ConeGeometry(.7 + seeded(i, 45) * .75, length, 5),
      rockSpurMaterial,
      [Math.cos(angle) * radius, surfaceY - length * .5 + .7, Math.sin(angle) * radius],
      { castShadow: false, receiveShadow: false },
    );
    const direction = new THREE.Vector3(Math.cos(angle) * .17, -1, Math.sin(angle) * .17).normalize();
    spur.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    spur.rotateX((seeded(i, 49) - .5) * .12);
    spur.rotateZ((seeded(i, 51) - .5) * .12);
    spur.scale.set(.8 + seeded(i, 53) * .6, 1, .8 + seeded(i, 55) * .6);
  }

  const cloudMaterial = makeMaterial("#ead6e8", { transparent: true, opacity: .46, roughness: 1, depthWrite: false });
  const cloudGeometry = new THREE.SphereGeometry(1, 9, 6);
  const cloudInstances = new THREE.InstancedMesh(cloudGeometry, cloudMaterial, 48);
  let cloudIndex = 0;
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 21 + seeded(i, 61) * 9;
    for (let puff = 0; puff < 4; puff++) {
      const offset = (puff - 1.5) * .75;
      dummy.position.set(
        Math.cos(angle) * radius + offset,
        -8.5 - seeded(i, 63) * 2.2 + Math.sin(puff * 1.8) * .35,
        Math.sin(angle) * radius + Math.cos(puff * 2.4) * .38,
      );
      dummy.scale.set(1.35, .72 + (puff % 2) * .18, .8);
      dummy.updateMatrix();
      cloudInstances.setMatrixAt(cloudIndex++, dummy.matrix);
    }
  }
  cloudInstances.instanceMatrix.needsUpdate = true;
  cloudInstances.castShadow = false;
  cloudInstances.receiveShadow = false;
  scene.add(cloudInstances);

  const waterfallMaterial = makeMaterial("#b9e8f4", { color: "#b9e8f4", emissive: "#477f9b", emissiveIntensity: .34, transparent: true, opacity: .74, roughness: .22, metalness: .12 });
  for (const [x, z, height] of [[-13, -17, 15], [12, -17, 12], [20, 3, 10]]) {
    const points = [
      new THREE.Vector3(x, -.1, z),
      new THREE.Vector3(x + .22, -height * .32, z + .08),
      new THREE.Vector3(x - .18, -height * .68, z + .16),
      new THREE.Vector3(x + .08, -height, z + .25),
    ];
    const stream = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 24, .12, 6, false),
      waterfallMaterial,
    );
    stream.frustumCulled = false;
    stream.castShadow = false;
    stream.receiveShadow = false;
    scene.add(stream);
  }

  const bank = new THREE.Mesh(
    new THREE.TorusGeometry(26.2, .28, 4, 16),
    makeMaterial("#708558", { flatShading: true }),
  );
  bank.rotation.x = Math.PI / 2;
  bank.position.y = .67;
  bank.receiveShadow = true;
  scene.add(bank);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(24.8, 16),
    new THREE.ShadowMaterial({ opacity: .14 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = .575;
  ground.receiveShadow = true;
  scene.add(ground);

  addMesh(scene, new THREE.SphereGeometry(2.8, 24, 16), makeMaterial("#e9d8d3", { emissive: "#746176", emissiveIntensity: .18 }), [17, 18, -28], { castShadow: false, receiveShadow: false });
  addMesh(scene, new THREE.SphereGeometry(2.55, 24, 16), makeMaterial("#514b63"), [18.5, 18.3, -26.6], { castShadow: false, receiveShadow: false });
}

function createPaths() {
  const pathMat = makeMaterial("#b39a7c", { roughness: 1 });
  const accentMat = makeMaterial("#cfb497", { roughness: 1 });
  const points = [
    [0, 0],
    ...sectionData.map(({ x, z }) => [x * .79, z * .79]),
  ];

  for (let i = 1; i < points.length; i++) {
    const [x, z] = points[i];
    const length = Math.hypot(x, z);
    const midX = x / 2;
    const midZ = z / 2;
    const path = addBox(scene, [midX, .68, midZ], [1.38, .11, length + 1.2], pathMat, { rotation: [0, Math.atan2(x, z), 0], receiveShadow: true });
    path.castShadow = false;
    const inlay = addBox(scene, [midX, .742, midZ], [.12, .025, length - 1], accentMat, { rotation: [0, Math.atan2(x, z), 0], castShadow: false });
    inlay.castShadow = false;
  }

  addCylinder(scene, [0, .72, 0], 3.2, 3.2, .2, "#c6aa88", 8);
  addCylinder(scene, [0, .85, 0], 2.8, 2.8, .14, "#e2cfad", 8);
  addCylinder(scene, [0, .94, 0], .22, .22, .12, "#d994aa", 8);
}

function createPond() {
  const limestone = makeMaterial("#d99ab9", { roughness: .76, flatShading: true });
  const limestoneLight = makeMaterial("#f5d6e5", { roughness: .64 });
  const limestoneShade = makeMaterial("#a96b91", { roughness: .82 });
  const carvedAccent = makeMaterial("#b7769c", { roughness: .62, metalness: .12 });
  const crystalMaterial = makeMaterial("#ffb5df", {
    color: "#ffc4e9",
    emissive: "#ff5fb5",
    emissiveIntensity: 1.05,
    roughness: .22,
    metalness: .18,
    flatShading: true,
  });
  const runeMaterial = makeMaterial("#fff0fa", {
    emissive: "#ff91d2",
    emissiveIntensity: 1.15,
    roughness: .32,
    metalness: .18,
  });
  const water = makeMaterial("#f39bd5", {
    color: "#f7b4e2",
    roughness: .16,
    metalness: .18,
    emissive: "#d94db6",
    emissiveIntensity: .68,
    transparent: true,
    opacity: .88,
  });
  fountainWaterMaterial = water;

  const basin = addCylinder(scene, [0, .77, 0], 5.62, 5.4, .44, limestone, 48);
  basin.receiveShadow = true;
  const basinFoot = new THREE.Mesh(new THREE.TorusGeometry(5.37, .12, 8, 64), limestoneShade);
  basinFoot.position.y = .61;
  basinFoot.rotation.x = Math.PI / 2;
  scene.add(basinFoot);
  const basinInset = new THREE.Mesh(new THREE.TorusGeometry(5.35, .1, 9, 64), limestoneLight);
  basinInset.position.y = 1.01;
  basinInset.rotation.x = Math.PI / 2;
  scene.add(basinInset);
  const basinCarving = new THREE.Mesh(new THREE.TorusGeometry(5.05, .045, 7, 64), carvedAccent);
  basinCarving.position.y = .986;
  basinCarving.rotation.x = Math.PI / 2;
  scene.add(basinCarving);
  const basinRuneBand = new THREE.Mesh(new THREE.TorusGeometry(5.54, .032, 6, 64), runeMaterial);
  basinRuneBand.position.y = .82;
  basinRuneBand.rotation.x = Math.PI / 2;
  scene.add(basinRuneBand);
  const basinGems = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(1, 0),
    crystalMaterial,
    24,
  );
  for (let gem = 0; gem < 24; gem++) {
    const angle = gem / 24 * Math.PI * 2;
    dummy.position.set(Math.cos(angle) * 5.57, .81 + Math.sin(gem * 1.7) * .035, Math.sin(angle) * 5.57);
    dummy.rotation.set(0, -angle, .22);
    dummy.scale.set(.12, .19, .09);
    dummy.updateMatrix();
    basinGems.setMatrixAt(gem, dummy.matrix);
  }
  basinGems.instanceMatrix.needsUpdate = true;
  basinGems.castShadow = false;
  scene.add(basinGems);
  const pond = addMesh(
    scene,
    new THREE.CircleGeometry(5.18, 48),
    water,
    [0, 1.01, 0],
    { rotation: [-Math.PI / 2, 0, 0], receiveShadow: false },
  );
  pond.userData.isPond = true;
  pond.userData.type = "fountain";
  interactables.push(pond);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(5.49, .2, 10, 64), limestoneLight);
  rim.position.y = .99;
  rim.rotation.x = Math.PI / 2;
  scene.add(rim);

  const addBowl = (radius, baseY, segments = 36) => {
    const profile = [
      [0, 0],
      [.44, 0],
      [.58, .035],
      [.76, .11],
      [.93, .25],
      [1, .32],
      [.98, .36],
      [.9, .34],
      [.78, .23],
      [.68, .16],
      [0, .16],
    ].map(([r, y]) => new THREE.Vector2(r * radius, y * radius));
    const bowl = new THREE.Mesh(new THREE.LatheGeometry(profile, segments), limestone);
    bowl.position.y = baseY;
    bowl.castShadow = true;
    bowl.receiveShadow = true;
    scene.add(bowl);

    const lip = new THREE.Mesh(
      new THREE.TorusGeometry(radius * .98, radius * .035, 8, segments),
      limestoneLight,
    );
    lip.position.y = baseY + radius * .34;
    lip.rotation.x = Math.PI / 2;
    scene.add(lip);

    const footBand = new THREE.Mesh(
      new THREE.TorusGeometry(radius * .58, radius * .022, 6, segments),
      carvedAccent,
    );
    footBand.position.y = baseY + radius * .04;
    footBand.rotation.x = Math.PI / 2;
    scene.add(footBand);

    for (let scroll = 0; scroll < 8; scroll++) {
      const angle = scroll / 8 * Math.PI * 2;
      const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
      const centerRadius = radius * .88;
      const spiralRadius = radius * .105;
      const points = [];
      for (let point = 0; point <= 40; point++) {
        const progress = point / 40;
        const theta = progress * Math.PI * 2.35 + Math.PI * .28;
        const curl = spiralRadius * (1 - progress * .87);
        const position = radial.clone().multiplyScalar(centerRadius + curl * Math.cos(theta))
          .add(tangent.clone().multiplyScalar(curl * Math.sin(theta)));
        position.y = baseY + radius * (.18 + progress * .12);
        points.push(position);
      }
      const scrollwork = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 32, Math.max(.018, radius * .012), 5, false),
        scroll % 2 ? limestoneLight : runeMaterial,
      );
      scrollwork.castShadow = false;
      scrollwork.receiveShadow = false;
      scene.add(scrollwork);
    }

    const carvedBeads = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 8, 6),
      limestoneLight,
      16,
    );
    for (let bead = 0; bead < 16; bead++) {
      const angle = bead / 16 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * radius * .84,
        baseY + radius * .18,
        Math.sin(angle) * radius * .84,
      );
      dummy.scale.setScalar(radius * .055);
      dummy.updateMatrix();
      carvedBeads.setMatrixAt(bead, dummy.matrix);
    }
    carvedBeads.instanceMatrix.needsUpdate = true;
    carvedBeads.castShadow = false;
    scene.add(carvedBeads);

    const waterLevel = baseY + radius * .175;
    const bowlWater = new THREE.Mesh(
      new THREE.CircleGeometry(radius * .7, segments),
      water,
    );
    bowlWater.position.y = waterLevel;
    bowlWater.rotation.x = -Math.PI / 2;
    bowlWater.receiveShadow = false;
    scene.add(bowlWater);
    const waterline = new THREE.Mesh(
      new THREE.TorusGeometry(radius * .69, .022, 5, segments),
      makeMaterial("#ffe7f5", {
        emissive: "#ff87d1",
        emissiveIntensity: .9,
        transparent: true,
        opacity: .65,
      }),
    );
    waterline.position.y = waterLevel + .012;
    waterline.rotation.x = Math.PI / 2;
    scene.add(waterline);
    return { radius, baseY, waterLevel, rimY: baseY + radius * .34 };
  };

  const addScrollSupports = (supportRadius, centerY, size, count = 4) => {
    for (let support = 0; support < count; support++) {
      const angle = support / count * Math.PI * 2 + Math.PI / 4;
      const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
      const control = [
        [-.58, -.32, -.08],
        [-.24, -.1, .02],
        [.18, .24, .12],
        [.42, .12, .02],
        [.26, -.12, -.08],
      ];
      const points = control.map(([out, up, side]) => radial.clone()
        .multiplyScalar(supportRadius + out * size)
        .add(tangent.clone().multiplyScalar(side * size))
        .setY(centerY + up * size));
      const supportCurve = new THREE.CatmullRomCurve3(points);
      const supportMesh = new THREE.Mesh(
        new THREE.TubeGeometry(supportCurve, 24, size * .075, 7, false),
        limestoneLight,
      );
      supportMesh.castShadow = true;
      supportMesh.receiveShadow = false;
      scene.add(supportMesh);

      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(size * .19, 0), crystalMaterial);
      gem.position.copy(radial).multiplyScalar(supportRadius + size * .34);
      gem.position.y = centerY + size * .3;
      gem.rotation.set(.2, angle, .35);
      scene.add(gem);
    }
  };

  addCylinder(scene, [0, 1.13, 0], 1.48, 1.62, .2, limestoneShade, 32);
  addCylinder(scene, [0, 1.29, 0], 1.3, 1.46, .16, limestoneLight, 32);
  addCylinder(scene, [0, 1.47, 0], .62, .78, .22, limestone, 24);
  const lowerBowl = addBowl(2.35, 1.59, 40);
  addScrollSupports(1.12, 2.42, .74, 4);
  addCylinder(scene, [0, 2.57, 0], .48, .62, .38, limestoneShade, 20);
  addCylinder(scene, [0, 2.78, 0], .82, .64, .12, limestoneLight, 24);
  const middleBowl = addBowl(1.42, 2.82, 36);
  addScrollSupports(.52, 3.39, .43, 4);
  addCylinder(scene, [0, 3.38, 0], .31, .43, .36, limestoneShade, 20);
  addCylinder(scene, [0, 3.58, 0], .55, .4, .11, limestoneLight, 24);
  const upperBowl = addBowl(.72, 3.62, 32);
  addMesh(
    scene,
    new THREE.OctahedronGeometry(.22, 0),
    crystalMaterial,
    [0, 4.02, 0],
    { scale: [1, 1.3, 1], castShadow: true },
  );
  addMesh(
    scene,
    new THREE.ConeGeometry(.38, 1.45, 6, 1),
    crystalMaterial,
    [0, 4.72, 0],
    { rotation: [0, Math.PI / 6, 0], castShadow: true },
  );
  for (let shard = 0; shard < 5; shard++) {
    const angle = shard / 5 * Math.PI * 2;
    const size = .56 + (shard % 2) * .16;
    addMesh(
      scene,
      new THREE.ConeGeometry(.2, size, 5, 1),
      shard % 2 ? limestoneLight : crystalMaterial,
      [Math.cos(angle) * .34, 4.43 + size * .1, Math.sin(angle) * .34],
      { rotation: [Math.cos(angle) * .18, angle, Math.sin(angle) * .18], castShadow: true },
    );
  }
  addMesh(
    scene,
    new THREE.SphereGeometry(.17, 16, 12),
    makeMaterial("#ffe3f4", { emissive: "#ff71c5", emissiveIntensity: 1.8, roughness: .3 }),
    [0, 4.02, 0],
    { castShadow: true },
  );

  fountainGlow = addMesh(
    scene,
    new THREE.SphereGeometry(.34, 12, 8),
    makeMaterial("#ffb8d5", { color: "#ffb8d5", emissive: "#fa79b2", emissiveIntensity: 1.65, transparent: true, opacity: .7, depthWrite: false }),
    [0, 4.12, 0],
    { castShadow: false, receiveShadow: false },
  );
  fountainHalo = new THREE.Mesh(
    new THREE.TorusGeometry(1.72, .035, 5, 48),
    makeMaterial("#ffc4dd", { emissive: "#e871aa", emissiveIntensity: 1.5, transparent: true, opacity: .52 }),
  );
  fountainHalo.position.y = 3.12;
  fountainHalo.rotation.x = Math.PI / 2;
  scene.add(fountainHalo);
  fountainRipples = [];
  for (const [radius, y, color] of [
    [lowerBowl.radius * .7, lowerBowl.waterLevel + .02, "#ffc4dd"],
    [middleBowl.radius * .69, middleBowl.waterLevel + .02, "#a9e3eb"],
    [4.1, 1.035, "#eac7d3"],
  ]) {
    const material = makeMaterial(color, {
      emissive: color,
      emissiveIntensity: .7,
      transparent: true,
      opacity: .24,
      depthWrite: false,
    });
    const ripple = new THREE.Mesh(new THREE.TorusGeometry(radius, .025, 5, 64), material);
    ripple.position.y = y;
    ripple.rotation.x = Math.PI / 2;
    scene.add(ripple);
    fountainRipples.push({ mesh: ripple, material, phase: fountainRipples.length * 2.1 });
  }
  const sparkleMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 7, 5),
    makeMaterial("#ffe3ef", { emissive: "#ff93c4", emissiveIntensity: 2, transparent: true, opacity: .9, depthWrite: false }),
    90,
  );
  sparkleMesh.count = 0;
  sparkleMesh.frustumCulled = false;
  fountainHalo.userData.sparkles = sparkleMesh;
  scene.add(sparkleMesh);
  fountainGlowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture("rgba(255,157,204,.68)", "rgba(246,108,177,0)"),
    transparent: true,
    depthWrite: false,
    opacity: .24,
  }));
  fountainGlowSprite.position.set(0, 2.85, 0);
  fountainGlowSprite.scale.set(11, 11, 1);
  scene.add(fountainGlowSprite);

  const streamMaterial = makeMaterial("#ffe0f4", {
    color: "#ffe0f4",
    transparent: true,
    opacity: .86,
    emissive: "#ff81d0",
    emissiveIntensity: .9,
    roughness: .16,
    metalness: .08,
    depthWrite: false,
  });
  fountainStreamMaterial = streamMaterial;
  const cascades = [
    [0, 4.18, upperBowl.radius * .66, upperBowl.waterLevel + .035, 8],
    [upperBowl.radius * .86, upperBowl.waterLevel - .01, middleBowl.radius * .72, middleBowl.waterLevel + .04, 12],
    [middleBowl.radius * .91, middleBowl.rimY, lowerBowl.radius * .72, lowerBowl.waterLevel + .04, 18],
  ];
  for (const [fromRadius, fromY, toRadius, toY, count] of cascades) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const start = new THREE.Vector3(Math.cos(angle) * fromRadius, fromY, Math.sin(angle) * fromRadius);
      const end = new THREE.Vector3(Math.cos(angle + .08) * toRadius, toY, Math.sin(angle + .08) * toRadius);
      const mid = start.clone().lerp(end, .5).add(new THREE.Vector3(Math.cos(angle) * .18, 0, Math.sin(angle) * .18));
      const cascade = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(start, mid, end), 10, .034, 5, false),
        streamMaterial,
      );
      cascade.castShadow = false;
      cascade.receiveShadow = false;
      scene.add(cascade);
    }
  }

  const steppingMaterial = makeMaterial("#d2b798");
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 5.95 + (i % 2) * .12;
    const step = addCylinder(scene, [Math.cos(angle) * radius, .77, Math.sin(angle) * radius], .42, .48, .13, steppingMaterial, 6);
    step.rotation.y = angle;
  }
}

function createViewingBench() {
  const x = 0;
  const z = VIEWING_DECK_Z;
  worldBlockers.push({ type: "rect", x, z: z + .2, halfWidth: 1.9, halfDepth: .68 });
  for (const side of [-1, 1]) {
    worldBlockers.push({ type: "rect", x: side * 2.46, z: z + 2.43, halfWidth: .9, halfDepth: .12 });
  }
  for (const side of [-1, 1]) {
    worldBlockers.push({ type: "rect", x: side * 3.35, z: z + .15, halfWidth: .12, halfDepth: 1.82 });
  }
  const platform = new THREE.Group();
  platform.position.set(x, .64, z);
  scene.add(platform);
  viewingBench = platform;
  benchSeatPosition = new THREE.Vector3(x, .97, z + .08);

  const deckWood = makeMaterial("#8c6373", { roughness: .82 });
  const deckLight = makeMaterial("#b98399", { roughness: .76 });
  const gold = makeMaterial("#f1cf91", { roughness: .45, metalness: .3, emissive: "#c784a6", emissiveIntensity: .12 });
  addBox(platform, [0, .1, 0], [7, .2, 5.2], deckWood, { castShadow: false });
  for (let plank = 0; plank < 7; plank++) {
    addBox(platform, [-2.58 + plank * .86, .215, 0], [.78, .055, 4.95], plank % 2 ? "#c59a98" : deckLight, { castShadow: false });
  }
  addBox(platform, [0, .25, -2.35], [7, .12, .18], gold, { castShadow: false });
  addBox(platform, [0, .25, 2.35], [7, .12, .18], gold, { castShadow: false });

  for (const side of [-1, 1]) {
    for (const railZ of [-2.32, 2.32]) {
      addBox(platform, [side * 3.28, .81, railZ], [.16, 1.12, .16], deckWood);
      addBox(platform, [side * 3.28, 1.43, railZ], [.25, .12, .25], gold);
    }
    addBox(platform, [side * 3.28, 1.16, -.05], [.14, .14, 4.5], deckWood, { castShadow: false });
    addBox(platform, [side * 3.28, .7, -.05], [.11, .11, 4.5], deckLight, { castShadow: false });
    for (let picket = 0; picket < 5; picket++) {
      const picketZ = -1.78 + picket * .86;
      addBox(platform, [side * 3.28, .92, picketZ], [.085, .76, .085], deckLight, { castShadow: false });
    }
  }
  const fencePosts = [-3.28, -1.64, 0, 1.64, 3.28];
  for (const fenceX of fencePosts) {
    if (fenceX === 0) continue;
    addBox(platform, [fenceX, .88, 2.32], [.13, 1.2, .13], deckWood);
    addBox(platform, [fenceX, 1.55, 2.32], [.22, .12, .22], gold);
  }
  for (let section = 0; section < fencePosts.length - 1; section++) {
    if (section === 1 || section === 2) continue;
    const midpoint = (fencePosts[section] + fencePosts[section + 1]) / 2;
    addBox(platform, [midpoint, 1.2, 2.32], [1.64, .14, .14], deckWood, { castShadow: false });
    addBox(platform, [midpoint, .72, 2.32], [1.64, .12, .12], deckLight, { castShadow: false });
    for (let picket = 1; picket <= 3; picket++) {
      addBox(platform, [fencePosts[section] + picket * .41, .96, 2.32], [.08, .68, .08], deckLight, { castShadow: false });
    }
  }

  const bench = new THREE.Group();
  bench.position.set(0, .07, -.2);
  bench.rotation.y = Math.PI;
  platform.add(bench);
  for (const side of [-1, 1]) {
    addBox(bench, [side * 1.53, .43, -.02], [.2, .92, .82], deckWood, { rotation: [0, 0, side * -.06] });
    addBox(bench, [side * 1.53, 1.08, .45], [.22, 1.28, .2], deckWood, { rotation: [side * -.1, 0, side * -.04] });
    addMesh(bench, new THREE.SphereGeometry(.14, 8, 6), gold, [side * 1.53, 1.72, .45], { castShadow: false });
  }
  for (let board = 0; board < 4; board++) {
    addBox(bench, [0, .78 + board * .12, .47], [3.18, .1, .16], board % 2 ? "#b77791" : "#c6869c");
  }
  addBox(bench, [0, .88, -.08], [3.2, .19, 1.05], "#a96f84");
  addBox(bench, [0, 1.0, -.08], [3.05, .1, .88], "#f3c1d5");
  addBox(bench, [0, 1.07, -.08], [2.78, .035, .66], "#ffe0e9", { castShadow: false });
  for (const side of [-1, 1]) {
    addBox(bench, [side * 1.67, 1.22, -.04], [.2, .16, 1.12], deckLight);
    addMesh(bench, new THREE.SphereGeometry(.085, 8, 6), gold, [side * 1.67, 1.32, -.1], { castShadow: false });
  }
  for (const [flowerX, flowerY, flowerZ, color] of [
    [-1.05, 1.56, .42, "#ffb5d0"],
    [-.72, 1.68, .43, "#fff0f7"],
    [0, 1.58, .42, "#d4b8ff"],
    [.78, 1.69, .43, "#ffb5d0"],
    [1.12, 1.56, .42, "#fff0f7"],
  ]) {
    addMesh(bench, new THREE.SphereGeometry(.2, 9, 6), makeMaterial(color, {
      emissive: color,
      emissiveIntensity: .16,
      roughness: .6,
    }), [flowerX, flowerY, flowerZ], { scale: [1, .72, .45], castShadow: false });
  }
  for (const side of [-1, 1]) {
    const pot = addMesh(platform, new THREE.CylinderGeometry(.28, .2, .35, 8), makeMaterial("#b87991"), [side * 2.8, .49, 1.65]);
    pot.rotation.z = Math.PI;
    for (let leaf = 0; leaf < 3; leaf++) {
      const angle = (leaf / 3) * Math.PI * 2;
      addMesh(platform, new THREE.SphereGeometry(.2, 8, 6), makeMaterial("#9ba879"), [
        side * 2.8 + Math.cos(angle) * .2,
        .84 + (leaf % 2) * .12,
        1.65 + Math.sin(angle) * .2,
      ], { scale: [.5, 1.25, .48], rotation: [0, angle, -.25], castShadow: false });
    }
    addMesh(platform, new THREE.SphereGeometry(.19, 8, 6), makeMaterial(side < 0 ? "#ffc2dc" : "#d8c0ff", {
      emissive: side < 0 ? "#ff8fc7" : "#ad88ff",
      emissiveIntensity: .8,
      transparent: true,
      opacity: .8,
    }), [side * 2.8, .94, 1.65], { castShadow: false });
  }

  const benchHitbox = addBox(platform, [0, 1.15, -.16], [3.8, 2.15, 1.7], "#ffffff", {
    castShadow: false,
    receiveShadow: false,
    material: { transparent: true, opacity: 0, depthWrite: false },
  });
  benchHitbox.userData.type = "bench";
  interactables.push(benchHitbox);

  const label = addTextSprite("A little sky-view seat · E to sit");
  label.scale.set(4.4, .72, 1);
  label.position.set(0, 2.4, .3);
  platform.add(label);
  worldLabels.push(label);
}

function nearViewingDeck(x, z, clearance = 4.2) {
  return Math.hypot(x, z - VIEWING_DECK_Z) < clearance;
}

function createTree(x, z, scale = 1, seed = 0, flowering = true) {
  treeTrunkBlockers.push({ type: "circle", x, z, radius: .42 * scale });
  const addPart = (position, size, color, rotation = [0, 0, 0]) => {
    const material = makeMaterial(color);
    const geometry = getBoxGeometry(size);
    const key = `${geometry.uuid}:${material.uuid}`;
    if (!treeBatches.has(key)) treeBatches.set(key, { geometry, material, matrices: [] });
    dummy.position.set(x + position[0] * scale, .64 + position[1] * scale, z + position[2] * scale);
    dummy.rotation.set(rotation[0], rotation[1], rotation[2]);
    dummy.scale.set(size[0] * scale, size[1] * scale, size[2] * scale);
    dummy.updateMatrix();
    treeBatches.get(key).matrices.push(dummy.matrix.clone());
  };
  const addBranch = (from, to, radius, color) => {
    const direction = new THREE.Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
    const length = direction.length();
    if (length < .01) return;
    const geometry = getCylinderGeometry(.58, 1, 1, 6);
    const material = makeMaterial(color);
    const key = `${geometry.uuid}:${material.uuid}`;
    if (!treeBatches.has(key)) treeBatches.set(key, { geometry, material, matrices: [] });
    dummy.position.set(
      x + (from.x + to.x) * .5 * scale,
      .64 + (from.y + to.y) * .5 * scale,
      z + (from.z + to.z) * .5 * scale,
    );
    dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    dummy.scale.set(radius * scale, length * scale, radius * scale);
    dummy.updateMatrix();
    treeBatches.get(key).matrices.push(dummy.matrix.clone());
  };
  const addBloom = (local, count, bloomSeed) => {
    if (!flowering) return;
    for (let i = 0; i < count; i++) {
      const angle = seeded(i + bloomSeed * 8, 41) * Math.PI * 2;
      const radius = seeded(i, bloomSeed + 47) * .48;
      const center = new THREE.Vector3(
        x + (local.x + Math.cos(angle) * radius) * scale,
        .64 + (local.y + seeded(i, 43) * .34) * scale,
        z + (local.z + Math.sin(angle) * radius) * scale,
      );
      const flowerScale = scale * (.65 + seeded(i, bloomSeed + 49) * .42);
      for (let petal = 0; petal < 5; petal++) {
        const rotation = new THREE.Euler(
          .2 + seeded(i, petal + 73) * .35,
          (petal / 5) * Math.PI * 2 + angle,
          .12 * Math.sin(angle),
        );
        const quaternion = new THREE.Quaternion().setFromEuler(rotation);
        const petalAngle = (petal / 5) * Math.PI * 2 + angle;
        const position = center.clone().add(new THREE.Vector3(
          Math.cos(petalAngle) * .105 * flowerScale,
          0,
          Math.sin(petalAngle) * .105 * flowerScale,
        ));
        const matrix = new THREE.Matrix4().compose(
          position,
          quaternion,
          new THREE.Vector3(.13 * flowerScale, .047 * flowerScale, .09 * flowerScale),
        );
        const color = ["#f5c2d0", "#e8a4bc", "#f8d4d7", "#eeb3cd"][Math.floor(seeded(i + petal, bloomSeed + 51) * 4)];
        blossomPetals.push({ matrix, color });
      }
      const centerMatrix = new THREE.Matrix4().compose(
        center.clone().add(new THREE.Vector3(0, .01, 0)),
        new THREE.Quaternion(),
        new THREE.Vector3(.065 * flowerScale, .05 * flowerScale, .065 * flowerScale),
      );
      blossomCenters.push(centerMatrix);
    }
  };

  const style = Math.abs(Math.floor(seed)) % 7;
  const treeStyles = [
    { height: 6.1, branches: 9, spread: 3.45, droop: 0, crown: [1.58, 1.14, .54], fullness: 54 },
    { height: 7.3, branches: 8, spread: 2.85, droop: 0, crown: [1.2, .8, .36], fullness: 42 },
    { height: 5.8, branches: 10, spread: 3.8, droop: -.9, crown: [1.85, 1.26, .6], fullness: 64 },
    { height: 6.45, branches: 7, spread: 4.1, droop: -.2, crown: [2.05, 1.35, .63], fullness: 68 },
    { height: 5.6, branches: 12, spread: 3.25, droop: -.35, crown: [1.55, 1.12, .48], fullness: 60 },
    { height: 7.0, branches: 11, spread: 3.1, droop: -.62, crown: [1.38, 1.04, .42], fullness: 58 },
    { height: 6.25, branches: 8, spread: 4.25, droop: -.08, crown: [2.18, 1.5, .76], fullness: 72 },
  ];
  const treeStyle = treeStyles[style];
  const crownHeight = treeStyle.height;
  const lean = (seeded(seed, 17) - .5) * .8;
  const trunk = [];
  for (let i = 0; i <= 7; i++) {
    const t = i / 7;
    const bend = style === 0
      ? Math.sin(t * Math.PI) * .72
      : style === 2 ? Math.sin(t * Math.PI * .72) * .35 : Math.sin(t * Math.PI) * .24;
    trunk.push({
      x: lean * t + bend,
      y: .12 + t * crownHeight,
      z: Math.sin(t * Math.PI * 1.4 + seed) * .12,
    });
  }
  for (let i = 0; i < trunk.length - 1; i++) {
    addBranch(trunk[i], trunk[i + 1], .23 - (i / trunk.length) * .16, i < 2 ? "#604239" : "#755044");
  }

  const branches = [];
  const branchCount = treeStyle.branches;
  for (let i = 0; i < branchCount; i++) {
    const angle = (i / branchCount) * Math.PI * 2 + seeded(i, seed + 4);
    const tier = 2 + (i % 4) * .68;
    const origin = trunk[Math.min(6, Math.floor((tier / crownHeight) * 7))];
    const width = treeStyle.spread * (.48 + seeded(i, 8) * .42);
    const droop = treeStyle.droop < -.5 ? treeStyle.droop - seeded(i, 7) * .65 : treeStyle.droop * seeded(i, 7);
    const middle = {
      x: origin.x + Math.cos(angle) * width * .54,
      y: origin.y + (style === 1 ? 1.05 : .9) + droop * .38,
      z: origin.z + Math.sin(angle) * width * .54,
    };
    const end = {
      x: origin.x + Math.cos(angle) * width,
      y: origin.y + (style === 1 ? 1.8 : 1.35) + droop,
      z: origin.z + Math.sin(angle) * width,
    };
    addBranch(origin, middle, .125, "#805546");
    addBranch(middle, end, .075, "#946451");
    branches.push({ angle, middle, end, droop, width });
  }

  const tipPositions = [];
  for (let i = 0; i < branches.length; i++) {
    const branch = branches[i];
    const splitCount = style === 1 ? 2 : 3;
    for (let j = 0; j < splitCount; j++) {
      const side = j - (splitCount - 1) / 2;
      const angle = branch.angle + side * .58;
      const direction = branch.droop < -.65 && j === 1 ? -.56 : .25 + seeded(i + j, 61) * .55;
      const length = branch.width * (.38 + seeded(j, i + 21) * .27);
      const tip = {
        x: branch.end.x + Math.cos(angle) * length,
        y: branch.end.y + direction + (branch.droop < -.65 ? -Math.abs(side) * .22 : 0),
        z: branch.end.z + Math.sin(angle) * length,
      };
      addBranch(branch.middle, tip, .052, "#a27159");
      tipPositions.push(tip);
    }
  }

  for (let i = 0; i < tipPositions.length; i++) {
    const tip = tipPositions[i];
    const clusterCount = style === 0 ? 6 : 5;
    addBloom(tip, clusterCount, seed * 2 + i);
    const offset = treeStyle.droop < -.5 ? -.22 : .3;
    addBloom({
      x: tip.x * .64,
      y: Math.min(crownHeight + .35, tip.y + offset),
      z: tip.z * .64,
    }, 3, seed + i * 1.7);
  }
  if (flowering) blossomTreeSources.push({ x, z, scale, height: crownHeight });

  if (flowering) {
    const canopyColors = ["#d876a4", "#e58bb4", "#f0a3c4", "#c96898"];
    const [outerRadius, middleRadius, topRadius] = treeStyle.crown;
    const canopyTiers = [
      { y: crownHeight * .74, radius: outerRadius, count: style === 4 ? 8 : 6, size: [1.85, 1.1, 1.72] },
      { y: crownHeight * .88, radius: middleRadius, count: style === 2 ? 7 : 5, size: [1.72, 1.12, 1.62] },
      { y: crownHeight * 1.01, radius: topRadius, count: 3, size: [1.55, .98, 1.48] },
    ];
    canopyTiers.forEach((tier, tierIndex) => {
      for (let block = 0; block < tier.count; block++) {
        const angle = (block / tier.count) * Math.PI * 2 + tierIndex * .31 + seed;
        const offset = (seeded(block, seed + tierIndex * 13) - .5) * .28;
        const color = canopyColors[Math.floor(seeded(block + tierIndex * 19, seed + 23) * canopyColors.length)];
        addPart(
          [
            Math.cos(angle) * (tier.radius + offset),
            tier.y + (seeded(block, seed + 31) - .5) * .2,
            Math.sin(angle) * (tier.radius + offset),
          ],
          tier.size,
          color,
          [0, -angle, (seeded(block, seed + 37) - .5) * .035],
        );
      }
    });

    const leafColors = ["#db86a9", "#edacc2", "#f2bfd0", "#8fa36f", "#a9b77d", "#73885f"];
    for (let leaf = 0; leaf < treeStyle.fullness; leaf++) {
      const angle = seeded(leaf, seed + 59) * Math.PI * 2;
      const radialDistance = Math.sqrt(seeded(leaf, seed + 61)) * (outerRadius + .9);
      const height = crownHeight * (.65 + seeded(leaf, seed + 67) * .43);
      const colorIndex = leaf % 4 === 0
        ? 3 + Math.floor(seeded(leaf, seed + 71) * 3)
        : Math.floor(seeded(leaf, seed + 73) * 3);
      addPart(
        [
          Math.cos(angle) * radialDistance,
          height,
          Math.sin(angle) * radialDistance,
        ],
        [.48, .34, .44],
        leafColors[colorIndex],
        [0, angle, (seeded(leaf, seed + 79) - .5) * .12],
      );
    }
  }

  for (const [side, color] of [[-1, "#67805a"], [1, "#749267"]]) {
    addPart([side * .42, .84, side * .18], [.35, .29, .3], color, [0, side * .3, side * .12]);
  }
}

function flushTreeBatches() {
  for (const { geometry, material, matrices } of treeBatches.values()) {
    const instances = new THREE.InstancedMesh(geometry, material, matrices.length);
    instances.frustumCulled = false;
    for (let i = 0; i < matrices.length; i++) instances.setMatrixAt(i, matrices[i]);
    instances.instanceMatrix.needsUpdate = true;
    instances.castShadow = false;
    instances.receiveShadow = false;
    scene.add(instances);
  }
  treeBatches.clear();
}

function flushPlantBatches() {
  if (blossomPetals.length) {
    const mesh = new THREE.InstancedMesh(
      getSphereGeometry(),
      new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: .8 }),
      blossomPetals.length,
    );
    mesh.frustumCulled = false;
    blossomPetals.forEach(({ matrix, color }, index) => {
      mesh.setMatrixAt(index, matrix);
      mesh.setColorAt(index, new THREE.Color(color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);
  }
  if (blossomCenters.length) {
    const mesh = new THREE.InstancedMesh(
      getSphereGeometry(),
      makeMaterial("#fff0bf", { emissive: "#aa7037", emissiveIntensity: .16 }),
      blossomCenters.length,
    );
    mesh.frustumCulled = false;
    blossomCenters.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
  }
  for (const { geometry, material, matrices, colors } of plantBatches.values()) {
    const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
    mesh.frustumCulled = false;
    matrices.forEach((matrix, index) => {
      mesh.setMatrixAt(index, matrix);
    if (colors?.length === matrices.length) mesh.setColorAt(index, colors[index]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    scene.add(mesh);
  }
  plantBatches.clear();
}

function createLantern(x, z, color = "#f3bb81", rotation = Math.random() * Math.PI * 2) {
  const radius = Math.hypot(x, z);
  if (radius > 20.8) {
    x *= 20.8 / radius;
    z *= 20.8 / radius;
  }
  if (staticLanternSites.some((site) => Math.hypot(x - site.x, z - site.z) < STATIC_LANTERN_SPACING)) return false;
  staticLanternSites.push({ x, z });
  const lantern = new THREE.Group();
  lantern.position.set(x, .64, z);
  lantern.rotation.y = rotation;
  scene.add(lantern);
  const toWorld = (localX, localZ) => ({
    x: x + localX * Math.cos(rotation) + localZ * Math.sin(rotation),
    z: z - localX * Math.sin(rotation) + localZ * Math.cos(rotation),
  });
  const lanternPink = "#ff9fc4";
  const bark = makeMaterial("#925e55", { roughness: .94 });
  const gold = makeMaterial("#d9a95f", { roughness: .48, metalness: .48 });
  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.48, .02, 0),
    new THREE.Vector3(-.64, .66, 0),
    new THREE.Vector3(-.28, 1.26, 0),
    new THREE.Vector3(-.42, 2.05, 0),
    new THREE.Vector3(.08, 2.83, 0),
    new THREE.Vector3(.78, 3.14, 0),
    new THREE.Vector3(1.16, 2.78, 0),
  ]);
  addMesh(lantern, new THREE.TubeGeometry(trunkCurve, 24, .14, 7, false), bark, [0, 0, 0], { castShadow: false });
  const vineCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.55, .18, .13),
    new THREE.Vector3(-.38, .92, .16),
    new THREE.Vector3(-.5, 1.7, .16),
    new THREE.Vector3(.08, 2.45, .16),
    new THREE.Vector3(.76, 2.98, .12),
  ]);
  addMesh(lantern, new THREE.TubeGeometry(vineCurve, 20, .026, 5, false), gold, [0, 0, 0], { castShadow: false });

  for (const [cx, cy, cz] of [[-.35, 1.35, .02], [-.07, 2.53, .02], [.48, 3.02, .02], [.94, 2.96, .02]]) {
    for (let petal = 0; petal < 5; petal++) {
      const angle = (petal / 5) * Math.PI * 2;
      const petalPosition = toWorld(cx + Math.cos(angle) * .13, cz + Math.sin(angle) * .13);
      const petalRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
      const transform = new THREE.Matrix4().compose(
        new THREE.Vector3(petalPosition.x, .64 + cy + Math.sin(angle) * .1, petalPosition.z),
        petalRotation,
        new THREE.Vector3(.12, .07, .09),
      );
      lanternBlossomMatrices.push(transform);
      lanternBlossomColors.push(new THREE.Color(["#f7b7cc", "#f4a8c4", "#ffd2d9"][petal % 3]));
    }
    const blossomPosition = toWorld(cx, cz + .025);
    const centerTransform = new THREE.Matrix4().compose(
      new THREE.Vector3(blossomPosition.x, .64 + cy, blossomPosition.z),
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotation),
      new THREE.Vector3(.055, .055, .055),
    );
    lanternBlossomMatrices.push(centerTransform);
    lanternBlossomColors.push(new THREE.Color("#f7d58d"));
  }

  const hook = new THREE.CatmullRomCurve3([
    new THREE.Vector3(.82, 2.98, 0),
    new THREE.Vector3(1.18, 3.28, 0),
    new THREE.Vector3(1.48, 3.08, 0),
    new THREE.Vector3(1.36, 2.76, 0),
  ]);
  addMesh(lantern, new THREE.TubeGeometry(hook, 12, .045, 6, false), gold, [0, 0, 0], { castShadow: false });
  addCylinder(lantern, [1.36, 2.65, 0], .045, .045, .22, gold, 8, { castShadow: false });

  const lanternGlass = addMesh(
    lantern,
    new THREE.SphereGeometry(.43, 14, 10),
    makeMaterial(lanternPink, { emissive: lanternPink, emissiveIntensity: 1.2, roughness: .42, transparent: true, opacity: .78 }),
    [1.36, 2.2, 0],
    { scale: [1, 1.13, .86], castShadow: false },
  );
  lanternMaterials.add(lanternGlass.material);
  const lanternGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture("rgba(255,157,200,.78)", "rgba(255,116,174,0)"),
    transparent: true,
    depthWrite: false,
    opacity: .12,
  }));
  const glowPosition = toWorld(1.36, -.3);
  lanternGlow.position.set(glowPosition.x, .64 + 2.2, glowPosition.z);
  lanternGlow.scale.set(4.2, 4.2, 1);
  scene.add(lanternGlow);
  lanternGlowMaterials.add(lanternGlow.material);
  const ringMaterial = makeMaterial("#9a694c", { roughness: .55, metalness: .36 });
  for (const y of [1.72, 2.68]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.4, .045, 6, 18), ringMaterial);
    ring.position.set(1.36, y, 0);
    ring.rotation.x = Math.PI / 2;
    lantern.add(ring);
  }
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const ribCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.36 + Math.cos(angle) * .05, 2.68, Math.sin(angle) * .05),
      new THREE.Vector3(1.36 + Math.cos(angle) * .36, 2.42, Math.sin(angle) * .31),
      new THREE.Vector3(1.36 + Math.cos(angle) * .4, 2.2, Math.sin(angle) * .34),
      new THREE.Vector3(1.36 + Math.cos(angle) * .36, 1.96, Math.sin(angle) * .31),
      new THREE.Vector3(1.36 + Math.cos(angle) * .05, 1.72, Math.sin(angle) * .05),
    ]);
    addMesh(lantern, new THREE.TubeGeometry(ribCurve, 10, .018, 4, false), gold, [0, 0, 0], { castShadow: false });
  }
  addCylinder(lantern, [1.36, 2.7, 0], .13, .25, .12, ringMaterial, 8);
  addCylinder(lantern, [1.36, 1.7, 0], .24, .13, .12, ringMaterial, 8);
  addCylinder(lantern, [1.36, 1.53, 0], .04, .075, .2, gold, 8, { castShadow: false });
  addMesh(lantern, new THREE.SphereGeometry(.075, 8, 6), gold, [1.36, 1.41, 0], { castShadow: false });
  addMesh(lantern, new THREE.ConeGeometry(.09, .42, 7), makeMaterial("#d988a7"), [1.36, 1.17, 0], { castShadow: false });
  bakeLanternMeshes(lantern);
}

function bakeLanternMeshes(lantern) {
  lantern.updateMatrixWorld(true);
  const batches = new Map();
  const cachedGeometries = new Set(geometryCache.values());
  lantern.traverse((part) => {
    if (!part.isMesh) return;
    const geometry = part.geometry;
    if (!geometry.attributes.normal) geometry.computeVertexNormals();
    const positions = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    const index = geometry.index;
    const count = index ? index.count : positions.count;
    const batch = batches.get(part.material) || { positions: [], normals: [] };
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(part.matrixWorld);
    for (let vertex = 0; vertex < count; vertex++) {
      const sourceIndex = index ? index.getX(vertex) : vertex;
      const position = new THREE.Vector3().fromBufferAttribute(positions, sourceIndex).applyMatrix4(part.matrixWorld);
      const normal = new THREE.Vector3().fromBufferAttribute(normals, sourceIndex).applyMatrix3(normalMatrix).normalize();
      batch.positions.push(position.x, position.y, position.z);
      batch.normals.push(normal.x, normal.y, normal.z);
    }
    batches.set(part.material, batch);
    if (!cachedGeometries.has(geometry)) geometry.dispose();
  });
  scene.remove(lantern);
  for (const [material, batch] of batches) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(batch.positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(batch.normals, 3));
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    scene.add(mesh);
  }
}

function flushLanternBlossoms() {
  if (!lanternBlossomMatrices.length) return;
  const blossoms = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 8, 6),
    makeMaterial("#ffffff", { roughness: .78 }),
    lanternBlossomMatrices.length,
  );
  lanternBlossomMatrices.forEach((matrix, index) => {
    blossoms.setMatrixAt(index, matrix);
    blossoms.setColorAt(index, lanternBlossomColors[index]);
  });
  blossoms.instanceMatrix.needsUpdate = true;
  if (blossoms.instanceColor) blossoms.instanceColor.needsUpdate = true;
  blossoms.castShadow = false;
  blossoms.receiveShadow = false;
  scene.add(blossoms);
}

function createStation(data) {
  const { id, name, short, x, z, color, symbol } = data;
  worldBlockers.push({ type: "rect", x, z: z - .44, halfWidth: 2.14, halfDepth: .49 });
  for (const side of [-1, 1]) {
    worldBlockers.push({ type: "circle", x: x + side * 1.95, z: z - .65, radius: .36 });
  }
  const group = new THREE.Group();
  group.position.set(x, .64, z);
  group.rotation.y = Math.atan2(-x, -z);
  scene.add(group);
  const boardPalettes = {
    about: { light: "#ffdfeb", base: "#ed9fbe", deep: "#9c547e", trim: "#ffe8a6", flower: "#fff2f7", ink: "#fff9fb" },
    skills: { light: "#e8d9ff", base: "#b99be6", deep: "#71549f", trim: "#f7d8ff", flower: "#fff0fc", ink: "#fffaff" },
    projects: { light: "#ffd9e8", base: "#e78eae", deep: "#9c456c", trim: "#ffe5aa", flower: "#fff2ee", ink: "#fffaf8" },
    journey: { light: "#e7ddff", base: "#b3a0dc", deep: "#645384", trim: "#ffe1f0", flower: "#fff3ff", ink: "#fffaff" },
    socials: { light: "#fbdcf5", base: "#ce9bc9", deep: "#80557e", trim: "#ffedbb", flower: "#fff4fb", ink: "#fffaff" },
    contact: { light: "#ffe3e8", base: "#e9a1af", deep: "#975268", trim: "#fff0b8", flower: "#fff7ef", ink: "#fffaf7" },
  };
  const palette = boardPalettes[id];
  const accent = palette.base;
  const trimMaterial = makeMaterial(palette.trim, { roughness: .48, metalness: .18, emissive: palette.trim, emissiveIntensity: .12 });

  const dais = addCylinder(group, [0, .16, 0], 4.15, 4.45, .35, "#71605b", 12);
  dais.userData.sectionId = id;
  interactables.push(dais);
  const inset = addCylinder(group, [0, .37, 0], 3.76, 3.92, .12, "#c0aa8c", 12);
  inset.userData.sectionId = id;
  interactables.push(inset);

  for (const side of [-1, 1]) {
    addBox(group, [side * 1.95, 1.6, -.65], [.43, 2.65, .46], "#a96f78");
    addBox(group, [side * 1.95, 2.94, -.65], [.69, .2, .72], trimMaterial);
  }
  addBox(group, [0, 2.9, -.65], [4.25, .48, .55], trimMaterial);
  addBox(group, [0, 2.91, -.34], [3.65, .16, .08], palette.deep, { castShadow: false });
  addBox(group, [0, 2.36, -.22], [3.72, 1.48, .16], trimMaterial);
  addBox(group, [0, 2.36, -.115], [3.5, 1.3, .075], palette.deep, { castShadow: false });

  const sign = addMesh(
    group,
    new THREE.PlaneGeometry(3.38, 1.18),
    new THREE.MeshBasicMaterial({ map: createStationBoardTexture(data, palette), side: THREE.DoubleSide, toneMapped: false }),
    [0, 2.36, -.068],
    { castShadow: false },
  );
  sign.userData.sectionId = id;
  interactables.push(sign);
  const signLabel = addTextSprite(`${symbol}  ${name}`);
  signLabel.position.set(0, 3.73, -.53);
  group.add(signLabel);
  worldLabels.push(signLabel);

  addCylinder(group, [0, .48, 0], 2.9, 3.1, .14, "#e5cfac", 10);
  const interactiveHalo = addMesh(
    group,
    new THREE.RingGeometry(3.78, 4, 48),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: .46, side: THREE.DoubleSide }),
    [0, .39, 0],
    { rotation: [-Math.PI / 2, 0, 0], castShadow: false, receiveShadow: false },
  );
  interactiveHalo.userData.sectionId = id;
  interactables.push(interactiveHalo);

  const marker = addTextSprite(`✧  ${short}  ✧`, "#ffe8d9");
  marker.scale.set(3.2, .8, 1);
  marker.position.set(0, .9, 3.05);
  group.add(marker);
  worldLabels.push(marker);

  if (id === "about") {
    createTree(x - 3.3, z - 2, .86, 13);
    createLantern(x + 3.8, z + 2.7, "#f3bb81");
  } else if (id === "skills") {
    createTree(x + 3.6, z - 2.5, .76, 23);
    createLantern(x - 4.2, z - 2.7, "#d4e4ae");
  } else if (id === "projects") {
    createTree(x + 4, z + 2.4, .83, 33);
    createLantern(x - 4.1, z - 2.5, "#f1c18b");
  } else if (id === "socials") {
    createTree(x + 3.5, z - 3, .76, 43);
    createLantern(x - 3.9, z + 2.8, "#c9d8e9");
  } else if (id === "journey") {
    createTree(x + 3.8, z - 2.4, .82, 48);
    createLantern(x - 4, z + 2.5, "#ebc7aa");
  } else {
    createTree(x - 3.8, z + 2.4, .85, 53);
    createLantern(x + 4, z - 2.4, "#dfc2e2");
  }

  sections.set(id, { ...data, group });
}

function createPlayer() {
  player = new THREE.Group();
  scene.add(player);
  const skin = "#f3cbb9";
  const hairDark = "#854f63";
  const hair = "#aa687d";
  const hairLight = "#c98699";
  const shirt = "#efa9bf";
  const shirtLight = "#f8d7df";
  const pants = "#729dbd";
  const denim = "#507693";
  const boots = "#514652";

  addBox(player, [0, .86, 0], [.7, .12, .42], "#b98396");
  addBox(player, [0, 1.24, 0], [.76, .76, .42], shirt);
  addBox(player, [0, 1.51, .218], [.32, .22, .025], shirtLight, { castShadow: false });
  addBox(player, [0, 1.36, .226], [.38, .11, .026], "#df89a8", { castShadow: false });
  addBox(player, [-.19, 1.23, .224], [.12, .23, .026], "#f6c2d2", { castShadow: false });
  addBox(player, [.19, 1.23, .224], [.12, .23, .026], "#f6c2d2", { castShadow: false });
  addBox(player, [0, 1.07, .218], [.22, .15, .026], "#e895b0", { castShadow: false });
  addBox(player, [0, 1.07, .238], [.07, .07, .018], "#ffe6b7", { castShadow: false });
  addBox(player, [0, 1.59, -.218], [.22, .22, .025], "#cc879e", { castShadow: false });

  playerLegs = [];
  for (const [index, side] of [-1, 1].entries()) {
    const leg = new THREE.Group();
    leg.position.set(side * .19, .79, 0);
    player.add(leg);
    addBox(leg, [0, -.34, 0], [.34, .68, .39], pants);
    addBox(leg, [0, -.12, .202], [.34, .16, .025], "#89b2cd", { castShadow: false });
    addBox(leg, [0, -.53, .202], [.34, .1, .025], denim, { castShadow: false });
    addBox(leg, [0, -.7, .045], [.38, .18, .46], boots);
    addBox(leg, [0, -.65, .279], [.34, .035, .025], "#dfcbd1", { castShadow: false });
    addBox(leg, [side * -.07, -.3, .218], [.025, .24, .02], "#5c809a", { castShadow: false });
    playerLegs[index] = leg;
  }

  playerArms = [];
  for (const [index, side] of [-1, 1].entries()) {
    const arm = new THREE.Group();
    arm.position.set(side * .48, 1.51, 0);
    player.add(arm);
    addBox(arm, [0, -.28, 0], [.32, .55, .4], shirt);
    addBox(arm, [0, -.46, .205], [.32, .18, .025], side < 0 ? "#df88a7" : "#f6bfd0", { castShadow: false });
    addBox(arm, [0, -.59, 0], [.3, .17, .38], skin);
    addBox(arm, [0, -.67, .015], [.27, .045, .34], "#e6b5a7", { castShadow: false });
    playerArms[index] = arm;
  }

  const head = new THREE.Group();
  head.position.set(0, 1.91, 0);
  player.add(head);
  playerHead = head;
  addBox(head, [0, 0, 0], [.76, .76, .7], skin);

  // Layer square hair blocks over the crown, sides, back, and fringe like a voxel skin.
  addBox(head, [0, .34, -.01], [.79, .16, .73], hairDark);
  addBox(head, [0, .4, -.015], [.72, .12, .68], hair);
  addBox(head, [-.34, .04, 0], [.11, .62, .72], hairDark);
  addBox(head, [-.37, -.04, .005], [.09, .48, .68], hair);
  addBox(head, [.34, .035, 0], [.11, .63, .72], hairDark);
  addBox(head, [.37, -.055, .01], [.09, .49, .68], hair);
  addBox(head, [0, .17, .365], [.78, .2, .055], hair);
  addBox(head, [-.23, .045, .39], [.29, .24, .065], hairLight);
  addBox(head, [.095, .08, .395], [.34, .31, .07], hair);
  addBox(head, [.28, -.015, .39], [.21, .15, .065], hairDark);
  addBox(head, [-.31, -.28, .12], [.16, .25, .48], hairDark);
  addBox(head, [.31, -.3, .12], [.16, .29, .48], hair);
  addBox(head, [-.3, -.36, .18], [.18, .15, .39], hairLight);
  addBox(head, [.31, -.4, .18], [.18, .14, .39], hairDark);
  addBox(head, [0, -.02, -.36], [.72, .66, .08], hairDark);
  addBox(head, [0, -.2, -.414], [.64, .34, .035], hair);
  addBox(head, [-.22, -.31, -.406], [.2, .28, .07], hairLight);
  addBox(head, [.18, -.34, -.407], [.22, .3, .07], hair);
  addBox(head, [0, -.015, -.355], [.77, .73, .13], hairDark);
  addBox(head, [-.2, -.25, -.435], [.27, .33, .045], hair);
  addBox(head, [.19, -.29, -.435], [.28, .34, .045], hairLight);
  addBox(head, [-.29, -.23, -.28], [.12, .32, .25], hair);
  addBox(head, [.29, -.22, -.28], [.12, .34, .25], hairDark);

  playerEyes = [];
  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    eye.position.set(side * .17, -.08, .37);
    head.add(eye);
    const white = addBox(eye, [0, 0, 0], [.13, .12, .035], "#fff4ed", { castShadow: false });
    const pupil = addBox(eye, [side * .01, -.01, .024], [.065, .09, .025], "#59404d", { castShadow: false });
    const highlight = addBox(eye, [-side * .012, .025, .041], [.025, .03, .012], "#ffffff", { castShadow: false });
    const closed = addBox(eye, [0, 0, .042], [.14, .025, .02], "#704454", { castShadow: false });
    closed.visible = false;
    playerEyes.push({ eye, white, pupil, highlight, closed });
  }
  addBox(head, [-.26, -.21, .365], [.11, .06, .018], "#ed9baa", { castShadow: false });
  addBox(head, [.26, -.21, .365], [.11, .06, .018], "#ed9baa", { castShadow: false });
  addBox(head, [0, -.19, .37], [.075, .05, .025], "#bf7488", { castShadow: false });
  playerMouth = addMesh(
    head,
    new THREE.SphereGeometry(1, 10, 8),
    makeMaterial("#8d4e62", { roughness: .8 }),
    [0, -.265, .385],
    { scale: [.078, .012, .018], castShadow: false },
  );
  playerSmile = addMesh(
    head,
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-.105, -.245, .386),
        new THREE.Vector3(-.055, -.285, .392),
        new THREE.Vector3(0, -.296, .394),
        new THREE.Vector3(.055, -.285, .392),
        new THREE.Vector3(.105, -.245, .386),
      ]),
      12,
      .012,
      5,
      false,
    ),
    makeMaterial("#8d4e62", { roughness: .8 }),
    [0, 0, 0],
    { castShadow: false },
  );
  playerSmile.visible = true;
  addBox(head, [.24, .26, .38], [.14, .11, .035], "#f6c3d2", { rotation: [0, 0, -.35], castShadow: false });
  addBox(head, [.29, .25, .405], [.07, .07, .02], "#ffdfbd", { castShadow: false });

  player.position.set(0, .66, 7.2);
  player.userData.speed = 5.8;
  playerShadow = new THREE.Mesh(
    new THREE.CircleGeometry(.65, 16),
    new THREE.MeshBasicMaterial({ color: "#28352d", transparent: true, opacity: .27, depthWrite: false }),
  );
  playerShadow.rotation.x = -Math.PI / 2;
  playerShadow.position.y = .62;
  scene.add(playerShadow);
}

function addMobFace(group, x, y, z, scale = 1) {
  const open = [
    addBox(group, [x - .2 * scale, y, z], [.15 * scale, .18 * scale, .075 * scale], "#fff3de", { castShadow: false }),
    addBox(group, [x + .2 * scale, y, z], [.15 * scale, .18 * scale, .075 * scale], "#fff3de", { castShadow: false }),
    addBox(group, [x - .18 * scale, y - .015 * scale, z + .044 * scale], [.075 * scale, .105 * scale, .045 * scale], "#51414a", { castShadow: false }),
    addBox(group, [x + .22 * scale, y - .015 * scale, z + .044 * scale], [.075 * scale, .105 * scale, .045 * scale], "#51414a", { castShadow: false }),
    addBox(group, [x - .2 * scale, y + .025 * scale, z + .069 * scale], [.025 * scale, .03 * scale, .018 * scale], "#ffffff", { castShadow: false }),
    addBox(group, [x + .2 * scale, y + .025 * scale, z + .069 * scale], [.025 * scale, .03 * scale, .018 * scale], "#ffffff", { castShadow: false }),
  ];
  const closed = [-1, 1].map((side) => addBox(
    group,
    [x + side * .2 * scale, y - .005 * scale, z + .075 * scale],
    [.17 * scale, .028 * scale, .025 * scale],
    "#59414c",
    { castShadow: false },
  ));
  addBox(group, [x, y - .19 * scale, z + .04 * scale], [.2 * scale, .07 * scale, .06 * scale], "#b97883", { castShadow: false });
  addBox(group, [x - .32 * scale, y - .1 * scale, z + .035 * scale], [.12 * scale, .07 * scale, .035 * scale], "#efa2ab", { castShadow: false });
  addBox(group, [x + .32 * scale, y - .1 * scale, z + .035 * scale], [.12 * scale, .07 * scale, .035 * scale], "#efa2ab", { castShadow: false });
  return { open, closed };
}

function createSleepIndicator() {
  const textCanvas = document.createElement("canvas");
  textCanvas.width = 256;
  textCanvas.height = 128;
  const context = textCanvas.getContext("2d");
  context.font = "700 76px Georgia, serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.lineWidth = 9;
  context.strokeStyle = "rgba(89,59,94,.75)";
  context.strokeText("Zzz...", 128, 64);
  context.fillStyle = "#fff1fb";
  context.fillText("Zzz...", 128, 64);
  const texture = new THREE.CanvasTexture(textCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    opacity: .94,
  }));
}

function makeHeartTexture() {
  const heartCanvas = document.createElement("canvas");
  heartCanvas.width = 128;
  heartCanvas.height = 128;
  const context = heartCanvas.getContext("2d");
  context.fillStyle = "#ffb2cb";
  context.shadowColor = "#ff96bc";
  context.shadowBlur = 20;
  context.font = "100px serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("♥", 64, 67);
  const texture = new THREE.CanvasTexture(heartCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const heartTexture = makeHeartTexture();

function createMob(type, x, z, label, data) {
  const group = new THREE.Group();
  let tail = null;
  const eyeOpenMeshes = [];
  const eyeClosedMeshes = [];
  const legPivots = [];
  const wingPivots = [];
  const addAnimatedLeg = (legX, legZ, width, height, color) => {
    const leg = new THREE.Group();
    leg.position.set(legX, height * .72, legZ);
    group.add(leg);
    addBox(leg, [0, -height * .5, 0], [width, height, width], color);
    legPivots.push(leg);
  };
  group.position.set(x, .69, z);
  group.userData = { type: "mob", label, greeting: data.script[0].text };
  scene.add(group);

  if (type === "bee") {
    addBox(group, [0, .56, 0], [.82, .58, .54], "#e7b94f");
    addBox(group, [0, .56, .278], [.83, .14, .035], "#51414a", { castShadow: false });
    addBox(group, [0, .83, .25], [.64, .12, .06], "#51414a", { castShadow: false });
    for (const side of [-1, 1]) {
      const wing = new THREE.Group();
      wing.position.set(side * .31, .87, .02);
      group.add(wing);
      addBox(wing, [side * .13, .1, 0], [.39, .38, .09], "#dbedf0", {
        castShadow: false,
        material: { transparent: true, opacity: .74 },
      });
      wingPivots.push({ group: wing, side });
    }
    const eyes = addMobFace(group, 0, .63, .3, .82);
    eyeOpenMeshes.push(...eyes.open);
    eyeClosedMeshes.push(...eyes.closed);
    addBox(group, [-.19, 1.04, .27], [.07, .27, .07], "#51414a", { rotation: [0, 0, -.34] });
    addBox(group, [.19, 1.04, .27], [.07, .27, .07], "#51414a", { rotation: [0, 0, .34] });
    for (const [legX, legZ] of [[-.25, .05], [.25, .05], [-.24, -.2], [.24, -.2]]) {
      addAnimatedLeg(legX, legZ, .1, .28, "#57444a");
    }
  } else if (type === "frog") {
    addBox(group, [0, .43, 0], [.92, .56, .7], "#77aa76");
    addBox(group, [-.27, .76, .12], [.32, .3, .32], "#8cc28a");
    addBox(group, [.27, .76, .12], [.32, .3, .32], "#8cc28a");
    const leftEye = addBox(group, [-.27, .81, .3], [.14, .15, .12], "#fff1cf");
    const rightEye = addBox(group, [.27, .81, .3], [.14, .15, .12], "#fff1cf");
    const eyes = addMobFace(group, 0, .55, .36, .82);
    eyeOpenMeshes.push(leftEye, rightEye, ...eyes.open);
    eyeClosedMeshes.push(
      ...eyes.closed,
      addBox(group, [-.27, .81, .38], [.16, .03, .025], "#4d604b", { castShadow: false }),
      addBox(group, [.27, .81, .38], [.16, .03, .025], "#4d604b", { castShadow: false }),
    );
    addAnimatedLeg(-.32, .13, .28, .22, "#67956d");
    addAnimatedLeg(.32, .13, .28, .22, "#67956d");
    addBox(group, [-.16, .43, .362], [.075, .075, .045], "#95c77e", { castShadow: false });
    addBox(group, [.13, .39, .362], [.065, .065, .04], "#95c77e", { castShadow: false });
  } else if (type === "axolotl") {
    addBox(group, [0, .48, 0], [.86, .62, .68], "#e3a2b9");
    addBox(group, [-.54, .65, .02], [.23, .23, .15], "#e586a4");
    addBox(group, [.54, .65, .02], [.23, .23, .15], "#e586a4");
    addBox(group, [-.2, .83, 0], [.16, .36, .12], "#f3acc2", { rotation: [0, 0, -.38] });
    addBox(group, [.2, .83, 0], [.16, .36, .12], "#f3acc2", { rotation: [0, 0, .38] });
    const eyes = addMobFace(group, 0, .58, .36, .82);
    eyeOpenMeshes.push(...eyes.open);
    eyeClosedMeshes.push(...eyes.closed);
    addAnimatedLeg(-.25, .13, .24, .2, "#cf8da6");
    addAnimatedLeg(.25, .13, .24, .2, "#cf8da6");
    for (const side of [-1, 1]) {
      for (let gill = 0; gill < 3; gill++) {
        addBox(group, [side * (.57 + (gill % 2) * .06), .52 + gill * .13, .08], [.1, .19, .13], "#f28eae", { rotation: [0, 0, side * .25] });
      }
    }
  } else if (type === "cat") {
    const coat = "#817b91";
    const lightCoat = "#f4e9e4";
    addBox(group, [0, .39, 0], [.76, .47, .58], coat);
    addBox(group, [0, .42, .3], [.42, .32, .055], lightCoat, { castShadow: false });
    addBox(group, [0, .77, .2], [.68, .58, .57], coat);
    addMesh(group, new THREE.ConeGeometry(.2, .43, 4), makeMaterial(coat), [-.22, 1.17, .08], { rotation: [0, 0, -.16] });
    addMesh(group, new THREE.ConeGeometry(.2, .43, 4), makeMaterial(coat), [.22, 1.17, .08], { rotation: [0, 0, .16] });
    addMesh(group, new THREE.ConeGeometry(.105, .25, 4), makeMaterial("#e9a1b5"), [-.22, 1.16, .15], { rotation: [0, 0, -.16] });
    addMesh(group, new THREE.ConeGeometry(.105, .25, 4), makeMaterial("#e9a1b5"), [.22, 1.16, .15], { rotation: [0, 0, .16] });
    eyeOpenMeshes.push(
      addBox(group, [-.16, .83, .49], [.09, .13, .045], "#547b70", { castShadow: false }),
      addBox(group, [.16, .83, .49], [.09, .13, .045], "#547b70", { castShadow: false }),
      addBox(group, [-.16, .84, .52], [.035, .085, .018], "#303342", { castShadow: false }),
      addBox(group, [.16, .84, .52], [.035, .085, .018], "#303342", { castShadow: false }),
    );
    eyeClosedMeshes.push(
      addBox(group, [-.16, .84, .535], [.12, .028, .025], "#4d4651", { castShadow: false }),
      addBox(group, [.16, .84, .535], [.12, .028, .025], "#4d4651", { castShadow: false }),
    );
    addMesh(group, new THREE.SphereGeometry(.09, 8, 6), makeMaterial(lightCoat), [0, .67, .5], { scale: [1.35, .76, .75], castShadow: false });
    addMesh(group, new THREE.SphereGeometry(.045, 7, 5), makeMaterial("#db91a9"), [0, .73, .55], { castShadow: false });
    addBox(group, [-.37, .7, .39], [.19, .035, .025], lightCoat, { rotation: [0, 0, .08], castShadow: false });
    addBox(group, [-.43, .64, .37], [.2, .025, .02], lightCoat, { rotation: [0, 0, -.1], castShadow: false });
    addBox(group, [.37, .7, .39], [.19, .035, .025], lightCoat, { rotation: [0, 0, -.08], castShadow: false });
    addBox(group, [.43, .64, .37], [.2, .025, .02], lightCoat, { rotation: [0, 0, .1], castShadow: false });
    for (const [legX, legZ] of [[-.25, .17], [.25, .17], [-.25, -.17], [.25, -.17]]) {
      addAnimatedLeg(legX, legZ, .21, .34, coat);
    }
    tail = new THREE.Group();
    tail.position.set(0, .38, -.25);
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(.08, .08, -.25),
      new THREE.Vector3(.12, .32, -.42),
      new THREE.Vector3(-.06, .48, -.4),
    ]);
    addMesh(tail, new THREE.TubeGeometry(tailCurve, 12, .085, 6, false), makeMaterial(coat), [0, 0, 0], { castShadow: false });
    group.add(tail);
  } else if (type === "sheep") {
    const wool = "#f3a9c5";
    const face = "#f8c7d1";
    addBox(group, [0, .45, -.02], [1.02, .67, .82], wool);
    for (const [x, y, z, size] of [
      [-.4, .76, .2, .34], [0, .81, .26, .34], [.4, .76, .2, .34],
      [-.42, .48, .24, .33], [.42, .48, .24, .33],
      [-.4, .73, -.31, .34], [0, .8, -.37, .34], [.4, .73, -.31, .34],
      [-.48, .45, -.18, .28], [.48, .45, -.18, .28],
    ]) {
      addBox(group, [x, y, z], [size, size, size], wool);
    }
    addBox(group, [0, .78, .43], [.58, .54, .48], face);
    addBox(group, [-.33, .85, .39], [.24, .17, .18], "#f4b7c8", { rotation: [0, 0, -.2] });
    addBox(group, [.33, .85, .39], [.24, .17, .18], "#f4b7c8", { rotation: [0, 0, .2] });
    eyeOpenMeshes.push(
      addBox(group, [-.16, .83, .67], [.08, .11, .04], "#58444d", { castShadow: false }),
      addBox(group, [.16, .83, .67], [.08, .11, .04], "#58444d", { castShadow: false }),
    );
    eyeClosedMeshes.push(
      addBox(group, [-.16, .84, .695], [.12, .028, .025], "#754f5b", { castShadow: false }),
      addBox(group, [.16, .84, .695], [.12, .028, .025], "#754f5b", { castShadow: false }),
    );
    addBox(group, [0, .66, .69], [.17, .13, .08], "#d985a3", { castShadow: false });
    addBox(group, [0, .57, .69], [.21, .035, .035], "#a85d76", { castShadow: false });
    for (const [legX, legZ] of [[-.34, .24], [.34, .24], [-.34, -.26], [.34, -.26]]) {
      addAnimatedLeg(legX, legZ, .21, .34, "#f0b1c6");
    }
  } else if (type === "pig") {
    const pink = "#ee9daf";
    addBox(group, [0, .4, -.04], [.82, .57, .72], pink);
    addBox(group, [0, .78, .27], [.66, .57, .53], "#f3a8b7");
    addBox(group, [-.22, 1.12, .19], [.2, .2, .15], "#df8298", { rotation: [0, 0, -.16] });
    addBox(group, [.22, 1.12, .19], [.2, .2, .15], "#df8298", { rotation: [0, 0, .16] });
    eyeOpenMeshes.push(
      addBox(group, [-.17, .84, .55], [.085, .12, .045], "#4d3e48", { castShadow: false }),
      addBox(group, [.17, .84, .55], [.085, .12, .045], "#4d3e48", { castShadow: false }),
    );
    eyeClosedMeshes.push(
      addBox(group, [-.17, .84, .585], [.12, .028, .025], "#754f5b", { castShadow: false }),
      addBox(group, [.17, .84, .585], [.12, .028, .025], "#754f5b", { castShadow: false }),
    );
    addBox(group, [0, .66, .59], [.4, .25, .16], "#d77e91");
    addBox(group, [-.105, .66, .68], [.075, .12, .025], "#924f63", { castShadow: false });
    addBox(group, [.105, .66, .68], [.075, .12, .025], "#924f63", { castShadow: false });
    for (const [legX, legZ] of [[-.27, .2], [.27, .2], [-.27, -.25], [.27, -.25]]) {
      addAnimatedLeg(legX, legZ, .23, .34, "#df879b");
    }
    tail = new THREE.Group();
    tail.position.set(0, .53, -.37);
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(.13, .08, -.12),
      new THREE.Vector3(.19, .2, -.06),
      new THREE.Vector3(.1, .2, .04),
      new THREE.Vector3(.06, .12, .04),
    ]);
    addMesh(tail, new THREE.TubeGeometry(tailCurve, 12, .045, 5, false), makeMaterial("#d77e91"), [0, 0, 0], { castShadow: false });
    group.add(tail);
  } else if (type === "fox") {
    addBox(group, [0, .42, 0], [.82, .53, .63], "#e2a56d");
    addBox(group, [-.23, .88, .04], [.28, .47, .28], "#c5805d");
    addBox(group, [.23, .88, .04], [.28, .47, .28], "#c5805d");
    addBox(group, [-.23, 1.0, .03], [.18, .4, .18], "#c5805d", { rotation: [0, 0, -.23] });
    addBox(group, [.23, 1.0, .03], [.18, .4, .18], "#c5805d", { rotation: [0, 0, .23] });
    addBox(group, [-.23, .88, .19], [.13, .28, .13], "#f0d2bd");
    addBox(group, [.23, .88, .19], [.13, .28, .13], "#f0d2bd");
    addBox(group, [0, .3, .35], [.4, .25, .17], "#f1c3a2");
    const eyes = addMobFace(group, 0, .55, .34, .72);
    eyeOpenMeshes.push(...eyes.open);
    eyeClosedMeshes.push(...eyes.closed);
    addBox(group, [0, .34, -.45], [.22, .25, .55], "#f1e0cc", { rotation: [-.5, 0, 0] });
    addBox(group, [-.15, .41, .366], [.07, .065, .045], "#fff0df", { castShadow: false });
    addBox(group, [.15, .41, .366], [.07, .065, .045], "#fff0df", { castShadow: false });
    for (const [legX, legZ] of [[-.27, .2], [.27, .2], [-.27, -.25], [.27, -.25]]) {
      addAnimatedLeg(legX, legZ, .2, .34, "#c5805d");
    }
  }

  eyeClosedMeshes.forEach((mesh) => {
    mesh.visible = false;
  });

  const hitbox = addBox(group, [0, .55, 0], [1.4, 1.5, 1.4], "#ffffff", {
    castShadow: false,
    receiveShadow: false,
    material: { transparent: true, opacity: 0, depthWrite: false },
  });
  hitbox.userData.type = "mob";
  hitbox.userData.label = label;
  interactables.push(hitbox);

  const tag = addTextSprite(label, "#fff5e7");
  tag.scale.set(2.2, .55, 1);
  tag.position.set(0, 1.6, 0);
  group.add(tag);
  worldLabels.push(tag);
  const heart = new THREE.Sprite(new THREE.SpriteMaterial({
    map: heartTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  }));
  heart.scale.set(.55, .55, 1);
  heart.position.set(0, 2.25, 0);
  group.add(heart);
  const sleepIndicator = createSleepIndicator();
  sleepIndicator.scale.set(1.05, .52, 1);
  sleepIndicator.position.set(.35, 1.95, 0);
  sleepIndicator.visible = false;
  group.add(sleepIndicator);
  mobs.push({
    group,
    baseX: x,
    baseZ: z,
    phase: mobs.length * 1.7,
    type,
    tail,
    eyeOpenMeshes,
    eyeClosedMeshes,
    legPivots,
    wingPivots,
    sleepIndicator,
    label,
    emoji: data.emoji,
    script: data.script,
    petReplies: data.petReplies,
    greeting: data.script[0].text,
    friendship: 0,
    happyUntil: 0,
    excitedUntil: 0,
    heart,
  });
}

function createMobs() {
  createMob("bee", -4, 5, "Buzzy the bee", {
    emoji: "🐝",
    script: [
      { kind: "Sweet", text: "Bzz, you make this little garden feel like sunshine. ♡" },
      { kind: "Cheer up", text: "Chirp-chirp! Even the smallest wings can lift a big dream." },
      { kind: "Motivation", text: "One tiny step at a time, honey. Soon you'll be soaring!" },
      { kind: "Chirrup", text: "Bzz-bzz! Your ideas are the sweetest thing in the meadow!" },
    ],
    petReplies: ["Buzzy does a happy little loop-de-loop! Thank you, friend! ♡", "A gentle buzz and a tiny happy dance just for you!"],
  });
  createMob("frog", 5, 5, "Mochi the frog", {
    emoji: "🐸",
    script: [
      { kind: "Sweet", text: "You have a lovely heart. I can hear it in your gentle footsteps. ♡" },
      { kind: "Cheer up", text: "Ribbit, rough days don't last forever. Let's take one soft breath." },
      { kind: "Motivation", text: "Your next big leap starts with one little hop. You can do it!" },
      { kind: "Chirrup", text: "Ribbit-ribbit! The pond says you're doing better than you think!" },
    ],
    petReplies: ["Mochi gives you a tiny, very proud frog smile. Ribbit! ♡", "One gentle pat, one enormous happy hop!"],
  });
  createMob("axolotl", -3, -6, "Bubbles the axolotl", {
    emoji: "🩷",
    script: [
      { kind: "Sweet", text: "You are already enough, exactly as you are. ♡" },
      { kind: "Cheer up", text: "Gill wiggles for you! It's okay to rest and try again tomorrow." },
      { kind: "Motivation", text: "Keep swimming toward your dream. I'll cheer every fin-kick!" },
      { kind: "Chirrup", text: "Pip-pip! A tiny axolotl reminder: you are very lovable!" },
    ],
    petReplies: ["Bubbles wiggles all their tiny gills. You are a lovely human! ♡", "The softest little axolotl cuddle for you!"],
  });
  createMob("fox", 11, 8, "Peaches the fox", {
    emoji: "🦊",
    script: [
      { kind: "Sweet", text: "I saved this cozy patch for my favorite visitor—you. ♡" },
      { kind: "Cheer up", text: "Shake off the worries, friend. There are new trails to explore." },
      { kind: "Motivation", text: "Your ideas deserve to take up space. Go make something wonderful!" },
      { kind: "Chirrup", text: "Yip-yip! Clever paws and a kind heart can change the world!" },
    ],
    petReplies: ["Peaches leans into your hand and gives you a fox-sized grin. ♡", "A happy tail wag! You give the best gentle pets."],
  });
  createMob("sheep", 4, -10, "Poppy the pink sheep", {
    emoji: "🐑",
    script: [
      { kind: "Sweet", text: "You make the whole meadow feel a little softer. ♡" },
      { kind: "Cheer up", text: "Baa-baa, wrap yourself in a cloud of kindness today!" },
      { kind: "Motivation", text: "Keep growing at your own pace. The prettiest flowers take time." },
      { kind: "Chirrup", text: "Baa! Your smile is my favorite color of pink!" },
    ],
    petReplies: ["Poppy wiggles her fluffy pink wool. You are a wonderful friend! ♡", "A happy little baa and a soft woolly nuzzle just for you!"],
  });
  createMob("pig", 8, -4, "Pipkin the pig", {
    emoji: "🐷",
    script: [
      { kind: "Sweet", text: "You're a real sweetie-pie, and I don't say that lightly!" },
      { kind: "Cheer up", text: "Oink-oink! Let's snort those gloomy thoughts right out of here." },
      { kind: "Motivation", text: "Keep going, pal. Muddy little steps still get you there!" },
      { kind: "Chirrup", text: "Oink! You are clever, kind, and absolutely pig-tastic!" },
    ],
    petReplies: ["Pipkin gives you a happy snuffle and the world's tiniest oink. ♡", "A gentle ear rub earns you a very pleased piggy grin!"],
  });
  createMob("cat", 11, -2, "Mimi the cat", {
    emoji: "🐈",
    script: [
      { kind: "Sweet", text: "Prrr... I saved you the sunniest spot in the garden. ♡" },
      { kind: "Cheer up", text: "Take a paws. You don't have to solve everything today." },
      { kind: "Motivation", text: "Stretch, take a breath, then chase that dream like a sunbeam!" },
      { kind: "Chirrup", text: "Mrrp! Official cat report: you are paws-itively wonderful." },
    ],
    petReplies: ["Mimi leans into your hand and purrs like a tiny engine. ♡", "A happy tail curl! You have earned a very important head-bonk."],
  });
}

function createFireflies() {
  const count = isSmallScreen() || isLowPowerDevice() ? 28 : 48;
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: "#fff3fa",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: "#ff5baf",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  fireflyMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), coreMaterial, count);
  fireflyGlowMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), glowMaterial, count);
  fireflyMesh.frustumCulled = false;
  fireflyGlowMesh.frustumCulled = false;
  for (let i = 0; i < count; i++) {
    const angle = seeded(i, 163) * Math.PI * 2;
    const radius = 4 + seeded(i, 167) * 16;
    fireflies.push({
      x: Math.cos(angle) * radius,
      y: 1.15 + seeded(i, 173) * 5.2,
      z: Math.sin(angle) * radius,
      phase: seeded(i, 179) * Math.PI * 2,
      drift: .12 + seeded(i, 181) * .3,
      size: .045 + seeded(i, 191) * .035,
    });
  }
  scene.add(fireflyMesh);
  scene.add(fireflyGlowMesh);
}

function createGardenMotes() {
  const count = isSmallScreen() || isLowPowerDevice() ? 32 : 64;
  const geometry = new THREE.SphereGeometry(1, 7, 5);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: .8,
    depthWrite: false,
    toneMapped: false,
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: .34,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  gardenMoteCores = new THREE.InstancedMesh(geometry, coreMaterial, count);
  gardenMoteGlows = new THREE.InstancedMesh(geometry, glowMaterial, count);
  gardenMoteCores.frustumCulled = false;
  gardenMoteGlows.frustumCulled = false;
  const colors = ["#ffd1e7", "#e7d2ff", "#fff0bd", "#c5f1ec"];
  for (let i = 0; i < count; i++) {
    const angle = seeded(i, 431) * Math.PI * 2;
    const radius = 3.2 + seeded(i, 433) * 19;
    gardenMotes.push({
      x: Math.cos(angle) * radius,
      y: 1.05 + seeded(i, 439) * 3.2,
      z: Math.sin(angle) * radius,
      phase: seeded(i, 443) * Math.PI * 2,
      size: .035 + seeded(i, 449) * .035,
    });
    const color = new THREE.Color(colors[i % colors.length]);
    gardenMoteCores.setColorAt(i, color);
    gardenMoteGlows.setColorAt(i, color);
  }
  gardenMoteCores.instanceColor.needsUpdate = true;
  gardenMoteGlows.instanceColor.needsUpdate = true;
  scene.add(gardenMoteGlows, gardenMoteCores);
}

function createCrystalCluster(x, z, variant) {
  const palettes = [
    { base: "#ed96cb", light: "#ffddf2", deep: "#9e4f9e", glow: "rgba(255,131,213,.62)" },
    { base: "#b99aff", light: "#eee2ff", deep: "#6751ba", glow: "rgba(174,130,255,.62)" },
    { base: "#f18db4", light: "#ffe0e8", deep: "#a34f7c", glow: "rgba(255,119,178,.58)" },
    { base: "#a989e8", light: "#e5dcff", deep: "#58448f", glow: "rgba(169,136,255,.62)" },
    { base: "#efa9df", light: "#ffe6f7", deep: "#955bb2", glow: "rgba(231,135,255,.58)" },
  ];
  const shapes = [
    [[0, 0, 0, 1.35], [-.46, 0, .05, .86], [.42, 0, -.05, .98]],
    [[0, 0, 0, 1.5], [-.5, 0, 0, .74], [.48, 0, .02, .78], [.05, 0, -.4, .98]],
    [[0, 0, 0, 1.18], [-.38, 0, -.05, 1.1], [.43, 0, .05, .92]],
    [[0, 0, 0, 1.42], [-.48, 0, .05, .9], [.46, 0, -.04, 1.14], [0, 0, .42, .78]],
    [[0, 0, 0, 1.3], [-.48, 0, 0, .84], [.46, 0, 0, .84], [0, 0, -.42, .92]],
  ];
  const palette = palettes[variant % palettes.length];
  const group = new THREE.Group();
  group.position.set(x, .73, z);
  scene.add(group);
  const rockMaterial = makeMaterial(palette.deep, { roughness: .88, flatShading: true });
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(.48, 0), rockMaterial);
  rock.position.set(0, .11, 0);
  rock.scale.set(1.45, .68, 1.2);
  rock.rotation.y = seeded(variant, 311) * Math.PI;
  group.add(rock);

  const crystalGeometry = new THREE.ConeGeometry(.33, 1, 5, 1);
  shapes[variant % shapes.length].forEach(([cx, cz, _unused, height], index) => {
    const material = makeMaterial(index % 2 ? palette.base : palette.light, {
      color: index % 2 ? palette.base : palette.light,
      emissive: palette.base,
      emissiveIntensity: .34,
      roughness: .26,
      metalness: .12,
      flatShading: true,
    });
    const crystal = new THREE.Mesh(crystalGeometry, material);
    const sideOffset = _unused;
    crystal.position.set(cx, .22 + height * .48, sideOffset);
    crystal.scale.set(
      index === 0 ? 1 : .68 + seeded(variant + index, 317) * .14,
      height,
      index === 0 ? 1 : .72 + seeded(variant + index, 319) * .12,
    );
    crystal.rotation.set(
      (seeded(variant, index + 313) - .5) * .12,
      seeded(variant, index + 317) * Math.PI,
      (seeded(variant, index + 331) - .5) * .22,
    );
    group.add(crystal);
  });

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(palette.glow, "rgba(255,148,220,0)"),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: .46,
    toneMapped: false,
  }));
  glow.position.set(0, .75, 0);
  glow.scale.set(3.1, 3.1, 1);
  group.add(glow);
  crystalClusters.push({ group, glow, variant });
}

function createCrystalScatter() {
  let placed = 0;
  for (let attempt = 0; attempt < 120 && placed < 9; attempt++) {
    const angle = seeded(attempt, 401) * Math.PI * 2;
    const radius = 8.2 + seeded(attempt, 409) * 13.2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (Math.hypot(x, z) > 22.1 || Math.hypot(x, z) < 7.5 || nearViewingDeck(x, z, 4.8)) continue;
    if (distanceToGardenPath(x, z) < 2.2) continue;
    if (sectionData.some(({ x: sx, z: sz }) => Math.hypot(x - sx, z - sz) < 6.4)) continue;
    if (crystalClusters.some(({ group }) => Math.hypot(x - group.position.x, z - group.position.z) < 5.2)) continue;
    createCrystalCluster(x, z, placed % 5);
    placed++;
  }
}

function updateFireflies(time) {
  const night = 1 - THREE.MathUtils.smoothstep(dayNightMix, .12, .48);
  fireflyMesh.material.opacity = night;
  fireflyGlowMesh.material.opacity = night * .42;
  fireflies.forEach((firefly, index) => {
    const drift = time * firefly.drift + firefly.phase;
    const x = firefly.x + Math.sin(drift) * .26;
    const y = firefly.y + Math.sin(time * 1.7 + firefly.phase) * .18;
    const z = firefly.z + Math.cos(drift * .8) * .26;
    const pulse = .78 + .22 * Math.sin(time * 3.2 + firefly.phase);
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(firefly.size * pulse);
    dummy.updateMatrix();
    fireflyMesh.setMatrixAt(index, dummy.matrix);
    dummy.scale.setScalar(firefly.size * pulse * 3.8);
    dummy.updateMatrix();
    fireflyGlowMesh.setMatrixAt(index, dummy.matrix);
  });
  fireflyMesh.instanceMatrix.needsUpdate = true;
  fireflyGlowMesh.instanceMatrix.needsUpdate = true;
}

function updateGardenMotes(time) {
  const night = 1 - dayNightMix;
  gardenMoteCores.material.opacity = .42 + night * .38;
  gardenMoteGlows.material.opacity = .12 + night * .3;
  gardenMotes.forEach((mote, index) => {
    const drift = time * .19 + mote.phase;
    const x = mote.x + Math.sin(drift) * .24;
    const y = mote.y + Math.sin(time * .82 + mote.phase) * .3;
    const z = mote.z + Math.cos(drift * .78) * .24;
    const pulse = .68 + .32 * Math.sin(time * 2.1 + mote.phase);
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(mote.size * pulse);
    dummy.updateMatrix();
    gardenMoteCores.setMatrixAt(index, dummy.matrix);
    dummy.scale.setScalar(mote.size * pulse * 3.4);
    dummy.updateMatrix();
    gardenMoteGlows.setMatrixAt(index, dummy.matrix);
  });
  gardenMoteCores.instanceMatrix.needsUpdate = true;
  gardenMoteGlows.instanceMatrix.needsUpdate = true;
}

function createButterflies() {
  const palettes = ["#ffd2e6", "#e7d4ff", "#fff0b8", "#bcefe4"];
  const count = isSmallScreen() || isLowPowerDevice() ? 9 : 15;
  for (let i = 0; i < count; i++) {
    const angle = seeded(i, 479) * Math.PI * 2;
    const radius = 7 + seeded(i, 487) * 11;
    const group = new THREE.Group();
    group.position.set(Math.cos(angle) * radius, 1.6 + seeded(i, 491) * 2.4, Math.sin(angle) * radius);
    scene.add(group);
    const color = palettes[i % palettes.length];
    const wingMaterial = makeMaterial(color, {
      emissive: color,
      emissiveIntensity: .12,
      roughness: .48,
      transparent: true,
      opacity: .9,
      side: THREE.DoubleSide,
    });
    const bodyMaterial = makeMaterial("#77506d", { roughness: .75 });
    addMesh(group, new THREE.SphereGeometry(1, 8, 6), bodyMaterial, [0, 0, .02], {
      scale: [.045, .045, .19],
      castShadow: false,
    });
    const wings = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(side * .035, 0, 0);
      group.add(pivot);
      addMesh(pivot, new THREE.SphereGeometry(1, 10, 7), wingMaterial, [side * .1, 0, 0], {
        scale: [.15, .025, .11],
        castShadow: false,
      });
      wings.push({ pivot, side });
    }
    butterflies.push({
      group,
      wings,
      baseX: group.position.x,
      baseY: group.position.y,
      baseZ: group.position.z,
      phase: seeded(i, 499) * Math.PI * 2,
      speed: .32 + seeded(i, 503) * .28,
    });
  }
}

function updateButterflies(time) {
  const visible = dayNightMix > .36;
  for (const butterfly of butterflies) {
    butterfly.group.visible = visible;
    if (!visible) continue;
    const drift = time * butterfly.speed + butterfly.phase;
    butterfly.group.position.set(
      butterfly.baseX + Math.sin(drift) * 1.4,
      butterfly.baseY + Math.sin(drift * 1.8) * .48,
      butterfly.baseZ + Math.cos(drift * .72) * 1.2,
    );
    butterfly.group.rotation.y = Math.atan2(Math.cos(drift) * .72, -Math.sin(drift));
    butterfly.wings.forEach(({ pivot, side }) => {
      pivot.rotation.z = side * (.18 + Math.abs(Math.sin(time * 13 + butterfly.phase)) * .88);
    });
  }
}

function updateCrystalClusters(time) {
  const night = 1 - dayNightMix;
  crystalClusters.forEach(({ group, glow, variant }, index) => {
    const pulse = .9 + Math.sin(time * 1.3 + variant * 1.8 + index) * .1;
    glow.material.opacity = (.24 + night * .28) * pulse;
    group.rotation.y = Math.sin(time * .2 + variant) * .035;
  });
}

function updateFountainMagic(time) {
  if (!fountainGlow || !fountainHalo) return;
  const wishPulse = time < fountainWishUntil
    ? 1 + Math.sin((time - fountainWishUntil) * 7) * .2
    : 1;
  const wishWave = THREE.MathUtils.clamp(1 - (time - fountainWishStartedAt) / 1.5, 0, 1);
  const pulse = (.88 + Math.sin(time * 2.1) * .12) * wishPulse;
  fountainGlow.scale.setScalar(.72 * pulse);
  fountainHalo.rotation.z = time * .18;
  fountainHalo.material.opacity = .34 + (1 - dayNightMix) * .32 + Math.sin(time * 1.7) * .08 + (time < fountainWishUntil ? .25 : 0);
  fountainGlow.material.emissiveIntensity = 1.1 + (1 - dayNightMix) * .8 + Math.sin(time * 2) * .2 + (time < fountainWishUntil ? 1 : 0);
  fountainGlow.material.opacity = .48 + (1 - dayNightMix) * .4 + Math.sin(time * 2.1) * .08 + (time < fountainWishUntil ? .2 : 0);
  fountainRipples.forEach(({ mesh, phase }, index) => {
    const ripple = .96 + Math.sin(time * .8 + phase) * .035 + wishWave * (.12 + index * .035);
    mesh.scale.set(ripple, 1, ripple);
    mesh.rotation.z = time * (index % 2 ? -.045 : .045);
    mesh.material.opacity = .12 + (1 - dayNightMix) * .28 + Math.sin(time * 1.4 + index) * .035 + wishWave * .36;
  });

  const activeSparks = wishSparkles.filter((spark) => time - spark.startedAt < spark.duration);
  wishSparkles = activeSparks;
  const mesh = fountainHalo.userData.sparkles;
  if (!mesh) return;
  mesh.count = activeSparks.length;
  activeSparks.forEach((spark, index) => {
    const age = time - spark.startedAt;
    const progress = age / spark.duration;
    const angle = spark.angle + age * spark.spin;
    const radius = spark.radius + age * spark.spread;
    dummy.position.set(
      spark.x + Math.cos(angle) * radius,
      spark.y + age * spark.rise,
      spark.z + Math.sin(angle) * radius,
    );
    const scale = spark.size * (1 - progress);
    dummy.scale.setScalar(Math.max(.001, scale));
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
}

function updateWishSequence(time) {
  if (!wishSequence) return;
  const sequence = wishSequence;
  const elapsed = time - sequence.startedAt;
  sequence.elapsed = elapsed;
  sequence.cameraMix = THREE.MathUtils.smoothstep(elapsed, .15, .8);
  if (wishCoin) {
    if (elapsed < sequence.throwAt) {
      wishCoin.visible = elapsed >= .16;
      wishCoin.position.copy(sequence.from);
      wishCoin.rotation.set(.2, 0, -.2);
    } else if (elapsed < sequence.impactAt) {
      const progress = THREE.MathUtils.clamp(
        (elapsed - sequence.throwAt) / (sequence.impactAt - sequence.throwAt),
        0,
        1,
      );
      const smoothProgress = progress * progress * (3 - 2 * progress);
      wishCoin.visible = true;
      wishCoin.position.set(
        THREE.MathUtils.lerp(sequence.from.x, sequence.to.x, smoothProgress),
        THREE.MathUtils.lerp(sequence.from.y, sequence.to.y, smoothProgress)
          + Math.sin(progress * Math.PI) * sequence.arcHeight,
        THREE.MathUtils.lerp(sequence.from.z, sequence.to.z, smoothProgress),
      );
      wishCoin.rotation.set(
        Math.PI / 2 + progress * Math.PI * 3,
        progress * Math.PI * 1.4,
        progress * Math.PI * 5,
      );
    } else {
      wishCoin.visible = false;
    }
  }
  if (!sequence.impacted && elapsed >= sequence.impactAt) {
    sequence.impacted = true;
    fountainWishStartedAt = time;
    fountainWishUntil = time + 2.2;
    for (let index = 0; index < 64; index++) {
      const angle = (index / 64) * Math.PI * 2 + Math.random() * .16;
      wishSparkles.push({
        startedAt: time,
        duration: 2.6 + Math.random() * .8,
        angle,
        size: .075 + Math.random() * .095,
        x: Math.cos(angle) * (.25 + Math.random() * .62),
        y: 1.16 + Math.random() * .18,
        z: Math.sin(angle) * (.25 + Math.random() * .62),
        radius: .06,
        spread: .2 + Math.random() * .18,
        rise: .8 + Math.random() * .55,
        spin: 1.2 + Math.random() * 1.8,
      });
    }
    if (wishSparkles.length > 90) wishSparkles = wishSparkles.slice(-90);
    playChime();
    showToast("Your wish is sparkling into the night ✨");
  }
  if (elapsed >= sequence.finishAt) {
    if (wishCoin) {
      scene.remove(wishCoin);
      wishCoin = null;
    }
    player.rotation.y = sequence.originalRotation;
    wishSequence = null;
  }
}

function createFlyingLanterns() {
  const maxLanterns = 22;
  const createInstances = (geometry, material, count) => {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    scene.add(mesh);
    return mesh;
  };
  flyingLanternMeshes = {
    bodies: createInstances(
      new THREE.BoxGeometry(1, 1, 1),
      makeMaterial("#ffffff", {
        emissive: "#813553",
        emissiveIntensity: .65,
        roughness: .48,
        transparent: true,
        opacity: .9,
        depthWrite: false,
      }),
      maxLanterns,
    ),
    hoops: createInstances(
      new THREE.BoxGeometry(1, 1, 1),
      makeMaterial("#f3c7d4", { metalness: .2, roughness: .4, emissive: "#8f536b", emissiveIntensity: .22 }),
      maxLanterns * 2,
    ),
    ribs: createInstances(
      new THREE.BoxGeometry(1, 1, 1),
      makeMaterial("#ffe3e9", { roughness: .55 }),
      maxLanterns * 6,
    ),
    tassels: createInstances(
      new THREE.ConeGeometry(.075, .34, 6),
      makeMaterial("#eea6c1", { roughness: .7, emissive: "#582a47", emissiveIntensity: .25 }),
      maxLanterns,
    ),
    flames: createInstances(
      new THREE.SphereGeometry(.1, 8, 6),
      makeMaterial("#ffd68c", { emissive: "#ff9b62", emissiveIntensity: 1.4 }),
      maxLanterns,
    ),
    glows: createInstances(
      new THREE.SphereGeometry(1, 8, 6),
      new THREE.MeshBasicMaterial({
        color: "#ff8fc6",
        transparent: true,
        opacity: .14,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
      maxLanterns,
    ),
  };
}

function spawnFlyingLantern() {
  const angle = Math.random() * Math.PI * 2;
  const radius = 7 + Math.random() * 12;
  let x = player.position.x + Math.cos(angle) * radius;
  let z = player.position.z + Math.sin(angle) * radius;
  const islandRadius = Math.hypot(x, z);
  if (islandRadius > 20.2) {
    x *= 20.2 / islandRadius;
    z *= 20.2 / islandRadius;
  }
  flyingLanterns.push({
    x,
    y: 4.5 + Math.random() * 3.5,
    z,
    driftX: (Math.random() - .5) * .22,
    driftZ: (Math.random() - .5) * .22,
    rise: .48 + Math.random() * .24,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - .5) * .16,
    phase: Math.random() * Math.PI * 2,
    age: 0,
    color: new THREE.Color(["#f6a8c6", "#ffc2d5", "#e995bb"][Math.floor(Math.random() * 3)]),
  });
}

function updateFlyingLanterns(delta) {
  flyLanternSpawnTimer -= delta;
  if (flyLanternSpawnTimer <= 0) {
    if (flyingLanterns.length < 22) spawnFlyingLantern();
    flyLanternSpawnTimer = 1.1 + Math.random() * 1.2;
  }

  for (let index = flyingLanterns.length - 1; index >= 0; index--) {
    const lantern = flyingLanterns[index];
    lantern.age += delta;
    lantern.x += lantern.driftX * delta;
    lantern.z += lantern.driftZ * delta;
    lantern.rotation += lantern.spin * delta;
    const height = lantern.y + lantern.rise * lantern.age;
    const distance = Math.hypot(
      lantern.x - player.position.x,
      (height - player.position.y) * .55,
      lantern.z - player.position.z,
    );
    if (height > 31 || distance > 39 || Math.hypot(lantern.x, lantern.z) > 21.4 || lantern.age > 45) {
      flyingLanterns.splice(index, 1);
    }
  }

  const count = flyingLanterns.length;
  const { bodies, hoops, ribs, tassels, flames, glows } = flyingLanternMeshes;
  bodies.count = count;
  hoops.count = count * 2;
  ribs.count = count * 6;
  tassels.count = count;
  flames.count = count;
  glows.count = count;

  flyingLanterns.forEach((lantern, index) => {
    const bob = Math.sin(lantern.age * 1.5 + lantern.phase) * .2;
    const y = lantern.y + lantern.rise * lantern.age + bob;
    const fade = 1 - THREE.MathUtils.smoothstep(y, 23, 31);
    dummy.position.set(lantern.x, y, lantern.z);
    dummy.rotation.set(0, lantern.rotation, Math.sin(lantern.age + lantern.phase) * .035);
    dummy.scale.set(.72 * fade, .96 * fade, .62 * fade);
    dummy.updateMatrix();
    bodies.setMatrixAt(index, dummy.matrix);
    bodies.setColorAt(index, lantern.color);

    for (let ring = 0; ring < 2; ring++) {
      dummy.position.set(lantern.x, y + (ring ? -.51 : .51), lantern.z);
      dummy.rotation.set(0, lantern.rotation, 0);
      dummy.scale.set(.82 * fade, .055 * fade, .72 * fade);
      dummy.updateMatrix();
      hoops.setMatrixAt(index * 2 + ring, dummy.matrix);
    }

    for (let rib = 0; rib < 6; rib++) {
      const angle = (rib / 6) * Math.PI * 2;
      const localX = Math.cos(angle) * .35;
      const localZ = Math.sin(angle) * .3;
      dummy.position.set(
        lantern.x + localX * Math.cos(lantern.rotation) + localZ * Math.sin(lantern.rotation),
        y,
        lantern.z - localX * Math.sin(lantern.rotation) + localZ * Math.cos(lantern.rotation),
      );
      dummy.rotation.set(0, lantern.rotation, 0);
      dummy.scale.set(.035 * fade, .96 * fade, .035 * fade);
      dummy.updateMatrix();
      ribs.setMatrixAt(index * 6 + rib, dummy.matrix);
    }

    dummy.position.set(lantern.x, y - .78, lantern.z);
    dummy.rotation.set(Math.PI, lantern.rotation, 0);
    dummy.scale.setScalar(fade);
    dummy.updateMatrix();
    tassels.setMatrixAt(index, dummy.matrix);

    dummy.position.set(lantern.x, y, lantern.z);
    dummy.rotation.set(0, lantern.rotation, 0);
    dummy.scale.setScalar(fade);
    dummy.updateMatrix();
    flames.setMatrixAt(index, dummy.matrix);

    dummy.position.set(lantern.x, y, lantern.z);
    dummy.scale.set(1.05 * fade, 1.35 * fade, 1.05 * fade);
    dummy.updateMatrix();
    glows.setMatrixAt(index, dummy.matrix);
    glows.setColorAt(index, lantern.color);
  });
  bodies.instanceMatrix.needsUpdate = true;
  hoops.instanceMatrix.needsUpdate = true;
  ribs.instanceMatrix.needsUpdate = true;
  tassels.instanceMatrix.needsUpdate = true;
  flames.instanceMatrix.needsUpdate = true;
  glows.instanceMatrix.needsUpdate = true;
  if (bodies.instanceColor) bodies.instanceColor.needsUpdate = true;
  if (glows.instanceColor) glows.instanceColor.needsUpdate = true;
}

function createFallingPetals() {
  const geometry = new THREE.PlaneGeometry(.17, .105);
  const material = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: .72,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .85,
    depthWrite: false,
  });
  const count = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 40
    : isSmallScreen() || isLowPowerDevice() ? 100 : 180;
  petalMesh = new THREE.InstancedMesh(geometry, material, count);
  petalMesh.frustumCulled = false;
  const petalColors = ["#f4aac7", "#ffd8e5", "#eab5d2", "#fff1f4"];
  for (let i = 0; i < count; i++) {
    const source = blossomTreeSources[Math.floor(seeded(i, 24) * blossomTreeSources.length)];
    petals.push({
      x: source.x + (seeded(i, 26) - .5) * 4.4,
      y: .64 + source.height * source.scale + .8 + seeded(i, 25) * 3.2,
      z: source.z + (seeded(i, 28) - .5) * 4.4,
      speed: 1.1 + seeded(i, 27) * 1.9,
      phase: seeded(i, 29) * Math.PI * 2,
      spin: (seeded(i, 29) - .5) * 2,
      scale: .72 + seeded(i, 30) * .82,
    });
    petalMesh.setColorAt(i, new THREE.Color(petalColors[i % petalColors.length]));
  }
  if (petalMesh.instanceColor) petalMesh.instanceColor.needsUpdate = true;
  scene.add(petalMesh);
}

function resetPetalAtTree(petal, index, time) {
  const sourceIndex = Math.floor(seeded(index + Math.floor(time), 31) * blossomTreeSources.length);
  const source = blossomTreeSources[sourceIndex];
  petal.x = source.x + (seeded(index, Math.floor(time) + 32) - .5) * 5.2;
  petal.y = .64 + source.height * source.scale + .8 + seeded(index, Math.floor(time) + 33) * 3.2;
  petal.z = source.z + (seeded(index, Math.floor(time) + 34) - .5) * 5.2;
}

function updatePetals(delta, time) {
  petals.forEach((petal, index) => {
    petal.y -= petal.speed * delta;
    petal.x += (Math.sin(time * .65 + petal.phase) + petal.spin) * delta * .34;
    petal.z += Math.cos(time * .45 + petal.phase) * delta * .22;
    if (petal.y < .65) {
      resetPetalAtTree(petal, index, time);
    }
    dummy.position.set(petal.x, petal.y, petal.z);
    dummy.rotation.set(-Math.PI / 2 + Math.sin(time + petal.phase) * .16, petal.phase + time * .3, Math.sin(time * .8 + petal.phase) * .14);
    dummy.scale.setScalar(petal.scale);
    dummy.updateMatrix();
    petalMesh.setMatrixAt(index, dummy.matrix);
  });
  petalMesh.instanceMatrix.needsUpdate = true;
}

function createDecorations() {
  const pathAngles = sectionData.map(({ x, z }) => Math.atan2(z, x)).sort((a, b) => a - b);
  const groveOffsets = [-13, 0, 13];
  const groveRadii = [18.5, 20.2, 18.5];
  let treeIndex = 0;
  for (let path = 0; path < pathAngles.length; path++) {
    const start = pathAngles[path];
    let end = pathAngles[(path + 1) % pathAngles.length];
    if (path === pathAngles.length - 1) end += Math.PI * 2;
    const groveCenter = (start + end) * .5;
    const centerDegrees = ((groveCenter * 180 / Math.PI) % 360 + 360) % 360;
    if (centerDegrees > 74 && centerDegrees < 106) continue;
    for (let tree = 0; tree < groveOffsets.length; tree++) {
      const angle = groveCenter + groveOffsets[tree] * Math.PI / 180;
      const radius = groveRadii[tree];
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const size = [.68, .84, .72][tree];
      const seed = treeIndex + 71;
      createTree(x, z, size, seed, true);
      if (tree === 1 && path % 2 === 0) {
        createLantern(x + Math.cos(angle + .5) * 1.8, z + Math.sin(angle + .5) * 1.8, "#f1c18b");
      }
      treeIndex++;
    }
  }

  const grassMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 1 });
  const grassGeometry = getBoxGeometry([.075, .38, .075]);
  const grassColors = ["#6f966e", "#85a373", "#a0a776"];
  const grassCount = isSmallScreen() || isLowPowerDevice() ? 180 : 360;
  grassInstances = new THREE.InstancedMesh(grassGeometry, grassMaterial, grassCount * 3);
  grassInstances.frustumCulled = false;
  let bladeCount = 0;
  grassBlades.length = 0;
  for (let i = 0; i < grassCount; i++) {
    const angle = seeded(i, 51) * Math.PI * 2;
    const radius = 6.8 + seeded(i, 52) * 17;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (Math.hypot(x, z) > 24) continue;
    if (sectionData.some(({ x: sx, z: sz }) => Math.hypot(x - sx, z - sz) < 5.3)) continue;
    if (nearViewingDeck(x, z, 4.4)) continue;
    if (distanceToGardenPath(x, z) < 1.05) continue;
    for (let blade = 0; blade < 3; blade++) {
      const bladeAngle = seeded(i, blade + 83) * Math.PI * 2;
      const bladeX = x + Math.cos(bladeAngle) * .14;
      const bladeZ = z + Math.sin(bladeAngle) * .14;
      const baseY = .56 + terrainHeightAt(bladeX, bladeZ);
      const scale = new THREE.Vector3(.8 + seeded(i, blade + 91) * .55, .65 + seeded(i, blade + 94) * .9, .8);
      const phase = seeded(i * 3 + blade, 557) * Math.PI * 2;
      const color = new THREE.Color(grassColors[(i + blade) % grassColors.length]);
      grassBlades.push({ x: bladeX, z: bladeZ, baseY, angle: bladeAngle, scale, phase });
      dummy.position.set(bladeX, baseY + .19 * scale.y, bladeZ);
      dummy.rotation.set(Math.sin(bladeAngle) * .22, bladeAngle, Math.cos(bladeAngle) * .28);
      dummy.scale.copy(scale);
      dummy.updateMatrix();
      grassInstances.setMatrixAt(bladeCount, dummy.matrix);
      grassInstances.setColorAt(bladeCount, color);
      bladeCount++;
    }
  }
  grassInstances.count = bladeCount;
  grassInstances.castShadow = false;
  grassInstances.receiveShadow = false;
  grassInstances.instanceMatrix.needsUpdate = true;
  if (grassInstances.instanceColor) grassInstances.instanceColor.needsUpdate = true;
  scene.add(grassInstances);

  createPebbleScatter();
  createFlowerMeadow();
  createCrystalScatter();

  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const x = Math.cos(angle) * 21.4;
    const z = Math.sin(angle) * 21.4;
    if (!nearViewingDeck(x, z, 5)) createLantern(x, z, "#e5b7ad");
  }
}

function createPebbleScatter() {
  const targetCount = isSmallScreen() || isLowPowerDevice() ? 64 : 118;
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  pebbleMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: .94,
    flatShading: true,
    emissive: "#806c9a",
    emissiveIntensity: .035,
  });
  const pebbles = new THREE.InstancedMesh(geometry, pebbleMaterial, targetCount);
  pebbles.frustumCulled = false;
  const colors = ["#a99891", "#c5b5a7", "#8e927d", "#b99caf", "#d0c0d0"];
  let placed = 0;
  for (let attempt = 0; attempt < targetCount * 24 && placed < targetCount; attempt++) {
    const angle = seeded(attempt, 563) * Math.PI * 2;
    const radius = 7.3 + seeded(attempt, 569) * 15.8;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (radius > 23.2 || radius < 7.1) continue;
    if (sectionData.some(({ x: sx, z: sz }) => Math.hypot(x - sx, z - sz) < 5.2)) continue;
    if (nearViewingDeck(x, z, 4.8) || Math.hypot(x, z) < 7.1) continue;
    if (distanceToGardenPath(x, z) < 1.15) continue;
    if (treeTrunkBlockers.some((tree) => Math.hypot(x - tree.x, z - tree.z) < tree.radius + .25)) continue;

    const scale = new THREE.Vector3(
      .1 + seeded(attempt, 571) * .19,
      .045 + seeded(attempt, 577) * .085,
      .09 + seeded(attempt, 587) * .17,
    );
    dummy.position.set(x, .56 + terrainHeightAt(x, z) + scale.y * .72, z);
    dummy.rotation.set(
      seeded(attempt, 593) * .4,
      seeded(attempt, 599) * Math.PI,
      (seeded(attempt, 601) - .5) * .35,
    );
    dummy.scale.copy(scale);
    dummy.updateMatrix();
    pebbles.setMatrixAt(placed, dummy.matrix);
    const colorIndex = Math.floor(seeded(attempt, 607) * colors.length);
    const pebbleColor = new THREE.Color(colors[colorIndex]);
    if (placed % 9 === 0) pebbleColor.lerp(new THREE.Color("#f6c6e7"), .32);
    pebbles.setColorAt(placed, pebbleColor);
    placed++;
  }
  pebbles.count = placed;
  pebbles.instanceMatrix.needsUpdate = true;
  if (pebbles.instanceColor) pebbles.instanceColor.needsUpdate = true;
  pebbles.castShadow = false;
  pebbles.receiveShadow = false;
  scene.add(pebbles);
}

function updateGrass(time) {
  grassBlades.forEach((blade, index) => {
    const breeze = Math.sin(time * 1.25 + blade.phase) * .24
      + Math.sin(time * .62 + blade.x * .31 + blade.z * .24) * .12;
    dummy.position.set(blade.x, blade.baseY + .19 * blade.scale.y, blade.z);
    dummy.rotation.set(
      Math.sin(blade.angle) * (.22 + breeze),
      blade.angle,
      Math.cos(blade.angle) * (.28 + breeze),
    );
    dummy.scale.copy(blade.scale);
    dummy.updateMatrix();
    grassInstances.setMatrixAt(index, dummy.matrix);
  });
  grassInstances.instanceMatrix.needsUpdate = true;
}

function addPlantInstance(geometry, material, position, scale, rotation, color, batches = plantBatches) {
  const key = `${geometry.uuid}:${material.uuid}`;
  if (!batches.has(key)) batches.set(key, { geometry, material, matrices: [], colors: [] });
  dummy.position.set(...position);
  dummy.rotation.set(...rotation);
  dummy.scale.set(...scale);
  dummy.updateMatrix();
  const batch = batches.get(key);
  batch.matrices.push(dummy.matrix.clone());
  if (color) batch.colors.push(new THREE.Color(color));
}

function addFlowerStem(x, z, height, seed) {
  const geometry = getCylinderGeometry(.63, 1, 1, 5);
  const material = makeMaterial("#65845a");
  const from = new THREE.Vector3(x, .69, z);
  const to = new THREE.Vector3(x + (seeded(seed, 4) - .5) * .1, .69 + height, z + (seeded(seed, 5) - .5) * .1);
  const direction = to.clone().sub(from);
  dummy.position.copy(from).add(to).multiplyScalar(.5);
  dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  dummy.scale.set(.047, direction.length(), .047);
  dummy.updateMatrix();
  const key = `${geometry.uuid}:${material.uuid}`;
  if (!plantBatches.has(key)) plantBatches.set(key, { geometry, material, matrices: [], colors: [] });
  plantBatches.get(key).matrices.push(dummy.matrix.clone());

  const leafGeometry = getSphereGeometry();
  for (const side of [-1, 1]) {
    addPlantInstance(
      leafGeometry,
      flowerLeafMaterial,
      [x + side * .14, .72 + height * .43, z],
      [.17, .045, .075],
      [0, side * .25, side * .5],
      side < 0 ? "#577d57" : "#799568",
    );
  }
  return to;
}

function addGroundFlower(kind, x, z, seed) {
  const height = kind === "tulip" ? .75 : kind === "rose" ? .54 : .39;
  const center = addFlowerStem(x, z, height, seed);
  const petalMaterial = flowerPetalMaterial;
  const petalGeometry = getSphereGeometry();
  const bloomColor = kind === "tulip"
    ? ["#5d85e9", "#7699f0", "#7290df"][Math.floor(seeded(seed, 7) * 3)]
    : kind === "rose"
      ? ["#c93451", "#dc4059", "#ae2945"][Math.floor(seeded(seed, 7) * 3)]
      : kind === "daisy" ? "#fff3de" : "#e5a8d1";
  const petalCount = kind === "rose" ? 11 : kind === "daisy" ? 8 : 6;
  const layers = kind === "rose" ? 3 : 1;
  for (let layer = 0; layer < layers; layer++) {
    const count = kind === "rose" ? 6 + layer * 2 : petalCount;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + seeded(seed, layer + 9) * .3;
      const radius = kind === "tulip" ? .13 : kind === "rose" ? .085 + layer * .035 : .16;
      const y = center.y + (kind === "rose" ? layer * .06 : 0);
      const petalScale = kind === "tulip"
        ? [.13, .27, .12]
        : kind === "rose" ? [.12 + layer * .015, .07, .13 + layer * .012] : [.15, .06, .105];
      addPlantInstance(
        petalGeometry,
        petalMaterial,
        [center.x + Math.cos(angle) * radius, y, center.z + Math.sin(angle) * radius],
        petalScale,
        kind === "tulip" ? [Math.sin(angle) * .18, angle, Math.cos(angle) * .18] : [.2, angle, 0],
        bloomColor,
      );
    }
  }
  addPlantInstance(
    petalGeometry,
    flowerCenterMaterial,
    [center.x, center.y + (kind === "rose" ? .23 : kind === "tulip" ? .035 : .025), center.z],
    kind === "rose" ? [.09, .09, .09] : [.075, .055, .075],
    [0, seeded(seed, 11) * Math.PI, 0],
    kind === "daisy" ? "#e5b64e" : kind === "rose" ? "#f5b859" : "#f8dea0",
  );
}

const flowerPetalMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: .8 });
const flowerCenterMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: .62 });
const flowerLeafMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 1 });

function distanceToGardenPath(x, z) {
  let closest = Infinity;
  for (const section of sectionData) {
    const bx = section.x * .79;
    const bz = section.z * .79;
    const lengthSq = bx * bx + bz * bz;
    const t = THREE.MathUtils.clamp((x * bx + z * bz) / lengthSq, 0, 1);
    closest = Math.min(closest, Math.hypot(x - bx * t, z - bz * t));
  }
  return closest;
}

function createFlowerMeadow() {
  const flowerCount = isSmallScreen() || isLowPowerDevice() ? 70 : 150;
  for (let i = 0; i < flowerCount; i++) {
    let x = 0;
    let z = 0;
    for (let attempt = 0; attempt < 18; attempt++) {
      const angle = seeded(i + attempt, 113) * Math.PI * 2;
      const radius = 6.5 + seeded(i, attempt + 117) * 17;
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
      const byStation = sectionData.some((section) => Math.hypot(x - section.x, z - section.z) < 5.3);
      if (Math.hypot(x, z) > 24 || byStation || nearViewingDeck(x, z, 4.4) || distanceToGardenPath(x, z) < 1.4) continue;
      break;
    }
    const kind = ["tulip", "rose", "daisy", "cosmos"][Math.floor(seeded(i, 125) * 4)];
    addGroundFlower(kind, x, z, i + 137);
  }
}

function createCollectibles() {
  const locations = [
    [-10, 4], [-8, -5], [-4, -11], [1, -14],
    [8, -16], [18, -11], [20, -1], [15, 7],
    [9, 15], [-1, 19], [-13, 17], [-19, 8],
  ];
  const geometry = new THREE.OctahedronGeometry(.34, 0);
  const material = makeMaterial("#f8d08f", { emissive: "#c27c37", emissiveIntensity: .8, roughness: .4 });
  const mesh = new THREE.InstancedMesh(geometry, material, locations.length);
  mesh.frustumCulled = false;
  for (const [x, z] of locations) {
    collectibles.push({ x, z, collected: false, phase: collectibles.length * 1.9 });
  }
  scene.add(mesh);
  mesh.userData.collectibles = true;
  collectibleMesh = mesh;
}

function updateCollectibles(time) {
  collectibles.forEach((item, index) => {
    if (!item.collected && Math.hypot(player.position.x - item.x, player.position.z - item.z) < 1.05) {
      item.collected = true;
      collectedPetals++;
      petalCount.textContent = `${collectedPetals} / ${collectibles.length}`;
      playChime();
      if (collectedPetals === collectibles.length) {
        showToast("All 12 memory petals found! The island is yours ✨");
      } else {
        showToast(`A memory petal! ${collectedPetals} of ${collectibles.length} ✨`);
      }
    }

    dummy.position.set(item.x, item.collected ? -100 : 1.3 + Math.sin(time * 2 + item.phase) * .16, item.z);
    dummy.rotation.set(Math.PI / 2, time * .8 + item.phase, Math.sin(time + item.phase) * .2);
    dummy.scale.setScalar(item.collected ? 0 : 1 + Math.sin(time * 3 + item.phase) * .09);
    dummy.updateMatrix();
    collectibleMesh.setMatrixAt(index, dummy.matrix);
  });
  collectibleMesh.instanceMatrix.needsUpdate = true;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderAbout() {
  const interests = PROFILE.interests.map((interest) => `<span class="tag">${escapeHTML(interest)}</span>`).join("");
  const paragraphs = PROFILE.about.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("");
  return `
    <p class="panel-lead">${escapeHTML(PROFILE.introduction)}</p>
    ${paragraphs}
    <h3>A few things I love</h3>
    <div class="tag-list">${interests}</div>
  `;
}

function renderSkills() {
  return `
    <p class="panel-lead">A growing collection of things I enjoy learning and making.</p>
    <div class="panel-grid">
      ${PROFILE.skills.map((group) => `
        <article class="detail-card">
          <strong>${escapeHTML(group.title)}</strong>
          <div class="tag-list">${group.items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join("")}</div>
        </article>
      `).join("")}
    </div>
    <p>Every good skill starts with being curious enough to try. This garden is always growing.</p>
  `;
}

function renderProjects() {
  return `
    <p class="panel-lead">A little shelf for things I've made, ideas I'm growing, and experiments worth sharing.</p>
    ${PROFILE.projects.map((project, index) => `
      <article class="project-card">
        <span class="project-meta">${String(index + 1).padStart(2, "0")} &nbsp;·&nbsp; ${escapeHTML(project.kind)}</span>
        <h3>${escapeHTML(project.name)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="tag-list">${project.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
        ${safeLink(project.url, "Take a look ↗")}
      </article>
    `).join("")}
  `;
}

function renderJourney() {
  return `
    <p class="panel-lead">Every path has a few stepping stones. Here are some of mine.</p>
    ${PROFILE.journey.map((step, index) => `
      <article class="project-card">
        <span class="project-meta">${String(index + 1).padStart(2, "0")} &nbsp;·&nbsp; ${escapeHTML(step.date)}</span>
        <h3>${escapeHTML(step.title)}</h3>
        <p>${escapeHTML(step.description)}</p>
      </article>
    `).join("")}
    <p>Your story is still being written. Add a new stepping stone whenever you like.</p>
  `;
}

function safeLink(url, label) {
  if (!url || !/^https?:\/\//i.test(url)) return "";
  return `<a class="contact-button" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`;
}

function renderSocials() {
  const socials = PROFILE.socials.map((social) => {
    const label = social.url ? social.label : `${social.name} · add your link`;
    const linkStart = social.url && /^https?:\/\//i.test(social.url)
      ? `<a class="social-link" href="${escapeHTML(social.url)}" target="_blank" rel="noopener noreferrer">`
      : "<div class=\"social-link\">";
    const linkEnd = social.url && /^https?:\/\//i.test(social.url) ? "</a>" : "</div>";
    return `${linkStart}<strong>${escapeHTML(social.name)}</strong><span>${escapeHTML(label)}${social.url ? " ↗" : ""}</span>${linkEnd}`;
  }).join("");
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PROFILE.email)
    ? `<a class="contact-button" href="mailto:${escapeHTML(PROFILE.email)}">Send me a little note ↗</a>`
    : `<p>Add your email and social links in the PROFILE settings near the top of game.js.</p>`;
  return `<p class="panel-lead">For project notes, friendly hellos, and things worth sharing.</p><div class="social-list">${socials}</div>${email}`;
}

function renderContact() {
  const mailLink = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PROFILE.email)
    ? `<a class="contact-button" href="mailto:${escapeHTML(PROFILE.email)}">Send me an email ↗</a>`
    : `<p>Add your email in the PROFILE settings near the top of game.js, then this tree will point people straight to you.</p>`;
  return `
    <p class="panel-lead">Every lovely thing starts with a hello.</p>
    <p>Have an idea, want to work together, or just want to tell me about your favorite tiny creature? I'd love to hear from you.</p>
    ${mailLink}
    <h3>Elsewhere on the island</h3>
    <div class="tag-list">${PROFILE.socials.map((social) => `<span class="tag">${escapeHTML(social.name)}</span>`).join("")}</div>
  `;
}

const panelRenderers = {
  about: renderAbout,
  skills: renderSkills,
  projects: renderProjects,
  journey: renderJourney,
  socials: renderSocials,
  contact: renderContact,
};

function openSection(id) {
  const data = sections.get(id) || sectionData.find((section) => section.id === id);
  if (!data) return;
  closeWishFountain();
  const firstVisit = !sectionVisits.has(id);
  sectionVisits.add(id);
  animalPanel.hidden = true;
  activeAnimal = null;
  activeSection = id;
  panelKicker.textContent = data.short;
  panelTitle.textContent = id === "about" ? `Hi, I'm ${PROFILE.name} ♡` : data.name;
  panelContent.innerHTML = panelRenderers[id]();
  panel.hidden = false;
  document.querySelectorAll(".world-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === id);
  });
  closeButton.focus();
  if (firstVisit && sectionVisits.size === sectionData.length) {
    showToast("You've discovered every corner of the island! ✨");
  }
}

function closePanel() {
  panel.hidden = true;
  activeSection = null;
  document.querySelectorAll(".world-nav button").forEach((button) => button.classList.remove("active"));
}

function openWishFountain() {
  closePanel();
  closeAnimal();
  wishPanelOpen = true;
  wishPanel.hidden = false;
  wishInput.focus();
}

function closeWishFountain() {
  wishPanel.hidden = true;
  wishPanelOpen = false;
  wishInput.value = "";
  updateWishCharacterCount();
  keys.clear();
  touchDirections.clear();
}

function updateWishCharacterCount() {
  document.querySelector("#wish-character-count").textContent = `${wishInput.value.length} / 160`;
}

function sendWish(event) {
  event.preventDefault();
  const text = wishInput.value.trim();
  if (!text) {
    wishInput.focus();
    return;
  }
  wishes.unshift(text);
  if (wishes.length > 10) wishes.pop();
  const item = document.createElement("li");
  item.textContent = text;
  wishList.querySelector(".wish-empty")?.remove();
  wishList.prepend(item);
  while (wishList.children.length > 5) wishList.lastElementChild.remove();

  const startedAt = clock.elapsedTime;
  if (wishCoin) scene.remove(wishCoin);
  const originalRotation = player.rotation.y;
  const hand = new THREE.Vector3(.48, 1.83, .3)
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), originalRotation)
    .add(player.position);
  const distance = Math.hypot(hand.x, hand.z);
  const throwAt = .38;
  const impactAt = throwAt + Math.max(.48, distance / 11);
  const coinMaterial = makeMaterial("#f7d27e", {
    color: "#f7d27e",
    emissive: "#c9863d",
    emissiveIntensity: .8,
    metalness: .72,
    roughness: .28,
  });
  wishCoin = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .035, 20), coinMaterial);
  wishCoin.rotation.x = Math.PI / 2;
  wishCoin.position.copy(hand);
  wishCoin.castShadow = false;
  wishCoin.receiveShadow = false;
  scene.add(wishCoin);
  wishSequence = {
    startedAt,
    throwAt,
    impactAt,
    finishAt: impactAt + 2.8,
    originalRotation,
    elapsed: 0,
    cameraMix: 0,
    impacted: false,
    from: hand,
    to: new THREE.Vector3(0, 1.24, 0),
    arcHeight: 2 + Math.min(distance * .2, 1.5),
  };
  player.rotation.y = Math.atan2(-player.position.x, -player.position.z);
  wishInput.value = "";
  updateWishCharacterCount();
  wishPanel.hidden = true;
  wishPanelOpen = false;
  keys.clear();
  touchDirections.clear();
  showToast("A little coin, a little wish... ✨");
}

function updateAnimalPanel() {
  if (!activeAnimal) return;
  animalPortrait.textContent = activeAnimal.emoji;
  animalTitle.textContent = activeAnimal.label.replace(/ the .+$/, "");
  animalHearts.innerHTML = Array.from({ length: 5 }, (_, index) =>
    `<span class="${index < activeAnimal.friendship ? "filled" : ""}" aria-hidden="true">♥</span>`,
  ).join("");
  animalHearts.setAttribute("aria-label", `Friendship level ${activeAnimal.friendship} of 5`);
  animalStatus.textContent = activeAnimal.friendship === 5
    ? "Best friends forever! ✨"
    : activeAnimal.friendship === 0
      ? "Say hello or give a gentle pet to make a new friend."
      : `You and ${activeAnimal.label.replace(/ the .+$/, "")} are getting to know each other.`;
}

function openAnimal(mob) {
  if (!mob) return;
  closeWishFountain();
  activeSection = null;
  panel.hidden = true;
  document.querySelectorAll(".world-nav button").forEach((button) => button.classList.remove("active"));
  activeAnimal = mob;
  mob.talkIndex = 0;
  if (!mob.chatHistory) mob.chatHistory = [];
  if (!mob.chatHistory.length) {
    mob.chatHistory.push({ speaker: "animal", kind: mob.script[0].kind, text: mob.script[0].text });
  }
  renderAnimalChat();
  updateAnimalPanel();
  animalPanel.hidden = false;
  animalMessageInput.focus();
}

function closeAnimal() {
  animalPanel.hidden = true;
  activeAnimal = null;
  keys.clear();
  touchDirections.clear();
}

function renderAnimalChat() {
  if (!activeAnimal) return;
  animalChatLog.replaceChildren();
  const history = activeAnimal.chatHistory || [];
  history.slice(-24).forEach((message) => {
    const bubble = document.createElement("p");
    bubble.className = `animal-chat-message ${message.speaker === "you" ? "from-player" : "from-animal"}`;
    bubble.textContent = message.text;
    animalChatLog.append(bubble);
  });
  animalChatLog.scrollTop = animalChatLog.scrollHeight;
  const lastMessage = history.at(-1);
  if (lastMessage) animalLineKind.textContent = lastMessage.kind;
}

function chooseAnimalReply(mob, message) {
  const normalized = message.toLowerCase();
  const name = mob.label.replace(/ the .+$/, "");
  const pickReply = (kind, responses) => {
    const index = mob.chatReplyIndex || 0;
    mob.chatReplyIndex = index + 1;
    return { kind, text: responses[index % responses.length] };
  };
  const greetingText = normalized.replace(/\bgoodnight\b/g, "good night");
  const timeGreeting = greetingText.match(/\b(good\s+)?(morning|afternoon|evening|night)\b/)?.[2];
  if (timeGreeting) {
    const replies = {
      morning: [
        `Good morning, sunshine! ${name} is so happy you came to say hello. ♡`,
        `A very good morning to you! ${name} hopes your day is full of lovely little things. ✨`,
      ],
      afternoon: [
        `Good afternoon, sweet friend! ${name} saved you a sunny little hello. ♡`,
        `Hello, sunshine! ${name} hopes your afternoon is going wonderfully. ✿`,
      ],
      evening: [
        `Good evening, lovely! ${name} is glad to spend a cozy moment with you. ♡`,
        `A soft evening hello from ${name}! You make the garden feel warmer. ✨`,
      ],
      night: [
        `Good night, sweet friend. ${name} hopes you have the coziest dreams. ♡`,
        `Night-night! ${name} is sending you a tiny sleepy hug. ✨`,
      ],
    };
    return pickReply(timeGreeting === "night" ? "A sleepy good night" : "A sweet greeting", replies[timeGreeting]);
  }
  if (/\b(hi|hello|hey|hiya|howdy)\b/.test(normalized)) {
    const greeting = normalized.includes("love")
      ? [`Hello, darling! ${name} loves your kind heart. ♡`, `Hi, sweet friend! ${name} is sending a big happy hug your way. ✨`]
      : [`Hello, sweet friend! ${name} is so glad you're here. ♡`, `Hi there, sunshine! ${name} missed your lovely face. ✿`, `Hey, bestie! You just made ${name}'s day brighter. ✨`];
    return pickReply("A sweet hello", greeting);
  }
  if (/\bhow are you\b|\bhow're you\b|\bhow are things\b/.test(normalized)) {
    return pickReply("A friendly check-in", [
      `${name} is feeling extra happy now that you're here! How are you, sweet friend? ♡`,
      `${name} is doing great—especially because you stopped by! How are you? ✨`,
    ]);
  }
  const checks = [
    { kind: "A sweet hello", terms: ["love", "friend", "cute", "♡"], responses: [
      `Aww, ${normalized.includes("love") ? "I love you too" : "I'm so glad we're friends"}! ♡`,
      `${name} thinks you're an absolute sweetheart. You make this garden extra special! ✨`,
    ] },
    { kind: "A little cheer-up", terms: ["sad", "bad", "upset", "lonely", "hard", "tired", "cry", "worry", "scared"], responses: [
      "I'm sorry things feel heavy right now. You don't have to figure it all out at once. I'm here with you. ♡",
      "Sending you the coziest, fluffiest hug! Take a little breath. You're not alone.",
    ] },
    { kind: "A little motivation", terms: ["help", "can i", "can't", "cannot", "try", "dream", "work", "school", "nervous", "afraid", "motivate"], responses: [
      "You can do this! One tiny step is still a step forward, and I'll cheer for every one. ✨",
      "Believe in your own pace. You've already made it through so much, and I know you've got this!",
    ] },
    { kind: "A curious chirrup", terms: ["what", "why", "how", "favorite", "favourite", "tell me", "think"], responses: [
      `Mmm, good question! ${mob.script[(mob.talkIndex + 1) % mob.script.length].text}`,
      `${name} tilts their head thoughtfully. "I think kindness makes every answer a little better." ♡`,
    ] },
  ];
  const matched = checks.find(({ terms }) => terms.some((term) => term.length <= 3
    ? new RegExp(`\\b${term}\\b`).test(normalized)
    : normalized.includes(term)));
  if (matched) {
    return pickReply(matched.kind, matched.responses);
  }
  const replies = [
    `That sounds important to you. Tell me more? ${mob.emoji}`,
    "I'm listening! Your thoughts are always welcome here. ♡",
    `${name} gives a happy little nod. "Thanks for sharing that with me!" ✨`,
    "Ooh, I hear you! And remember, you're doing better than you think. ♡",
  ];
  return pickReply("A friendly reply", replies);
}

function sendAnimalMessage(event) {
  event.preventDefault();
  if (!activeAnimal) return;
  const text = animalMessageInput.value.trim();
  if (!text) {
    animalMessageInput.focus();
    return;
  }
  const mob = activeAnimal;
  mob.chatHistory ||= [];
  mob.chatHistory.push({ speaker: "you", kind: "Your message", text });
  const reply = chooseAnimalReply(mob, text);
  mob.chatHistory.push({ speaker: "animal", ...reply });
  mob.chatHistory = mob.chatHistory.slice(-24);
  mob.happyUntil = clock.elapsedTime + 2.5;
  mob.excitedUntil = clock.elapsedTime + 1.2;
  mob.heart.material.opacity = 1;
  animalMessageInput.value = "";
  renderAnimalChat();
  playChime();
}

function talkToAnimal() {
  if (!activeAnimal) return;
  const mob = activeAnimal;
  mob.talkIndex = ((mob.talkIndex || 0) + 1) % mob.script.length;
  const line = mob.script[mob.talkIndex];
  mob.excitedUntil = clock.elapsedTime + 2.2;
  mob.chatHistory ||= [];
  mob.chatHistory.push({ speaker: "animal", ...line });
  mob.chatHistory = mob.chatHistory.slice(-24);
  renderAnimalChat();
  playChime();
}

function petAnimal() {
  if (!activeAnimal) return;
  const mob = activeAnimal;
  mob.friendship = Math.min(5, mob.friendship + 1);
  mob.happyUntil = clock.elapsedTime + 4.5;
  mob.excitedUntil = clock.elapsedTime + 1.4;
  mob.heart.material.opacity = 1;
  const reply = {
    kind: "A happy little chirrup",
    text: mob.petReplies[(mob.friendship - 1) % mob.petReplies.length],
  };
  mob.chatHistory ||= [];
  mob.chatHistory.push({ speaker: "animal", ...reply });
  mob.chatHistory = mob.chatHistory.slice(-24);
  renderAnimalChat();
  updateAnimalPanel();
  playChime();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(lastToastTimer);
  lastToastTimer = setTimeout(() => toast.classList.remove("visible"), 2300);
}

function drawMinimap() {
  const { width, height } = mapCanvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = width * .43 / 25;
  mapContext.clearRect(0, 0, width, height);
  mapContext.save();
  mapContext.beginPath();
  mapContext.arc(centerX, centerY, width * .47, 0, Math.PI * 2);
  mapContext.clip();
  mapContext.fillStyle = "#33494c";
  mapContext.fillRect(0, 0, width, height);
  mapContext.fillStyle = "#526e55";
  mapContext.beginPath();
  mapContext.arc(centerX, centerY, 26 * scale, 0, Math.PI * 2);
  mapContext.fill();
  mapContext.strokeStyle = "rgba(241,206,194,.35)";
  mapContext.lineWidth = 2;
  mapContext.beginPath();
  mapContext.arc(centerX, centerY, 26 * scale, 0, Math.PI * 2);
  mapContext.stroke();

  mapContext.strokeStyle = "rgba(224,199,160,.75)";
  mapContext.lineWidth = 4;
  mapContext.lineCap = "round";
  mapContext.beginPath();
  for (const section of sectionData) {
    mapContext.moveTo(centerX, centerY);
    mapContext.lineTo(centerX + section.x * scale * .78, centerY + section.z * scale * .78);
  }
  mapContext.stroke();

  for (const section of sectionData) {
    const x = centerX + section.x * scale;
    const y = centerY + section.z * scale;
    mapContext.fillStyle = sectionVisits.has(section.id) ? "#ffe0a2" : `#${section.color.toString(16).padStart(6, "0")}`;
    mapContext.beginPath();
    mapContext.arc(x, y, sectionVisits.has(section.id) ? 5 : 4, 0, Math.PI * 2);
    mapContext.fill();
  }
  for (const collectible of collectibles) {
    if (collectible.collected) continue;
    mapContext.fillStyle = "#f8d08f";
    mapContext.beginPath();
    mapContext.arc(centerX + collectible.x * scale, centerY + collectible.z * scale, 2, 0, Math.PI * 2);
    mapContext.fill();
  }

  mapContext.fillStyle = "#fff8f1";
  mapContext.strokeStyle = "#c879a0";
  mapContext.lineWidth = 3;
  mapContext.beginPath();
  mapContext.arc(centerX + player.position.x * scale, centerY + player.position.z * scale, 5, 0, Math.PI * 2);
  mapContext.fill();
  mapContext.stroke();
  mapContext.restore();
}

function toggleMap() {
  const visible = mapCanvas.classList.toggle("visible");
  mapToggle.setAttribute("aria-pressed", String(visible));
  if (visible) drawMinimap();
}

function takePhoto() {
  try {
    const anchor = document.createElement("a");
    anchor.download = "sarahs-cherry-blossom-world.png";
    anchor.href = renderer.domElement.toDataURL("image/png");
    anchor.click();
    showToast("A little postcard from the island is on its way ✨");
  } catch (error) {
    console.error("Could not save the garden snapshot.", error);
    showToast("Your browser couldn't save the snapshot. Try another browser.");
  }
}

function toggleQuality() {
  qualityMode = qualityMode === "auto" ? "low" : qualityMode === "low" ? "high" : "auto";
  qualityToggle.querySelector("span").textContent = qualityMode === "auto" ? "Auto" : qualityMode === "low" ? "Lite" : "High";
  resize();
  showToast(`Graphics set to ${qualityMode === "auto" ? "automatic" : qualityMode} quality.`);
}

function interact() {
  if (activeSection || activeAnimal || wishPanelOpen || wishSequence) return;
  if (sittingAtBench) {
    toggleBenchSeat();
    return;
  }
  if (!nearest) {
    showToast("Wander a little closer to a sign, or tap a section above ✿");
    return;
  }
  if (nearest.type === "mob") {
    openAnimal(nearest.mob);
    return;
  }
  if (nearest.type === "fountain") openWishFountain();
  else if (nearest.type === "bench") toggleBenchSeat();
  else openSection(nearest.id);
}

function toggleBenchSeat() {
  if (!viewingBench || !benchSeatPosition) return;
  if (sittingAtBench) {
    sittingAtBench = false;
    player.position.set(benchSeatPosition.x, .66, benchSeatPosition.z - 1.55);
    player.rotation.x = 0;
    player.rotation.y = yaw;
    playerLegs.forEach((leg) => {
      leg.rotation.set(0, 0, 0);
    });
    playerArms.forEach((arm) => {
      arm.rotation.set(0, 0, 0);
    });
    showToast("Back to wandering, sweet explorer ✨");
    return;
  }
  sittingAtBench = true;
  jumpHeight = 0;
  jumpVelocity = 0;
  player.position.copy(benchSeatPosition);
  player.rotation.set(0, 0, 0);
  yaw = Math.PI;
  cameraPitch = -.12;
  playerLegs.forEach((leg) => {
    leg.rotation.set(-1.05, 0, 0);
  });
  playerArms.forEach((arm) => {
    arm.rotation.set(-.42, 0, 0);
  });
  showToast("You settle in to watch the lanterns and stars ♡");
}

function interactWithHit(hit) {
  let object = hit.object;
  while (object) {
    if (object.userData.type === "bench") return { type: "bench" };
    if (object.userData.type === "fountain") return { type: "fountain" };
    if (object.userData.type === "mob") {
      const mob = mobs.find((entry) => entry.group.userData.label === object.userData.label);
      return mob ? { type: "mob", label: mob.group.userData.label, greeting: mob.greeting, mob } : null;
    }
    if (object.userData.sectionId) {
      const section = sections.get(object.userData.sectionId);
      return section ? { type: "section", id: section.id, data: section } : null;
    }
    object = object.parent;
  }
  return null;
}

function updateNearest() {
  if (activeSection || activeAnimal || wishPanelOpen) {
    nearest = null;
    prompt.classList.remove("visible");
    return;
  }
  let closest = null;
  let closestDistance = 3.1;
  for (const section of sections.values()) {
    const approach = getSectionApproach(section);
    const distance = Math.hypot(player.position.x - approach.x, player.position.z - approach.z);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = { type: "section", id: section.id, data: section };
    }
  }
  for (const mob of mobs) {
    const distance = Math.hypot(player.position.x - mob.group.position.x, player.position.z - mob.group.position.z);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = { type: "mob", label: mob.group.userData.label, greeting: mob.greeting, mob };
    }
  }
  if (viewingBench) {
    const distance = Math.hypot(
      player.position.x - viewingBench.position.x,
      player.position.z - (viewingBench.position.z + .2),
    );
    if ((sittingAtBench || distance < 3.2) && distance < closestDistance) {
      closestDistance = distance;
      closest = { type: "bench" };
    }
  }
  const fountainDistance = Math.hypot(player.position.x, player.position.z);
  if (fountainDistance < 7.25 && (!closest || fountainDistance < closestDistance)) {
    closest = { type: "fountain" };
    closestDistance = fountainDistance;
  }
  nearest = closest;
  prompt.classList.toggle("visible", Boolean(nearest));
  const nextPrompt = nearest?.type === "mob"
    ? `Meet ${nearest.label}`
    : nearest?.type === "bench" ? (sittingAtBench ? "Stand up from the viewing bench" : "Sit and enjoy the view")
    : nearest?.type === "fountain" ? "Make a wish at the fountain"
      : nearest ? `Explore ${nearest.data.name}` : "";
  if (promptLabel.textContent !== nextPrompt) promptLabel.textContent = nextPrompt;
  const nextLocation = nearest?.type === "mob"
    ? `${nearest.label}'s favorite spot`
    : nearest?.type === "bench" ? "Island sky-view"
    : nearest?.type === "fountain" ? "Wishing fountain"
      : nearest?.data.name || "Cherry blossom island";
  if (locationName.textContent !== nextLocation) locationName.textContent = nextLocation;
}

function getSectionApproach(section) {
  const angle = Math.atan2(-section.x, -section.z);
  return {
    x: section.x + Math.sin(angle) * 3.1,
    z: section.z + Math.cos(angle) * 3.1,
  };
}

function updatePlayer(delta, time) {
  const forward = keys.has("w") || keys.has("arrowup") || touchDirections.has("up");
  const backward = keys.has("s") || keys.has("arrowdown") || touchDirections.has("down");
  const left = keys.has("a") || keys.has("arrowleft") || touchDirections.has("left");
  const right = keys.has("d") || keys.has("arrowright") || touchDirections.has("right");
  let x = Number(right) - Number(left);
  let z = Number(backward) - Number(forward);
  const length = Math.hypot(x, z);

  const canMove = Boolean(length && !activeSection && !activeAnimal && !wishPanelOpen && !sittingAtBench && !wishSequence);
  const sprinting = canMove && keys.has("shift");
  if (canMove) {
    x /= length;
    z /= length;
    const speed = player.userData.speed * (sprinting ? 1.65 : 1) * delta;
    const moveX = x * Math.cos(yaw) + z * Math.sin(yaw);
    const moveZ = -x * Math.sin(yaw) + z * Math.cos(yaw);
    const nextX = THREE.MathUtils.clamp(player.position.x + moveX * speed, -25.5, 25.5);
    const nextZ = THREE.MathUtils.clamp(player.position.z + moveZ * speed, -25.5, VIEWING_DECK_Z + 2.1);
    const canStandAt = (candidateX, candidateZ) => (
      Math.hypot(candidateX, candidateZ) < 26
      || (Math.abs(candidateX) <= 3 && Math.abs(candidateZ - VIEWING_DECK_Z) <= 2.1)
    ) && (
      !isInsideWorldBlocker(candidateX, candidateZ)
    );
    if (canStandAt(nextX, nextZ)) {
      player.position.x = nextX;
      player.position.z = nextZ;
    } else {
      if (canStandAt(nextX, player.position.z)) player.position.x = nextX;
      if (canStandAt(player.position.x, nextZ)) player.position.z = nextZ;
    }
    player.rotation.y = Math.atan2(moveX, moveZ);
  }
  const strideRate = sprinting ? 17 : 10.5;
  const strideAmount = sprinting ? .76 : .48;
  const stride = canMove ? Math.sin(time * strideRate) * strideAmount : 0;
  playerLegs[0].rotation.x = stride;
  playerLegs[1].rotation.x = -stride;
  playerArms[0].rotation.x = -stride * 1.1;
  playerArms[1].rotation.x = stride * 1.1;
  playerArms[0].rotation.z = canMove ? -.08 : Math.sin(time * 1.4) * .025;
  playerArms[1].rotation.z = canMove ? .08 : -Math.sin(time * 1.4) * .025;
  if (wishSequence) {
    const elapsed = wishSequence.elapsed;
    const windup = THREE.MathUtils.smoothstep(elapsed, .08, wishSequence.throwAt);
    const throwProgress = THREE.MathUtils.smoothstep(elapsed, wishSequence.throwAt, wishSequence.throwAt + .3);
    playerArms[1].rotation.x = elapsed < wishSequence.throwAt
      ? THREE.MathUtils.lerp(0, -2.25, windup)
      : THREE.MathUtils.lerp(-2.25, .38, throwProgress);
    playerArms[1].rotation.y = -.12;
    playerArms[1].rotation.z = -.16;
    playerArms[0].rotation.x = -.35 - windup * .4;
    playerArms[0].rotation.z = -.18;
  }
  jumpHeight = Math.max(0, jumpHeight + jumpVelocity * delta);
  if (jumpHeight === 0) jumpVelocity = 0;
  else jumpVelocity -= 18 * delta;
  const walkingSurface = walkingSurfaceHeightAt(player.position.x, player.position.z);
  const bodyBob = canMove
    ? Math.abs(Math.sin(time * strideRate * 2)) * (sprinting ? .105 : .05)
    : Math.sin(time * 2) * .012;
  player.position.y = sittingAtBench
    ? benchSeatPosition.y
    : walkingSurface + .1 + jumpHeight + bodyBob;
  if (playerHead) {
    playerHead.rotation.x = sittingAtBench
      ? -.035
      : canMove ? (sprinting ? .1 : .045) : Math.sin(time * 1.15) * .018;
    playerHead.rotation.z = canMove
      ? Math.sin(time * strideRate) * (sprinting ? .045 : .022)
      : Math.sin(time * .82) * .025;
  }
  if (time >= playerNextBlink) {
    playerBlinkUntil = time + .13;
    playerNextBlink = time + 2.8 + Math.random() * 2.8;
  }
  const blinkProgress = THREE.MathUtils.clamp((time - (playerBlinkUntil - .13)) / .13, 0, 1);
  const blinkAmount = time < playerBlinkUntil ? Math.sin(blinkProgress * Math.PI) : 0;
  const eyeGlance = Math.sin(time * (canMove ? 2.4 : .8)) * (canMove ? .018 : .027);
  playerEyes.forEach(({ white, pupil, highlight, closed }, index) => {
    white.visible = true;
    white.scale.y = 1 - blinkAmount * .9;
    pupil.visible = blinkAmount < .45;
    pupil.scale.y = 1 - blinkAmount * .9;
    highlight.visible = blinkAmount < .2;
    closed.visible = blinkAmount > .65;
    pupil.position.x = (index === 0 ? -.01 : .01) + eyeGlance;
    pupil.position.y = -.01 + Math.sin(time * .9 + index * .8) * .012;
  });
  const tossExcitement = wishSequence && wishSequence.elapsed >= wishSequence.throwAt - .08
    && wishSequence.elapsed <= wishSequence.throwAt + .48;
  const mouthOpen = Boolean(tossExcitement || (canMove && Math.sin(time * strideRate * .5) > (sprinting ? .35 : .65)));
  playerMouth.visible = mouthOpen;
  playerMouth.scale.y = mouthOpen ? .025 + Math.max(0, Math.sin(time * strideRate)) * .03 : .012;
  playerSmile.visible = !mouthOpen;
  const smilePulse = Math.sin(time * (canMove ? strideRate : 1.4));
  playerSmile.scale.set(1 + smilePulse * .08, 1 + smilePulse * .14, 1);
  if (sittingAtBench) {
    playerLegs.forEach((leg) => leg.rotation.set(-1.05, 0, 0));
    playerArms.forEach((arm) => arm.rotation.set(-.42, 0, 0));
  }
  playerShadow.position.x = player.position.x;
  playerShadow.position.y = walkingSurface + .06;
  playerShadow.position.z = player.position.z;
  playerShadow.scale.setScalar(1 - Math.min(jumpHeight * .2, .5));
}

function isInsideWorldBlocker(x, z) {
  const playerRadius = .5;
  for (const blockers of [worldBlockers, treeTrunkBlockers]) {
    for (const blocker of blockers) {
      if (blocker.type === "circle") {
        if (Math.hypot(x - blocker.x, z - blocker.z) < blocker.radius + playerRadius) return true;
        continue;
      }
      const closestX = THREE.MathUtils.clamp(x, blocker.x - blocker.halfWidth, blocker.x + blocker.halfWidth);
      const closestZ = THREE.MathUtils.clamp(z, blocker.z - blocker.halfDepth, blocker.z + blocker.halfDepth);
      if (Math.hypot(x - closestX, z - closestZ) < playerRadius) return true;
    }
  }
  return false;
}

function jump() {
  if (activeSection || activeAnimal || wishPanelOpen || sittingAtBench || wishSequence || jumpHeight > .02) return;
  jumpVelocity = 7.2;
}

function updateMobs(time) {
  const night = dayNightMix < .2;
  for (const mob of mobs) {
    const excited = time < mob.excitedUntil;
    const happy = time < mob.happyUntil;
    const sleeping = night && !excited && !happy && Math.sin(time * .18 + mob.phase * 2) > .18;
    const resting = !night && !excited && !happy && Math.sin(time * .16 + mob.phase * 2.7) > .94;
    const walkSignal = (Math.sin(time * .55 + mob.phase) + 1) * .5;
    const walking = !sleeping && !resting && !excited && !happy && walkSignal > .58;
    const walkAmount = walking ? THREE.MathUtils.smoothstep(walkSignal, .58, .98) : 0;
    const stepRate = excited ? 17 : happy ? 12 : 8;
    const bob = Math.sin(time * (excited ? 13 : happy ? 9 : 2.5) + mob.phase);
    mob.group.position.x = mob.baseX + Math.sin(time * .48 + mob.phase) * .7 * walkAmount;
    mob.group.position.z = mob.baseZ + Math.cos(time * .39 + mob.phase) * .52 * walkAmount;
    const travelX = Math.cos(time * .48 + mob.phase) * .336;
    const travelZ = -Math.sin(time * .39 + mob.phase) * .203;
    mob.group.position.y = sleeping ? .48 : resting ? .57 : .69;
    if (excited || happy) mob.group.position.y += Math.max(0, bob) * (excited ? .34 : .22);
    else if (!sleeping) mob.group.position.y += Math.abs(bob) * (walking ? .07 : .025);
    mob.group.rotation.y = walking
      ? Math.atan2(travelX, travelZ) + Math.sin(time * 2 + mob.phase) * .08
      : Math.sin(time * (excited ? 5.2 : happy ? 3.5 : .44) + mob.phase) * (excited ? .8 : happy ? .52 : .18);
    const sleepLean = sleeping ? (mob.type === "bee" ? .08 : .82) : resting ? .14 : 0;
    mob.group.rotation.z = sleepLean + (excited ? Math.sin(time * 13 + mob.phase) * .14 : 0);
    mob.group.rotation.x = sleeping ? .08 : 0;
    mob.mood = sleeping ? "sleeping" : resting ? "resting" : excited ? "excited" : happy ? "happy" : walking ? "walking" : "idle";
    mob.sleepIndicator.visible = sleeping;
    mob.sleepIndicator.position.set(
      .35 + Math.sin(time * .65 + mob.phase) * .09,
      1.88 + Math.sin(time * 1.25 + mob.phase) * .18,
      .02,
    );
    mob.sleepIndicator.scale.set(1.05 + Math.sin(time * 1.25 + mob.phase) * .08, .52 + Math.sin(time * 1.25 + mob.phase) * .04, 1);
    mob.eyeOpenMeshes.forEach((eye) => {
      eye.visible = !sleeping;
    });
    mob.eyeClosedMeshes.forEach((eyelid) => {
      eyelid.visible = sleeping;
    });

    mob.legPivots.forEach((leg, index) => {
      if (sleeping) {
        leg.rotation.x = index < 2 ? -.38 : .32;
        leg.rotation.z = index % 2 ? -.12 : .12;
      } else if (resting) {
        leg.rotation.x = -.3;
        leg.rotation.z = 0;
      } else if (walking || excited || happy) {
        const stride = Math.sin(time * stepRate + mob.phase + (index % 2) * Math.PI) * (excited ? .72 : happy ? .52 : .43);
        leg.rotation.x = stride;
        leg.rotation.z = excited ? Math.sin(time * 15 + index) * .2 : 0;
      } else {
        leg.rotation.x = Math.sin(time * 2 + mob.phase + index) * .035;
        leg.rotation.z = 0;
      }
    });
    mob.wingPivots.forEach(({ group: wing, side }) => {
      const flapRate = sleeping ? 1.3 : excited ? 23 : walking ? 16 : 9;
      const flap = Math.sin(time * flapRate + mob.phase) * (sleeping ? .05 : excited ? .8 : .48);
      wing.rotation.x = flap;
      wing.rotation.z = side * Math.abs(flap) * .32;
    });
    if (mob.tail) {
      const tailWag = excited ? .8 : happy ? .52 : sleeping ? .035 : .22;
      mob.tail.rotation.x = Math.sin(time * (excited ? 12 : 2.8) + mob.phase) * tailWag;
      mob.tail.rotation.z = Math.sin(time * (excited ? 9 : 1.9) + mob.phase) * tailWag * .75;
    }
    const showingHeart = happy || excited;
    mob.heart.material.opacity = showingHeart
      ? Math.min(1, Math.max(mob.happyUntil, mob.excitedUntil) - time)
      : 0;
    mob.heart.position.y = 2.05 + Math.sin(time * (excited ? 9 : 4) + mob.phase) * (excited ? .2 : .12);
  }
}

function updateCamera(delta) {
  const focus = new THREE.Vector3(player.position.x, player.position.y + (firstPerson ? 1.82 : .75), player.position.z);
  if (firstPerson) {
    camera.position.copy(focus);
    const direction = new THREE.Vector3(
      -Math.sin(yaw) * Math.cos(cameraPitch),
      Math.sin(cameraPitch),
      -Math.cos(yaw) * Math.cos(cameraPitch),
    );
    camera.lookAt(camera.position.clone().add(direction.multiplyScalar(12)));
    return;
  }
  let distance = sittingAtBench ? 11 : cameraZoom;
  if (wishSequence) {
    const cinematicMix = wishSequence.cameraMix * .48;
    focus.lerp(new THREE.Vector3(0, 1.8, 0), cinematicMix);
    distance = THREE.MathUtils.lerp(distance, Math.min(distance, 16), wishSequence.cameraMix);
  }
  const pitch = cameraPitch;
  const desired = new THREE.Vector3(
    focus.x + Math.sin(yaw) * Math.cos(pitch) * distance,
    Math.max(.78, focus.y - Math.sin(pitch) * distance),
    focus.z + Math.cos(yaw) * Math.cos(pitch) * distance,
  );
  camera.position.lerp(desired, 1 - Math.exp(-delta * 3.1));
  camera.lookAt(focus);
}

function toggleFirstPerson() {
  firstPerson = !firstPerson;
  cameraPitch = firstPerson ? 0 : -.55;
  player.visible = !firstPerson;
  if (firstPerson) {
    firstPersonYaw = yaw;
    camera.position.set(player.position.x, player.position.y + 1.82, player.position.z);
  } else {
    canvas.style.cursor = "grab";
  }
  if (firstPerson) canvas.style.cursor = "default";
  povToggle.setAttribute("aria-pressed", String(firstPerson));
  povToggle.textContent = firstPerson ? "POV · 1st" : "POV · 3rd";
  povToggle.setAttribute("aria-label", firstPerson ? "Switch to third-person view" : "Switch to first-person view");
  povToggle.title = `${firstPerson ? "Third person" : "First person"} view (V)`;
}

function lookAtCursor(event) {
  const bounds = canvas.getBoundingClientRect();
  const cursorX = THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
  const cursorY = THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
  yaw = firstPersonYaw - (cursorX - .5) * 2.3;
  cameraPitch = THREE.MathUtils.clamp((.5 - cursorY) * 1.65, -1.1, 1.1);
  player.rotation.y = yaw + Math.PI;
}

function updateRaycast(event) {
  const bounds = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(interactables, false)[0];
  const result = hit ? interactWithHit(hit) : null;
  canvas.style.cursor = dragging ? "grabbing" : "grab";
  return result;
}

function onPointerDown(event) {
  if (event.button !== 0 || event.target !== canvas) return;
  if (firstPerson) return;
  event.preventDefault();
  dragging = true;
  canvas.style.cursor = "grabbing";
  pointerStart = { x: event.clientX, y: event.clientY };
  canvas.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (firstPerson) {
    lookAtCursor(event);
    return;
  }
  if (dragging && pointerStart) {
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    yaw -= dx * .005;
    cameraPitch = THREE.MathUtils.clamp(cameraPitch - dy * .0042, -1.42, 1.42);
    player.rotation.y = yaw + Math.PI;
    pointerStart = { x: event.clientX, y: event.clientY };
  }
  if (!dragging) {
    const hit = updateRaycast(event);
    if (hit && hit.type === "section") locationName.textContent = hit.data.name;
    else if (hit?.type === "bench") locationName.textContent = "Island sky-view";
    else if (hit?.type === "fountain") locationName.textContent = "Wishing fountain";
  }
}

function onPointerUp(event) {
  if (!dragging) return;
  dragging = false;
  canvas.style.cursor = "grab";
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  pointerStart = null;
}

function openMapSelection(event) {
  const bounds = mapCanvas.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * mapCanvas.width;
  const y = ((event.clientY - bounds.top) / bounds.height) * mapCanvas.height;
  const scale = mapCanvas.width * .43 / 25;
  const section = sectionData
    .map((item) => ({
      item,
      distance: Math.hypot(
        x - (mapCanvas.width / 2 + item.x * scale),
        y - (mapCanvas.height / 2 + item.z * scale),
      ),
    }))
    .sort((a, b) => a.distance - b.distance)[0];
  if (section && section.distance < 15) openSection(section.item.id);
}

function resize() {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.fov = isSmallScreen() ? 49 : 43;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = qualityMode === "low" || (qualityMode === "auto" && isLowPowerDevice())
    ? 1
    : Math.min(window.devicePixelRatio || 1, qualityMode === "high" ? 1.75 : 1.5);
  renderer.setPixelRatio(pixelRatio);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), .05);
  const time = clock.elapsedTime;
  updateDayNight(time, delta);
  updateCelestialEvents(time, delta);
  updateSkyClouds(time);
  updateFlyingBirds(time);
  updateGrass(time);
  updateWishSequence(time);
  updatePlayer(delta, time);
  updateMobs(time);
  updateFlyingLanterns(delta);
  updateFireflies(time);
  updateGardenMotes(time);
  updateButterflies(time);
  updateCrystalClusters(time);
  updateFountainMagic(time);
  updatePetals(delta, time);
  updateCollectibles(time);
  updateCamera(delta);
  updateNearest();
  if (mapCanvas.classList.contains("visible") && time - mapUpdateTime > .15) {
    drawMinimap();
    mapUpdateTime = time;
  }
  renderer.render(scene, camera);
}

function playChime() {
  if (!audioContext || audioContext.state !== "running") return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(740, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(520, audioContext.currentTime + .45);
  gain.gain.setValueAtTime(.035, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .5);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + .5);
}

function playTone(note, duration, volume, waveform = "sine") {
  if (!audioContext || audioContext.state !== "running" || volume <= .0001) return;
  const start = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(440 * (2 ** ((note - 69) / 12)), start);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + .16);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .02);
}

function playMusicStep() {
  if (!musicEnabled || !audioContext || audioContext.state !== "running") return;
  const isNight = dayNightMix < .48;
  const eventTheme = activeSkyEvent && skyEventMix > .01
    ? SKY_EVENT_MUSIC[activeSkyEvent.name]
    : null;
  const eventMix = eventTheme ? skyEventMix : 0;
  const baseMelody = isNight
    ? [60, 64, 67, 72, 69, 67, 64, 62, 60, 64, 69, 67, 64, 60, 57, 60]
    : [60, 64, 67, 72, 74, 72, 67, 64, 62, 65, 69, 74, 72, 69, 65, 62];
  const baseChords = isNight
    ? [[48, 55, 60], [45, 52, 57], [41, 48, 53], [43, 50, 55]]
    : [[48, 55, 60], [53, 60, 65], [55, 62, 67], [50, 57, 62]];
  const baseVolume = isNight ? .023 : .018;
  const baseDuration = isNight ? 3.1 : 2.45;
  const baseWaveform = isNight ? "sine" : "triangle";
  const step = musicStep;
  playTone(baseMelody[step % baseMelody.length], baseDuration, baseVolume * (1 - eventMix), baseWaveform);
  if (eventTheme) {
    const eventNote = eventTheme.root + eventTheme.motif[step % eventTheme.motif.length];
    playTone(eventNote, isNight ? 3.15 : 2.5, (isNight ? .024 : .022) * eventMix, eventTheme.waveform);
  }
  if (step % 4 === 0) {
    baseChords[(step / 4) % baseChords.length].forEach((chordNote, index) => {
      playTone(chordNote, 4.1, (index === 0 ? .013 : .008) * (1 - eventMix), "sine");
    });
    if (eventTheme) {
      const eventRoot = eventTheme.root - 12;
      [eventRoot, eventRoot + 7, eventRoot + 12].forEach((chordNote, index) => {
        playTone(chordNote, 4.2, (index === 0 ? .012 : .007) * eventMix, "sine");
      });
    }
  }
  musicStep++;
}

function toggleSound() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      showToast("Music isn't available in this browser.");
      return;
    }
    audioContext = new AudioContext();
  }
  const muted = soundButton.getAttribute("aria-pressed") === "true";
  if (muted) {
    audioContext.resume().then(() => playMusicStep()).catch((error) => {
      console.error("Could not start cozy music.", error);
      showToast("Your browser couldn't start the music. Try pressing the button again.");
    });
    musicEnabled = true;
    soundButton.setAttribute("aria-pressed", "false");
    soundButton.setAttribute("aria-label", "Turn cozy music off");
    soundButton.textContent = isSmallScreen() ? "♫" : "♫ Music on";
    clearInterval(soundTimer);
    soundTimer = setInterval(playMusicStep, 2650);
  } else {
    musicEnabled = false;
    audioContext.suspend().catch((error) => console.error("Could not pause cozy music.", error));
    soundButton.setAttribute("aria-pressed", "true");
    soundButton.setAttribute("aria-label", "Turn cozy music on");
    soundButton.textContent = isSmallScreen() ? "♫" : "♫ Music off";
    clearInterval(soundTimer);
  }
}

function cycleSkyMode() {
  skyMode = skyMode === "auto" ? "night" : skyMode === "night" ? "day" : "auto";
  showToast(skyMode === "night"
    ? "Night settles in. Soft starlight and the moonlit melody are here. 🌙"
    : skyMode === "day"
      ? "The garden wakes up in the sunshine. ☀"
      : "Let the sky drift gently between day and night. ✨");
}

function toggleHUD() {
  const isHidden = shell.classList.toggle("hud-hidden");
  worldLabels.forEach((label) => {
    label.visible = !isHidden;
  });
  const label = isHidden ? "Show UI" : "Hide UI";
  hudToggle.textContent = label;
  hudToggle.setAttribute("aria-label", isHidden ? "Show interface labels (H)" : "Hide interface labels (H)");
  hudToggle.setAttribute("aria-pressed", String(isHidden));
}

function showWebGLError() {
  const message = document.createElement("div");
  message.className = "webgl-error";
  message.innerHTML = "<strong>Your garden is almost ready.</strong><br>Open this page through a local web server and make sure WebGL is enabled to explore the 3D world.";
  shell.append(message);
}

function bindEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      if (key === "escape" && activeAnimal) closeAnimal();
      if (key === "escape" && wishPanelOpen) closeWishFountain();
      return;
    }
    if (keysBlockedByPanel.has(key)) event.preventDefault();
    if (key === "e" && !event.repeat && !activeSection && !activeAnimal && !wishPanelOpen) interact();
    if (key === " " && !event.repeat && !activeSection && !activeAnimal && !wishPanelOpen) jump();
    if (key === "m" && !event.repeat) toggleMap();
    if (key === "v" && !event.repeat) toggleFirstPerson();
    if (key === "h" && !event.repeat) toggleHUD();
    if (key === "escape" && activeSection) closePanel();
    if (key === "escape" && activeAnimal) closeAnimal();
    if (key === "escape" && wishPanelOpen) closeWishFountain();
    if (key === "escape" && sittingAtBench) toggleBenchSeat();
    if (key === "n" && !event.repeat) cycleSkyMode();
    if (keysBlockedByPanel.has(key) && !activeSection && !activeAnimal && !wishPanelOpen) keys.add(key);
  });
  window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
  window.addEventListener("blur", () => {
    keys.clear();
    touchDirections.clear();
  });

  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", () => {
    dragging = false;
    pointerStart = null;
  });
  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    cameraZoom = THREE.MathUtils.clamp(cameraZoom + Math.sign(event.deltaY) * 1.3, 17, 34);
  }, { passive: false });

  document.querySelectorAll(".world-nav button").forEach((button) => {
    button.addEventListener("click", () => openSection(button.dataset.section));
  });
  document.querySelectorAll(".touch-key[data-direction]").forEach((button) => {
    const direction = button.dataset.direction;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture(event.pointerId);
      touchDirections.add(direction);
    });
    const release = () => touchDirections.delete(direction);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
  });
  document.querySelector("#touch-action").addEventListener("click", interact);
  document.querySelector("#touch-jump").addEventListener("click", jump);
  skyToggle.addEventListener("click", cycleSkyMode);
  hudToggle.addEventListener("click", toggleHUD);
  povToggle.addEventListener("click", toggleFirstPerson);
  mapToggle.addEventListener("click", toggleMap);
  mapCanvas.addEventListener("click", openMapSelection);
  document.querySelector("#photo-button").addEventListener("click", takePhoto);
  qualityToggle.addEventListener("click", toggleQuality);
  document.querySelector("#start-button").addEventListener("click", () => {
    introCard.classList.add("is-dismissed");
    showToast("Welcome in! The little creatures are friendly ♡");
  });
  document.querySelector(".wordmark").addEventListener("click", (event) => {
    event.preventDefault();
    closePanel();
    closeAnimal();
    if (sittingAtBench) toggleBenchSeat();
    player.position.set(0, .66, 7.2);
    yaw = 0;
  });
  closeButton.addEventListener("click", closePanel);
  animalClose.addEventListener("click", closeAnimal);
  wishClose.addEventListener("click", closeWishFountain);
  wishForm.addEventListener("submit", sendWish);
  wishInput.addEventListener("input", updateWishCharacterCount);
  wishPanel.addEventListener("click", (event) => {
    if (event.target === wishPanel) closeWishFountain();
  });
  animalTalkButton.addEventListener("click", talkToAnimal);
  animalPetButton.addEventListener("click", petAnimal);
  animalChatForm.addEventListener("submit", sendAnimalMessage);
  panel.addEventListener("click", (event) => {
    if (event.target === panel) closePanel();
  });
  soundButton.addEventListener("click", toggleSound);
}

function start() {
  try {
    createWorld();
    bindEvents();
    animate();
  } catch (error) {
    console.error("Could not start the 3D portfolio world.", error);
    showWebGLError();
  }
}

start();
