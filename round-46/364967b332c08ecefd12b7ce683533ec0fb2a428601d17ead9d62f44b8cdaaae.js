export default function generate(THREE) {
  const root = new THREE.Group();
  
  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f0,
    roughness: 0.3,
    metalness: 0.0
  });
  
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.25, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.025;
  root.add(body);
  
  // Mug bottom
  const bottomGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.02, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.105;
  root.add(bottom);
  
  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.15, 0.008, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.15;
  root.add(rim);
  
  // Mug handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.15, 0.025, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);
  
  // Coffee inside
  const coffeeGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, darkMat);
  coffee.position.y = 0.12;
  root.add(coffee);
  
  return root;
}