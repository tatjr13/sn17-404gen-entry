export default function generate(THREE) {
  const root = new THREE.Group();
  
  // Materials
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.4 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0xf5e6c8, metalness: 0.0, roughness: 0.8, side: THREE.DoubleSide });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffcc, metalness: 0.1, roughness: 0.3, emissive: 0xffffaa, emissiveIntensity: 0.5 });
  const jointMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.5, roughness: 0.3 });
  
  // Base - flat cylinder
  const baseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.38;
  root.add(base);
  
  // Base top ring
  const ringGeo = new THREE.TorusGeometry(0.18, 0.01, 8, 32);
  const ring = new THREE.Mesh(ringGeo, jointMat);
  ring.position.y = -0.36;
  ring.rotation.x = Math.PI / 2;
  root.add(ring);
  
  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const stem = new THREE.Mesh(stemGeo, baseMat);
  stem.position.y = -0.2;
  root.add(stem);
  
  // Arm - angled
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 16);
  const arm = new THREE.Mesh(armGeo, baseMat);
  arm.position.set(0.05, -0.02, 0);
  arm.rotation.z = -Math.PI / 6;
  root.add(arm);
  
  // Joint at top of stem
  const jointGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const joint1 = new THREE.Mesh(jointGeo, jointMat);
  joint1.position.set(0, -0.05, 0);
  root.add(joint1);
  
  // Joint at end of arm
  const joint2 = new THREE.Mesh(jointGeo, jointMat);
  joint2.position.set(0.12, 0.08, 0);
  root.add(joint2);
  
  // Shade - cone
  const shadeGeo = new THREE.CylinderGeometry(0.02, 0.15, 0.18, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.12, 0.18, 0);
  root.add(shade);
  
  // Shade top cap
  const capGeo = new THREE.CircleGeometry(0.02, 32);
  const cap = new THREE.Mesh(capGeo, shadeMat);
  cap.position.set(0.12, 0.27, 0);
  cap.rotation.x = -Math.PI / 2;
  root.add(cap);
  
  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.03, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.12, 0.12, 0);
  root.add(bulb);
  
  // Pull chain
  const chainGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.12, 8);
  const chain = new THREE.Mesh(chainGeo, jointMat);
  chain.position.set(0.12, 0.06, 0);
  root.add(chain);
  
  // Chain ball
  const ballGeo = new THREE.SphereGeometry(0.008, 8, 8);
  const ball = new THREE.Mesh(ballGeo, jointMat);
  ball.position.set(0.12, -0.0, 0);
  root.add(ball);
  
  return root;
}