export default function generate(THREE) {
  const root = new THREE.Group();

  const matMetal = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.5, roughness: 0.4 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.9, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffddaa, emissiveIntensity: 0.8 });
  const matBase = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.6 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.08, 24);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.set(0, -0.38, 0);
  root.add(base);

  // Lower arm
  const armGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.24, 12);
  const arm1 = new THREE.Mesh(armGeo, matMetal);
  arm1.position.set(0.08, -0.24, 0);
  arm1.rotation.z = Math.PI / 4;
  root.add(arm1);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matMetal);
  joint.position.set(0.16, -0.14, 0);
  root.add(joint);

  // Upper arm
  const arm2 = new THREE.Mesh(armGeo, matMetal);
  arm2.position.set(0.23, -0.02, 0);
  arm2.rotation.z = Math.PI / 6;
  root.add(arm2);

  // Head mount
  const headGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.06, 12);
  const head = new THREE.Mesh(headGeo, matMetal);
  head.position.set(0.29, 0.06, 0);
  root.add(head);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.12, 0.03, 0.1, 24);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.29, 0.13, 0);
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.022, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.29, 0.1, 0);
  root.add(bulb);

  // Add a small switch on the base
  const switchGeo = new THREE.BoxGeometry(0.02, 0.04, 0.01);
  const sw = new THREE.Mesh(switchGeo, matMetal);
  sw.position.set(0.19, -0.36, 0);
  root.add(sw);

  // Add a cord
  const cordGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.3, 8);
  const cord = new THREE.Mesh(cordGeo, matBase);
  cord.position.set(-0.15, -0.3, 0);
  cord.rotation.z = Math.PI / 3;
  root.add(cord);

  return root;
}