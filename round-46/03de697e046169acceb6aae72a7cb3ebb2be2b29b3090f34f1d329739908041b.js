export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.0 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.6, metalness: 0.1 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x1a3c5e, roughness: 0.3, metalness: 0.05 });

  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.175;
  root.add(saucer);

  const bodyGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.35, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.0;
  root.add(body);

  const innerGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.02, 32);
  const inner = new THREE.Mesh(innerGeo, darkMat);
  inner.position.y = -0.17;
  root.add(inner);

  const handleGeo = new THREE.TorusGeometry(0.08, 0.025, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.135, 0.0, 0.0);
  handle.rotation.y = Math.PI / 2;
  handle.rotation.z = -0.15;
  root.add(handle);

  const rimGeo = new THREE.TorusGeometry(0.14, 0.008, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.175;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  const stripeGeo = new THREE.CylinderGeometry(0.141, 0.141, 0.04, 32);
  const stripe = new THREE.Mesh(stripeGeo, accentMat);
  stripe.position.y = 0.05;
  root.add(stripe);

  return root;
}