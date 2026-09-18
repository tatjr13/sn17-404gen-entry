export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.35,
    metalness: 0.05
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x4a3020,
    roughness: 0.6,
    metalness: 0.0
  });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.16, 0.12, 0.4, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.15;
  root.add(body);

  // Mug bottom
  const bottomGeo = new THREE.CircleGeometry(0.12, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.05;
  root.add(bottom);

  // Coffee liquid
  const coffeeGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.32;
  root.add(coffee);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.06;
  root.add(saucer);

  // Saucer rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.01, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.05;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.025, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.18, 0.15, 0);
  root.add(handle);

  // Handle attachment points (small cylinders to blend)
  const attachGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 16);
  const attachTop = new THREE.Mesh(attachGeo, ceramicMat);
  attachTop.rotation.z = Math.PI / 2;
  attachTop.position.set(0.18, 0.23, 0);
  root.add(attachTop);

  const attachBot = new THREE.Mesh(attachGeo, ceramicMat);
  attachBot.rotation.z = Math.PI / 2;
  attachBot.position.set(0.18, 0.07, 0);
  root.add(attachBot);

  return root;
}