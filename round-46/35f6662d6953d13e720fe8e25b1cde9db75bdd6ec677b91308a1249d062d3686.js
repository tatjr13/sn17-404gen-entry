export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6, metalness: 0.1 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.3, metalness: 0.5 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x0a1520, roughness: 0.05, metalness: 0.2 });
  const matWhite = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.5, metalness: 0.0 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.1 });

  // Geometries
  const bodyGeo = new THREE.BoxGeometry(0.3, 0.2, 0.15);
  const lensBarrelGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.12, 24);
  const lensRingGeo = new THREE.TorusGeometry(0.075, 0.008, 8, 24);
  const lensGlassGeo = new THREE.CircleGeometry(0.065, 24);
  const flashGeo = new THREE.BoxGeometry(0.14, 0.04, 0.04);
  const viewfinderGeo = new THREE.BoxGeometry(0.06, 0.03, 0.02);
  const dialGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 16);
  const buttonGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 12);
  const strapLugGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.03, 8);
  const gripGeo = new THREE.BoxGeometry(0.08, 0.12, 0.06);

  // Body
  const body = new THREE.Mesh(bodyGeo, matBody);
  root.add(body);

  // Grip (right side)
  const grip = new THREE.Mesh(gripGeo, matBody);
  grip.position.set(0.19, -0.02, 0);
  root.add(grip);

  // Lens assembly
  const lensGroup = new THREE.Group();
  const barrel = new THREE.Mesh(lensBarrelGeo, matSilver);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.z = 0.135;
  lensGroup.add(barrel);

  const ring1 = new THREE.Mesh(lensRingGeo, matSilver);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.z = 0.18;
  lensGroup.add(ring1);

  const ring2 = new THREE.Mesh(lensRingGeo, matSilver);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.z = 0.22;
  lensGroup.add(ring2);

  const glass = new THREE.Mesh(lensGlassGeo, matGlass);
  glass.rotation.x = Math.PI / 2;
  glass.position.z = 0.245;
  lensGroup.add(glass);

  root.add(lensGroup);

  // Flash
  const flash = new THREE.Mesh(flashGeo, matWhite);
  flash.position.set(0, 0.12, 0);
  root.add(flash);

  // Flash glass
  const flashGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.03), matWhite);
  flashGlass.rotation.x = -Math.PI / 2;
  flashGlass.position.set(0, 0.141, 0);
  root.add(flashGlass);

  // Viewfinder
  const vf = new THREE.Mesh(viewfinderGeo, matBody);
  vf.position.set(-0.06, 0.115, 0);
  root.add(vf);

  // Viewfinder glass
  const vfGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.015), matGlass);
  vfGlass.rotation.x = -Math.PI / 2;
  vfGlass.position.set(-0.06, 0.131, 0);
  root.add(vfGlass);

  // Mode dial
  const dial = new THREE.Mesh(dialGeo, matSilver);
  dial.position.set(0.08, 0.108, 0);
  root.add(dial);

  // Shutter button
  const shutter = new THREE.Mesh(buttonGeo, matRed);
  shutter.position.set(0.12, 0.105, 0);
  root.add(shutter);

  // Strap lugs
  const lugL = new THREE.Mesh(strapLugGeo, matSilver);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.155, 0, 0);
  root.add(lugL);

  const lugR = new THREE.Mesh(strapLugGeo, matSilver);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.155, 0, 0);
  root.add(lugR);

  // Hot shoe
  const hotshoe = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.01, 0.03), matSilver);
  hotshoe.position.set(0, 0.105, 0);
  root.add(hotshoe);

  // AF assist lamp
  const afLamp = new THREE.Mesh(new THREE.CircleGeometry(0.01, 12), matGlass);
  afLamp.rotation.x = Math.PI / 2;
  afLamp.position.set(-0.1, 0.05, 0.076);
  root.add(afLamp);

  // Brand text placeholder (simple box)
  const brand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.002), matSilver);
  brand.position.set(0, 0.05, 0.076);
  root.add(brand);

  // Center the whole thing
  // It's already roughly centered at origin.
  // Let's verify bounds: x: -0.155 to 0.155, y: -0.1 to 0.141, z: -0.075 to 0.245
  // All within [-0.5, 0.5]. Good.

  return root;
}