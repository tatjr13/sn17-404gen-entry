export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.1 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.8 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.2 });

  // Geometries
  const bodyGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.24, 32);
  const rimGeo = new THREE.TorusGeometry(0.145, 0.015, 16, 32);
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32, Math.PI);
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.02, 32);
  const spoonHandleGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.18, 12);
  const spoonBowlGeo = new THREE.SphereGeometry(0.035, 16, 16, 0, Math.PI);

  // Mug Body
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.set(0, 0.12, 0);
  root.add(body);

  // Rim
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.set(0, 0.24, 0);
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Handle
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.18, 0.12, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.set(0, -0.01, 0);
  root.add(saucer);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.09, 0, 0);
  spoonGroup.add(spoonHandle);

  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.rotation.z = Math.PI / 2;
  spoonBowl.position.set(0.18, 0, 0);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(0.15, 0.01, 0.1);
  spoonGroup.rotation.y = -Math.PI / 6;
  root.add(spoonGroup);

  // Coffee inside (optional, maybe a dark cylinder)
  const coffeeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, darkMat);
  coffee.position.set(0, 0.22, 0);
  root.add(coffee);

  return root;
}