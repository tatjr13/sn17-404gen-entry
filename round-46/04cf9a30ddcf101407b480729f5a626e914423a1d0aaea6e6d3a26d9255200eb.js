export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.1, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.15, metalness: 0.7 });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.35, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.025;
  root.add(mug);

  // Mug bottom rim
  const bottomRimGeo = new THREE.TorusGeometry(0.12, 0.01, 8, 32);
  const bottomRim = new THREE.Mesh(bottomRimGeo, ceramicMat);
  bottomRim.rotation.x = Math.PI / 2;
  bottomRim.position.y = -0.15;
  root.add(bottomRim);

  // Mug top rim
  const topRimGeo = new THREE.TorusGeometry(0.14, 0.012, 8, 32);
  const topRim = new THREE.Mesh(topRimGeo, ceramicMat);
  topRim.rotation.x = Math.PI / 2;
  topRim.position.y = 0.2;
  root.add(topRim);

  // Coffee liquid
  const coffeeGeo = new THREE.CircleGeometry(0.13, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.18;
  root.add(coffee);

  // Handle
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.14, 0.15, 0),
    new THREE.Vector3(0.22, 0.15, 0),
    new THREE.Vector3(0.24, 0.05, 0),
    new THREE.Vector3(0.22, -0.05, 0),
    new THREE.Vector3(0.14, -0.05, 0)
  ]);
  const handleGeo = new THREE.TubeGeometry(handleCurve, 20, 0.02, 12, false);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.16;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.21, 0.008, 8, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.15;
  root.add(saucerRim);

  // Spoon
  const spoonGroup = new THREE.Group();
  
  // Spoon bowl
  const spoonBowlGeo = new THREE.SphereGeometry(0.035, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.rotation.x = Math.PI;
  spoonBowl.position.set(0.15, -0.145, 0.05);
  spoonGroup.add(spoonBowl);

  // Spoon handle
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.006, 0.18, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.05, -0.145, 0.05);
  spoonGroup.add(spoonHandle);

  // Tilt spoon slightly
  spoonGroup.rotation.z = -0.1;
  spoonGroup.rotation.y = 0.3;
  root.add(spoonGroup);

  // Center everything
  // Let's compute bounding box to center properly
  const box = new THREE.Box3().setFromObject(root);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);

  return root;
}