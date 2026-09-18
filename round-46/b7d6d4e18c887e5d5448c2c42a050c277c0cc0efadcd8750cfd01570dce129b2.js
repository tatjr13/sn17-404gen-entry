export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6, roughness: 0.4 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.7, roughness: 0.3 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0xF5F5DC, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xFFFFAA, emissive: 0xFFFFAA, emissiveIntensity: 0.5, metalness: 0.0, roughness: 0.5 });
  const chainMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.06, 16);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, -0.33, 0);
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8);
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(0, -0.125, 0);
  root.add(pole);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 8);
  const arm = new THREE.Mesh(armGeo, poleMat);
  arm.position.set(0.075, 0.105, 0);
  arm.rotation.z = Math.PI / 4;
  root.add(arm);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.15, 0.08, 0.12, 16, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.14, 0.22, 0);
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.03, 8, 8);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.14, 0.18, 0);
  root.add(bulb);

  // Pull chain
  const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.1, 6);
  const chain = new THREE.Mesh(chainGeo, chainMat);
  chain.position.set(0.18, 0.12, 0);
  chain.rotation.z = -Math.PI / 6;
  root.add(chain);

  // Chain knob
  const knobGeo = new THREE.SphereGeometry(0.01, 6, 6);
  const knob = new THREE.Mesh(knobGeo, chainMat);
  knob.position.set(0.18 - 0.05 * Math.sin(Math.PI/6), 0.12 - 0.05 * Math.cos(Math.PI/6), 0);
  root.add(knob);

  return root;
}