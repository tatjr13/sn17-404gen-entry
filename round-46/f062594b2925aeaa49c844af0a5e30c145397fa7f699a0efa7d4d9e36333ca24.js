export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.25,
    metalness: 0.0
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.7,
    metalness: 0.0
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.3,
    metalness: 0.6
  });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.28, 0.25, 0.5, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0;
  root.add(body);

  // Inside
  const insideGeo = new THREE.CylinderGeometry(0.26, 0.23, 0.48, 32);
  const inside = new THREE.Mesh(insideGeo, darkMat);
  inside.position.y = -0.01;
  root.add(inside);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.28, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, goldMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.25;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.14, 0.035, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.28, 0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.38, 0.35, 0.04, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.27;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.38, 0.01, 16, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, goldMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.25;
  root.add(saucerRim);

  return root;
}