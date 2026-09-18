export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7, metalness: 0.2 });
  const matTop = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5, metalness: 0.3 });
  const matAccent = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.1 });
  const matMetal = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.3, metalness: 0.6 });

  const geoBase = new THREE.BoxGeometry(0.6, 0.1, 0.25);
  const geoTop = new THREE.BoxGeometry(0.55, 0.08, 0.22);
  const geoHinge = new THREE.CylinderGeometry(0.025, 0.025, 0.24, 12);
  const geoAnvil = new THREE.BoxGeometry(0.14, 0.02, 0.07);
  const geoStrip = new THREE.BoxGeometry(0.1, 0.015, 0.05);
  const geoFoot = new THREE.BoxGeometry(0.06, 0.02, 0.06);
  const geoGuide = new THREE.CylinderGeometry(0.01, 0.01, 0.03, 8);
  const geoSpring = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8);

  const base = new THREE.Mesh(geoBase, matBase);
  base.position.set(0, -0.15, 0);
  root.add(base);

  const top = new THREE.Mesh(geoTop, matTop);
  top.position.set(0, 0.05, 0);
  top.rotation.z = -0.25;
  root.add(top);

  const hinge = new THREE.Mesh(geoHinge, matMetal);
  hinge.position.set(0, -0.05, 0);
  root.add(hinge);

  const anvil = new THREE.Mesh(geoAnvil, matMetal);
  anvil.position.set(0.22, -0.1, 0);
  root.add(anvil);

  const strip = new THREE.Mesh(geoStrip, matAccent);
  strip.position.set(-0.15, 0.12, 0);
  root.add(strip);

  const footPositions = [
    [0.25, -0.2, 0.09], [-0.25, -0.2, 0.09],
    [0.25, -0.2, -0.09], [-0.25, -0.2, -0.09]
  ];
  footPositions.forEach(p => {
    const foot = new THREE.Mesh(geoFoot, matBase);
    foot.position.set(...p);
    root.add(foot);
  });

  const guidePositions = [
    [0.22, -0.08, 0.02], [0.22, -0.08, -0.02]
  ];
  guidePositions.forEach(p => {
    const guide = new THREE.Mesh(geoGuide, matMetal);
    guide.position.set(...p);
    root.add(guide);
  });

  const spring = new THREE.Mesh(geoSpring, matMetal);
  spring.position.set(0.05, -0.02, 0);
  root.add(spring);

  return root;
}