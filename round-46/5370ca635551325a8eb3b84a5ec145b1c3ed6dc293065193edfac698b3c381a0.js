export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.4, roughness: 0.6 });
  const matArm = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.5, roughness: 0.4 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.8, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, metalness: 0.0, roughness: 0.2, emissive: 0xffffaa, emissiveIntensity: 0.3 });
  const matCord = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.1, roughness: 0.9 });

  const geoBase = new THREE.BoxGeometry(0.25, 0.04, 0.18);
  const base = new THREE.Mesh(geoBase, matBase);
  base.position.y = -0.32;
  root.add(base);

  const geoArm = new THREE.CylinderGeometry(0.015, 0.015, 0.22, 12);
  const arm1 = new THREE.Mesh(geoArm, matArm);
  arm1.position.y = -0.18;
  root.add(arm1);

  const geoJoint = new THREE.SphereGeometry(0.028, 12, 12);
  const joint1 = new THREE.Mesh(geoJoint, matJoint);
  joint1.position.y = -0.07;
  root.add(joint1);

  const arm2 = new THREE.Mesh(geoArm, matArm);
  arm2.position.y = 0.04;
  arm2.rotation.z = Math.PI / 5;
  root.add(arm2);

  const joint2 = new THREE.Mesh(geoJoint, matJoint);
  joint2.position.y = 0.15;
  root.add(joint2);

  const geoShade = new THREE.CylinderGeometry(0.06, 0.12, 0.14, 16, 1, true);
  const shade = new THREE.Mesh(geoShade, matShade);
  shade.position.y = 0.26;
  root.add(shade);

  const geoBulb = new THREE.SphereGeometry(0.035, 12, 12);
  const bulb = new THREE.Mesh(geoBulb, matBulb);
  bulb.position.y = 0.22;
  root.add(bulb);

  const geoCord = new THREE.CylinderGeometry(0.004, 0.004, 0.25, 8);
  const cord = new THREE.Mesh(geoCord, matCord);
  cord.position.set(0.12, -0.2, 0);
  cord.rotation.z = Math.PI / 6;
  root.add(cord);

  // Add a small switch on the base
  const geoSwitch = new THREE.BoxGeometry(0.02, 0.015, 0.04);
  const switchMesh = new THREE.Mesh(geoSwitch, matJoint);
  switchMesh.position.set(0.1, -0.3, 0.06);
  root.add(switchMesh);

  // Add a small knob on joint1
  const geoKnob = new THREE.CylinderGeometry(0.01, 0.01, 0.02, 8);
  const knob = new THREE.Mesh(geoKnob, matJoint);
  knob.position.set(0.03, -0.07, 0);
  knob.rotation.z = Math.PI / 2;
  root.add(knob);

  return root;
}