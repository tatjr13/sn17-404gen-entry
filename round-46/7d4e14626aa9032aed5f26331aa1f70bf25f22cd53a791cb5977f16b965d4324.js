export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.1 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.3, metalness: 0.4 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.4, metalness: 0.6 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8, metalness: 0.0 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb8860b, roughness: 0.5, metalness: 0.5 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x224466, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.6 });

  // Geometries
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.35);
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 24);
  const lensRingGeo = new THREE.TorusGeometry(0.125, 0.015, 8, 24);
  const viewfinderGeo = new THREE.BoxGeometry(0.25, 0.12, 0.2);
  const flashShoeGeo = new THREE.BoxGeometry(0.15, 0.04, 0.08);
  const gripGeo = new THREE.BoxGeometry(0.15, 0.25, 0.3);
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
  const buttonGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.03, 12);
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
  const bottomGeo = new THREE.BoxGeometry(0.55, 0.04, 0.3);
  const tripodGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 12);
  const leverGeo = new THREE.BoxGeometry(0.08, 0.06, 0.15);
  const prismGeo = new THREE.BoxGeometry(0.18, 0.1, 0.15);

  // Body
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, -0.05, 0);
  root.add(body);

  // Bottom plate
  const bottom = new THREE.Mesh(bottomGeo, accentMat);
  bottom.position.set(0, -0.27, 0);
  root.add(bottom);

  // Tripod mount
  const tripod = new THREE.Mesh(tripodGeo, brassMat);
  tripod.position.set(0, -0.31, 0);
  root.add(tripod);

  // Lens assembly
  const lensGroup = new THREE.Group();
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lensGroup.add(lens);

  const ring1 = new THREE.Mesh(lensRingGeo, accentMat);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.z = 0.05;
  lensGroup.add(ring1);

  const ring2 = new THREE.Mesh(lensRingGeo, accentMat);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.z = -0.05;
  lensGroup.add(ring2);

  const glass = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), glassMat);
  glass.position.z = 0.101;
  lensGroup.add(glass);

  lensGroup.position.set(0, -0.05, 0.25);
  root.add(lensGroup);

  // Viewfinder housing
  const viewfinder = new THREE.Mesh(viewfinderGeo, bodyMat);
  viewfinder.position.set(0, 0.2, 0);
  root.add(viewfinder);

  // Prism/finder window
  const prism = new THREE.Mesh(prismGeo, accentMat);
  prism.position.set(0, 0.28, 0);
  root.add(prism);

  const finderGlass = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), glassMat);
  finderGlass.rotation.x = -Math.PI / 2;
  finderGlass.position.set(0, 0.331, 0);
  root.add(finderGlass);

  // Flash shoe
  const flashShoe = new THREE.Mesh(flashShoeGeo, accentMat);
  flashShoe.position.set(0, 0.35, 0);
  root.add(flashShoe);

  // Grip
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.35, -0.1, 0);
  root.add(grip);

  // Dial
  const dial = new THREE.Mesh(dialGeo, accentMat);
  dial.position.set(-0.15, 0.2, 0);
  root.add(dial);

  // Shutter button
  const shutter = new THREE.Mesh(buttonGeo, brassMat);
  shutter.position.set(0.15, 0.2, 0);
  root.add(shutter);

  // Film advance lever
  const lever = new THREE.Mesh(leverGeo, accentMat);
  lever.position.set(0.2, 0.2, -0.05);
  root.add(lever);

  // Strap lugs
  const lugL = new THREE.Mesh(lugGeo, accentMat);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.32, 0.05, 0);
  root.add(lugL);

  const lugR = new THREE.Mesh(lugGeo, accentMat);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.32, 0.05, 0);
  root.add(lugR);

  // Additional details: small buttons on front
  const btn1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), accentMat);
  btn1.position.set(-0.15, 0.05, 0.18);
  root.add(btn1);

  const btn2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), accentMat);
  btn2.position.set(-0.15, -0.05, 0.18);
  root.add(btn2);

  // Red dot accent (classic)
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.015, 12), new THREE.MeshStandardMaterial({ color: 0xcc0000, roughness: 0.5, metalness: 0.2 }));
  dot.position.set(0.1, 0.05, 0.18);
  root.add(dot);

  return root;
}