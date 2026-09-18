export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.35,
    metalness: 0.0
  });

  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    roughness: 0.5,
    metalness: 0.0
  });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.7, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0;
  root.add(body);

  // Inside
  const innerGeo = new THREE.CylinderGeometry(0.30, 0.26, 0.68, 32, 1, true);
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.position.y = 0;
  root.add(inner);

  // Bottom
  const bottomGeo = new THREE.CircleGeometry(0.28, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.35;
  root.add(bottom);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.035, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.32, 0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.32, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.35;
  root.add(rim);

  return root;
}