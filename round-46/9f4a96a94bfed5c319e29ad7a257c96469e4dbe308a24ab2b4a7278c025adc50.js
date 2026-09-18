export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.3 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.2, roughness: 0.5 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x224466, metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.6 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.35, 0.25);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 0, 0);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 32);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.2);
  root.add(lens);

  // Lens glass
  const glassGeo = new THREE.CircleGeometry(0.11, 32);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, 0, 0.28);
  root.add(glass);

  // Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.2, 0.1, 0.15);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(0, 0.22, -0.02);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.15, 0.02, 0.08);
  const shoe = new THREE.Mesh(shoeGeo, silverMat);
  shoe.position.set(0, 0.28, -0.02);
  root.add(shoe);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.15, 0.2, 0.2);
  const grip = new THREE.Mesh(gripGeo, bodyMat);
  grip.position.set(0.375, -0.075, 0);
  root.add(grip);

  // Dial
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 32);
  const dial = new THREE.Mesh(dialGeo, silverMat);
  dial.position.set(-0.15, 0.2, 0.05);
  root.add(dial);

  // Shutter button
  const btnGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const btn = new THREE.Mesh(btnGeo, redMat);
  btn.position.set(-0.22, 0.2, 0.05);
  root.add(btn);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 12);
  const lug1 = new THREE.Mesh(lugGeo, silverMat);
  lug1.position.set(-0.3, 0.1, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, silverMat);
  lug2.position.set(0.3, 0.1, 0);
  root.add(lug2);

  // Focus ring
  const ringGeo = new THREE.TorusGeometry(0.12, 0.01, 8, 32);
  const ring = new THREE.Mesh(ringGeo, silverMat);
  ring.position.set(0, 0, 0.12);
  root.add(ring);

  // Zoom ring
  const zoomRing = new THREE.Mesh(ringGeo, silverMat);
  zoomRing.position.set(0, 0, 0.18);
  root.add(zoomRing);

  // Bottom plate
  const plateGeo = new THREE.BoxGeometry(0.5, 0.02, 0.2);
  const plate = new THREE.Mesh(plateGeo, silverMat);
  plate.position.set(0, -0.185, 0);
  root.add(plate);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const mount = new THREE.Mesh(mountGeo, silverMat);
  mount.position.set(0, -0.2, 0);
  root.add(mount);

  // Adjust positions to center everything in [-0.5, 0.5]
  // Current bounds:
  // X: -0.3 to 0.45 (grip extends to 0.375+0.075=0.45)
  // Y: -0.2 to 0.29 (shoe extends to 0.28+0.01=0.29)
  // Z: -0.125 to 0.28 (glass extends to 0.28)
  // Let's shift Y down by 0.05 to center vertically
  root.position.y = -0.05;

  return root;
}