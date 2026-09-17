export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.4,
    metalness: 0.1
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x87ceeb,
    roughness: 0.1,
    metalness: 0.0,
    transparent: true,
    opacity: 0.6
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xbdc3c7,
    roughness: 0.2,
    metalness: 0.8
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.7,
    metalness: 0.0
  });

  // Geometries
  const baseGeo = new THREE.CylinderGeometry(0.35, 0.38, 0.05, 32);
  const bodyGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.4, 32);
  const glassGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.38, 32, 1, true);
  const lidGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32);
  const knobGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const handleGeo = new THREE.TorusGeometry(0.08, 0.015, 8, 16, Math.PI);
  const strawGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 12);
  const coasterGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.02, 32);

  // Base
  const base = new THREE.Mesh(baseGeo, darkMat);
  base.position.y = -0.225;
  root.add(base);

  // Body
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0;
  root.add(body);

  // Glass insert
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.y = 0.01;
  root.add(glass);

  // Lid
  const lid = new THREE.Mesh(lidGeo, bodyMat);
  lid.position.y = 0.21;
  root.add(lid);

  // Lid knob
  const knob = new THREE.Mesh(knobGeo, metalMat);
  knob.position.y = 0.23;
  root.add(knob);

  // Handle
  const handle = new THREE.Mesh(handleGeo, metalMat);
  handle.position.set(0.35, 0.05, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Straw
  const straw = new THREE.Mesh(strawGeo, metalMat);
  straw.position.set(0.1, 0.25, 0.1);
  straw.rotation.z = 0.3;
  straw.rotation.x = 0.2;
  root.add(straw);

  // Coaster
  const coaster = new THREE.Mesh(coasterGeo, darkMat);
  coaster.position.y = -0.26;
  root.add(coaster);

  return root;
}