export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.2, roughness: 0.7 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, metalness: 0.5, roughness: 0.4 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.1, roughness: 0.1 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.2, roughness: 0.5 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const body = new THREE.Mesh(bodyGeo, matBody);
  root.add(body);

  // Lens barrel
  const barrelGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 24);
  const barrel = new THREE.Mesh(barrelGeo, matBody);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0, 0.225);
  root.add(barrel);

  // Lens glass
  const glassGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 24);
  const glass = new THREE.Mesh(glassGeo, matGlass);
  glass.rotation.x = Math.PI / 2;
  glass.position.set(0, 0, 0.31);
  root.add(glass);

  // Lens rings
  const ringGeo = new THREE.TorusGeometry(0.1, 0.008, 8, 24);
  const ring1 = new THREE.Mesh(ringGeo, matSilver);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.set(0, 0, 0.18);
  root.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, matSilver);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.set(0, 0, 0.27);
  root.add(ring2);

  // Viewfinder bump
  const vfGeo = new THREE.BoxGeometry(0.22, 0.08, 0.16);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.215, -0.02);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.12, 0.015, 0.06);
  const shoe = new THREE.Mesh(shoeGeo, matSilver);
  shoe.position.set(0, 0.265, -0.02);
  root.add(shoe);

  // Shutter dial
  const dialGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(0.12, 0.19, 0.08);
  root.add(dial);

  // Film advance knob
  const knobGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.06, 16);
  const knob = new THREE.Mesh(knobGeo, matSilver);
  knob.position.set(-0.15, 0.19, 0.08);
  root.add(knob);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.12, 0.3, 0.12);
  const grip = new THREE.Mesh(gripGeo, matBody);
  grip.position.set(0.335, -0.025, 0);
  root.add(grip);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.05, 8);
  const lugL = new THREE.Mesh(lugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.29, 0, 0.175);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.29, 0, 0.175);
  root.add(lugR);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.015, 8);
  const btn = new THREE.Mesh(btnGeo, matRed);
  btn.position.set(0.08, 0.19, 0.16);
  root.add(btn);

  // Film counter window
  const winGeo = new THREE.BoxGeometry(0.08, 0.03, 0.005);
  const win = new THREE.Mesh(winGeo, matGlass);
  win.position.set(-0.05, 0.215, 0.08);
  root.add(win);

  // Rangefinder patch (small circle on front)
  const patchGeo = new THREE.CircleGeometry(0.02, 12);
  const patch = new THREE.Mesh(patchGeo, matSilver);
  patch.position.set(0.15, 0.05, 0.151);
  root.add(patch);

  return root;
}