export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.6, roughness: 0.3 });
  const matBrass = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.7, roughness: 0.2 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xf0ead6, metalness: 0.1, roughness: 0.6, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffaa00, emissiveIntensity: 0.8, metalness: 0.0, roughness: 0.2 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.2, roughness: 0.4 });

  // Geometries
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.03, 32);
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const jointGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 16);
  const shadeGeo = new THREE.CylinderGeometry(0.06, 0.1, 0.12, 32, 1, true);
  const bulbGeo = new THREE.SphereGeometry(0.02, 16, 16);
  const switchGeo = new THREE.BoxGeometry(0.02, 0.04, 0.01);

  // Base
  const base = new THREE.Mesh(baseGeo, matDark);
  base.position.y = -0.35;
  root.add(base);

  // Pole
  const pole = new THREE.Mesh(poleGeo, matDark);
  pole.position.y = -0.2;
  root.add(pole);

  // Joint
  const joint = new THREE.Mesh(jointGeo, matBrass);
  joint.position.y = -0.05;
  root.add(joint);

  // Arm
  const arm = new THREE.Mesh(armGeo, matDark);
  arm.position.set(0.0625, -0.0125, 0);
  arm.rotation.z = Math.PI / 6; // 30 degrees
  root.add(arm);

  // Shade
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.125, 0.1, 0);
  shade.rotation.z = Math.PI / 6;
  root.add(shade);

  // Bulb
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.125, 0.06, 0);
  root.add(bulb);

  // Switch
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.08, -0.335, 0.06);
  root.add(sw);

  return root;
}