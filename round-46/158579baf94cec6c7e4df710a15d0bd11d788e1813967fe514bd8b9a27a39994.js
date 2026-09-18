export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.3, roughness: 0.6 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, metalness: 0.6, roughness: 0.4 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, metalness: 0.5, roughness: 0.1 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.2, roughness: 0.8 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.35, 0.25);
  const body = new THREE.Mesh(bodyGeo, matBody);
  root.add(body);

  // Lens barrel
  const barrelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);
  const barrel = new THREE.Mesh(barrelGeo, matBody);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0, 0.175 + 0.06);
  root.add(barrel);

  // Lens ring
  const ringGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.04, 16);
  const ring = new THREE.Mesh(ringGeo, matSilver);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0, 0.175 + 0.12 + 0.02);
  root.add(ring);

  // Lens glass
  const glassGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 16);
  const glass = new THREE.Mesh(glassGeo, matLens);
  glass.rotation.x = Math.PI / 2;
  glass.position.set(0, 0, 0.175 + 0.12 + 0.04 + 0.01);
  root.add(glass);

  // Viewfinder housing
  const vfGeo = new THREE.BoxGeometry(0.3, 0.1, 0.2);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.175 + 0.05, 0);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.15, 0.02, 0.08);
  const shoe = new THREE.Mesh(shoeGeo, matSilver);
  shoe.position.set(0, 0.175 + 0.1 + 0.01, 0);
  root.add(shoe);

  // Top dial
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16);
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(0.2, 0.175 + 0.1 + 0.015, 0);
  root.add(dial);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16);
  const btn = new THREE.Mesh(btnGeo, matSilver);
  btn.position.set(-0.2, 0.175 + 0.1 + 0.01, 0);
  root.add(btn);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.15, 0.25, 0.2);
  const grip = new THREE.Mesh(gripGeo, matGrip);
  grip.position.set(0.3 + 0.075, -0.05, 0);
  root.add(grip);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8);
  const lugL = new THREE.Mesh(lugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.32, 0.1, 0);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.32, 0.1, 0);
  root.add(lugR);

  // Bottom plate
  const plateGeo = new THREE.BoxGeometry(0.5, 0.02, 0.22);
  const plate = new THREE.Mesh(plateGeo, matSilver);
  plate.position.set(0, -0.175 - 0.01, 0);
  root.add(plate);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const mount = new THREE.Mesh(mountGeo, matSilver);
  mount.position.set(0, -0.175 - 0.02 - 0.01, 0);
  root.add(mount);

  return root;
}