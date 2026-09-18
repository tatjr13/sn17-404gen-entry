export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.1 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, roughness: 0.3, metalness: 0.5 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.05, metalness: 0.1 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.6, metalness: 0.0 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9, metalness: 0.0 });

  // Main body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.35);
  const body = new THREE.Mesh(bodyGeo, matBody);
  root.add(body);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.58, 0.02, 0.33);
  const bottom = new THREE.Mesh(bottomGeo, matSilver);
  bottom.position.y = -0.21;
  root.add(bottom);

  // Tripod socket
  const socketGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 12);
  const socket = new THREE.Mesh(socketGeo, matSilver);
  socket.position.set(0, -0.23, 0);
  root.add(socket);

  // Viewfinder bump
  const vfGeo = new THREE.BoxGeometry(0.28, 0.12, 0.22);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.26, -0.02);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.18, 0.025, 0.09);
  const shoe = new THREE.Mesh(shoeGeo, matSilver);
  shoe.position.set(0, 0.335, -0.02);
  root.add(shoe);

  // Shutter dial
  const dialGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16);
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(0.18, 0.22, 0.06);
  root.add(dial);

  // Film advance knob
  const knobGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.09, 16);
  const knob = new THREE.Mesh(knobGeo, matSilver);
  knob.rotation.z = Math.PI / 2;
  knob.position.set(-0.28, 0.2, 0.06);
  root.add(knob);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.16, 0.38, 0.26);
  const grip = new THREE.Mesh(gripGeo, matGrip);
  grip.position.set(0.38, -0.01, 0.04);
  root.add(grip);

  // Lens barrel
  const barrelGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.22, 24);
  const barrel = new THREE.Mesh(barrelGeo, matSilver);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0, 0.285);
  root.add(barrel);

  // Lens rings
  const ringGeo = new THREE.TorusGeometry(0.135, 0.012, 8, 20);
  const ring1 = new THREE.Mesh(ringGeo, matBody);
  ring1.position.set(0, 0, 0.22);
  root.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, matBody);
  ring2.position.set(0, 0, 0.32);
  root.add(ring2);

  // Lens glass
  const glassGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 24);
  const glass = new THREE.Mesh(glassGeo, matGlass);
  glass.rotation.x = Math.PI / 2;
  glass.position.set(0, 0, 0.40);
  root.add(glass);

  // Red dot
  const dotGeo = new THREE.SphereGeometry(0.015, 8, 8);
  const dot = new THREE.Mesh(dotGeo, matRed);
  dot.position.set(0.25, 0.15, 0.176);
  root.add(dot);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.07, 8);
  const lugL = new THREE.Mesh(lugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.34, 0, 0.19);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.34, 0, 0.19);
  root.add(lugR);

  // Top plate ridge
  const ridgeGeo = new THREE.BoxGeometry(0.55, 0.015, 0.04);
  const ridge = new THREE.Mesh(ridgeGeo, matSilver);
  ridge.position.set(0, 0.205, 0.16);
  root.add(ridge);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.03, 12);
  const btn = new THREE.Mesh(btnGeo, matRed);
  btn.position.set(0.22, 0.22, -0.08);
  root.add(btn);

  return root;
}