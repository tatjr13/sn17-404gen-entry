export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.7,
    roughness: 0.3
  });

  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0x2b5a4a,
    metalness: 0.1,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffffee,
    emissive: 0xffddaa,
    emissiveIntensity: 0.6,
    metalness: 0.0,
    roughness: 0.5
  });

  const switchMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.5,
    roughness: 0.4
  });

  const baseGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.365;
  root.add(base);

  const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
  const pole = new THREE.Mesh(poleGeo, baseMat);
  pole.position.y = -0.055;
  root.add(pole);

  const jointGeo = new THREE.SphereGeometry(0.03, 8, 8);
  const joint = new THREE.Mesh(jointGeo, baseMat);
  joint.position.y = 0.195;
  root.add(joint);

  const shadeGeo = new THREE.CylinderGeometry(0.08, 0.16, 0.18, 16, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.y = 0.315;
  root.add(shade);

  const bulbGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.y = 0.215;
  root.add(bulb);

  const switchGeo = new THREE.BoxGeometry(0.025, 0.05, 0.025);
  const sw = new THREE.Mesh(switchGeo, switchMat);
  sw.position.set(0.02, 0.045, 0);
  root.add(sw);

  return root;
}