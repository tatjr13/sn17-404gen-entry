export default function generate(THREE) {
  const root = new THREE.Group();

  const matCeramic = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.0 });
  const matCoffee = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.7, metalness: 0.0 });
  const matGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.4 });

  const bodyGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.24, 32);
  const handleGeo = new THREE.TorusGeometry(0.07, 0.018, 16, 32);
  const rimGeo = new THREE.TorusGeometry(0.125, 0.006, 16, 32);
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.02, 32);
  const coffeeGeo = new THREE.CylinderGeometry(0.115, 0.115, 0.005, 32);
  const baseGeo = new THREE.TorusGeometry(0.105, 0.006, 16, 32);

  const body = new THREE.Mesh(bodyGeo, matCeramic);
  body.position.y = 0.02;
  root.add(body);

  const handle = new THREE.Mesh(handleGeo, matCeramic);
  handle.position.set(0.115, 0.02, 0);
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  const rim = new THREE.Mesh(rimGeo, matGold);
  rim.position.y = 0.14;
  root.add(rim);

  const saucer = new THREE.Mesh(saucerGeo, matCeramic);
  saucer.position.y = -0.13;
  root.add(saucer);

  const coffee = new THREE.Mesh(coffeeGeo, matCoffee);
  coffee.position.y = 0.135;
  root.add(coffee);

  const base = new THREE.Mesh(baseGeo, matGold);
  base.position.y = -0.11;
  root.add(base);

  return root;
}