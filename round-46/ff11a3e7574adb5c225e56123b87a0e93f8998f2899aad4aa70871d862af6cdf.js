export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.2 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x4488aa, metalness: 0.0, roughness: 0.0, transparent: true, opacity: 0.6 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.2, roughness: 0.8 });
  const dialMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.3 });
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.2, roughness: 0.5 });
  const flashMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.1, roughness: 0.4 });

  // Main body
  const bodyGeo = new THREE.BoxGeometry(0.32, 0.14, 0.22);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.set(0, -0.02, 0);
  root.add(body);

  // Viewfinder hump
  const humpGeo = new THREE.BoxGeometry(0.16, 0.06, 0.14);
  const hump = new THREE.Mesh(humpGeo, bodyMat);
  hump.position.set(-0.02, 0.10, 0);
  root.add(hump);

  // Grip
  const gripGeo = new THREE.BoxGeometry(0.06, 0.12, 0.18);
  const grip = new THREE.Mesh(gripGeo, gripMat);
  grip.position.set(0.19, -0.04, 0);
  root.add(grip);

  // Lens barrel
  const barrelGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.14, 32);
  const barrel = new THREE.Mesh(barrelGeo, lensMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, -0.02, 0.18);
  root.add(barrel);

  // Lens front ring
  const frontRingGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.02, 32);
  const frontRing = new THREE.Mesh(frontRingGeo, lensMat);
  frontRing.rotation.x = Math.PI / 2;
  frontRing.position.set(0, -0.02, 0.25);
  root.add(frontRing);

  // Lens glass
  const glassGeo = new THREE.CircleGeometry(0.07, 32);
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, -0.02, 0.261);
  root.add(glass);

  // Top dials
  const dialGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 16);
  const dial1 = new THREE.Mesh(dialGeo, dialMat);
  dial1.position.set(-0.12, 0.135, 0.05);
  root.add(dial1);

  const dial2 = new THREE.Mesh(dialGeo, dialMat);
  dial2.position.set(-0.12, 0.135, -0.05);
  root.add(dial2);

  // Shutter button
  const btnGeo = new THREE.BoxGeometry(0.025, 0.01, 0.025);
  const btn = new THREE.Mesh(btnGeo, buttonMat);
  btn.position.set(0.12, 0.135, 0.06);
  root.add(btn);

  // Flash
  const flashGeo = new THREE.BoxGeometry(0.12, 0.015, 0.06);
  const flash = new THREE.Mesh(flashGeo, flashMat);
  flash.position.set(-0.02, 0.145, 0);
  root.add(flash);

  // Hot shoe
  const shoeGeo = new THREE.BoxGeometry(0.04, 0.008, 0.02);
  const shoe = new THREE.Mesh(shoeGeo, dialMat);
  shoe.position.set(-0.02, 0.155, 0);
  root.add(shoe);

  // Lens focus ring ridges
  const ridgeGeo = new THREE.TorusGeometry(0.076, 0.003, 8, 32);
  for (let i = 0; i < 3; i++) {
    const ridge = new THREE.Mesh(ridgeGeo, lensMat);
    ridge.position.set(0, -0.02, 0.12 + i * 0.03);
    root.add(ridge);
  }

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 8);
  const lug1 = new THREE.Mesh(lugGeo, dialMat);
  lug1.rotation.z = Math.PI / 2;
  lug1.position.set(-0.17, 0.0, 0);
  root.add(lug1);

  const lug2 = new THREE.Mesh(lugGeo, dialMat);
  lug2.rotation.z = Math.PI / 2;
  lug2.position.set(0.17, 0.0, 0);
  root.add(lug2);

  // Battery door
  const doorGeo = new THREE.BoxGeometry(0.04, 0.08, 0.005);
  const door = new THREE.Mesh(doorGeo, bodyMat);
  door.position.set(0.175, -0.04, 0);
  root.add(door);

  // Card slot
  const slotGeo = new THREE.BoxGeometry(0.005, 0.04, 0.06);
  const slot = new THREE.Mesh(slotGeo, bodyMat);
  slot.position.set(-0.165, -0.02, 0);
  root.add(slot);

  // Viewfinder eyepiece
  const eyeGeo = new THREE.CylinderGeometry(0.015, 0.018, 0.02, 16);
  const eye = new THREE.Mesh(eyeGeo, lensMat);
  eye.rotation.x = Math.PI / 2;
  eye.position.set(-0.02, 0.10, -0.08);
  root.add(eye);

  // AF assist lamp
  const lampGeo = new THREE.CircleGeometry(0.008, 16);
  const lamp = new THREE.Mesh(lampGeo, flashMat);
  lamp.position.set(0.08, -0.02, 0.261);
  root.add(lamp);

  // Brand plate
  const plateGeo = new THREE.BoxGeometry(0.06, 0.015, 0.002);
  const plate = new THREE.Mesh(plateGeo, dialMat);
  plate.position.set(-0.02, 0.05, 0.112);
  root.add(plate);

  return root;
}