export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111122, metalness: 0.5, roughness: 0.2 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.6, roughness: 0.4 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.8 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.3, 0.25);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 24);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.2);
  root.add(lens);

  // Lens ring
  const ringGeo = new THREE.TorusGeometry(0.1, 0.01, 8, 24);
  const ring1 = new THREE.Mesh(ringGeo, accentMat);
  ring1.position.set(0, 0, 0.25);
  root.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, accentMat);
  ring2.position.set(0, 0, 0.15);
  root.add(ring2);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.2, 0.1, 0.15);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(0, 0.2, 0);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.15, 0.02, 0.05);
  const shoe = new THREE.Mesh(shoeGeo, accentMat);
  shoe.position.set(0, 0.26, 0);
  root.add(shoe);

  // Dial
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
  const dial = new THREE.Mesh(dialGeo, accentMat);
  dial.position.set(0.2, 0.16, 0);
  root.add(dial);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.08, 0.2, 0.15);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.34, -0.05, 0);
  root.add(grip);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 12);
  const btn = new THREE.Mesh(btnGeo, accentMat);
  btn.position.set(0.1, 0.155, 0);
  root.add(btn);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.05, 8);
  const lug1 = new THREE.Mesh(lugGeo, accentMat);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.3, 0.1, 0.1);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, accentMat);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(-0.3, 0.1, -0.1);
  root.add(lug2);

  // Film advance lever
  const leverGeo = new THREE.BoxGeometry(0.02, 0.08, 0.02);
  const lever = new THREE.Mesh(leverGeo, accentMat);
  lever.position.set(0.31, 0.05, 0);
  root.add(lever);

  // Focus ring ridges (small boxes around lens)
  const ridgeGeo = new THREE.BoxGeometry(0.01, 0.01, 0.01);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const ridge = new THREE.Mesh(ridgeGeo, accentMat);
    ridge.position.set(Math.cos(angle) * 0.1, Math.sin(angle) * 0.1, 0.22);
    root.add(ridge);
  }

  return root;
}