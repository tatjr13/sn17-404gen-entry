export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.35, metalness: 0.0 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.3, metalness: 0.1 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x1a4d8f, roughness: 0.25, metalness: 0.15 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.4, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.1;
  root.add(body);

  // Mug bottom
  const bottomGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.02, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.09;
  root.add(bottom);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.18, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, darkMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.3;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.1, 0.02, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, darkMat);
  handle.position.set(0.22, 0.1, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.28, 0.26, 0.03, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.12;
  root.add(saucer);

  // Accent ring
  const accentGeo = new THREE.TorusGeometry(0.17, 0.008, 16, 32);
  const accent = new THREE.Mesh(accentGeo, accentMat);
  accent.rotation.x = Math.PI / 2;
  accent.position.y = 0.0;
  root.add(accent);

  return root;
}