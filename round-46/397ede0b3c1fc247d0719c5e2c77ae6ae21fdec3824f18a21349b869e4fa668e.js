export default function generate(THREE) {
  const root = new THREE.Group();

  const matDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const matLight = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, metalness: 0.1, roughness: 0.6 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffaa, emissiveIntensity: 0.8, metalness: 0.0, roughness: 0.2 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.2, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 32);
  const base = new THREE.Mesh(baseGeo, matDark);
  base.position.set(0, -0.25, 0);
  root.add(base);

  // Switch
  const switchGeo = new THREE.BoxGeometry(0.015, 0.03, 0.01);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.08, -0.24, 0.06);
  root.add(sw);

  // Joint 1
  const jointGeo = new THREE.SphereGeometry(0.022, 16, 16);
  const j1 = new THREE.Mesh(jointGeo, matDark);
  j1.position.set(0, -0.235, 0);
  root.add(j1);

  // Arm 1 Group
  const arm1Group = new THREE.Group();
  arm1Group.position.set(0, -0.235, 0);
  arm1Group.rotation.z = Math.PI / 3; // 60 degrees
  root.add(arm1Group);

  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.24, 16);
  const arm1 = new THREE.Mesh(armGeo, matDark);
  arm1.position.set(0, 0.12, 0); // half length up
  arm1Group.add(arm1);

  // Joint 2
  const j2 = new THREE.Mesh(jointGeo, matDark);
  j2.position.set(0, 0.24, 0);
  arm1Group.add(j2);

  // Arm 2 Group
  const arm2Group = new THREE.Group();
  arm2Group.position.set(0, 0.24, 0);
  arm2Group.rotation.z = -Math.PI / 3; // -60 degrees relative to arm1, so 120 from horizontal
  arm1Group.add(arm2Group);

  const arm2 = new THREE.Mesh(armGeo, matDark);
  arm2.position.set(0, 0.12, 0);
  arm2Group.add(arm2);

  // Head Group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.24, 0);
  headGroup.rotation.z = Math.PI / 2; // point down
  arm2Group.add(headGroup);

  const headGeo = new THREE.CylinderGeometry(0.01, 0.1, 0.12, 32);
  const head = new THREE.Mesh(headGeo, matLight);
  head.position.set(0, 0.06, 0);
  headGroup.add(head);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0, 0.02, 0);
  headGroup.add(bulb);

  return root;
}