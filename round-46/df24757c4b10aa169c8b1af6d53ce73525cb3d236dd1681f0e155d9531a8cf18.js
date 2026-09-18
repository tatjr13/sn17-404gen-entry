export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7, roughness: 0.3 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.8 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 0, 0);
  root.add(body);

  // Top plate / viewfinder housing
  const topGeo = new THREE.BoxGeometry(0.45, 0.12, 0.25);
  const top = new THREE.Mesh(topGeo, bodyMat);
  top.position.set(0, 0.235, 0);
  root.add(top);

  // Viewfinder window
  const vfGeo = new THREE.BoxGeometry(0.15, 0.08, 0.12);
  const vf = new THREE.Mesh(vfGeo, accentMat);
  vf.position.set(0, 0.31, 0);
  root.add(vf);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.18, 0.04, 0.08);
  const shoe = new THREE.Mesh(shoeGeo, accentMat);
  shoe.position.set(0, 0.33, -0.05);
  root.add(shoe);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.25, 24);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.275);
  root.add(lens);

  // Lens ring
  const ringGeo = new THREE.TorusGeometry(0.13, 0.015, 8, 24);
  const ring = new THREE.Mesh(ringGeo, accentMat);
  ring.position.set(0, 0, 0.4);
  root.add(ring);

  // Front dial
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
  const dial = new THREE.Mesh(dialGeo, accentMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0.2, 0.1, 0.16);
  root.add(dial);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.12, 0.25, 0.28);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.335, -0.05, 0);
  root.add(grip);

  // Grip texture lines (optional, maybe skip to save vertices)
  // Let's add a few small cylinders for buttons
  const btnGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
  const btn1 = new THREE.Mesh(btnGeo, accentMat);
  btn1.rotation.x = Math.PI / 2;
  btn1.position.set(0.15, 0.18, 0.16);
  root.add(btn1);

  const btn2 = new THREE.Mesh(btnGeo, accentMat);
  btn2.rotation.x = Math.PI / 2;
  btn2.position.set(-0.15, 0.18, 0.16);
  root.add(btn2);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8);
  const lug1 = new THREE.Mesh(lugGeo, accentMat);
  lug1.position.set(0.28, 0.1, -0.15);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, accentMat);
  lug2.position.set(-0.28, 0.1, -0.15);
  root.add(lug2);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12);
  const mount = new THREE.Mesh(mountGeo, accentMat);
  mount.position.set(0, -0.185, 0);
  root.add(mount);

  // Adjust positions to fit nicely in [-0.5, 0.5]
  // Current extents:
  // X: body 0.275, grip 0.335+0.06=0.395, lugs 0.28. Max ~0.4. OK.
  // Y: top 0.235+0.06=0.295, shoe 0.33+0.02=0.35, vf 0.31+0.04=0.35. Bottom: body -0.175, mount -0.185-0.01=-0.195. Range ~0.55. OK.
  // Z: lens 0.275+0.125=0.4, ring 0.4. Back: body -0.15, lugs -0.15. Range ~0.55. OK.
  // All within [-0.5, 0.5].

  return root;
}