export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.7 });
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.5, roughness: 0.4 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, metalness: 0.0, roughness: 0.2, emissive: 0xffddaa, emissiveIntensity: 0.3 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.06, 24);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.set(0, -0.23, 0);
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.22, 12);
  const pole = new THREE.Mesh(poleGeo, matMetal);
  pole.position.set(0, -0.12, 0);
  root.add(pole);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 12, 12);
  const joint = new THREE.Mesh(jointGeo, matJoint);
  joint.position.set(0, -0.01, 0);
  root.add(joint);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.18, 12);
  const arm = new THREE.Mesh(armGeo, matMetal);
  arm.position.set(0, -0.01, 0);
  arm.rotation.z = Math.PI / 4;
  root.add(arm);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.1, 0.06, 0.12, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  // Position at end of arm
  const armLen = 0.09;
  const angle = Math.PI / 4;
  shade.position.set(armLen * Math.cos(angle), -0.01 + armLen * Math.sin(angle), 0);
  shade.rotation.z = Math.PI / 4;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.copy(shade.position);
  root.add(bulb);

  // Pull chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.1, 6);
  const chain = new THREE.Mesh(chainGeo, matMetal);
  chain.position.set(shade.position.x + 0.02, shade.position.y - 0.05, 0);
  root.add(chain);

  const chainBallGeo = new THREE.SphereGeometry(0.008, 8, 8);
  const chainBall = new THREE.Mesh(chainBallGeo, matJoint);
  chainBall.position.set(shade.position.x + 0.02, shade.position.y - 0.1, 0);
  root.add(chainBall);

  return root;
}