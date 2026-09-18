export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6, metalness: 0.2 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.6 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x111133, roughness: 0.1, metalness: 0.1 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc0000, roughness: 0.5, metalness: 0.1 });

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.35), matBody);
  root.add(body);

  // Grip
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.35, 0.25), matBody);
  grip.position.set(0.375, -0.025, 0);
  root.add(grip);

  // Lens barrel
  const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 24), matBody);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0, 0.275);
  root.add(lensBarrel);

  // Lens glass
  const lensGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.02, 24), matGlass);
  lensGlass.rotation.x = Math.PI / 2;
  lensGlass.position.set(0, 0, 0.38);
  root.add(lensGlass);

  // Lens rings
  const ringGeo = new THREE.TorusGeometry(0.12, 0.01, 8, 24);
  const ring1 = new THREE.Mesh(ringGeo, matSilver);
  ring1.position.set(0, 0, 0.2);
  root.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, matSilver);
  ring2.position.set(0, 0, 0.28);
  root.add(ring2);

  // Viewfinder bump
  const viewfinder = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 0.2), matBody);
  viewfinder.position.set(0, 0.25, -0.05);
  root.add(viewfinder);

  // Viewfinder window
  const vfWindow = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.01), matGlass);
  vfWindow.position.set(0, 0.25, 0.051);
  root.add(vfWindow);

  // Flash shoe
  const flashShoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.02, 0.08), matSilver);
  flashShoe.position.set(0, 0.31, -0.05);
  root.add(flashShoe);

  // Flash contacts
  const contactGeo = new THREE.BoxGeometry(0.02, 0.01, 0.02);
  const contact1 = new THREE.Mesh(contactGeo, matSilver);
  contact1.position.set(-0.04, 0.32, -0.05);
  root.add(contact1);
  const contact2 = new THREE.Mesh(contactGeo, matSilver);
  contact2.position.set(0.04, 0.32, -0.05);
  root.add(contact2);

  // Shutter dial
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), matSilver);
  dial.position.set(0.15, 0.22, 0.05);
  root.add(dial);

  // Shutter button
  const shutterBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), matSilver);
  shutterBtn.position.set(-0.15, 0.21, 0.05);
  root.add(shutterBtn);

  // Film advance lever
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.15), matSilver);
  lever.position.set(0.2, 0.21, 0.1);
  root.add(lever);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
  const lugL = new THREE.Mesh(lugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.33, 0, 0.15);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.33, 0, 0.15);
  root.add(lugR);

  // Red dot on lens
  const redDot = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), matRed);
  redDot.position.set(0, 0.1, 0.385);
  root.add(redDot);

  return root;
}