export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.35,
    metalness: 0.05
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x4a3b32,
    roughness: 0.9,
    metalness: 0.0
  });

  const bodyGeo = new THREE.CylinderGeometry(0.23, 0.20, 0.46, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  root.add(body);

  const bottomGeo = new THREE.CircleGeometry(0.20, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.23;
  root.add(bottom);

  const rimGeo = new THREE.TorusGeometry(0.23, 0.015, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.23;
  root.add(rim);

  const coffeeGeo = new THREE.CircleGeometry(0.215, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.21;
  root.add(coffee);

  const handleGeo = new THREE.TorusGeometry(0.13, 0.035, 16, 24);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.23, 0, 0);
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  return root;
}