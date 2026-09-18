export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111122, metalness: 0.8, roughness: 0.2 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.8 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.3 });
  const flashMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.6, roughness: 0.4 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.35);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, -0.05, 0);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.18, 24);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.z = Math.PI / 2;
  lens.position.set(0, -0.05, 0.25);
  root.add(lens);

  // Lens ring
  const ringGeo = new THREE.TorusGeometry(0.115, 0.015, 8, 24);
  const ring1 = new THREE.Mesh(ringGeo, silverMat);
  ring1.position.set(0, -0.05, 0.34);
  root.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, silverMat);
  ring2.position.set(0, -0.05, 0.16);
  root.add(ring2);

  // Viewfinder housing
  const vfGeo = new THREE.BoxGeometry(0.28, 0.1, 0.22);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(0, 0.2, 0);
  root.add(vf);

  // Viewfinder window
  const winGeo = new THREE.BoxGeometry(0.12, 0.04, 0.01);
  const winMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.1 });
  const win = new THREE.Mesh(winGeo, winMat);
  win.position.set(0, 0.22, 0.115);
  root.add(win);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.12, 0.03, 0.06);
  const shoe = new THREE.Mesh(shoeGeo, flashMat);
  shoe.position.set(0, 0.265, 0);
  root.add(shoe);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.12, 0.22, 0.32);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.36, -0.1, 0);
  root.add(grip);

  // Top dial
  const dialGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16);
  const dial = new THREE.Mesh(dialGeo, silverMat);
  dial.position.set(-0.15, 0.26, 0);
  root.add(dial);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const btn = new THREE.Mesh(btnGeo, silverMat);
  btn.position.set(0.15, 0.26, 0);
  root.add(btn);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12);
  const lug1 = new THREE.Mesh(lugGeo, silverMat);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.32, 0, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, silverMat);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.32, 0, 0);
  root.add(lug2);

  // Film advance lever (simple box on top right)
  const leverGeo = new THREE.BoxGeometry(0.04, 0.04, 0.15);
  const lever = new THREE.Mesh(leverGeo, silverMat);
  lever.position.set(0.22, 0.26, 0.05);
  root.add(lever);

  // Bottom plate / tripod mount
  const plateGeo = new THREE.BoxGeometry(0.5, 0.02, 0.3);
  const plate = new THREE.Mesh(plateGeo, silverMat);
  plate.position.set(0, -0.26, 0);
  root.add(plate);

  const tripodGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12);
  const tripod = new THREE.Mesh(tripodGeo, silverMat);
  tripod.position.set(0, -0.28, 0);
  root.add(tripod);

  return root;
}