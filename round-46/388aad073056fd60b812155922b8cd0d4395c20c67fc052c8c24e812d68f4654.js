export default function generate(THREE) {
  const root = new THREE.Group();

  const matCeramic = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.3, metalness: 0.0 });
  const matCoffee = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.8, metalness: 0.0 });
  const matGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.4, metalness: 0.3 });
  const matSaucer = new THREE.MeshStandardMaterial({ color: 0xe8e8e0, roughness: 0.3, metalness: 0.0 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.24, 32);
  const body = new THREE.Mesh(bodyGeo, matCeramic);
  body.position.y = 0.02;
  root.add(body);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, matSaucer);
  saucer.position.y = -0.12;
  root.add(saucer);

  // Saucer rim detail
  const saucerRimGeo = new THREE.TorusGeometry(0.22, 0.005, 8, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, matGold);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.11;
  root.add(saucerRim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.07, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, matCeramic);
  handle.position.set(0.16, 0.02, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Coffee liquid
  const coffeeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.02, 32);
  const coffee = new THREE.Mesh(coffeeGeo, matCoffee);
  coffee.position.y = 0.10;
  root.add(coffee);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.14, 0.005, 8, 32);
  const rim = new THREE.Mesh(rimGeo, matGold);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.14;
  root.add(rim);

  // Steam wisps (optional, but adds life)
  const steamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.3 });
  for (let i = 0; i < 3; i++) {
    const steamGeo = new THREE.CylinderGeometry(0.01, 0.02, 0.08, 8);
    const steam = new THREE.Mesh(steamGeo, steamMat);
    steam.position.set((i - 1) * 0.03, 0.22 + i * 0.02, (i - 1) * 0.02);
    steam.rotation.z = (i - 1) * 0.2;
    root.add(steam);
  }

  return root;
}