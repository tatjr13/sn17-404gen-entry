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
  const hingeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8);
  const keyGeo = new THREE.BoxGeometry(0.04, 0.01, 0.04);
  const spacebarGeo = new THREE.BoxGeometry(0.25, 0.01, 0.04);
  const trackpadGeo = new THREE.BoxGeometry(0.2, 0.005, 0.15);
  const legGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.02, 6);

  // Base (Bottom part)
  const base = new THREE.Mesh(baseGeo, bodyMat);
  base.position.y = -0.025;
  root.add(base);

  // Screen (Top part) - rotated to be open
  const screenGroup = new THREE.Group();
  const screen = new THREE.Mesh(screenGeo, bodyMat);
  screen.position.y = 0.2;
  screenGroup.add(screen);

  // Screen display area
  const display = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.021, 0.4), screenMat);
  display.position.y = 0.2;
  screenGroup.add(display);

  // Hinge
  const hinge = new THREE.Mesh(hingeGeo, darkMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.y = 0;
  screenGroup.add(hinge);

  // Rotate screen group to simulate open laptop
  screenGroup.rotation.x = -Math.PI / 4;
  screenGroup.position.y = 0.025;
  root.add(screenGroup);

  // Keyboard keys
  const keyRows = 5;
  const keyCols = 12;
  const keySpacingX = 0.05;
  const keySpacingZ = 0.05;
  const startX = -0.3;
  const startZ = -0.15;

  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      // Skip some keys for spacebar area
      if (row === 4 && col >= 3 && col <= 8) continue;

      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.x = startX + col * keySpacingX;
      key.position.z = startZ + row * keySpacingZ;
      key.position.y = 0.005;
      root.add(key);
    }
  }

  // Spacebar
  const spacebar = new THREE.Mesh(spacebarGeo, keyMat);
  spacebar.position.x = 0;
  spacebar.position.z = startZ + 4 * keySpacingZ;
  spacebar.position.y = 0.005;
  root.add(spacebar);

  // Trackpad
  const trackpad = new THREE.Mesh(trackpadGeo, darkMat);
  trackpad.position.x = 0;
  trackpad.position.z = 0.15;
  trackpad.position.y = 0.002;
  root.add(trackpad);

  // Feet/Legs
  const legPositions = [
    [-0.35, -0.04, -0.2],
    [0.35, -0.04, -0.2],
    [-0.35, -0.04, 0.2],
    [0.35, -0.04, 0.2]
  ];

  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, darkMat);
    leg.position.set(pos[0], pos[1], pos[2]);
    root.add(leg);
  });

  // Power indicator light
  const indicatorGeo = new THREE.SphereGeometry(0.005, 8, 8);
  const indicator = new THREE.Mesh(indicatorGeo, accentMat);
  indicator.position.set(0.38, 0.005, -0.15);
  root.add(indicator);

  // USB ports on the side
  const portGeo = new THREE.BoxGeometry(0.01, 0.02, 0.03);
  const port1 = new THREE.Mesh(portGeo, darkMat);
  port1.position.set(-0.405, -0.01, 0.1);
  root.add(port1);

  const port2 = new THREE.Mesh(portGeo, darkMat);
  port2.position.set(-0.405, -0.01, 0.05);
  root.add(port2);

  // Center the whole model
  root.position.y = -0.1;

  return root;
}