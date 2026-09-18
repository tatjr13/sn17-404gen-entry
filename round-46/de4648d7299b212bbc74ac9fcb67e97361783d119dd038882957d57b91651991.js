export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 0.7, roughness: 0.3 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x3b2b1b, metalness: 0.1, roughness: 0.8 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.2, roughness: 0.5 });

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.35), matBody);
  body.position.set(0, -0.05, 0);
  root.add(body);

  // Lens barrel
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 24), matLens);
  lens.rotation.x = -Math.PI / 2;
  lens.position.set(0, -0.05, 0.25);
  root.add(lens);

  // Lens ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 8, 24), matSilver);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(0, -0.05, 0.34);
  root.add(ring);

  // Viewfinder housing
  const viewfinder = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.2), matBody);
  viewfinder.position.set(0, 0.2, 0);
  root.add(viewfinder);

  // Flash shoe
  const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.1), matSilver);
  shoe.position.set(0, 0.3, 0);
  root.add(shoe);

  // Shutter button
  const button = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 12), matSilver);
  button.position.set(0.15, 0.28, 0);
  root.add(button);

  // Dial
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16), matSilver);
  dial.position.set(-0.15, 0.28, 0);
  root.add(dial);

  // Grip
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.35, 0.25), matGrip);
  grip.position.set(0.35, -0.05, 0);
  root.add(grip);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
  const lugL = new THREE.Mesh(lugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.38, 0.05, 0);
  root.add(lugL);

  const lugR = new THREE.Mesh(lugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.38, 0.05, 0);
  root.add(lugR);

  // Red dot on viewfinder
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), matRed);
  dot.position.set(0, 0.275, 0.101);
  root.add(dot);

  // Bottom plate
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.02, 0.3), matSilver);
  bottom.position.set(0, -0.26, 0);
  root.add(bottom);

  return root;
}