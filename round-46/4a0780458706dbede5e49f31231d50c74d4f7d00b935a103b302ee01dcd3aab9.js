export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.6 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.4, roughness: 0.3 });
  const matChrome = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.2 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.8 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.3, roughness: 0.5 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.35, 0.3);
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.y = -0.05;
  root.add(body);

  // Top plate
  const topGeo = new THREE.BoxGeometry(0.58, 0.02, 0.28);
  const topPlate = new THREE.Mesh(topGeo, matChrome);
  topPlate.position.y = 0.125;
  root.add(topPlate);

  // Bottom plate
  const bottom = new THREE.Mesh(topGeo, matChrome);
  bottom.position.y = -0.225;
  root.add(bottom);

  // Viewfinder housing
  const vfGeo = new THREE.BoxGeometry(0.22, 0.09, 0.16);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.18, -0.02);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.14, 0.03, 0.07);
  const shoe = new THREE.Mesh(shoeGeo, matChrome);
  shoe.position.set(0, 0.24, -0.02);
  root.add(shoe);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.14, 32);
  const lens = new THREE.Mesh(lensGeo, matLens);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, -0.05, 0.22);
  root.add(lens);

  // Lens ring
  const ringGeo = new THREE.TorusGeometry(0.115, 0.015, 16, 32);
  const ring = new THREE.Mesh(ringGeo, matChrome);
  ring.position.set(0, -0.05, 0.29);
  root.add(ring);

  // Lens front element
  const frontGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.02, 32);
  const front = new THREE.Mesh(frontGeo, matLens);
  front.rotation.x = Math.PI / 2;
  front.position.set(0, -0.05, 0.295);
  root.add(front);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.1, 0.28, 0.26);
  const grip = new THREE.Mesh(gripGeo, matGrip);
  grip.position.set(0.35, -0.08, 0);
  root.add(grip);

  // Dials
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16);
  const dial1 = new THREE.Mesh(dialGeo, matChrome);
  dial1.position.set(-0.2, 0.15, -0.05);
  root.add(dial1);
  const dial2 = new THREE.Mesh(dialGeo, matChrome);
  dial2.position.set(0.2, 0.15, -0.05);
  root.add(dial2);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16);
  const btn = new THREE.Mesh(btnGeo, matRed);
  btn.position.set(0.22, 0.15, 0.08);
  root.add(btn);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 12);
  const lug1 = new THREE.Mesh(lugGeo, matChrome);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.32, 0.05, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, matChrome);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.32, 0.05, 0);
  root.add(lug2);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 16);
  const mount = new THREE.Mesh(mountGeo, matChrome);
  mount.position.set(0, -0.235, 0);
  root.add(mount);

  // Film advance lever
  const leverGeo = new THREE.BoxGeometry(0.02, 0.12, 0.06);
  const lever = new THREE.Mesh(leverGeo, matChrome);
  lever.position.set(0.31, 0.05, 0.05);
  lever.rotation.z = -0.2;
  root.add(lever);

  // Rewind knob
  const knobGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16);
  const knob = new THREE.Mesh(knobGeo, matChrome);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(-0.31, 0.05, 0);
  root.add(knob);

  // Frame counter window
  const winGeo = new THREE.BoxGeometry(0.08, 0.04, 0.01);
  const win = new THREE.Mesh(winGeo, matLens);
  win.position.set(-0.1, 0.15, 0.145);
  root.add(win);

  // Red dot logo
  const dotGeo = new THREE.CircleGeometry(0.015, 16);
  const dot = new THREE.Mesh(dotGeo, matRed);
  dot.position.set(0, 0.05, 0.151);
  root.add(dot);

  return root;
}