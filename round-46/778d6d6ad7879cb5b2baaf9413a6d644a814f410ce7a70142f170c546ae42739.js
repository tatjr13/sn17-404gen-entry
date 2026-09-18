export default function generate(THREE) {
  const root = new THREE.Group();

  const matDark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.5, roughness: 0.4 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.6, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffddaa, emissiveIntensity: 0.8, metalness: 0.1, roughness: 0.2 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.2, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.03, 32);
  const base = new THREE.Mesh(baseGeo, matDark);
  base.position.y = -0.25;
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.018, 0.02, 0.32, 16);
  const pole = new THREE.Mesh(poleGeo, matDark);
  pole.position.y = -0.08;
  root.add(pole);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.22, 16);
  const arm = new THREE.Mesh(armGeo, matDark);
  arm.position.set(0.055, 0.1, 0);
  arm.rotation.z = Math.PI / 6; // 30 degrees
  root.add(arm);

  // Joint at top of pole
  const jointGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matDark);
  joint.position.set(0, 0.08, 0);
  root.add(joint);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.04, 0.11, 0.14, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.16, 0.18, 0);
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.16, 0.12, 0);
  root.add(bulb);

  // Bulb socket
  const socketGeo = new THREE.CylinderGeometry(0.015, 0.018, 0.03, 16);
  const socket = new THREE.Mesh(socketGeo, matDark);
  socket.position.set(0.16, 0.145, 0);
  root.add(socket);

  // Switch on pole
  const switchGeo = new THREE.BoxGeometry(0.03, 0.04, 0.02);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.025, -0.05, 0);
  root.add(sw);

  // Cable
  const cableGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
  const cable = new THREE.Mesh(cableGeo, matDark);
  cable.position.set(-0.12, -0.28, 0);
  cable.rotation.z = Math.PI / 4;
  root.add(cable);

  return root;
}