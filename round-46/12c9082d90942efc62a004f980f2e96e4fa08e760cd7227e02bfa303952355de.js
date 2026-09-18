export default function generate(THREE) {
  const root = new THREE.Group();

  const matDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.3, metalness: 0.6 });
  const matBrass = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.4, metalness: 0.5 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffffaa, emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.0 });

  // Base
  const baseGeo = new THREE.BoxGeometry(0.3, 0.05, 0.3);
  const base = new THREE.Mesh(baseGeo, matDark);
  base.position.y = -0.26;
  root.add(base);

  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 16);
  const stem = new THREE.Mesh(stemGeo, matDark);
  stem.position.y = -0.04;
  root.add(stem);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.05, 0.2, 0.2, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matBrass);
  shade.position.y = 0.21;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.y = 0.11;
  root.add(bulb);

  // Switch
  const switchGeo = new THREE.BoxGeometry(0.04, 0.08, 0.02);
  const sw = new THREE.Mesh(switchGeo, matDark);
  sw.position.set(0.16, -0.14, 0);
  root.add(sw);

  // Pull chain
  const chainGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
  const chain = new THREE.Mesh(chainGeo, matDark);
  chain.position.set(0.16, -0.06, 0);
  root.add(chain);

  const chainEndGeo = new THREE.SphereGeometry(0.015, 8, 8);
  const chainEnd = new THREE.Mesh(chainEndGeo, matBrass);
  chainEnd.position.set(0.16, -0.135, 0);
  root.add(chainEnd);

  return root;
}