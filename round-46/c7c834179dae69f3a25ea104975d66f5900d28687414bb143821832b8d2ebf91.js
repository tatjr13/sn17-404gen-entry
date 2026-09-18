export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x112244, metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.8 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.4, roughness: 0.5 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.9 });

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.15), matBody);
  root.add(body);

  // Lens barrel
  const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 32), matMetal);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0, 0.125);
  root.add(lensBarrel);

  // Lens glass
  const lensGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.01, 32), matGlass);
  lensGlass.rotation.x = Math.PI / 2;
  lensGlass.position.set(0, 0, 0.175);
  root.add(lensGlass);

  // Flash
  const flash = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.05), matDark);
  flash.position.set(0, 0.15, 0);
  root.add(flash);

  // Viewfinder
  const viewfinder = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.02), matDark);
  viewfinder.position.set(0, 0.145, 0.05);
  root.add(viewfinder);

  // Shutter button
  const button = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16), matRed);
  button.position.set(0.15, 0.135, 0);
  root.add(button);

  // Dial
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.01, 16), matMetal);
  dial.position.set(-0.15, 0.13, 0);
  root.add(dial);

  // Strap lugs
  const lugGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.02, 8);
  const lug1 = new THREE.Mesh(lugGeo, matMetal);
  lug1.position.set(0.2, 0, 0);
  root.add(lug1);
  const lug2 = new THREE.Mesh(lugGeo, matMetal);
  lug2.position.set(-0.2, 0, 0);
  root.add(lug2);

  // Film advance lever
  const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8), matMetal);
  lever.rotation.z = Math.PI / 2;
  lever.position.set(0.22, 0.05, 0);
  root.add(lever);

  const leverHandle = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), matMetal);
  leverHandle.position.set(0.22, 0.125, 0);
  root.add(leverHandle);

  // Small details: focus ring on lens
  const focusRing = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.005, 8, 32), matDark);
  focusRing.position.set(0, 0, 0.1);
  root.add(focusRing);

  return root;
}