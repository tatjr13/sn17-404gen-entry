export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const matArm = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0x1a4a1a, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.4 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.06, 32);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.y = -0.42;
  root.add(base);

  // Arm segment 1
  const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 16);
  const arm1 = new THREE.Mesh(armGeo, matArm);
  arm1.position.set(0, -0.25, 0);
  arm1.rotation.z = Math.PI / 6; // 30 degrees up
  root.add(arm1);

  // Joint 1
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint1 = new THREE.Mesh(jointGeo, matJoint);
  joint1.position.set(0.08, -0.08, 0);
  root.add(joint1);

  // Arm segment 2
  const arm2 = new THREE.Mesh(armGeo, matArm);
  arm2.position.set(0.15, 0.05, 0);
  arm2.rotation.z = -Math.PI / 4; // 45 degrees down
  root.add(arm2);

  // Joint 2
  const joint2 = new THREE.Mesh(jointGeo, matJoint);
  joint2.position.set(0.28, -0.08, 0);
  root.add(joint2);

  // Shade
  const shadeGeo = new THREE.ConeGeometry(0.12, 0.18, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.35, -0.15, 0);
  shade.rotation.z = Math.PI / 2; // point down
  root.add(shade);

  // Bulb (optional, inside shade)
  const bulbGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffaa, emissiveIntensity: 0.5 });
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.35, -0.12, 0);
  root.add(bulb);

  return root;
}