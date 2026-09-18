export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.3, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.9, metalness: 0.0 });
  const saucerMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.3, metalness: 0.0 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.32, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.0;
  root.add(body);

  // Coffee inside
  const coffeeGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.14;
  root.add(coffee);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, saucerMat);
  saucer.position.y = -0.18;
  root.add(saucer);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.16, 0.0, 0.0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Maybe add a small detail: a rim or lip?
  // CylinderGeometry has openEnded option, but let's keep it simple.
  // Add a small tag/string? Not necessary.

  return root;
}