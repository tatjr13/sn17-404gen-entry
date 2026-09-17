export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    metalness: 0.4,
    roughness: 0.3,
  });

  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.1,
    roughness: 0.2,
  });

  const keyMat = new THREE.MeshStandardMaterial({
    color: 0xecf0f1,
    metalness: 0.1,
    roughness: 0.5,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xe74c3c,
    metalness: 0.2,
    roughness: 0.4,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.3,
    roughness: 0.6,
  });

  // Geometries
  const baseGeo = new THREE.BoxGeometry(0.8, 0.05, 0.5);
  const lidGeo = new THREE.BoxGeometry(0.8, 0.05, 0.5);
  const hingeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
  const keyGeo = new THREE.BoxGeometry(0.04, 0.01, 0.04);
  const trackpadGeo = new THREE.BoxGeometry(0.25, 0.005, 0.15);
  const webcamGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.01, 8);
  const indicatorGeo = new THREE.SphereGeometry(0.005, 8, 8);

  // Base
  const base = new THREE.Mesh(baseGeo, bodyMat);
  base.position.y = -0.025;
  root.add(base);

  // Lid (open at 110 degrees)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0, -0.25);
  lidGroup.rotation.x = -Math.PI * 0.3; // ~110 degrees open

  const lid = new THREE.Mesh(lidGeo, bodyMat);
  lid.position.z = 0.25; // Offset to rotate around hinge
  lidGroup.add(lid);

  // Screen bezel
  const bezelGeo = new THREE.BoxGeometry(0.72, 0.005, 0.42);
  const bezel = new THREE.Mesh(bezelGeo, darkMat);
  bezel.position.set(0, 0.026, 0.25);
  lidGroup.add(bezel);

  // Screen
  const screenGeo = new THREE.BoxGeometry(0.68, 0.002, 0.38);
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.028, 0.25);
  lidGroup.add(screen);

  // Webcam
  const webcam = new THREE.Mesh(webcamGeo, darkMat);
  webcam.rotation.x = Math.PI / 2;
  webcam.position.set(0, 0.026, 0.44);
  lidGroup.add(webcam);

  // Webcam indicator light
  const webcamLight = new THREE.Mesh(indicatorGeo, accentMat);
  webcamLight.position.set(0.02, 0.026, 0.44);
  lidGroup.add(webcamLight);

  // Hinge
  const hinge = new THREE.Mesh(hingeGeo, darkMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0, 0);
  lidGroup.add(hinge);

  root.add(lidGroup);

  // Keyboard area
  const keyboardAreaGeo = new THREE.BoxGeometry(0.7, 0.005, 0.25);
  const keyboardArea = new THREE.Mesh(keyboardAreaGeo, darkMat);
  keyboardArea.position.set(0, 0.028, 0.05);
  root.add(keyboardArea);

  // Keys
  const keyRows = 5;
  const keyCols = 12;
  const keySpacingX = 0.05;
  const keySpacingZ = 0.04;
  const startX = -((keyCols - 1) * keySpacingX) / 2;
  const startZ = -((keyRows - 1) * keySpacingZ) / 2 + 0.05;

  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.set(
        startX + col * keySpacingX,
        0.031,
        startZ + row * keySpacingZ
      );
      root.add(key);
    }
  }

  // Spacebar
  const spacebarGeo = new THREE.BoxGeometry(0.25, 0.01, 0.04);
  const spacebar = new THREE.Mesh(spacebarGeo, keyMat);
  spacebar.position.set(0, 0.031, startZ + (keyRows - 1) * keySpacingZ);
  root.add(spacebar);

  // Trackpad
  const trackpad = new THREE.Mesh(trackpadGeo, darkMat);
  trackpad.position.set(0, 0.028, 0.2);
  root.add(trackpad);

  // Power button
  const powerBtnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 16);
  const powerBtn = new THREE.Mesh(powerBtnGeo, accentMat);
  powerBtn.rotation.x = Math.PI / 2;
  powerBtn.position.set(0.35, 0.028, -0.1);
  root.add(powerBtn);

  // USB ports on the side
  const usbGeo = new THREE.BoxGeometry(0.01, 0.02, 0.04);
  for (let i = 0; i < 2; i++) {
    const usb = new THREE.Mesh(usbGeo, darkMat);
    usb.position.set(-0.405, 0, -0.1 + i * 0.06);
    root.add(usb);
  }

  // Audio jack
  const audioJackGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.01, 8);
  const audioJack = new THREE.Mesh(audioJackGeo, darkMat);
  audioJack.rotation.z = Math.PI / 2;
  audioJack.position.set(-0.405, 0, 0.1);
  root.add(audioJack);

  // Charging port
  const chargeGeo = new THREE.BoxGeometry(0.01, 0.015, 0.03);
  const chargePort = new THREE.Mesh(chargeGeo, darkMat);
  chargePort.position.set(-0.405, 0, 0);
  root.add(chargePort);

  // LED indicators on front edge
  const ledGeo = new THREE.SphereGeometry(0.003, 8, 8);
  const led1 = new THREE.Mesh(ledGeo, accentMat);
  led1.position.set(-0.1, 0.025, 0.255);
  root.add(led1);

  const led2 = new THREE.Mesh(ledGeo, new THREE.MeshStandardMaterial({
    color: 0x2ecc71,
    metalness: 0.1,
    roughness: 0.5,
  }));
  led2.position.set(-0.05, 0.025, 0.255);
  root.add(led2);

  return root;
}