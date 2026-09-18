export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.6, roughness: 0.4 });
  const matArm = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, metalness: 0.1, roughness: 0.5, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffaa00, emissiveIntensity: 0.5, metalness: 0.0, roughness: 0.2 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.6 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.set(0, -0.42, 0);
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.22, 16);
  const pole = new THREE.Mesh(poleGeo, matArm);
  pole.position.set(0, -0.28, 0);
  root.add(pole);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matArm);
  joint.position.set(0, -0.17, 0);
  root.add(joint);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.28, 16);
  const arm = new THREE.Mesh(armGeo, matArm);
  arm.position.set(0.1, 0.02, 0);
  arm.rotation.z = Math.PI / 4;
  root.add(arm);

  // Shade mount
  const mountGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
  const mount = new THREE.Mesh(mountGeo, matArm);
  mount.position.set(0.19, 0.11, 0);
  mount.rotation.z = Math.PI / 4;
  root.add(mount);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.1, 0.06, 0.14, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.19, 0.11, 0);
  shade.rotation.z = Math.PI / 4;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.19, 0.11, 0);
  root.add(bulb);

  // Switch on arm
  const switchGeo = new THREE.BoxGeometry(0.02, 0.01, 0.02);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.05, -0.02, 0.015);
  sw.rotation.z = Math.PI / 4;
  root.add(sw);

  return root;
}