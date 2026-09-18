export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.3, metalness: 0.0 });
  const insideMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5, metalness: 0.0 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.4, metalness: 0.0 });
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.6, metalness: 0.1 });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.25, 0.20, 0.6, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.0;
  root.add(body);

  // Inside
  const insideGeo = new THREE.CylinderGeometry(0.23, 0.18, 0.58, 32, 1, true);
  const inside = new THREE.Mesh(insideGeo, insideMat);
  inside.position.y = 0.01;
  root.add(inside);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.24, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.3;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.025, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.set(0.28, 0.0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.21, 0.22, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.32;
  root.add(base);

  return root;
}