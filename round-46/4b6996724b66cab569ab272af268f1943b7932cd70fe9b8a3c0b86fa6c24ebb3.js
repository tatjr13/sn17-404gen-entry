export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const matPole = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.2 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffaa00, emissiveIntensity: 0.5, metalness: 0.1, roughness: 0.5 });
  const matChain = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.06, 32);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.y = -0.42;
  root.add(base);

  // Base rim
  const rimGeo = new THREE.TorusGeometry(0.15, 0.01, 16, 32);
  const rim = new THREE.Mesh(rimGeo, matBase);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.39;
  root.add(rim);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.55, 16);
  const pole = new THREE.Mesh(poleGeo, matPole);
  pole.position.y = -0.12;
  root.add(pole);

  // Pole joints
  const jointGeo = new THREE.SphereGeometry(0.02, 16, 16);
  const joint1 = new THREE.Mesh(jointGeo, matPole);
  joint1.position.y = -0.39;
  root.add(joint1);
  const joint2 = new THREE.Mesh(jointGeo, matPole);
  joint2.position.y = 0.16;
  root.add(joint2);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.1, 0.18, 0.16, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.y = 0.22;
  root.add(shade);

  // Shade top cap
  const capGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.01, 32);
  const cap = new THREE.Mesh(capGeo, matShade);
  cap.position.y = 0.30;
  root.add(cap);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.y = 0.12;
  root.add(bulb);

  // Bulb base
  const bulbBaseGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 16);
  const bulbBase = new THREE.Mesh(bulbBaseGeo, matChain);
  bulbBase.position.y = 0.09;
  root.add(bulbBase);

  // Pull chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.15, 8);
  const chain = new THREE.Mesh(chainGeo, matChain);
  chain.position.set(0.08, 0.12, 0);
  root.add(chain);

  // Chain pull
  const pullGeo = new THREE.SphereGeometry(0.012, 12, 12);
  const pull = new THREE.Mesh(pullGeo, matChain);
  pull.position.set(0.08, 0.04, 0);
  root.add(pull);

  // Decorative finial on top
  const finialGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const finial = new THREE.Mesh(finialGeo, matShade);
  finial.position.y = 0.32;
  root.add(finial);

  return root;
}