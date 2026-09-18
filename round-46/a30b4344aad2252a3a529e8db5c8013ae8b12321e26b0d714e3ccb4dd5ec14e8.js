export default function generate(THREE) {
  const root = new THREE.Group();

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.6,
    roughness: 0.3
  });

  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xf5e6c8,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0xffffaa,
    emissiveIntensity: 0.5
  });

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.7,
    roughness: 0.4
  });

  const baseGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.04, 24);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.42;
  root.add(base);

  const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 12);
  const stem = new THREE.Mesh(stemGeo, metalMat);
  stem.position.y = -0.25;
  root.add(stem);

  const armCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.1, 0),
    new THREE.Vector3(0, 0.05, 0),
    new THREE.Vector3(0.05, 0.15, 0),
    new THREE.Vector3(0.12, 0.2, 0),
    new THREE.Vector3(0.18, 0.18, 0),
    new THREE.Vector3(0.22, 0.12, 0)
  ]);

  const armGeo = new THREE.TubeGeometry(armCurve, 32, 0.012, 8, false);
  const arm = new THREE.Mesh(armGeo, metalMat);
  root.add(arm);

  const jointGeo = new THREE.SphereGeometry(0.02, 12, 12);
  const joint = new THREE.Mesh(jointGeo, metalMat);
  joint.position.set(0.22, 0.12, 0);
  root.add(joint);

  const shadeGeo = new THREE.ConeGeometry(0.12, 0.15, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.22, 0.04, 0);
  root.add(shade);

  const bulbGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.22, 0.06, 0);
  root.add(bulb);

  const switchGeo = new THREE.BoxGeometry(0.02, 0.03, 0.01);
  const switchMesh = new THREE.Mesh(switchGeo, baseMat);
  switchMesh.position.set(0.12, -0.4, 0.08);
  root.add(switchMesh);

  return root;
}