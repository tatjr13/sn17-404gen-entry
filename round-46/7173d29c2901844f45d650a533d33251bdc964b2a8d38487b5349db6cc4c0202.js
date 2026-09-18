export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.2 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.6, roughness: 0.3 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.9 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x2244aa, metalness: 0.0, roughness: 0.1, transparent: true, opacity: 0.6 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.3, 0.22);
  const body = new THREE.Mesh(bodyGeo, matBody);
  root.add(body);

  // Top plate
  const topGeo = new THREE.BoxGeometry(0.55, 0.02, 0.22);
  const topPlate = new THREE.Mesh(topGeo, matSilver);
  topPlate.position.y = 0.16;
  root.add(topPlate);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.14, 0.07, 0.1);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.205, 0);
  root.add(vf);

  // Viewfinder glass
  const vfGlassGeo = new THREE.BoxGeometry(0.08, 0.01, 0.06);
  const vfGlass = new THREE.Mesh(vfGlassGeo, matGlass);
  vfGlass.position.set(0, 0.245, 0);
  root.add(vfGlass);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 12);
  const btn = new THREE.Mesh(btnGeo, matSilver);
  btn.rotation.x = Math.PI / 2;
  btn.position.set(0.15, 0.18, 0);
  root.add(btn);

  // Mode dial
  const dialGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 16);
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(-0.15, 0.18, 0);
  root.add(dial);

  // Hot shoe
  const shoeGeo = new THREE.BoxGeometry(0.08, 0.02, 0.04);
  const shoe = new THREE.Mesh(shoeGeo, matSilver);
  shoe.position.set(0, 0.18, 0);
  root.add(shoe);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.1, 0.24, 0.18);
  const grip = new THREE.Mesh(gripGeo, matGrip);
  grip.position.set(0.325, -0.03, 0);
  root.add(grip);

  // Lens barrel
  const barrelGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.12, 24);
  const barrel = new THREE.Mesh(barrelGeo, matBody);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0, 0.17);
  root.add(barrel);

  // Lens ring 1
  const ring1Geo = new THREE.TorusGeometry(0.11, 0.008, 8, 24);
  const ring1 = new THREE.Mesh(ring1Geo, matSilver);
  ring1.position.set(0, 0, 0.22);
  root.add(ring1);

  // Lens ring 2
  const ring2Geo = new THREE.TorusGeometry(0.105, 0.006, 8, 24);
  const ring2 = new THREE.Mesh(ring2Geo, matSilver);
  ring2.position.set(0, 0, 0.24);
  root.add(ring2);

  // Lens glass
  const glassGeo = new THREE.CircleGeometry(0.09, 24);
  const glass = new THREE.Mesh(glassGeo, matGlass);
  glass.position.set(0, 0, 0.245);
  root.add(glass);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.04, 8);
  const lugL = new THREE.Mesh(lugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.285, 0, 0);
  root.add(lugL);

  const lugR = new THREE.Mesh(lugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.285, 0, 0);
  root.add(lugR);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.55, 0.01, 0.22);
  const bottom = new THREE.Mesh(bottomGeo, matSilver);
  bottom.position.y = -0.155;
  root.add(bottom);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 12);
  const mount = new THREE.Mesh(mountGeo, matSilver);
  mount.rotation.x = Math.PI / 2;
  mount.position.set(0, -0.16, 0);
  root.add(mount);

  // Focus distance markings (simple lines or small boxes)
  // Skip to keep it simple and within budget.

  // AF assist lamp
  const lampGeo = new THREE.CircleGeometry(0.015, 12);
  const lamp = new THREE.Mesh(lampGeo, matGlass);
  lamp.position.set(0.1, 0.05, 0.115);
  root.add(lamp);

  // Brand logo placeholder (small box)
  const logoGeo = new THREE.BoxGeometry(0.08, 0.02, 0.005);
  const logo = new THREE.Mesh(logoGeo, matSilver);
  logo.position.set(0, 0.05, 0.115);
  root.add(logo);

  // Mirror slap bump (small box on top front)
  const bumpGeo = new THREE.BoxGeometry(0.06, 0.03, 0.06);
  const bump = new THREE.Mesh(bumpGeo, matBody);
  bump.position.set(0, 0.175, 0.06);
  root.add(bump);

  return root;
}