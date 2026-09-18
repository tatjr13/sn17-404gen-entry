export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.7, roughness: 0.3 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.8 });
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.6, roughness: 0.4 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.35, 0.25);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 32);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.2);
  root.add(lens);

  // Lens front ring
  const ringGeo = new THREE.TorusGeometry(0.1, 0.01, 8, 32);
  const ring = new THREE.Mesh(ringGeo, accentMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0, 0.275);
  root.add(ring);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.3, 0.1, 0.2);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(0, 0.225, 0);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.15, 0.02, 0.08);
  const shoe = new THREE.Mesh(shoeGeo, accentMat);
  shoe.position.set(0, 0.285, 0);
  root.add(shoe);

  // Top dial
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16);
  const dial = new THREE.Mesh(dialGeo, accentMat);
  dial.position.set(0.2, 0.24, 0);
  root.add(dial);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.15, 0.25, 0.2);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.375, -0.025, 0);
  root.add(grip);

  // Shutter button
  const shutterGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16);
  const shutter = new THREE.Mesh(shutterGeo, buttonMat);
  shutter.position.set(0.1, 0.235, 0);
  root.add(shutter);

  // Mode dial
  const modeGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const mode = new THREE.Mesh(modeGeo, accentMat);
  mode.position.set(-0.15, 0.235, 0);
  root.add(mode);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 12);
  const lugL = new THREE.Mesh(lugGeo, accentMat);
  lugL.position.set(-0.3, 0, 0);
  root.add(lugL);
  const lugR = new THREE.Mesh(lugGeo, accentMat);
  lugR.position.set(0.3, 0, 0);
  root.add(lugR);

  // Front flash mount / hot shoe base
  const baseGeo = new THREE.BoxGeometry(0.08, 0.01, 0.06);
  const base = new THREE.Mesh(baseGeo, accentMat);
  base.position.set(0, 0.285, 0.05);
  root.add(base);

  // Lens focus ring detail
  const focusGeo = new THREE.TorusGeometry(0.115, 0.008, 8, 32);
  const focus = new THREE.Mesh(focusGeo, accentMat);
  focus.rotation.x = Math.PI / 2;
  focus.position.set(0, 0, 0.18);
  root.add(focus);

  // Bottom tripod mount
  const tripodGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 12);
  const tripod = new THREE.Mesh(tripodGeo, accentMat);
  tripod.position.set(0, -0.175 - 0.005, 0);
  root.add(tripod);

  return root;
}