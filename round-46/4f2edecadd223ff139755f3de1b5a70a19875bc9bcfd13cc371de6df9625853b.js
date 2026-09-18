export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7, metalness: 0.1 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.4 });
  const matFlash = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5, metalness: 0.0 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.4, metalness: 0.6 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.6, metalness: 0.0 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.y = 0.05;
  root.add(body);

  // Top plate
  const topGeo = new THREE.BoxGeometry(0.57, 0.04, 0.32);
  const topPlate = new THREE.Mesh(topGeo, matSilver);
  topPlate.position.y = 0.245;
  root.add(topPlate);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16);
  const shutterBtn = new THREE.Mesh(btnGeo, matRed);
  shutterBtn.position.set(0.15, 0.285, 0);
  root.add(shutterBtn);

  // Film advance lever
  const leverGeo = new THREE.BoxGeometry(0.04, 0.06, 0.15);
  const lever = new THREE.Mesh(leverGeo, matSilver);
  lever.position.set(-0.22, 0.28, 0);
  root.add(lever);

  // Lens assembly
  const lensGroup = new THREE.Group();
  lensGroup.position.set(0, 0.05, 0.16);

  const lensBarrelGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.1, 32);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, matLens);
  lensBarrel.rotation.x = Math.PI / 2;
  lensGroup.add(lensBarrel);

  const lensRingGeo = new THREE.TorusGeometry(0.125, 0.015, 8, 32);
  const lensRing = new THREE.Mesh(lensRingGeo, matSilver);
  lensRing.position.z = 0.05;
  lensGroup.add(lensRing);

  const lensGlassGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.01, 32);
  const lensGlass = new THREE.Mesh(lensGlassGeo, new THREE.MeshStandardMaterial({ color: 0x224466, roughness: 0.1, metalness: 0.8 }));
  lensGlass.rotation.x = Math.PI / 2;
  lensGlass.position.z = 0.055;
  lensGroup.add(lensGlass);

  root.add(lensGroup);

  // Flash unit
  const flashGeo = new THREE.BoxGeometry(0.3, 0.08, 0.2);
  const flash = new THREE.Mesh(flashGeo, matFlash);
  flash.position.set(0, 0.31, -0.05);
  root.add(flash);

  const flashWindowGeo = new THREE.BoxGeometry(0.2, 0.06, 0.15);
  const flashWindow = new THREE.Mesh(flashWindowGeo, new THREE.MeshStandardMaterial({ color: 0xffffee, roughness: 0.2, metalness: 0.0, emissive: 0x222222 }));
  flashWindow.position.set(0, 0.31, -0.05);
  root.add(flashWindow);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.1, 0.06, 0.08);
  const vf = new THREE.Mesh(vfGeo, matBody);
  vf.position.set(0, 0.31, 0.1);
  root.add(vf);

  const vfWindowGeo = new THREE.BoxGeometry(0.06, 0.04, 0.01);
  const vfWindow = new THREE.Mesh(vfWindowGeo, new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.5 }));
  vfWindow.position.set(0, 0.31, 0.145);
  root.add(vfWindow);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8);
  const lug1 = new THREE.Mesh(lugGeo, matSilver);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.28, 0.1, 0);
  root.add(lug1);
  const lug2 = lug1.clone();
  lug2.position.set(0.28, 0.1, 0);
  root.add(lug2);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.55, 0.02, 0.3);
  const bottom = new THREE.Mesh(bottomGeo, matSilver);
  bottom.position.y = -0.16;
  root.add(bottom);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16);
  const mount = new THREE.Mesh(mountGeo, matSilver);
  mount.position.set(0, -0.17, 0);
  root.add(mount);

  // Grip texture (small bumps on sides)
  const bumpGeo = new THREE.SphereGeometry(0.01, 6, 6);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      const bumpL = new THREE.Mesh(bumpGeo, matBody);
      bumpL.position.set(-0.276, -0.05 + i * 0.04, -0.05 + j * 0.05);
      root.add(bumpL);
      const bumpR = bumpL.clone();
      bumpR.position.x = 0.276;
      root.add(bumpR);
    }
  }

  return root;
}