export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.3, roughness: 0.6 });
  const topMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, metalness: 0.2, roughness: 0.5 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, metalness: 0.7, roughness: 0.3 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x34495e, metalness: 0.1, roughness: 0.8 });

  // Base
  const baseGeo = new THREE.BoxGeometry(0.52, 0.07, 0.22);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, -0.115, 0);
  root.add(base);

  // Top arm
  const topGeo = new THREE.BoxGeometry(0.48, 0.05, 0.20);
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.set(0.02, 0.015, 0);
  root.add(top);

  // Hinge
  const hingeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.24, 16);
  const hinge = new THREE.Mesh(hingeGeo, metalMat);
  hinge.position.set(-0.23, 0.015, 0);
  hinge.rotation.z = Math.PI / 2;
  root.add(hinge);

  // Pivot screw
  const screwGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 12);
  const screw = new THREE.Mesh(screwGeo, metalMat);
  screw.position.set(-0.23, 0.015, 0);
  screw.rotation.z = Math.PI / 2;
  root.add(screw);

  // Metal strip on top
  const stripGeo = new THREE.BoxGeometry(0.42, 0.008, 0.035);
  const strip = new THREE.Mesh(stripGeo, metalMat);
  strip.position.set(0.02, 0.045, 0);
  root.add(strip);

  // Anvil
  const anvilGeo = new THREE.BoxGeometry(0.09, 0.015, 0.14);
  const anvil = new THREE.Mesh(anvilGeo, metalMat);
  anvil.position.set(0.16, -0.075, 0);
  root.add(anvil);

  // Blade under anvil
  const bladeGeo = new THREE.BoxGeometry(0.35, 0.005, 0.02);
  const blade = new THREE.Mesh(bladeGeo, metalMat);
  blade.position.set(0.05, -0.078, 0);
  root.add(blade);

  // Grip on top arm
  const gripGeo = new THREE.BoxGeometry(0.14, 0.035, 0.17);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.15, 0.055, 0);
  root.add(grip);

  // Base plate (metal)
  const plateGeo = new THREE.BoxGeometry(0.12, 0.005, 0.16);
  const plate = new THREE.Mesh(plateGeo, metalMat);
  plate.position.set(0.16, -0.068, 0);
  root.add(plate);

  // Add some detail lines on grip
  const lineGeo = new THREE.BoxGeometry(0.005, 0.036, 0.15);
  for (let i = 0; i < 4; i++) {
    const line = new THREE.Mesh(lineGeo, metalMat);
    line.position.set(0.10 + i * 0.025, 0.055, 0);
    root.add(line);
  }

  // Center the whole thing
  // It's already roughly centered. Let's verify bounds.
  // x: -0.23 - 0.12 = -0.35 to 0.15 + 0.07 = 0.22 -> range ~0.57
  // y: -0.115 - 0.035 = -0.15 to 0.055 + 0.0175 = 0.0725 -> range ~0.22
  // z: -0.11 to 0.11
  // All within [-0.5, 0.5]. Good.

  return root;
}