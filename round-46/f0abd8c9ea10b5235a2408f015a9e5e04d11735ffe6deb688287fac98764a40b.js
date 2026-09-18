export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.6, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.6 });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.28, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.14;
  root.add(mug);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.01;
  root.add(saucer);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.24, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.12;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, 0.14, 0);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  // Spoon
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(0.05, 0.15, 0.12);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.rotation.x = Math.PI / 6;
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.12, 0.22, 0.18);
  spoonBowl.scale.set(1, 0.6, 1.5);
  root.add(spoonBowl);

  // Scale everything to fit in unit cube
  root.scale.set(0.9, 0.9, 0.9);

  return root;
}