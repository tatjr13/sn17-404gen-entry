export default function generate(THREE) {
  const root = new THREE.Group();
  
  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f0,
    roughness: 0.3,
    metalness: 0.0
  });
  
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e0,
    roughness: 0.4,
    metalness: 0.0
  });
  
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0c8,
    roughness: 0.2,
    metalness: 0.1
  });
  
  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.25, 32);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0;
  root.add(body);
  
  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.set(0.18, 0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);
  
  // Rim
  const rimGeo = new THREE.TorusGeometry(0.15, 0.008, 8, 32);
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.y = 0.125;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);
  
  return root;
}