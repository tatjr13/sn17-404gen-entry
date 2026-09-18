export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const matBrass = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.6, roughness: 0.25 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xfff8e7, metalness: 0.0, roughness: 0.1, emissive: 0xffaa33, emissiveIntensity: 0.8 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, matDark);
  base.position.y = -0.22;
  root.add(base);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const arm = new THREE.Mesh(armGeo, matDark);
  arm.position.y = -0.05;
  root.add(arm);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matDark);
  joint.position.y = 0.1;
  root.add(joint);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.02, 0.14, 0.16, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matBrass);
  shade.position.y = 0.18;
  root.add(shade);

  // Shade rim
  const rimGeo = new THREE.TorusGeometry(0.14, 0.005, 8, 32);
  const rim = new THREE.Mesh(rimGeo, matBrass);
  rim.position.y = 0.1;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.y = 0.12;
  root.add(bulb);

  // Switch
  const switchGeo = new THREE.BoxGeometry(0.01, 0.03, 0.02);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.02, 0.0, 0);
  root.add(sw);

  return root;
}