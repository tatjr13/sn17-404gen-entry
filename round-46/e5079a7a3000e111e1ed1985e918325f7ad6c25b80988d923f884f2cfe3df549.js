export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.35,
    metalness: 0.0
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x3b2314,
    roughness: 0.15,
    metalness: 0.0
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.25,
    metalness: 0.65
  });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.17, 0.14, 0.30, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.15;
  root.add(mug);

  // Mug handle
  const handleGeo = new THREE.TorusGeometry(0.10, 0.022, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.17, 0.15, 0);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.26, 0.24, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.01;
  root.add(saucer);

  // Coffee surface
  const coffeeGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.005, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.28;
  root.add(coffee);

  // Spoon handle
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(0.15, 0.12, 0.15);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.rotation.x = Math.PI / 6;
  root.add(spoonHandle);

  // Spoon bowl
  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.22, 0.18, 0.22);
  spoonBowl.scale.set(1, 0.6, 1.5);
  root.add(spoonBowl);

  return root;
}