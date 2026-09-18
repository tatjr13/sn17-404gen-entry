export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, metalness: 0.05, roughness: 0.9, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffcc, metalness: 0.0, roughness: 0.5, emissive: 0xffffaa, emissiveIntensity: 0.2 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.8 });
  const matCord = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.2, roughness: 0.7 });

  const geoBase = new THREE.CylinderGeometry(0.12, 0.13, 0.02, 32);
  const geoStem = new THREE.CylinderGeometry(0.012, 0.012, 0.28, 16);
  const geoShade = new THREE.CylinderGeometry(0.1, 0.06, 0.12, 32, 1, true);
  const geoBulb = new THREE.SphereGeometry(0.025, 16, 12);
  const geoSwitch = new THREE.BoxGeometry(0.03, 0.015, 0.015);
  const geoCord = new THREE.CylinderGeometry(0.003, 0.003, 0.15, 8);
  const geoFinial = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 16);

  const base = new THREE.Mesh(geoBase, matBase);
  base.position.y = -0.26;
  root.add(base);

  const stem = new THREE.Mesh(geoStem, matBase);
  stem.position.y = -0.12;
  root.add(stem);

  const shade = new THREE.Mesh(geoShade, matShade);
  shade.position.y = 0.1;
  root.add(shade);

  const bulb = new THREE.Mesh(geoBulb, matBulb);
  bulb.position.y = 0.06;
  root.add(bulb);

  const switchMesh = new THREE.Mesh(geoSwitch, matSwitch);
  switchMesh.position.set(0.11, -0.255, 0);
  root.add(switchMesh);

  const cord = new THREE.Mesh(geoCord, matCord);
  cord.position.set(0.11, -0.33, 0);
  root.add(cord);

  const finial = new THREE.Mesh(geoFinial, matBase);
  finial.position.y = 0.17;
  root.add(finial);

  return root;
}