export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.6 });
  const matPole = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.4, roughness: 0.5 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.6, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xF5F5DC, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xFFFFAA, metalness: 0.0, roughness: 0.2, emissive: 0x444400 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xCC0000, metalness: 0.2, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.y = -0.32;
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 16);
  const pole = new THREE.Mesh(poleGeo, matPole);
  pole.position.y = -0.18;
  root.add(pole);

  // Switch on pole
  const switchGeo = new THREE.BoxGeometry(0.02, 0.04, 0.01);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.015, -0.22, 0);
  root.add(sw);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matJoint);
  joint.position.y = -0.08;
  root.add(joint);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.22, 16);
  const arm = new THREE.Mesh(armGeo, matPole);
  arm.position.set(0.05, 0.02, 0);
  arm.rotation.z = Math.PI / 6;
  root.add(arm);

  // Second joint
  const joint2 = new THREE.Mesh(jointGeo, matJoint);
  joint2.position.set(0.12, 0.12, 0);
  root.add(joint2);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.14, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.15, 0.22, 0);
  shade.rotation.z = Math.PI / 6;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.13, 0.18, 0);
  root.add(bulb);

  // Cap on shade
  const capGeo = new THREE.CylinderGeometry(0.082, 0.082, 0.01, 32);
  const cap = new THREE.Mesh(capGeo, matJoint);
  cap.position.set(0.15, 0.29, 0);
  cap.rotation.z = Math.PI / 6;
  root.add(cap);

  return root;
}