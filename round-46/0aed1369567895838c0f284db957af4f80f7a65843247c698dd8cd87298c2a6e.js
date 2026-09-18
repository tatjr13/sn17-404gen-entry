export default function generate(THREE) {
  const root = new THREE.Group();

  const matMetal = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.5, roughness: 0.4 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.2, roughness: 0.6, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffdd, metalness: 0.0, roughness: 0.2, emissive: 0xffaa00, emissiveIntensity: 0.3 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, matMetal);
  base.position.y = -0.22;
  root.add(base);

  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const stem = new THREE.Mesh(stemGeo, matMetal);
  stem.position.y = -0.05;
  root.add(stem);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matMetal);
  joint.position.y = 0.1;
  root.add(joint);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.22, 16);
  const arm = new THREE.Mesh(armGeo, matMetal);
  arm.position.set(0.05, 0.2, 0);
  arm.rotation.z = Math.PI / 6;
  root.add(arm);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.06, 0.12, 0.1, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.12, 0.32, 0);
  shade.rotation.z = Math.PI / 6;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.1, 0.28, 0);
  root.add(bulb);

  // Switch on base
  const switchGeo = new THREE.BoxGeometry(0.02, 0.04, 0.01);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.13, -0.2, 0);
  root.add(sw);

  return root;
}