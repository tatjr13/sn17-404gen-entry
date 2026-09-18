export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.35,
    metalness: 0.0
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x3b2318,
    roughness: 0.15,
    metalness: 0.0
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    roughness: 0.2,
    metalness: 0.7
  });

  const cupGeo = new THREE.CylinderGeometry(0.17, 0.14, 0.28, 32);
  const cup = new THREE.Mesh(cupGeo, ceramicMat);
  cup.position.y = 0.085;
  root.add(cup);

  const handleGeo = new THREE.TorusGeometry(0.08, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.19, 0.085, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  const saucerGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.015, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.055;
  root.add(saucer);

  const rimGeo = new THREE.TorusGeometry(0.23, 0.008, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.045;
  root.add(rim);

  const coffeeGeo = new THREE.CylinderGeometry(0.155, 0.155, 0.22, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.055;
  root.add(coffee);

  const spoonGroup = new THREE.Group();

  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.006, 0.25, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.125, 0, 0);
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.scale.y = 0.5;
  spoonBowl.position.set(0.25, 0, 0);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(0.05, -0.045, 0.05);
  spoonGroup.rotation.y = -Math.PI / 6;
  spoonGroup.rotation.z = 0.1;
  root.add(spoonGroup);

  return root;
}