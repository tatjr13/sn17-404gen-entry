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
    metalness: 0.2,
    roughness: 0.8,
  });

  // Geometries
  const baseGeo = new THREE.CylinderGeometry(0.35, 0.38, 0.05, 32);
  const topGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.02, 32);
  const glassGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.45, 32, 1, true);
  const handleGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 32, Math.PI);
  const knobGeo = new THREE.SphereGeometry(0.03, 16, 16);
  const hingeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 16);

  // Base
  const base = new THREE.Mesh(baseGeo, bodyMat);
  base.position.y = -0.225;
  root.add(base);

  // Glass body
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.y = 0.0;
  root.add(glass);

  // Top rim
  const top = new THREE.Mesh(topGeo, bodyMat);
  top.position.y = 0.235;
  root.add(top);

  // Lid
  const lidGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.04, 32);
  const lid = new THREE.Mesh(lidGeo, bodyMat);
  lid.position.y = 0.255;
  root.add(lid);

  // Lid knob
  const knob = new THREE.Mesh(knobGeo, metalMat);
  knob.position.y = 0.28;
  root.add(knob);

  // Handle
  const handle = new THREE.Mesh(handleGeo, metalMat);
  handle.position.set(0.35, 0.0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Hinges
  const hinge1 = new THREE.Mesh(hingeGeo, metalMat);
  hinge1.position.set(0, 0.2, 0.34);
  hinge1.rotation.x = Math.PI / 2;
  root.add(hinge1);

  const hinge2 = new THREE.Mesh(hingeGeo, metalMat);
  hinge2.position.set(0, 0.2, -0.34);
  hinge2.rotation.x = Math.PI / 2;
  root.add(hinge2);

  // Measurement lines
  const lineGeo = new THREE.BoxGeometry(0.02, 0.005, 0.005);
  for (let i = 0; i < 5; i++) {
    const line = new THREE.Mesh(lineGeo, darkMat);
    line.position.set(0.33, -0.15 + i * 0.09, 0);
    line.rotation.y = Math.PI / 2;
    root.add(line);
  }

  return root;
}