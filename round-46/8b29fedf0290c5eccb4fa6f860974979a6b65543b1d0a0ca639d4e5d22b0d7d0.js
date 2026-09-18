export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.9, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.15, metalness: 0.7 });

  // Geometries
  const mugBodyGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.22, 32, 1, true);
  const mugBottomGeo = new THREE.CircleGeometry(0.09, 32);
  const mugRimGeo = new THREE.TorusGeometry(0.11, 0.008, 8, 32);
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 12, 24, Math.PI);
  const saucerGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.015, 32, 1);
  const saucerRimGeo = new THREE.TorusGeometry(0.18, 0.008, 8, 32);
  const coffeeGeo = new THREE.CircleGeometry(0.105, 32);
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.18, 8, 1);
  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);

  // Mug Body
  const mugBody = new THREE.Mesh(mugBodyGeo, ceramicMat);
  mugBody.position.y = 0.0;
  root.add(mugBody);

  // Mug Bottom
  const mugBottom = new THREE.Mesh(mugBottomGeo, ceramicMat);
  mugBottom.rotation.x = -Math.PI / 2;
  mugBottom.position.y = -0.11;
  root.add(mugBottom);

  // Mug Rim
  const mugRim = new THREE.Mesh(mugRimGeo, ceramicMat);
  mugRim.rotation.x = Math.PI / 2;
  mugRim.position.y = 0.11;
  root.add(mugRim);

  // Coffee
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.09;
  root.add(coffee);

  // Handle
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.11, 0.0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.12;
  root.add(saucer);

  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.112;
  root.add(saucerRim);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(0, 0, 0);
  spoonGroup.add(spoonHandle);

  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0, 0.09, 0);
  spoonBowl.rotation.x = Math.PI;
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(0.15, -0.11, 0.05);
  spoonGroup.rotation.z = -Math.PI / 6;
  spoonGroup.rotation.y = Math.PI / 4;
  root.add(spoonGroup);

  return root;
}