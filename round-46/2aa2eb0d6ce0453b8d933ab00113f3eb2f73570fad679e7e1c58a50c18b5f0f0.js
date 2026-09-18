export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.6 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xccaa00, metalness: 0.7, roughness: 0.3 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.1, roughness: 0.9 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.35);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 0.05, 0);
  root.add(body);

  // Lens barrel
  const lensBarrelGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.15, 32);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, lensMat);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0.05, 0.25);
  root.add(lensBarrel);

  // Lens glass
  const lensGlassGeo = new THREE.CircleGeometry(0.11, 32);
  const lensGlass = new THREE.Mesh(lensGlassGeo, glassMat);
  lensGlass.position.set(0, 0.05, 0.326);
  root.add(lensGlass);

  // Viewfinder housing
  const viewfinderGeo = new THREE.BoxGeometry(0.15, 0.1, 0.1);
  const viewfinder = new THREE.Mesh(viewfinderGeo, bodyMat);
  viewfinder.position.set(0, 0.3, 0);
  root.add(viewfinder);

  // Viewfinder glass
  const vfGlassGeo = new THREE.CircleGeometry(0.04, 16);
  const vfGlass = new THREE.Mesh(vfGlassGeo, glassMat);
  vfGlass.position.set(0, 0.3, 0.051);
  root.add(vfGlass);

  // Flash shoe
  const flashShoeGeo = new THREE.BoxGeometry(0.1, 0.04, 0.06);
  const flashShoe = new THREE.Mesh(flashShoeGeo, accentMat);
  flashShoe.position.set(0, 0.37, -0.05);
  root.add(flashShoe);

  // Top dial
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 32);
  const dial = new THREE.Mesh(dialGeo, accentMat);
  dial.position.set(0.2, 0.27, 0);
  root.add(dial);

  // Shutter button
  const buttonGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 16);
  const button = new THREE.Mesh(buttonGeo, accentMat);
  button.position.set(0.25, 0.28, 0.1);
  root.add(button);

  // Grip texture (simple boxes)
  for (let i = 0; i < 5; i++) {
    const gripGeo = new THREE.BoxGeometry(0.02, 0.01, 0.25);
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.set(0.31, 0.05 - i * 0.02, 0);
    root.add(grip);
  }

  // Strap loops
  const loopGeo = new THREE.TorusGeometry(0.02, 0.005, 8, 16);
  const loopL = new THREE.Mesh(loopGeo, accentMat);
  loopL.position.set(-0.3, 0.05, 0);
  loopL.rotation.y = Math.PI / 2;
  root.add(loopL);

  const loopR = new THREE.Mesh(loopGeo, accentMat);
  loopR.position.set(0.3, 0.05, 0);
  loopR.rotation.y = Math.PI / 2;
  root.add(loopR);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.55, 0.02, 0.3);
  const bottom = new THREE.Mesh(bottomGeo, bodyMat);
  bottom.position.set(0, -0.19, 0);
  root.add(bottom);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const mount = new THREE.Mesh(mountGeo, accentMat);
  mount.position.set(0, -0.21, 0);
  root.add(mount);

  // Adjust positions to center everything in [-0.5, 0.5]
  // Current bounds roughly:
  // X: -0.3 to 0.35
  // Y: -0.21 to 0.37
  // Z: -0.175 to 0.326
  // Center is roughly (0.025, 0.08, 0.075)
  // I'll shift everything down and back slightly to center it perfectly.
  root.position.set(-0.025, -0.08, -0.075);

  return root;
}