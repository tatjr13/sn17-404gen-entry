export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.6, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.8 });

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
  const mugGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.25, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = -0.035;
  root.add(mug);

  // Mug bottom
  const bottomGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.01, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.16;
  root.add(bottom);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.105, 0.105, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.08;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, -0.035, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.2, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(0.15, 0.05, 0.15);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.rotation.x = Math.PI / 6;
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.22, 0.12, 0.22);
  spoonBowl.rotation.x = -Math.PI / 2;
  spoonBowl.rotation.z = Math.PI / 4;
  root.add(spoonBowl);

  return root;
}