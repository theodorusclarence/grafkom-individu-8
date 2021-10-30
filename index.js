/** @type {THREE.OrthographicCamera} */
let camera;
/** @type {THREE.Scene} */
let scene;
/** @type {THREE.WebGLRenderer} */
let renderer;

(function init() {
  // set up three.js scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('lightGray');

  //lights
  const ambientLight = new THREE.AmbientLight('white', 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 0.6);
  directionalLight.position.set(-2, 2, 2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const lightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    2,
    0x000000
  );
  scene.add(lightHelper);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-1, 0, 0);

  //#region  //*=========== Texture ===========
  const texture = new THREE.TextureLoader().load('images/pier.jpg');

  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  //#endregion  //*======== Texture ===========

  //#region  //*=========== Plane ===========
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 100, 100),
    new THREE.MeshPhongMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
  );
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -3;
  scene.add(plane);
  //#endregion  //*======== Plane ===========

  //#region  //*=========== Create Cube ===========
  const cubeTexture = new THREE.TextureLoader().load('images/large-og.jpg');
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    map: cubeTexture,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, -2, 2.5);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);
  //#endregion  //*======== Create Cube ===========

  renderer = new THREE.WebGLRenderer({ antialias: true });

  //#region  //*=========== Orbit ===========
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  //#endregion  //*======== Orbit ===========

  // Render
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);

  function animation() {
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;
    cube.rotation.z += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }
  animation();
})();
