export default function generate(THREE) {
  const root = new THREE.Group();
  
  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f0,
    roughness: 0.3,
    metalness: 0.05
  });
  
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.4,
    metalness: 0.1
  });
  
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a843,
    roughness: 0.3,
    metalness: 0.4
  });
  
  // Mug body - cylinder
  const bodyGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.22, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0;
  root.add(body);
  
  // Mug bottom
  const bottomGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.01, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.11;
  root.add(bottom);
  
  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.12, 0.008, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.11;
  root.add(rim);
  
  // Handle - using a torus segment or tube
  // Create a curve for the handle
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.12, 0.08, 0),
    new THREE.Vector3(0.18, 0.08, 0),
    new THREE.Vector3(0.20, 0.02, 0),
    new THREE.Vector3(0.20, -0.04, 0),
    new THREE.Vector3(0.18, -0.08, 0),
    new THREE.Vector3(0.12, -0.08, 0),
  ]);
  
  const handleGeo = new THREE.TubeGeometry(handleCurve, 20, 0.015, 12, false);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  root.add(handle);
  
  // Decorative band
  const bandGeo = new THREE.TorusGeometry(0.115, 0.005, 8, 32);
  const band = new THREE.Mesh(bandGeo, goldMat);
  band.rotation.x = Math.PI / 2;
  band.position.y = 0.05;
  root.add(band);
  
  // Inner surface (bottom of inside)
  const innerBottomGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.005, 32);
  const innerBottom = new THREE.Mesh(innerBottomGeo, darkMat);
  innerBottom.position.y = -0.105;
  root.add(innerBottom);
  
  return root;
}