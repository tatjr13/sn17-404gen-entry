export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.35,
    metalness: 0.0
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x2a1f1a,
    roughness: 0.7,
    metalness: 0.0
  });

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.6, 32, 1, true);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.05;
  root.add(mug);

  // Mug bottom
  const bottomGeo = new THREE.CircleGeometry(0.18, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.25;
  bottom.rotation.x = -Math.PI / 2;
  root.add(bottom);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.28;
  root.add(saucer);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.14, 0.03, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.26, 0.0, 0);
  handle.rotation.x = Math.PI / 2;
  root.add(handle);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.02, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.32;
  root.add(coffee);

  return root;
}