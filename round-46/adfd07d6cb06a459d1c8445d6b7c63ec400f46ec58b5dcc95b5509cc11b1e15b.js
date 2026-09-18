export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.35, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2e1a0f, roughness: 0.7, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d4, roughness: 0.25, metalness: 0.5 });

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.38, 0.35, 0.04, 48);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = 0.02;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.36, 0.015, 16, 48);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = 0.04;
  root.add(saucerRim);

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.23, 0.19, 0.42, 48, 1, true);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.25;
  root.add(mug);

  // Mug bottom cap
  const mugBottomGeo = new THREE.CircleGeometry(0.19, 48);
  const mugBottom = new THREE.Mesh(mugBottomGeo, ceramicMat);
  mugBottom.rotation.x = -Math.PI / 2;
  mugBottom.position.y = 0.04;
  root.add(mugBottom);

  // Mug rim
  const mugRimGeo = new THREE.TorusGeometry(0.23, 0.018, 16, 48);
  const mugRim = new THREE.Mesh(mugRimGeo, ceramicMat);
  mugRim.rotation.x = Math.PI / 2;
  mugRim.position.y = 0.46;
  root.add(mugRim);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.02, 48);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.43;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.13, 0.028, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.23, 0.28, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Handle connectors
  const connGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.06, 16);
  const conn1 = new THREE.Mesh(connGeo, ceramicMat);
  conn1.position.set(0.23, 0.38, 0);
  root.add(conn1);
  const conn2 = new THREE.Mesh(connGeo, ceramicMat);
  conn2.position.set(0.23, 0.18, 0);
  root.add(conn2);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.28, 16);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.045, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.x = 0.14;
  spoonBowl.rotation.z = -Math.PI / 2;
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(-0.15, 0.06, 0.15);
  spoonGroup.rotation.y = Math.PI / 4;
  root.add(spoonGroup);

  // Steam (optional, maybe skip for hard-surface focus)
  // Let's add a small coaster or napkin? No, keep it simple.

  // Adjust scale to fit exactly in [-0.5, 0.5] if needed.
  // Current bounds: x: -0.38 to 0.38, y: 0 to 0.48, z: -0.38 to 0.38. Fits well.
  // Center it vertically: shift down by 0.24
  root.position.y = -0.24;

  return root;
}