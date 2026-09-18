export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.4 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffffaa, emissiveIntensity: 0.3, metalness: 0.0, roughness: 0.5 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.7 });
  const matCord = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.1, roughness: 0.9 });

  // Base
  const baseGeo = new THREE.BoxGeometry(0.3, 0.04, 0.2);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.set(0, -0.42, 0);
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const pole = new THREE.Mesh(poleGeo, matMetal);
  pole.position.set(0, -0.2, 0);
  root.add(pole);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 16);
  const arm = new THREE.Mesh(armGeo, matMetal);
  arm.position.set(0.108, -0.05 + 0.0625, 0); // calculated earlier
  arm.rotation.z = Math.PI / 6;
  root.add(arm);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.05, 0.15, 0.15, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.216, 0.0, 0);
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.03, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.216, 0.02, 0);
  root.add(bulb);

  // Switch
  const switchGeo = new THREE.BoxGeometry(0.02, 0.04, 0.02);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.1, -0.38, 0.11);
  root.add(sw);

  // Cord
  const cordGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.3, 8);
  const cord = new THREE.Mesh(cordGeo, matCord);
  cord.position.set(-0.15, -0.42, 0);
  cord.rotation.z = Math.PI / 2;
  root.add(cord);

  // Cord curve part (simple torus segment or just a cylinder angled)
  // Let's skip complex cord to keep it simple and robust.

  return root;
}