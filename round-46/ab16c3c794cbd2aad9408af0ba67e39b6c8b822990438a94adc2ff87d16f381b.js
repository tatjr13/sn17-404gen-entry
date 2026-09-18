export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x224466, metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.7 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.3, 0.2, 0.15);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Lens barrel
  const lensBarrelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 32);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, lensMat);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.z = 0.12;
  root.add(lensBarrel);

  // Lens ring
  const lensRingGeo = new THREE.TorusGeometry(0.082, 0.005, 8, 32);
  const lensRing = new THREE.Mesh(lensRingGeo, metalMat);
  lensRing.position.z = 0.17;
  root.add(lensRing);

  // Lens glass
  const lensGlassGeo = new THREE.CircleGeometry(0.075, 32);
  const lensGlass = new THREE.Mesh(lensGlassGeo, glassMat);
  lensGlass.position.z = 0.171;
  root.add(lensGlass);

  // Viewfinder hump
  const viewfinderGeo = new THREE.BoxGeometry(0.15, 0.04, 0.1);
  const viewfinder = new THREE.Mesh(viewfinderGeo, bodyMat);
  viewfinder.position.y = 0.12;
  root.add(viewfinder);

  // Flash shoe
  const flashShoeGeo = new THREE.BoxGeometry(0.08, 0.01, 0.04);
  const flashShoe = new THREE.Mesh(flashShoeGeo, metalMat);
  flashShoe.position.set(0, 0.145, 0);
  root.add(flashShoe);

  // Top dial
  const dialGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16);
  const dial = new THREE.Mesh(dialGeo, metalMat);
  dial.position.set(-0.1, 0.11, 0);
  root.add(dial);

  // Shutter button
  const shutterGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16);
  const shutter = new THREE.Mesh(shutterGeo, metalMat);
  shutter.position.set(0.12, 0.11, 0.02);
  root.add(shutter);

  // Film advance lever
  const leverGeo = new THREE.BoxGeometry(0.08, 0.02, 0.02);
  const lever = new THREE.Mesh(leverGeo, metalMat);
  lever.position.set(0.15, 0.11, 0);
  root.add(lever);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.02, 8);
  const lugL = new THREE.Mesh(lugGeo, metalMat);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.15, 0, 0);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, metalMat);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.15, 0, 0);
  root.add(lugR);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.28, 0.01, 0.14);
  const bottom = new THREE.Mesh(bottomGeo, metalMat);
  bottom.position.y = -0.105;
  root.add(bottom);

  // Tripod mount
  const tripodGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16);
  const tripod = new THREE.Mesh(tripodGeo, metalMat);
  tripod.position.set(0, -0.11, 0);
  root.add(tripod);

  // Side details (grip texture simulation with small boxes)
  const gripGeo = new THREE.BoxGeometry(0.005, 0.15, 0.12);
  for (let i = -3; i <= 3; i++) {
    const grip = new THREE.Mesh(gripGeo, bodyMat);
    grip.position.set(i * 0.01, 0, 0);
    root.add(grip);
  }

  // Front label plate
  const labelGeo = new THREE.BoxGeometry(0.1, 0.02, 0.001);
  const label = new THREE.Mesh(labelGeo, metalMat);
  label.position.set(0, 0.05, 0.076);
  root.add(label);

  // Back screen
  const screenGeo = new THREE.BoxGeometry(0.08, 0.06, 0.001);
  const screen = new THREE.Mesh(screenGeo, glassMat);
  screen.position.set(0, 0.05, -0.076);
  root.add(screen);

  return root;
}