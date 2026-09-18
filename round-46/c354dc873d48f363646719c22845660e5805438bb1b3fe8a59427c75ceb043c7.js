export default function generate(THREE) {
  const root = new THREE.Group();

  const matCeramic = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.35, metalness: 0.0 });
  const matCoffee = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.15, metalness: 0.0 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.2, metalness: 0.7 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5, metalness: 0.0 });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.135, 0.115, 0.28, 32);
  const mug = new THREE.Mesh(mugGeo, matCeramic);
  mug.position.y = 0.04;
  root.add(mug);

  // Mug interior (coffee)
  const coffeeGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, matCoffee);
  coffee.position.y = 0.17;
  root.add(coffee);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.135, 0.008, 8, 32);
  const rim = new THREE.Mesh(rimGeo, matCeramic);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.18;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.07, 0.018, 12, 24, Math.PI);
  const handle = new THREE.Mesh(handleGeo, matCeramic);
  handle.position.set(0.16, 0.04, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.018, 32);
  const saucer = new THREE.Mesh(saucerGeo, matCeramic);
  saucer.position.y = -0.11;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.21, 0.006, 8, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, matCeramic);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.10;
  root.add(saucerRim);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.22, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, matSilver);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.position.set(0.12, 0.0, 0);
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.028, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, matSilver);
  spoonBowl.rotation.x = Math.PI;
  spoonBowl.position.set(0.22, 0.0, 0);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.y = 0.04;
  root.add(spoonGroup);

  // Coaster
  const coasterGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.008, 32);
  const coaster = new THREE.Mesh(coasterGeo, matDark);
  coaster.position.y = -0.125;
  root.add(coaster);

  return root;
}