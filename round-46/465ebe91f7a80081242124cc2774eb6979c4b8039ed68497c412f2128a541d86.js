export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.1, roughness: 0.6 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.5 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.4, roughness: 0.3 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.1, roughness: 0.5 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.1, roughness: 0.8 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.2 });
  const matFlash = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.0, roughness: 0.4 });

  // Geometries
  const geoBody = new THREE.BoxGeometry(0.4, 0.3, 0.1);
  const geoLens = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 32);
  const geoFlash = new THREE.BoxGeometry(0.12, 0.06, 0.01);
  const geoViewfinder = new THREE.BoxGeometry(0.05, 0.03, 0.01);
  const geoShutter = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16);
  const geoEject = new THREE.BoxGeometry(0.3, 0.015, 0.01);
  const geoGrip = new THREE.BoxGeometry(0.04, 0.2, 0.1);
  const geoTopPlate = new THREE.BoxGeometry(0.4, 0.01, 0.1);
  const geoBottomPlate = new THREE.BoxGeometry(0.4, 0.01, 0.1);
  const geoSidePlate = new THREE.BoxGeometry(0.01, 0.3, 0.1);
  const geoLensRing = new THREE.TorusGeometry(0.06, 0.005, 8, 32);
  const geoFlashBorder = new THREE.BoxGeometry(0.14, 0.08, 0.005);
  const geoButton = new THREE.CylinderGeometry(0.01, 0.01, 0.008, 12);
  const geoDial = new THREE.CylinderGeometry(0.02, 0.02, 0.005, 16);

  // Body
  const body = new THREE.Mesh(geoBody, matBody);
  root.add(body);

  // Top plate
  const topPlate = new THREE.Mesh(geoTopPlate, matSilver);
  topPlate.position.set(0, 0.155, 0);
  root.add(topPlate);

  // Bottom plate
  const bottomPlate = new THREE.Mesh(geoBottomPlate, matSilver);
  bottomPlate.position.set(0, -0.155, 0);
  root.add(bottomPlate);

  // Side plates
  const leftPlate = new THREE.Mesh(geoSidePlate, matSilver);
  leftPlate.position.set(-0.205, 0, 0);
  root.add(leftPlate);

  const rightPlate = new THREE.Mesh(geoSidePlate, matSilver);
  rightPlate.position.set(0.205, 0, 0);
  root.add(rightPlate);

  // Grip
  const grip = new THREE.Mesh(geoGrip, matGrip);
  grip.position.set(0.22, 0, 0);
  root.add(grip);

  // Lens assembly
  const lensGroup = new THREE.Group();
  const lens = new THREE.Mesh(geoLens, matLens);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(0, -0.02, 0.06);
  lensGroup.add(lens);

  const lensRing = new THREE.Mesh(geoLensRing, matSilver);
  lensRing.position.set(0, -0.02, 0.07);
  lensGroup.add(lensRing);

  root.add(lensGroup);

  // Flash
  const flashBorder = new THREE.Mesh(geoFlashBorder, matDark);
  flashBorder.position.set(0, 0.08, 0.052);
  root.add(flashBorder);

  const flash = new THREE.Mesh(geoFlash, matFlash);
  flash.position.set(0, 0.08, 0.055);
  root.add(flash);

  // Viewfinder
  const viewfinder = new THREE.Mesh(geoViewfinder, matDark);
  viewfinder.position.set(-0.1, 0.08, 0.055);
  root.add(viewfinder);

  // Shutter button
  const shutter = new THREE.Mesh(geoShutter, matRed);
  shutter.rotation.x = Math.PI / 2;
  shutter.position.set(0.12, 0.16, 0);
  root.add(shutter);

  // Film eject slot
  const eject = new THREE.Mesh(geoEject, matDark);
  eject.position.set(0, -0.145, 0.055);
  root.add(eject);

  // Top buttons/dials
  const dial = new THREE.Mesh(geoDial, matSilver);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(-0.12, 0.16, 0);
  root.add(dial);

  const button1 = new THREE.Mesh(geoButton, matDark);
  button1.rotation.x = Math.PI / 2;
  button1.position.set(-0.05, 0.16, 0);
  root.add(button1);

  const button2 = new THREE.Mesh(geoButton, matDark);
  button2.rotation.x = Math.PI / 2;
  button2.position.set(0.05, 0.16, 0);
  root.add(button2);

  // Front branding strip
  const strip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.01, 0.005), matSilver);
  strip.position.set(0, -0.08, 0.052);
  root.add(strip);

  // Small indicator light
  const indicator = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 8), matRed);
  indicator.position.set(0.15, 0.08, 0.055);
  root.add(indicator);

  return root;
}