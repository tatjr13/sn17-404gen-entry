export default function generate(THREE) {
  const root = new THREE.Group();

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.7,
    roughness: 0.3
  });

  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 0.1,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    emissive: 0xffffaa,
    emissiveIntensity: 0.6,
    metalness: 0.0,
    roughness: 0.5
  });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, metalMat);
  base.position.y = -0.26;
  root.add(base);

  // Base knob
  const knobGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.025, 16);
  const knob = new THREE.Mesh(knobGeo, metalMat);
  knob.position.set(0.1, -0.26, 0);
  root.add(knob);

  // Lower arm
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.2, 16);
  const armLower = new THREE.Mesh(armGeo, metalMat);
  armLower.position.set(0, -0.14, 0);
  armLower.rotation.z = Math.PI / 6;
  root.add(armLower);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.022, 16, 16);
  const joint = new THREE.Mesh(jointGeo, metalMat);
  joint.position.set(0.05, -0.04, 0);
  root.add(joint);

  // Upper arm
  const armUpper = new THREE.Mesh(armGeo, metalMat);
  armUpper.position.set(0.1, 0.06, 0);
  armUpper.rotation.z = -Math.PI / 4;
  root.add(armUpper);

  // Shade
  const shadeGeo = new THREE.ConeGeometry(0.11, 0.14, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.18, 0.16, 0);
  shade.rotation.z = -Math.PI / 4;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.018, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.18, 0.16, 0);
  root.add(bulb);

  // Center the whole lamp in the unit cube
  // Approximate bounds: x: -0.14 to 0.30, y: -0.28 to 0.28, z: -0.14 to 0.14
  // Shift left by 0.08 to center x
  root.position.x = -0.08;

  return root;
}