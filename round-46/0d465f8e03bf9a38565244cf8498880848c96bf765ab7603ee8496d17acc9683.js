export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.6, roughness: 0.4 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.8 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x2244aa, metalness: 0.0, roughness: 0.1, transparent: true, opacity: 0.7 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xaa2222, metalness: 0.2, roughness: 0.5 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, 0, 0);
  root.add(body);

  // Top plate / viewfinder bump
  const topGeo = new THREE.BoxGeometry(0.45, 0.12, 0.25);
  const topPlate = new THREE.Mesh(topGeo, bodyMat);
  topPlate.position.set(0, 0.235, 0);
  root.add(topPlate);

  // Viewfinder window
  const vfGeo = new THREE.BoxGeometry(0.15, 0.08, 0.15);
  const vf = new THREE.Mesh(vfGeo, silverMat);
  vf.position.set(0, 0.32, 0);
  root.add(vf);

  // Lens barrel
  const lensBarrelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 24);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, silverMat);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0, 0.275);
  root.add(lensBarrel);

  // Lens front ring
  const lensRingGeo = new THREE.TorusGeometry(0.12, 0.015, 8, 24);
  const lensRing = new THREE.Mesh(lensRingGeo, silverMat);
  lensRing.position.set(0, 0, 0.4);
  root.add(lensRing);

  // Lens glass
  const lensGlassGeo = new THREE.CircleGeometry(0.11, 24);
  const lensGlass = new THREE.Mesh(lensGlassGeo, glassMat);
  lensGlass.position.set(0, 0, 0.401);
  root.add(lensGlass);

  // Lens inner dark part
  const lensInnerGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 24);
  const lensInner = new THREE.Mesh(lensInnerGeo, lensMat);
  lensInner.rotation.x = Math.PI / 2;
  lensInner.position.set(0, 0, 0.38);
  root.add(lensInner);

  // Film advance dial (top right)
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16);
  const dial = new THREE.Mesh(dialGeo, silverMat);
  dial.position.set(0.22, 0.31, 0);
  root.add(dial);

  // Shutter button (top left)
  const btnGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 12);
  const btn = new THREE.Mesh(btnGeo, redMat);
  btn.position.set(-0.2, 0.31, 0);
  root.add(btn);

  // Grip (right side)
  const gripGeo = new THREE.BoxGeometry(0.08, 0.25, 0.28);
  const grip = new THREE.Mesh(gripGeo, bodyMat);
  grip.position.set(0.315, -0.05, 0);
  root.add(grip);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
  const lug1 = new THREE.Mesh(lugGeo, silverMat);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.28, 0.1, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, silverMat);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.28, 0.1, 0);
  root.add(lug2);

  // Bottom plate
  const bottomGeo = new THREE.BoxGeometry(0.5, 0.04, 0.28);
  const bottom = new THREE.Mesh(bottomGeo, silverMat);
  bottom.position.set(0, -0.195, 0);
  root.add(bottom);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12);
  const mount = new THREE.Mesh(mountGeo, silverMat);
  mount.position.set(0, -0.215, 0);
  root.add(mount);

  // Flash shoe
  const shoeGeo = new THREE.BoxGeometry(0.15, 0.03, 0.08);
  const shoe = new THREE.Mesh(shoeGeo, silverMat);
  shoe.position.set(0, 0.31, -0.1);
  root.add(shoe);

  // Small details: focus ring lines
  const focusRingGeo = new THREE.TorusGeometry(0.12, 0.005, 6, 24);
  const focusRing = new THREE.Mesh(focusRingGeo, bodyMat);
  focusRing.position.set(0, 0, 0.35);
  root.add(focusRing);

  // Red dot on lens (classic branding)
  const dotGeo = new THREE.CircleGeometry(0.015, 8);
  const dot = new THREE.Mesh(dotGeo, redMat);
  dot.position.set(0, 0.12, 0.402);
  root.add(dot);

  // Adjust positions to fit nicely in [-0.5, 0.5]
  // Current extents:
  // X: body 0.275, grip 0.315+0.04=0.355, lugs 0.28+0.03=0.31. Max ~0.36. OK.
  // Y: top 0.235+0.06=0.295, vf 0.32+0.04=0.36, dial 0.31+0.04=0.35. Max ~0.36. OK.
  // Z: body 0.15, lens 0.275+0.125=0.4. Max ~0.4. OK.
  // All within [-0.5, 0.5].

  return root;
}