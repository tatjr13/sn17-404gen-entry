export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.4, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.9, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.3, metalness: 0.7 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.32, 48);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.16;
  root.add(body);

  // Mug bottom
  const bottomGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 48);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = 0.01;
  root.add(bottom);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.16, 0.16, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.015, 48);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.0075;
  root.add(saucer);

  // Saucer rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.01, 12, 48);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.0075;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.01, 48);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.30;
  root.add(coffee);

  // Spoon
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.25, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(0.15, 0.02, 0.1);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.rotation.y = 0.3;
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.275, 0.02, 0.1);
  spoonBowl.rotation.x = Math.PI;
  spoonBowl.rotation.z = Math.PI / 2;
  root.add(spoonBowl);

  return root;
}