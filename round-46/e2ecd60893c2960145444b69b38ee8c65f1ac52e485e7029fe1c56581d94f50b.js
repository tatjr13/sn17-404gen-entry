export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const matChrome = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.85, roughness: 0.2 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, metalness: 0.4, roughness: 0.3 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.1, roughness: 0.9 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.2, roughness: 0.5 });

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.25), matBody);
  root.add(body);

  // Lens assembly
  const lensGroup = new THREE.Group();
  const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 24), matChrome);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.z = 0.075;
  lensGroup.add(lensBarrel);

  const lensGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.02, 24), matLens);
  lensGlass.rotation.x = Math.PI / 2;
  lensGlass.position.z = 0.155;
  lensGroup.add(lensGlass);

  const lensRing = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.03, 24), matChrome);
  lensRing.rotation.x = Math.PI / 2;
  lensRing.position.z = 0.05;
  lensGroup.add(lensRing);

  lensGroup.position.z = 0.125;
  root.add(lensGroup);

  // Viewfinder / Prism housing
  const prism = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.14), matBody);
  prism.position.set(0, 0.215, 0);
  root.add(prism);

  // Flash shoe
  const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.08), matChrome);
  shoe.position.set(0, 0.185, 0);
  root.add(shoe);

  // Grip
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.2), matGrip);
  grip.position.set(0.375, -0.05, 0);
  root.add(grip);

  // Top dial
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16), matChrome);
  dial.position.set(-0.15, 0.185, 0);
  root.add(dial);

  // Shutter button
  const button = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), matRed);
  button.position.set(0.15, 0.185, 0);
  root.add(button);

  // Strap lugs
  const lugL = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.04, 8), matChrome);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.3, 0, 0);
  root.add(lugL);

  const lugR = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.04, 8), matChrome);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.3, 0, 0);
  root.add(lugR);

  // Flash unit (optional, adds recognizability)
  const flash = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.06), matBody);
  flash.position.set(0, 0.25, 0);
  root.add(flash);

  const flashGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.005), matChrome);
  flashGlass.position.set(0, 0.25, 0.035);
  root.add(flashGlass);

  // Bottom plate / tripod mount
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.2), matChrome);
  plate.position.set(0, -0.185, 0);
  root.add(plate);

  const tripod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), matChrome);
  tripod.rotation.x = Math.PI / 2;
  tripod.position.set(0, -0.195, 0);
  root.add(tripod);

  // Film advance lever
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.12), matChrome);
  lever.position.set(0.32, 0.1, 0.15);
  root.add(lever);

  const leverKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12), matChrome);
  leverKnob.rotation.x = Math.PI / 2;
  leverKnob.position.set(0.32, 0.1, 0.21);
  root.add(leverKnob);

  // Focus ring detail
  const focusRing = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.02, 24), matChrome);
  focusRing.rotation.x = Math.PI / 2;
  focusRing.position.z = 0.125 + 0.01;
  root.add(focusRing);

  // Brand plate
  const brand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.005), matChrome);
  brand.position.set(0, 0.05, 0.128);
  root.add(brand);

  // Viewfinder window
  const vfWindow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.04, 0.005), matLens);
  vfWindow.position.set(0, 0.215, 0.075);
  root.add(vfWindow);

  // Depth of field / aperture markings (simplified as small boxes)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const mark = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.005, 0.01), matChrome);
    mark.position.set(Math.cos(angle) * 0.125, Math.sin(angle) * 0.125, 0.125 + 0.015);
    root.add(mark);
  }

  return root;
}