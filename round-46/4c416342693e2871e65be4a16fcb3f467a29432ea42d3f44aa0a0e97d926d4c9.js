export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfaf9f6,
    roughness: 0.35,
    metalness: 0.0
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x2c1a0e,
    roughness: 0.15,
    metalness: 0.0
  });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.22, 32, 1, true);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.05;
  root.add(mug);

  // Mug bottom
  const bottomGeo = new THREE.CircleGeometry(0.11, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.06;
  root.add(bottom);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.07, 0.02, 12, 24, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, 0.08, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.015, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.065;
  root.add(saucer);

  // Saucer rim
  const rimGeo = new THREE.TorusGeometry(0.19, 0.008, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.058;
  root.add(rim);

  // Coffee
  const coffeeGeo = new THREE.CircleGeometry(0.13, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.14;
  root.add(coffee);

  // Spoon
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.18, 8);
  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonGroup = new THREE.Group();
  
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, ceramicMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.09, 0, 0);
  spoonGroup.add(spoonHandle);
  
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, ceramicMat);
  spoonBowl.rotation.x = Math.PI;
  spoonBowl.position.set(0.18, 0, 0);
  spoonGroup.add(spoonBowl);
  
  spoonGroup.rotation.z = -0.3;
  spoonGroup.position.set(0.05, -0.055, 0.05);
  root.add(spoonGroup);

  return root;
}