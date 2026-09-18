export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.35, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.15, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.25, metalness: 0.65 });

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.16;
  root.add(saucer);

  // Saucer rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.01, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.15;
  root.add(rim);

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.22, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = -0.05;
  root.add(mug);

  // Mug bottom rim
  const bottomRimGeo = new THREE.TorusGeometry(0.09, 0.008, 16, 32);
  const bottomRim = new THREE.Mesh(bottomRimGeo, ceramicMat);
  bottomRim.rotation.x = Math.PI / 2;
  bottomRim.position.y = -0.16;
  root.add(bottomRim);

  // Mug top rim
  const topRimGeo = new THREE.TorusGeometry(0.11, 0.008, 16, 32);
  const topRim = new THREE.Mesh(topRimGeo, ceramicMat);
  topRim.rotation.x = Math.PI / 2;
  topRim.position.y = 0.06;
  root.add(topRim);

  // Coffee liquid
  const coffeeGeo = new THREE.CylinderGeometry(0.105, 0.105, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.04;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, -0.02, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Spoon
  const spoonGroup = new THREE.Group();
  
  // Spoon handle
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.006, 0.2, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonGroup.add(spoonHandle);

  // Spoon bowl
  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.1, 0, 0);
  spoonBowl.rotation.z = -Math.PI / 2;
  spoonGroup.add(spoonBowl);

  // Spoon back (flat part)
  const spoonBackGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.005, 16);
  const spoonBack = new THREE.Mesh(spoonBackGeo, metalMat);
  spoonBack.position.set(0.1, 0, 0);
  spoonBack.rotation.x = Math.PI / 2;
  spoonGroup.add(spoonBack);

  spoonGroup.position.set(-0.05, -0.145, 0.05);
  spoonGroup.rotation.y = 0.4;
  spoonGroup.rotation.z = 0.1;
  root.add(spoonGroup);

  return root;
}