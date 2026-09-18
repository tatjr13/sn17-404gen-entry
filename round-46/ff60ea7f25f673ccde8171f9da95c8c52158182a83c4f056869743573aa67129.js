export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.3,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x3b2314,
    roughness: 0.6,
    metalness: 0.0
  });

  // Body using LatheGeometry
  const profile = [
    new THREE.Vector2(0, -0.25),
    new THREE.Vector2(0.22, -0.25),
    new THREE.Vector2(0.24, -0.15),
    new THREE.Vector2(0.25, 0),
    new THREE.Vector2(0.25, 0.15),
    new THREE.Vector2(0.24, 0.25),
    new THREE.Vector2(0, 0.25)
  ];
  const bodyGeo = new THREE.LatheGeometry(profile, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  root.add(body);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.25, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.25;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.025, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.25, 0, 0);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const base = new THREE.Mesh(baseGeo, ceramicMat);
  base.position.y = -0.26;
  root.add(base);

  // Coffee inside
  const coffeeGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.15;
  root.add(coffee);

  return root;
}