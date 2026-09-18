export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.6, roughness: 0.2 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffaa00, emissiveIntensity: 0.8, metalness: 0.1, roughness: 0.5 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.2, roughness: 0.6 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 24);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.y = -0.21;
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.32, 12);
  const pole = new THREE.Mesh(poleGeo, matBase);
  pole.position.y = -0.05;
  root.add(pole);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const joint = new THREE.Mesh(jointGeo, matBase);
  joint.position.y = 0.11;
  root.add(joint);

  // Head
  const headGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 12);
  const head = new THREE.Mesh(headGeo, matBase);
  head.position.y = 0.14;
  root.add(head);

  // Shade
  const shadeGeo = new THREE.ConeGeometry(0.13, 0.12, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.y = 0.17;
  shade.rotation.x = Math.PI; // Point down
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.y = 0.11;
  root.add(bulb);

  // Switch
  const switchGeo = new THREE.BoxGeometry(0.02, 0.04, 0.015);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.012, 0.0, 0);
  root.add(sw);

  return root;
}