export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7, metalness: 0.1 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3, metalness: 0.5 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.4, metalness: 0.6 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.9, metalness: 0.0 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x335577, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.5 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.3);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 24);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.25);
  root.add(lens);

  // Lens ring
  const ringGeo = new THREE.TorusGeometry(0.12, 0.015, 8, 24);
  const ring = new THREE.Mesh(ringGeo, accentMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0, 0.35);
  root.add(ring);

  // Lens glass
  const glassGeo = new THREE.CircleGeometry(0.1, 32);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.rotation.x = Math.PI / 2;
  glass.position.set(0, 0, 0.351);
  root.add(glass);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.2, 0.1, 0.15);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(0, 0.25, 0.05);
  root.add(vf);

  // Flash
  const flashGeo = new THREE.BoxGeometry(0.15, 0.15, 0.1);
  const flash = new THREE.Mesh(flashGeo, accentMat);
  flash.position.set(0.2, 0.275, 0.05);
  root.add(flash);

  // Dials
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
  const dial1 = new THREE.Mesh(dialGeo, accentMat);
  dial1.position.set(-0.15, 0.21, 0.05);
  root.add(dial1);
  const dial2 = new THREE.Mesh(dialGeo, accentMat);
  dial2.position.set(0.15, 0.21, 0.05);
  root.add(dial2);

  // Shutter button
  const shutterGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const shutter = new THREE.Mesh(shutterGeo, accentMat);
  shutter.position.set(-0.25, 0.21, 0.05);
  root.add(shutter);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.1, 0.3, 0.15);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.35, 0, 0);
  root.add(grip);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 8);
  const lugL = new THREE.Mesh(lugGeo, accentMat);
  lugL.rotation.z = Math.PI / 2;
  lugL.position.set(-0.325, 0.1, 0);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, accentMat);
  lugR.rotation.z = Math.PI / 2;
  lugR.position.set(0.325, 0.1, 0);
  root.add(lugR);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.5, 0.02, 0.25);
  const bottom = new THREE.Mesh(bottomGeo, accentMat);
  bottom.position.set(0, -0.21, 0);
  root.add(bottom);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12);
  const mount = new THREE.Mesh(mountGeo, accentMat);
  mount.position.set(0, -0.22, 0);
  root.add(mount);

  return root;
}