export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.25,
    metalness: 0.05
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.6,
    metalness: 0.0
  });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.5, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.03;
  root.add(body);

  // Interior
  const innerGeo = new THREE.CylinderGeometry(0.20, 0.16, 0.48, 32);
  const inner = new THREE.Mesh(innerGeo, darkMat);
  inner.position.y = 0.03;
  root.add(inner);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.28;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.025, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.28, 0.055, 0);
  handle.rotation.z = -Math.PI / 2;
  root.add(handle);

  // Handle attachment caps (small cylinders to blend)
  const capGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 16);
  const capTop = new THREE.Mesh(capGeo, ceramicMat);
  capTop.position.set(0.22, 0.175, 0);
  capTop.rotation.z = Math.PI / 2;
  root.add(capTop);

  const capBot = new THREE.Mesh(capGeo, ceramicMat);
  capBot.position.set(0.22, -0.065, 0);
  capBot.rotation.z = Math.PI / 2;
  root.add(capBot);

  return root;
}