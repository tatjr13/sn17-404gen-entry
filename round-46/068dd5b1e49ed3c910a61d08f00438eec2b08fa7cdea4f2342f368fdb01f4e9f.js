export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.3 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5, metalness: 0.2, side: THREE.DoubleSide });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffee, roughness: 0.2, metalness: 0.0, emissive: 0xffffaa, emissiveIntensity: 0.5 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.3, metalness: 0.6 });

  // Base
  const baseGeo = new THREE.BoxGeometry(0.22, 0.02, 0.22);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.26;
  root.add(base);

  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.3, 16);
  const stem = new THREE.Mesh(stemGeo, accentMat);
  stem.position.y = -0.11;
  root.add(stem);

  // Arm group (pivot at stem top)
  const armGroup = new THREE.Group();
  armGroup.position.y = 0.04;
  root.add(armGroup);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22, 16);
  const arm = new THREE.Mesh(armGeo, accentMat);
  arm.position.set(0.11, 0.11, 0);
  arm.rotation.z = Math.PI / 4;
  armGroup.add(arm);

  // Shade group (pivot at arm end)
  const shadeGroup = new THREE.Group();
  shadeGroup.position.set(0.22, 0.22, 0);
  armGroup.add(shadeGroup);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.035, 0.11, 0.14, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.y = -0.07;
  shadeGroup.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.022, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.y = -0.05;
  shadeGroup.add(bulb);

  // Switch on arm
  const switchGeo = new THREE.BoxGeometry(0.015, 0.008, 0.015);
  const sw = new THREE.Mesh(switchGeo, baseMat);
  sw.position.set(0.05, 0.05, 0.01);
  sw.rotation.z = Math.PI / 4;
  armGroup.add(sw);

  // Feet (4 small cylinders)
  const footGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.01, 8);
  const positions = [[-0.08, -0.27, -0.08], [0.08, -0.27, -0.08], [-0.08, -0.27, 0.08], [0.08, -0.27, 0.08]];
  positions.forEach(p => {
    const foot = new THREE.Mesh(footGeo, baseMat);
    foot.position.set(p[0], p[1], p[2]);
    root.add(foot);
  });

  return root;
}