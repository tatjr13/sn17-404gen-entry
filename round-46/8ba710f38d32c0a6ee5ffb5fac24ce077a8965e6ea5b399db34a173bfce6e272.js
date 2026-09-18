export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.6, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.6 });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.3, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.05;
  root.add(mug);

  // Coffee inside
  const coffeeGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.18;
  root.add(coffee);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.05;
  root.add(saucer);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.015, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.18, 0.05, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Spoon
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.25, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(-0.15, -0.04, 0);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.rotation.x = Math.PI / 6;
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(-0.24, -0.04, 0);
  spoonBowl.rotation.z = Math.PI / 4;
  spoonBowl.rotation.x = Math.PI / 6;
  spoonBowl.rotation.y = Math.PI; // flip to face up
  root.add(spoonBowl);

  return root;
}