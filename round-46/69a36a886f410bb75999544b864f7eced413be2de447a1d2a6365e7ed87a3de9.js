export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.2, metalness: 0.8 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.1 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.24, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.05;
  root.add(body);

  // Mug rim
  const rimGeo = new THREE.CylinderGeometry(0.13, 0.12, 0.02, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.17;
  root.add(rim);

  // Mug handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.018, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, 0.05, 0);
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.015, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.1;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.19, 0.008, 8, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.position.y = -0.09;
  saucerRim.rotation.x = Math.PI / 2;
  root.add(saucerRim);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.18, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.y = 0.09;
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.022, 16, 16);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.y = 0.18;
  spoonBowl.scale.set(1, 0.6, 1.5);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(-0.05, -0.09, 0.05);
  spoonGroup.rotation.z = Math.PI / 6;
  spoonGroup.rotation.y = Math.PI / 4;
  root.add(spoonGroup);

  // Coffee liquid (optional, but adds recognition)
  const coffeeGeo = new THREE.CylinderGeometry(0.115, 0.115, 0.005, 32);
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.4, metalness: 0.0 });
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.15;
  root.add(coffee);

  return root;
}