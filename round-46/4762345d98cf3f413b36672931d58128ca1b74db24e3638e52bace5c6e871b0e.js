export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3, metalness: 0.0 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.1 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.6 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.35, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.05;
  root.add(body);

  // Mug bottom
  const bottomGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.125;
  root.add(bottom);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.14, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.225;
  root.add(rim);

  // Handle
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.14, 0.15, 0),
    new THREE.Vector3(0.28, 0.15, 0),
    new THREE.Vector3(0.30, 0.0, 0),
    new THREE.Vector3(0.28, -0.15, 0),
    new THREE.Vector3(0.14, -0.15, 0)
  ]);
  const handleGeo = new THREE.TubeGeometry(handleCurve, 32, 0.025, 12, false);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  root.add(handle);

  // Gold band
  const bandGeo = new THREE.CylinderGeometry(0.142, 0.122, 0.03, 32);
  const band = new THREE.Mesh(bandGeo, goldMat);
  band.position.y = 0.15;
  root.add(band);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.14;
  root.add(saucer);

  const saucerRimGeo = new THREE.TorusGeometry(0.21, 0.01, 16, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.13;
  root.add(saucerRim);

  // Center well on saucer
  const wellGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.01, 32);
  const well = new THREE.Mesh(wellGeo, accentMat);
  well.position.y = -0.128;
  root.add(well);

  return root;
}