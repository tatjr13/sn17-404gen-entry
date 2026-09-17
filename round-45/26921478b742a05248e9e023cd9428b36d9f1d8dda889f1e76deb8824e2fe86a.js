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
  const keyCount = 60;
  const keyMesh = new THREE.InstancedMesh(keyGeo, keyMat, keyCount);
  const dummy = new THREE.Object3D();
  let idx = 0;
  const rows = 5;
  const cols = 12;
  const keySpacingX = 0.05;
  const keySpacingZ = 0.05;
  const startX = -0.3;
  const startZ = -0.1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (idx >= keyCount) break;
      dummy.position.set(
        startX + c * keySpacingX,
        -0.12,
        startZ + r * keySpacingZ
      );
      dummy.updateMatrix();
      keyMesh.setMatrixAt(idx, dummy.matrix);
      idx++;
    }
  }
  root.add(keyMesh);

  // Trackpad
  const trackpad = new THREE.Mesh(trackpadGeo, darkMat);
  trackpad.position.set(0, -0.12, 0.15);
  root.add(trackpad);

  // Hinge
  const hinge = new THREE.Mesh(hingeGeo, accentMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, -0.12, -0.22);
  root.add(hinge);

  // Stand
  const stand = new THREE.Mesh(standGeo, bodyMat);
  stand.position.set(0, -0.17, -0.22);
  root.add(stand);

  // Legs
  const legPositions = [
    [-0.25, -0.2, -0.22],
    [0.25, -0.2, -0.22],
    [-0.25, -0.2, 0.22],
    [0.25, -0.2, 0.22]
  ];
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeo, darkMat);
    leg.position.set(...pos);
    root.add(leg);
  });

  return root;
}