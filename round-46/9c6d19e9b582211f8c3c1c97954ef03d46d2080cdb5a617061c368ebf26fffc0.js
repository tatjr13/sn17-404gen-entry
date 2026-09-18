export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matBody = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7, metalness: 0.2 });
  const matLens = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.5 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x2244aa, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.6 });
  const matFlash = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.5, metalness: 0.1 });
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.4, metalness: 0.6 });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9, metalness: 0.0 });

  // Geometries
  const geoBody = new THREE.BoxGeometry(0.6, 0.4, 0.25);
  const geoLensBarrel = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 32);
  const geoLensGlass = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 32);
  const geoFlash = new THREE.BoxGeometry(0.22, 0.12, 0.06);
  const geoViewfinder = new THREE.BoxGeometry(0.1, 0.08, 0.06);
  const geoButton = new THREE.CylinderGeometry(0.025, 0.025, 0.03, 16);
  const geoStrap = new THREE.TorusGeometry(0.02, 0.005, 8, 16);
  const geoGrip = new THREE.BoxGeometry(0.12, 0.35, 0.06);
  const geoRing = new THREE.TorusGeometry(0.13, 0.01, 8, 32);

  // Body
  const body = new THREE.Mesh(geoBody, matBody);
  root.add(body);

  // Lens
  const lensBarrel = new THREE.Mesh(geoLensBarrel, matLens);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0, 0.2);
  root.add(lensBarrel);

  const lensGlass = new THREE.Mesh(geoLensGlass, matGlass);
  lensGlass.rotation.x = Math.PI / 2;
  lensGlass.position.set(0, 0, 0.28);
  root.add(lensGlass);

  const lensRing = new THREE.Mesh(geoRing, matSilver);
  lensRing.rotation.x = Math.PI / 2;
  lensRing.position.set(0, 0, 0.25);
  root.add(lensRing);

  // Flash
  const flash = new THREE.Mesh(geoFlash, matFlash);
  flash.position.set(0, 0.26, 0);
  root.add(flash);

  // Viewfinder
  const viewfinder = new THREE.Mesh(geoViewfinder, matBody);
  viewfinder.position.set(-0.15, 0.24, 0);
  root.add(viewfinder);

  // Shutter button
  const button = new THREE.Mesh(geoButton, matSilver);
  button.rotation.x = Math.PI / 2;
  button.position.set(0.2, 0.21, 0);
  root.add(button);

  // Grip
  const grip = new THREE.Mesh(geoGrip, matGrip);
  grip.position.set(0.36, 0, 0);
  root.add(grip);

  // Strap loops
  const strapL = new THREE.Mesh(geoStrap, matSilver);
  strapL.position.set(-0.3, 0.15, 0);
  root.add(strapL);

  const strapR = new THREE.Mesh(geoStrap, matSilver);
  strapR.position.set(0.3, 0.15, 0);
  root.add(strapR);

  // Bottom plate
  const geoPlate = new THREE.BoxGeometry(0.5, 0.02, 0.2);
  const plate = new THREE.Mesh(geoPlate, matSilver);
  plate.position.set(0, -0.21, 0);
  root.add(plate);

  // Tripod mount
  const geoTripod = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
  const tripod = new THREE.Mesh(geoTripod, matSilver);
  tripod.position.set(0, -0.22, 0);
  root.add(tripod);

  // Zoom ring
  const geoZoom = new THREE.TorusGeometry(0.11, 0.008, 8, 32);
  const zoom = new THREE.Mesh(geoZoom, matSilver);
  zoom.rotation.x = Math.PI / 2;
  zoom.position.set(0, 0, 0.18);
  root.add(zoom);

  // Focus ring
  const geoFocus = new THREE.TorusGeometry(0.125, 0.005, 8, 32);
  const focus = new THREE.Mesh(geoFocus, matSilver);
  focus.rotation.x = Math.PI / 2;
  focus.position.set(0, 0, 0.22);
  root.add(focus);

  // AF assist light
  const geoAF = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 16);
  const af = new THREE.Mesh(geoAF, matFlash);
  af.rotation.x = Math.PI / 2;
  af.position.set(0.15, 0.1, 0.13);
  root.add(af);

  // Brand plate
  const geoBrand = new THREE.BoxGeometry(0.15, 0.04, 0.005);
  const brand = new THREE.Mesh(geoBrand, matSilver);
  brand.position.set(0, 0.1, 0.13);
  root.add(brand);

  return root;
}