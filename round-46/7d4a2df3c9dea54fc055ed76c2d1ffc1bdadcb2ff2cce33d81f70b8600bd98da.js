export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.6, metalness: 0.2 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4, metalness: 0.3 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x4a90e2, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.8 });
  const matFlash = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.5, metalness: 0.1 });
  const matFinder = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.2 });
  const matButton = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4, metalness: 0.1 });
  const matKnob = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5, metalness: 0.4 });
  const matRing = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.5 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.28, 0.18, 0.12);
  const body = new THREE.Mesh(bodyGeo, matBody);
  root.add(body);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 32);
  const lens = new THREE.Mesh(lensGeo, matLens);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.1);
  root.add(lens);

  // Lens glass
  const glassGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.01, 32);
  const glass = new THREE.Mesh(glassGeo, matGlass);
  glass.rotation.x = Math.PI / 2;
  glass.position.set(0, 0, 0.145);
  root.add(glass);

  // Flash
  const flashGeo = new THREE.BoxGeometry(0.12, 0.04, 0.04);
  const flash = new THREE.Mesh(flashGeo, matFlash);
  flash.position.set(0, 0.11, 0);
  root.add(flash);

  // Viewfinder
  const finderGeo = new THREE.BoxGeometry(0.05, 0.03, 0.02);
  const finder = new THREE.Mesh(finderGeo, matFinder);
  finder.position.set(0.08, 0.105, 0);
  root.add(finder);

  // Shutter button
  const buttonGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 16);
  const button = new THREE.Mesh(buttonGeo, matButton);
  button.position.set(-0.1, 0.09, 0.06);
  root.add(button);

  // Film advance knob
  const knobGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 16);
  const knob = new THREE.Mesh(knobGeo, matKnob);
  knob.position.set(0.12, 0.09, 0);
  root.add(knob);

  // Strap rings
  const ringGeo = new THREE.TorusGeometry(0.008, 0.003, 8, 16);
  const ring1 = new THREE.Mesh(ringGeo, matRing);
  ring1.position.set(-0.13, 0, 0);
  root.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, matRing);
  ring2.position.set(0.13, 0, 0);
  root.add(ring2);

  // Add some detail lines on body
  const lineGeo = new THREE.BoxGeometry(0.26, 0.005, 0.125);
  const lineMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8, metalness: 0.1 });
  const line1 = new THREE.Mesh(lineGeo, lineMat);
  line1.position.set(0, 0.04, 0);
  root.add(line1);
  const line2 = new THREE.Mesh(lineGeo, lineMat);
  line2.position.set(0, -0.04, 0);
  root.add(line2);

  return root;
}