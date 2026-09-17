export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.4,
    metalness: 0.1
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.2,
    metalness: 0.5
  });
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0xecf0f1,
    roughness: 0.5,
    metalness: 0.0
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xe74c3c,
    roughness: 0.3,
    metalness: 0.2
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.7,
    metalness: 0.0
  });

  // Geometries
  const baseGeo = new THREE.BoxGeometry(0.8, 0.05, 0.5);
  const screenGeo = new THREE.BoxGeometry(0.7, 0.02, 0.45);
  const keyGeo = new THREE.BoxGeometry(0.04, 0.01, 0.04);
  const trackpadGeo = new THREE.BoxGeometry(0.25, 0.005, 0.15);
  const hingeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 16);
  const standGeo = new THREE.BoxGeometry(0.6, 0.02, 0.1);
  const legGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 8);

  // Base
  const base = new THREE.Mesh(baseGeo, bodyMat);
  base.position.set(0, -0.15, 0);
  root.add(base);

  // Screen
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.1, -0.22);
  screen.rotation.x = -Math.PI / 2;
  root.add(screen);

  // Keys
  const keysGroup = new THREE.Group();
  const keyRows = 5;
  const keyCols = 12;
  const keySpacingX = 0.05;
  const keySpacingZ = 0.05;
  const startX = -((keyCols - 1) * keySpacingX) / 2;
  const startZ = -((keyRows - 1) * keySpacingZ) / 2;

  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.set(
        startX + c * keySpacingX,
        -0.12,
        startZ + r * keySpacingZ
      );
      keysGroup.add(key);
    }
  }
  root.add(keysGroup);

  // Trackpad
  const trackpad = new THREE.Mesh(trackpadGeo, darkMat);
  trackpad.position.set(0, -0.12, 0.15);
  root.add(trackpad);

  // Hinge
  const hinge = new THREE.Mesh(hingeGeo, bodyMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, -0.12, -0.22);
  root.add(hinge);

  // Stand
  const stand = new THREE.Mesh(standGeo, bodyMat);
  stand.position.set(0, -0.18, -0.22);
  root.add(stand);

  // Legs
  const legPositions = [
    [-0.25, -0.2, -0.25],
    [0.25, -0.2, -0.25],
    [-0.25, -0.2, 0.25],
    [0.25, -0.2, 0.25]
  ];
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, bodyMat);
    leg.position.set(...pos);
    root.add(leg);
  });

  // Power button
  const powerBtnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 16);
  const powerBtn = new THREE.Mesh(powerBtnGeo, accentMat);
  powerBtn.rotation.x = Math.PI / 2;
  powerBtn.position.set(0.35, -0.12, -0.15);
  root.add(powerBtn);

  // Indicator lights
  const indicatorGeo = new THREE.SphereGeometry(0.005, 8, 8);
  const indicatorPositions = [
    [0.3, -0.12, -0.1],
    [0.32, -0.12, -0.1],
    [0.34, -0.12, -0.1]
  ];
  indicatorPositions.forEach(pos => {
    const indicator = new THREE.Mesh(indicatorGeo, accentMat);
    indicator.position.set(...pos);
    root.add(indicator);
  });

  // Webcam
  const webcamGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.005, 16);
  const webcam = new THREE.Mesh(webcamGeo, darkMat);
  webcam.rotation.x = Math.PI / 2;
  webcam.position.set(0, 0.12, -0.22);
  root.add(webcam);

  // USB ports
  const usbGeo = new THREE.BoxGeometry(0.02, 0.01, 0.005);
  const usbPositions = [
    [-0.35, -0.12, -0.25],
    [-0.35, -0.12, -0.2],
    [-0.35, -0.12, -0.15]
  ];
  usbPositions.forEach(pos => {
    const usb = new THREE.Mesh(usbGeo, darkMat);
    usb.position.set(...pos);
    root.add(usb);
  });

  // Audio jack
  const audioGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.005, 16);
  const audio = new THREE.Mesh(audioGeo, darkMat);
  audio.rotation.x = Math.PI / 2;
  audio.position.set(0.35, -0.12, -0.25);
  root.add(audio);

  // Logo
  const logoGeo = new THREE.CircleGeometry(0.02, 32);
  const logo = new THREE.Mesh(logoGeo, accentMat);
  logo.rotation.x = -Math.PI / 2;
  logo.position.set(0, -0.125, 0);
  root.add(logo);

  return root;
}