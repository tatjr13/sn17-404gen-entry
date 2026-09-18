export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.3 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.2 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x2244aa, metalness: 0.0, roughness: 0.1, transparent: true, opacity: 0.7 });
  const flashMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.1, roughness: 0.4 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.32, 0.22, 0.16);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Top plate / grip area
  const topGeo = new THREE.BoxGeometry(0.30, 0.02, 0.14);
  const top = new THREE.Mesh(topGeo, accentMat);
  top.position.y = 0.12;
  root.add(top);

  // Lens barrel
  const lensBarrelGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.06, 32);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, accentMat);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.z = 0.11;
  root.add(lensBarrel);

  // Lens ring
  const lensRingGeo = new THREE.TorusGeometry(0.065, 0.008, 16, 32);
  const lensRing = new THREE.Mesh(lensRingGeo, bodyMat);
  lensRing.position.z = 0.14;
  root.add(lensRing);

  // Lens glass
  const glassGeo = new THREE.CircleGeometry(0.055, 32);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.z = 0.141;
  root.add(glass);

  // Flash housing
  const flashGeo = new THREE.BoxGeometry(0.16, 0.04, 0.09);
  const flash = new THREE.Mesh(flashGeo, bodyMat);
  flash.position.set(0, 0.14, -0.02);
  root.add(flash);

  // Flash glass
  const flashGlassGeo = new THREE.PlaneGeometry(0.12, 0.06);
  const flashGlass = new THREE.Mesh(flashGlassGeo, flashMat);
  flashGlass.position.set(0, 0.16, -0.02);
  root.add(flashGlass);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.06, 0.03, 0.04);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(0, 0.135, 0.06);
  root.add(vf);

  // Viewfinder glass
  const vfGlassGeo = new THREE.PlaneGeometry(0.04, 0.02);
  const vfGlass = new THREE.Mesh(vfGlassGeo, glassMat);
  vfGlass.position.set(0, 0.135, 0.081);
  root.add(vfGlass);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16);
  const btn = new THREE.Mesh(btnGeo, accentMat);
  btn.rotation.x = Math.PI / 2;
  btn.position.set(0.12, 0.13, 0.02);
  root.add(btn);

  // Mode dial
  const dialGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 24);
  const dial = new THREE.Mesh(dialGeo, accentMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(-0.12, 0.13, 0.02);
  root.add(dial);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 12);
  const lug1 = new THREE.Mesh(lugGeo, accentMat);
  lug1.position.set(0.16, 0.05, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, accentMat);
  lug2.position.set(-0.16, 0.05, 0);
  root.add(lug2);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.28, 0.01, 0.14);
  const bottom = new THREE.Mesh(bottomGeo, accentMat);
  bottom.position.y = -0.115;
  root.add(bottom);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 16);
  const mount = new THREE.Mesh(mountGeo, accentMat);
  mount.position.set(0, -0.12, 0);
  root.add(mount);

  return root;
}