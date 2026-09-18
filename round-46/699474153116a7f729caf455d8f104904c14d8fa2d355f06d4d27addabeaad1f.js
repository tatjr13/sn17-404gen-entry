export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.6 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.3 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.2 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x2244aa, metalness: 0.0, roughness: 0.1, transparent: true, opacity: 0.6 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xaa2222, metalness: 0.2, roughness: 0.5 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.set(0, 0.05, 0);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 24);
  const lens = new THREE.Mesh(lensGeo, matSilver);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0.05, 0.275);
  root.add(lens);

  // Lens front ring
  const ringGeo = new THREE.TorusGeometry(0.12, 0.015, 8, 24);
  const ring = new THREE.Mesh(ringGeo, matSilver);
  ring.position.set(0, 0.05, 0.4);
  root.add(ring);

  // Lens glass
  const glassGeo = new THREE.CircleGeometry(0.11, 24);
  const glass = new THREE.Mesh(glassGeo, matGlass);
  glass.position.set(0, 0.05, 0.401);
  root.add(glass);

  // Viewfinder bump
  const vfGeo = new THREE.BoxGeometry(0.25, 0.12, 0.2);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.28, -0.02);
  root.add(vf);

  // Viewfinder window
  const vfWinGeo = new THREE.BoxGeometry(0.15, 0.06, 0.01);
  const vfWin = new THREE.Mesh(vfWinGeo, matGlass);
  vfWin.position.set(0, 0.3, -0.12);
  root.add(vfWin);

  // Shutter dial
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(0.15, 0.27, 0.05);
  root.add(dial);

  // Film advance knob
  const knobGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 16);
  const knob = new THREE.Mesh(knobGeo, matSilver);
  knob.position.set(-0.2, 0.27, 0.05);
  root.add(knob);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.15, 0.25, 0.25);
  const grip = new THREE.Mesh(gripGeo, matBody);
  grip.position.set(0.35, -0.05, 0);
  root.add(grip);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
  const lug1 = new THREE.Mesh(lugGeo, matSilver);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.3, 0.15, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, matSilver);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.3, 0.15, 0);
  root.add(lug2);

  // Red dot (Leica style)
  const dotGeo = new THREE.CircleGeometry(0.015, 12);
  const dot = new THREE.Mesh(dotGeo, matRed);
  dot.position.set(0, 0.2, 0.151);
  root.add(dot);

  // Bottom plate
  const plateGeo = new THREE.BoxGeometry(0.5, 0.02, 0.28);
  const plate = new THREE.Mesh(plateGeo, matSilver);
  plate.position.set(0, -0.12, 0);
  root.add(plate);

  // Tripod socket
  const socketGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 12);
  const socket = new THREE.Mesh(socketGeo, matSilver);
  socket.position.set(0, -0.14, 0);
  root.add(socket);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.15, 0.03, 0.08);
  const shoe = new THREE.Mesh(shoeGeo, matSilver);
  shoe.position.set(0, 0.36, -0.05);
  root.add(shoe);

  // Focus ring on lens
  const focusGeo = new THREE.TorusGeometry(0.13, 0.01, 8, 24);
  const focus = new THREE.Mesh(focusGeo, matSilver);
  focus.position.set(0, 0.05, 0.35);
  root.add(focus);

  // Aperture ring
  const apGeo = new THREE.TorusGeometry(0.11, 0.008, 8, 24);
  const ap = new THREE.Mesh(apGeo, matSilver);
  ap.position.set(0, 0.05, 0.38);
  root.add(ap);

  // Button (shutter release)
  const btnGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
  const btn = new THREE.Mesh(btnGeo, matSilver);
  btn.position.set(0.1, 0.25, 0.151);
  root.add(btn);

  // Film rewind knob
  const rewindGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12);
  const rewind = new THREE.Mesh(rewindGeo, matSilver);
  rewind.position.set(-0.15, 0.27, 0.05);
  root.add(rewind);

  // Adjust positions to fit nicely in [-0.5, 0.5]
  // Current extents:
  // X: body 0.275, grip 0.35+0.075=0.425, lugs 0.3. Max ~0.425. OK.
  // Y: body 0.175, vf 0.28+0.06=0.34, shoe 0.36+0.015=0.375. Min: plate -0.12-0.01=-0.13, socket -0.14-0.02=-0.16. OK.
  // Z: body 0.15, lens 0.275+0.125=0.4, glass 0.401. Min: vf -0.02-0.1=-0.12. OK.
  // All within [-0.5, 0.5].

  return root;
}