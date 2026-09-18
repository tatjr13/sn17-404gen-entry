export default function generate(THREE) {
  const root = new THREE.Group();

  const matCeramic = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.35, metalness: 0.0 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.6, metalness: 0.1 });
  const matLiquid = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.15, metalness: 0.0 });

  const bodyGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.28, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, matCeramic);
  body.position.y = 0.04;
  root.add(body);

  const bottomGeo = new THREE.CircleGeometry(0.12, 32);
  const bottom = new THREE.Mesh(bottomGeo, matCeramic);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.1;
  root.add(bottom);

  const rimGeo = new THREE.TorusGeometry(0.14, 0.012, 16, 32);
  const rim = new THREE.Mesh(rimGeo, matCeramic);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.18;
  root.add(rim);

  const liquidGeo = new THREE.CircleGeometry(0.128, 32);
  const liquid = new THREE.Mesh(liquidGeo, matLiquid);
  liquid.rotation.x = -Math.PI / 2;
  liquid.position.y = 0.16;
  root.add(liquid);

  const handleGeo = new THREE.TorusGeometry(0.07, 0.018, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, matCeramic);
  handle.position.set(0.16, 0.04, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.015, 32, 1);
  const saucer = new THREE.Mesh(saucerGeo, matCeramic);
  saucer.position.y = -0.1075;
  root.add(saucer);

  const saucerRimGeo = new THREE.TorusGeometry(0.21, 0.008, 16, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, matCeramic);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.1;
  root.add(saucerRim);

  const footGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.01, 16, 1);
  const foot = new THREE.Mesh(footGeo, matCeramic);
  foot.position.y = -0.1175;
  root.add(foot);

  return root;
}