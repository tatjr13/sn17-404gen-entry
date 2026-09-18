export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.6 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.6, roughness: 0.4 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.2 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x2244aa, metalness: 0.0, roughness: 0.1, transparent: true, opacity: 0.7 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xaa2222, metalness: 0.2, roughness: 0.5 });

  // Geometries
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 24);
  const lensRingGeo = new THREE.TorusGeometry(0.12, 0.015, 8, 24);
  const viewfinderGeo = new THREE.BoxGeometry(0.25, 0.08, 0.2);
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
  const knobGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16);
  const gripGeo = new THREE.BoxGeometry(0.12, 0.25, 0.28);
  const buttonGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 12);
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
  vf.position.set(0, 0.215, -0.02);
  root.add(vf);

  // Shutter dial
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(-0.18, 0.205, 0.05);
  root.add(dial);

  // Film advance knob
  const knob = new THREE.Mesh(knobGeo, matSilver);
  knob.position.set(0.22, 0.205, 0.05);
  root.add(knob);

  // Grip
  const grip = new THREE.Mesh(gripGeo, matBody);
  grip.position.set(0.335, -0.02, 0);
  root.add(grip);

  // Shutter button
  const btn = new THREE.Mesh(buttonGeo, matRed);
  btn.position.set(0.12, 0.205, 0.12);
  root.add(btn);

  // Strap lugs
  const lug1 = new THREE.Mesh(lugGeo, matSilver);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.28, 0.05, 0.16);
  root.add(lug1);

  const lug2 = new THREE.Mesh(lugGeo, matSilver);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.28, 0.05, 0.16);
  root.add(lug2);

  // Bottom plate / tripod mount
  const plateGeo = new THREE.BoxGeometry(0.4, 0.02, 0.25);
  const plate = new THREE.Mesh(plateGeo, matSilver);
  plate.position.set(0, -0.185, 0);
  root.add(plate);

  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12);
  const mount = new THREE.Mesh(mountGeo, matSilver);
  mount.position.set(0, -0.205, 0);
  root.add(mount);

  // Adjust positions to center everything in unit cube
  // Current bounds roughly:
  // X: -0.28 to 0.335+0.06 = 0.395 -> width ~0.68
  // Y: -0.205-0.01 to 0.205+0.04 = 0.245 -> height ~0.45
  // Z: -0.15 to 0.396 -> depth ~0.55
  // Let's shift and scale to fit nicely in [-0.5, 0.5]
  // Actually, it's already well within bounds. I'll just center it properly.
  // Center X: ~0.05 -> shift -0.05
  // Center Y: ~0.02 -> shift -0.02
  // Center Z: ~0.12 -> shift -0.12

  root.position.set(-0.05, -0.02, -0.12);

  return root;
}