export default function generate(THREE) {
  const root = new THREE.Group();

  const metalMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6, roughness: 0.4 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0x2E8B57, metalness: 0.3, roughness: 0.5 });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xFFFFAA, emissive: 0xFFFFAA, emissiveIntensity: 0.5, metalness: 0.0, roughness: 0.2 });
  const switchMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.6 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.04, 24);
  const base = new THREE.Mesh(baseGeo, metalMat);
  base.position.y = -0.35;
  root.add(base);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.38, 16);
  const arm = new THREE.Mesh(armGeo, metalMat);
  arm.position.y = -0.14;
  root.add(arm);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const joint = new THREE.Mesh(jointGeo, metalMat);
  joint.position.y = 0.05;
  root.add(joint);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.02, 0.12, 0.3, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.y = 0.2;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.03, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.y = 0.15;
  root.add(bulb);

  // Switch
  const switchGeo = new THREE.BoxGeometry(0.04, 0.02, 0.02);
  const sw = new THREE.Mesh(switchGeo, switchMat);
  sw.position.set(0.1, -0.33, 0);
  root.add(sw);

  return root;
}