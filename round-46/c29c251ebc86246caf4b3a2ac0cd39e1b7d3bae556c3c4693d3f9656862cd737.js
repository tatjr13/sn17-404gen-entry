export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.25,
    metalness: 0.0
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.6,
    metalness: 0.1
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.35,
    metalness: 0.65
  });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.45, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = -0.05;
  root.add(body);

  // Interior (dark)
  const innerGeo = new THREE.CylinderGeometry(0.20, 0.185, 0.43, 32);
  const inner = new THREE.Mesh(innerGeo, darkMat);
  inner.position.y = -0.05;
  root.add(inner);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.position.y = 0.175;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, ceramicMat);
  base.position.y = -0.24;
  root.add(base);

  // Decorative band
  const bandGeo = new THREE.TorusGeometry(0.215, 0.008, 16, 32);
  const band = new THREE.Mesh(bandGeo, goldMat);
  band.position.y = -0.15;
  band.rotation.x = Math.PI / 2;
  root.add(band);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.025, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.22, 0.05, 0);
  handle.rotation.x = Math.PI / 2;
  root.add(handle);

  // Small decorative dots on band
  const dotGeo = new THREE.SphereGeometry(0.012, 8, 8);
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const dot = new THREE.Mesh(dotGeo, goldMat);
    dot.position.set(
      Math.cos(angle) * 0.215,
      -0.15,
      Math.sin(angle) * 0.215
    );
    root.add(dot);
  }

  return root;
}