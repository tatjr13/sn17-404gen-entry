export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.0 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.3, metalness: 0.6 });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.4, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0;
  root.add(body);

  // Interior
  const innerGeo = new THREE.CylinderGeometry(0.2, 0.19, 0.38, 32);
  const inner = new THREE.Mesh(innerGeo, darkMat);
  inner.position.y = 0.01;
  root.add(inner);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.03, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.22, 0, 0);
  handle.rotation.z = -Math.PI / 2; // Rotate to lie in XZ plane? Wait.
  // Let's test mentally: default torus in XY. Rotate Z by -PI/2 -> lies in XZ? No, rotation around Z keeps it in XY plane? Wait.
  // Rotation around Z axis changes X and Y coordinates. It stays in XY plane.
  // I want it in XZ plane. So rotate around Y by PI/2.
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.2;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Base ring
  const baseGeo = new THREE.TorusGeometry(0.2, 0.01, 16, 32);
  const base = new THREE.Mesh(baseGeo, ceramicMat);
  base.position.y = -0.2;
  base.rotation.x = Math.PI / 2;
  root.add(base);

  return root;
}