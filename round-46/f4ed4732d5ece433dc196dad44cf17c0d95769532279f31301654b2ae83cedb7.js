export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7, metalness: 0.1 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.2 });
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.4, metalness: 0.3 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8, metalness: 0.0 });
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.5, metalness: 0.2 });
  const flashMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2, metalness: 0.0 });

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.3, 0.2, 0.15);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.06, 0.14, 0.12);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.18, -0.02, 0.01);
  root.add(grip);

  // Lens barrel
  const lensGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.14, 12);
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, 0, 0.14);
  root.add(lens);

  // Lens rings
  const ringGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.008, 12);
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0, 0.10 + i * 0.04);
    root.add(ring);
  }

  // Lens front element
  const frontGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.01, 12);
  const front = new THREE.Mesh(frontGeo, lensMat);
  front.rotation.x = Math.PI / 2;
  front.position.set(0, 0, 0.215);
  root.add(front);

  // Viewfinder bump
  const vfGeo = new THREE.BoxGeometry(0.06, 0.04, 0.04);
  const vf = new THREE.Mesh(vfGeo, bodyMat);
  vf.position.set(-0.05, 0.12, 0.02);
  root.add(vf);

  // Flash bump
  const flashGeo = new THREE.BoxGeometry(0.08, 0.03, 0.04);
  const flash = new THREE.Mesh(flashGeo, flashMat);
  flash.position.set(0.05, 0.115, 0.02);
  root.add(flash);

  // Mode dial
  const dialGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 12);
  const dial = new THREE.Mesh(dialGeo, buttonMat);
  dial.position.set(-0.1, 0.105, 0.02);
  root.add(dial);

  // Shutter button
  const shutterGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 8);
  const shutter = new THREE.Mesh(shutterGeo, buttonMat);
  shutter.position.set(0.12, 0.11, 0.02);
  root.add(shutter);

  // Back screen
  const screenGeo = new THREE.BoxGeometry(0.12, 0.08, 0.005);
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.1 });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(-0.02, 0.0, -0.078);
  root.add(screen);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 6);
  const lug1 = new THREE.Mesh(lugGeo, ringMat);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.15, 0.05, 0.0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, ringMat);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.15, 0.05, 0.0);
  root.add(lug2);

  // Hot shoe
  const shoeGeo = new THREE.BoxGeometry(0.04, 0.01, 0.03);
  const shoe = new THREE.Mesh(shoeGeo, ringMat);
  shoe.position.set(0, 0.105, 0.02);
  root.add(shoe);

  // Battery door
  const battGeo = new THREE.BoxGeometry(0.08, 0.1, 0.005);
  const batt = new THREE.Mesh(battGeo, bodyMat);
  batt.position.set(0.18, -0.02, -0.078);
  root.add(batt);

  // Card slot
  const cardGeo = new THREE.BoxGeometry(0.04, 0.02, 0.005);
  const card = new THREE.Mesh(cardGeo, bodyMat);
  card.position.set(0.18, 0.05, -0.078);
  root.add(card);

  // USB/HDMI ports
  const portGeo = new THREE.BoxGeometry(0.01, 0.015, 0.005);
  const port1 = new THREE.Mesh(portGeo, bodyMat);
  port1.position.set(0.15, -0.08, -0.078);
  root.add(port1);
  const port2 = new THREE.Mesh(portGeo, bodyMat);
  port2.position.set(0.15, -0.06, -0.078);
  root.add(port2);

  // Tripod mount
  const mountGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.005, 8);
  const mount = new THREE.Mesh(mountGeo, ringMat);
  mount.position.set(0, -0.102, 0.0);
  root.add(mount);

  // Lens cap ring
  const capRingGeo = new THREE.TorusGeometry(0.065, 0.005, 6, 12);
  const capRing = new THREE.Mesh(capRingGeo, ringMat);
  capRing.position.set(0, 0, 0.22);
  root.add(capRing);

  return root;
}