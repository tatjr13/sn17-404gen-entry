export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.6, roughness: 0.4 });
  const matPole = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.3 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.5, roughness: 0.5 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, metalness: 0.0, roughness: 0.2, emissive: 0xffffaa, emissiveIntensity: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.06, 24);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.y = -0.37;
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.45, 12);
  const pole = new THREE.Mesh(poleGeo, matPole);
  pole.position.y = -0.12;
  root.add(pole);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matJoint);
  joint.position.y = 0.1;
  root.add(joint);

  // Arm group
  const armGroup = new THREE.Group();
  armGroup.position.y = 0.1;
  armGroup.rotation.z = -Math.PI / 6; // tilt up slightly
  root.add(armGroup);

  const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 12);
  const arm = new THREE.Mesh(armGeo, matPole);
  arm.position.y = 0.175;
  armGroup.add(arm);

  // Shade group
  const shadeGroup = new THREE.Group();
  shadeGroup.position.y = 0.35;
  armGroup.add(shadeGroup);

  const shadeGeo = new THREE.CylinderGeometry(0.02, 0.13, 0.18, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.y = -0.09;
  shadeGroup.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.y = -0.02;
  shadeGroup.add(bulb);

  // Add a small finial on top of pole? Maybe not needed.
  // Add a base ring detail?
  const ringGeo = new THREE.TorusGeometry(0.15, 0.008, 8, 24);
  const ring = new THREE.Mesh(ringGeo, matPole);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.34;
  root.add(ring);

  return root;
}