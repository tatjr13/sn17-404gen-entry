export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.5 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.6, roughness: 0.3 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x1a2a3a, metalness: 0.1, roughness: 0.1 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.2 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xaa2222, metalness: 0.2, roughness: 0.4 });
  const matLeather = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, metalness: 0.0, roughness: 0.8 });

  // Geometries
  const bodyGeo = new THREE.BoxGeometry(0.34, 0.16, 0.20);
  const lensBarrelGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.10, 16);
  const lensRingGeo = new THREE.TorusGeometry(0.085, 0.008, 8, 16);
  const lensGlassGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.005, 16);
  const viewfinderGeo = new THREE.BoxGeometry(0.07, 0.05, 0.07);
  const flashShoeGeo = new THREE.BoxGeometry(0.12, 0.015, 0.03);
  const dialGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.015, 12);
  const buttonGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 8);
  const strapLugGeo = new THREE.BoxGeometry(0.015, 0.02, 0.01);
  const gripGeo = new THREE.BoxGeometry(0.08, 0.14, 0.02);

  // Body
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.set(0, 0, 0);
  root.add(body);

  // Leather grip on right side
  const grip = new THREE.Mesh(gripGeo, matLeather);
  grip.position.set(0.17, 0, 0);
  root.add(grip);

  // Lens assembly
  const lensGroup = new THREE.Group();
  const barrel = new THREE.Mesh(lensBarrelGeo, matLens);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.z = 0.15;
  lensGroup.add(barrel);

  const ring1 = new THREE.Mesh(lensRingGeo, matSilver);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.z = 0.12;
  lensGroup.add(ring1);

  const ring2 = new THREE.Mesh(lensRingGeo, matSilver);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.z = 0.18;
  lensGroup.add(ring2);

  const glass = new THREE.Mesh(lensGlassGeo, matGlass);
  glass.rotation.x = Math.PI / 2;
  glass.position.z = 0.20;
  lensGroup.add(glass);

  root.add(lensGroup);

  // Viewfinder
  const viewfinder = new THREE.Mesh(viewfinderGeo, matBody);
  viewfinder.position.set(0, 0.105, -0.02);
  root.add(viewfinder);

  // Flash shoe
  const flashShoe = new THREE.Mesh(flashShoeGeo, matSilver);
  flashShoe.position.set(0, 0.088, -0.06);
  root.add(flashShoe);

  // Dial (top right)
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(0.12, 0.088, -0.02);
  root.add(dial);

  // Shutter button (top front)
  const button = new THREE.Mesh(buttonGeo, matRed);
  button.position.set(0.08, 0.084, 0.06);
  root.add(button);

  // Strap lugs
  const lug1 = new THREE.Mesh(strapLugGeo, matSilver);
  lug1.position.set(-0.17, 0, 0.10);
  root.add(lug1);

  const lug2 = new THREE.Mesh(strapLugGeo, matSilver);
  lug2.position.set(-0.17, 0, -0.10);
  root.add(lug2);

  // Bottom plate
  const bottomPlate = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.005, 0.18), matSilver);
  bottomPlate.position.set(0, -0.082, 0);
  root.add(bottomPlate);

  // Tripod mount
  const tripodMount = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.01, 8), matSilver);
  tripodMount.position.set(0, -0.085, 0);
  root.add(tripodMount);

  return root;
}