export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.5, roughness: 0.4 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0x1a4a3a, metalness: 0.2, roughness: 0.6, side: THREE.DoubleSide });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffddaa, emissiveIntensity: 0.3 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.7, roughness: 0.3 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.04, 24);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.43;
  root.add(base);

  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 12);
  const stem = new THREE.Mesh(stemGeo, metalMat);
  stem.position.y = -0.25;
  root.add(stem);

  // Finial (decorative knob at top of stem)
  const finialGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const finial = new THREE.Mesh(finialGeo, metalMat);
  finial.position.y = -0.08;
  root.add(finial);

  // Socket
  const socketGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.03, 12);
  const socket = new THREE.Mesh(socketGeo, metalMat);
  socket.position.y = -0.02;
  root.add(socket);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.028, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.y = 0.0;
  root.add(bulb);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.035, 0.14, 0.2, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.y = 0.05;
  root.add(shade);

  // Pull chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.12, 6);
  const chain = new THREE.Mesh(chainGeo, metalMat);
  chain.position.set(0.1, -0.05, 0);
  root.add(chain);

  // Chain pull (small sphere at end)
  const pullGeo = new THREE.SphereGeometry(0.008, 8, 8);
  const pull = new THREE.Mesh(pullGeo, metalMat);
  pull.position.set(0.1, -0.11, 0);
  root.add(pull);

  return root;
}