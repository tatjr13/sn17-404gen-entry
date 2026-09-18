export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, metalness: 0.1, roughness: 0.7 });
  const matGrille = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, metalness: 0.2, roughness: 0.6 });
  const matKnob = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, metalness: 0.5, roughness: 0.3 });
  const matMetal = new THREE.MeshStandardMaterial({ color: 0xB0B0B0, metalness: 0.7, roughness: 0.2 });
  const matScreen = new THREE.MeshStandardMaterial({ color: 0x0A0A0A, metalness: 0.1, roughness: 0.9 });
  const matFoot = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.8 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.4, 0.25, 0.2);
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.y = 0.025;
  root.add(body);

  // Top panel (slightly smaller, different material or same)
  const topGeo = new THREE.BoxGeometry(0.38, 0.02, 0.18);
  const top = new THREE.Mesh(topGeo, matMetal);
  top.position.y = 0.14;
  root.add(top);

  // Speaker grille area
  const grilleGeo = new THREE.BoxGeometry(0.22, 0.12, 0.005);
  const grille = new THREE.Mesh(grilleGeo, matGrille);
  grille.position.set(0, 0.025, 0.101);
  root.add(grille);

  // Grille lines
  const lineGeo = new THREE.BoxGeometry(0.22, 0.003, 0.006);
  for (let i = 0; i < 8; i++) {
    const line = new THREE.Mesh(lineGeo, matMetal);
    line.position.set(0, -0.03 + i * 0.015, 0.102);
    root.add(line);
  }

  // Screen/Display
  const screenGeo = new THREE.BoxGeometry(0.12, 0.06, 0.005);
  const screen = new THREE.Mesh(screenGeo, matScreen);
  screen.position.set(0.12, 0.025, 0.101);
  root.add(screen);

  // Screen dial
  const dialGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.006, 16);
  const dial = new THREE.Mesh(dialGeo, matMetal);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0.12, 0.025, 0.105);
  root.add(dial);

  // Knobs
  const knobGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.025, 16);
  const knobPositions = [
    [-0.12, 0.025, 0.102],
    [-0.06, 0.025, 0.102],
    [0.0, 0.025, 0.102]
  ];
  knobPositions.forEach(pos => {
    const knob = new THREE.Mesh(knobGeo, matKnob);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(...pos);
    root.add(knob);
  });

  // Antenna
  const antennaGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.18, 8);
  const antenna = new THREE.Mesh(antennaGeo, matMetal);
  antenna.position.set(-0.15, 0.24, 0);
  root.add(antenna);

  // Antenna base
  const baseGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.02, 12);
  const base = new THREE.Mesh(baseGeo, matMetal);
  base.position.set(-0.15, 0.15, 0);
  root.add(base);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.012, 12, 24);
  const handle = new THREE.Mesh(handleGeo, matMetal);
  handle.position.set(0, 0.21, 0);
  root.add(handle);

  // Feet
  const footGeo = new THREE.BoxGeometry(0.04, 0.015, 0.04);
  const footPositions = [
    [-0.16, -0.13, 0.06],
    [0.16, -0.13, 0.06],
    [-0.16, -0.13, -0.06],
    [0.16, -0.13, -0.06]
  ];
  footPositions.forEach(pos => {
    const foot = new THREE.Mesh(footGeo, matFoot);
    foot.position.set(...pos);
    root.add(foot);
  });

  // Decorative trim around body
  const trimGeo = new THREE.BoxGeometry(0.41, 0.01, 0.21);
  const trim = new THREE.Mesh(trimGeo, matMetal);
  trim.position.y = -0.095;
  root.add(trim);

  return root;
}