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
  base.position.set(0, -0.025, 0);
  root.add(base);

  // Screen
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.2, -0.025);
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

  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.set(
        startX + col * keySpacingX,
        0.005,
        startZ + row * keySpacingZ
      );
      keysGroup.add(key);
    }
  }
  keysGroup.position.set(0, 0.025, 0.05);
  root.add(keysGroup);

  // Trackpad
  const trackpad = new THREE.Mesh(trackpadGeo, darkMat);
  trackpad.position.set(0, 0.027, -0.1);
  root.add(trackpad);

  // Hinge
  const hinge = new THREE.Mesh(hingeGeo, accentMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0.025, -0.225);
  root.add(hinge);

  // Stand
  const stand = new THREE.Mesh(standGeo, bodyMat);
  stand.position.set(0, 0.01, -0.25);
  root.add(stand);

  // Legs
  const legPositions = [
    [-0.25, -0.05, -0.25],
    [0.25, -0.05, -0.25],
    [-0.25, -0.05, 0.25],
    [0.25, -0.05, 0.25]
  ];
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, darkMat);
    leg.position.set(...pos);
    root.add(leg);
  });

  // Center the object
  root.position.y -= 0.1;

  return root;
}