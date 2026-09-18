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
  
  // Mug body - cylinder
  const bodyGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.28, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.04;
  root.add(body);
  
  // Mug bottom/foot
  const footGeo = new THREE.CylinderGeometry(0.16, 0.15, 0.02, 32);
  const foot = new THREE.Mesh(footGeo, ceramicMat);
  foot.position.y = -0.12;
  root.add(foot);
  
  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.18, 0.012, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.18;
  root.add(rim);
  
  // Handle - torus
  const handleGeo = new THREE.TorusGeometry(0.08, 0.018, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.22, 0.04, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);
  
  // Coffee liquid
  const coffeeGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.01, 32);
  const coffee = new THREE.Mesh(coffeeGeo, darkMat);
  coffee.position.y = 0.14;
  root.add(coffee);
  
  return root;
}