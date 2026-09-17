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
    metalness: 0.1
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
  screen.position.set(0, 0.1, 0);
  screen.rotation.x = -Math.PI / 2;
  root.add(screen);

  // Hinge
  const hinge = new THREE.Mesh(hingeGeo, darkMat);
  hinge.position.set(0, -0.05, 0);
  hinge.rotation.z = Math.PI / 2;
  root.add(hinge);

  // Stand
  const stand = new THREE.Mesh(standGeo, bodyMat);
  stand.position.set(0, -0.2, 0);
  root.add(stand);

  // Legs
  const legPositions = [
    [-0.25, -0.22, 0.05],
    [0.25, -0.22, 0.05],
    [-0.25, -0.22, -0.05],
    [0.25, -0.22, -0.05]
  ];
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, darkMat);
    leg.position.set(...pos);
    root.add(leg);
  });

  // Keys
  const keyRows = 5;
  const keyCols = 12;
  const keySpacing = 0.05;
  const keyStartX = -0.25;
  const keyStartZ = -0.15;

  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.set(
        keyStartX + col * keySpacing,
        -0.12,
        keyStartZ + row * keySpacing
      );
      root.add(key);
    }
  }

  // Trackpad
  const trackpad = new THREE.Mesh(trackpadGeo, accentMat);
  trackpad.position.set(0, -0.12, 0.15);
  root.add(trackpad);

  // Power button
  const powerBtnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 16);
  const powerBtn = new THREE.Mesh(powerBtnGeo, accentMat);
  powerBtn.position.set(0.35, -0.12, -0.15);
  powerBtn.rotation.x = Math.PI / 2;
  root.add(powerBtn);

  // USB ports
  const usbGeo = new THREE.BoxGeometry(0.02, 0.01, 0.01);
  const usbPositions = [
    [0.4, -0.15, 0.1],
    [0.4, -0.15, 0.05],
    [0.4, -0.15, 0]
  ];
  usbPositions.forEach(pos => {
    const usb = new THREE.Mesh(usbGeo, darkMat);
    usb.position.set(...pos);
    root.add(usb);
  });

  // Webcam
  const webcamGeo = new THREE.SphereGeometry(0.01, 8, 8);
  const webcam = new THREE.Mesh(webcamGeo, darkMat);
  webcam.position.set(0, 0.12, 0.22);
  root.add(webcam);

  // LED indicator
  const ledGeo = new THREE.SphereGeometry(0.005, 8, 8);
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 0.5
  });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0.35, -0.12, -0.1);
  root.add(led);

  return root;
}