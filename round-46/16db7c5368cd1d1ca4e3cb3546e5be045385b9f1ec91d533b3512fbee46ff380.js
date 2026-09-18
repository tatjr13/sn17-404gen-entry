export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6, metalness: 0.3 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.7 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.5 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x224466, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.8 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.5, metalness: 0.2 });

  // Geometries
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 24);
  const lensRingGeo = new THREE.TorusGeometry(0.13, 0.015, 8, 24);
  const viewfinderGeo = new THREE.BoxGeometry(0.25, 0.1, 0.2);
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
  const knobGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 12);
  const gripGeo = new THREE.BoxGeometry(0.15, 0.25, 0.28);
  const buttonGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 8);
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8);

  // Body
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.set(0, 0, 0);
  root.add(body);

  // Lens assembly
  const lensGroup = new THREE.Group();
  const lensBarrel = new THREE.Mesh(lensGeo, matLens);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0, 0.27);
  lensGroup.add(lensBarrel);

  const ring1 = new THREE.Mesh(lensRingGeo, matSilver);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.set(0, 0, 0.2);
  lensGroup.add(ring1);

  const ring2 = new THREE.Mesh(lensRingGeo, matSilver);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.set(0, 0, 0.35);
  lensGroup.add(ring2);

  const glass = new THREE.Mesh(new THREE.CircleGeometry(0.11, 24), matGlass);
  glass.position.set(0, 0, 0.396);
  lensGroup.add(glass);

  root.add(lensGroup);

  // Viewfinder
  const vf = new THREE.Mesh(viewfinderGeo, matBody);
  vf.position.set(0, 0.22, -0.02);
  root.add(vf);

  // Viewfinder glass
  const vfGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.06), matGlass);
  vfGlass.position.set(0, 0.27, -0.12);
  root.add(vfGlass);

  // Top dials
  const dial1 = new THREE.Mesh(dialGeo, matSilver);
  dial1.position.set(-0.15, 0.22, 0.05);
  root.add(dial1);

  const dial2 = new THREE.Mesh(dialGeo, matSilver);
  dial2.position.set(0.15, 0.22, 0.05);
  root.add(dial2);

  // Film advance knob
  const knob = new THREE.Mesh(knobGeo, matSilver);
  knob.position.set(0.28, 0.22, 0);
  root.add(knob);

  // Grip
  const grip = new THREE.Mesh(gripGeo, matBody);
  grip.position.set(0.35, -0.05, 0);
  root.add(grip);

  // Shutter button
  const btn = new THREE.Mesh(buttonGeo, matRed);
  btn.position.set(-0.15, 0.24, 0.05);
  root.add(btn);

  // Strap lugs
  const lug1 = new THREE.Mesh(lugGeo, matSilver);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.28, 0, 0.16);
  root.add(lug1);

  const lug2 = new THREE.Mesh(lugGeo, matSilver);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.28, 0, 0.16);
  root.add(lug2);

  // Bottom plate
  const bottomPlate = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.28), matSilver);
  bottomPlate.position.set(0, -0.185, 0);
  root.add(bottomPlate);

  // Tripod mount
  const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), matSilver);
  mount.position.set(0, -0.195, 0);
  root.add(mount);

  // Adjust positions to fit nicely in [-0.5, 0.5]
  // Current extents:
  // X: body 0.275, grip 0.35+0.075=0.425, lug 0.28. Max ~0.43. OK.
  // Y: body 0.175, vf 0.22+0.05=0.27, bottom -0.185-0.01=-0.195. Max ~0.27. OK.
  // Z: body 0.15, lens 0.396, lug 0.16+0.02=0.18. Max ~0.4. OK.
  // All within [-0.5, 0.5].

  return root;
}