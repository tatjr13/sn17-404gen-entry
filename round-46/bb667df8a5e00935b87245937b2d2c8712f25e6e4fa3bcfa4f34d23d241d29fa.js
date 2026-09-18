export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xF0F0F0, metalness: 0.0, roughness: 0.4 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3E2723, metalness: 0.0, roughness: 0.2 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xD0D0D0, metalness: 0.8, roughness: 0.2 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.18, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.set(0, 0.09, 0);
  root.add(body);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.09, 0.005, 12, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.set(0, 0.18, 0);
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.05, 0.012, 16, 24, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.1, 0.09, 0);
  handle.rotation.y = Math.PI / 2;
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.16, 0.17, 0.015, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.set(0, -0.0075, 0);
  root.add(saucer);

  // Coffee surface
  const coffeeGeo = new THREE.CircleGeometry(0.085, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.set(0, 0.175, 0);
  coffee.rotation.x = -Math.PI / 2;
  root.add(coffee);

  // Spoon
  const spoonHandleGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.2, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(0.06, 0.008, 0.06);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.rotation.x = Math.PI / 6;
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.012, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.13, 0.008, 0.13);
  spoonBowl.rotation.x = Math.PI / 2;
  root.add(spoonBowl);

  return root;
}