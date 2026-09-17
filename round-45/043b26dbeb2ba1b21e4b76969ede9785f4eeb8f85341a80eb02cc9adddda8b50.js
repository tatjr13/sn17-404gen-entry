export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    metalness: 0.4,
    roughness: 0.3,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x87ceeb,
    metalness: 0.1,
    roughness: 0.1,
    transparent: true,
    opacity: 0.6,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xbdc3c7,
    metalness: 0.8,
    roughness: 0.2,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.1,
    roughness: 0.8,
  });

  // Geometries
  const baseGeo = new THREE.CylinderGeometry(0.35, 0.38, 0.05, 32);
  const bodyGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
  const neckGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.15, 32);
  const capGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 32);
  const ringGeo = new THREE.TorusGeometry(0.16, 0.02, 16, 32);
  const handleGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 32, Math.PI);
  const labelGeo = new THREE.CylinderGeometry(0.305, 0.305, 0.15, 32, 1, true);

  // Base
  const base = new THREE.Mesh(baseGeo, darkMat);
  base.position.y = -0.225;
  root.add(base);

  // Body
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0;
  root.add(body);

  // Label
  const label = new THREE.Mesh(labelGeo, glassMat);
  label.position.y = 0;
  root.add(label);

  // Neck
  const neck = new THREE.Mesh(neckGeo, bodyMat);
  neck.position.y = 0.275;
  root.add(neck);

  // Cap
  const cap = new THREE.Mesh(capGeo, metalMat);
  cap.position.y = 0.4;
  root.add(cap);

  // Ring under cap
  const ring = new THREE.Mesh(ringGeo, metalMat);
  ring.position.y = 0.35;
  ring.rotation.x = Math.PI / 2;
  root.add(ring);

  // Handle
  const handle = new THREE.Mesh(handleGeo, metalMat);
  handle.position.set(0.3, 0.1, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Second handle on opposite side
  const handle2 = new THREE.Mesh(handleGeo, metalMat);
  handle2.position.set(-0.3, 0.1, 0);
  handle2.rotation.z = -Math.PI / 2;
  root.add(handle2);

  // Lid top detail
  const lidTopGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 32);
  const lidTop = new THREE.Mesh(lidTopGeo, metalMat);
  lidTop.position.y = 0.45;
  root.add(lidTop);

  return root;
}