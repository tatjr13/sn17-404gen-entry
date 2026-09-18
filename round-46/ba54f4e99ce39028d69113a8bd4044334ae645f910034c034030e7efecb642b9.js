export default function generate(THREE) {
  const root = new THREE.Group();

  const matBody = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.3,
    metalness: 0.0
  });

  const matInside = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.6,
    metalness: 0.0
  });

  const matSaucer = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    roughness: 0.4,
    metalness: 0.0
  });

  const saucerGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, matSaucer);
  saucer.position.y = -0.31;
  root.add(saucer);

  const saucerRimGeo = new THREE.TorusGeometry(0.35, 0.01, 8, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, matSaucer);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.30;
  root.add(saucerRim);

  const bodyGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.55, 32);
  const body = new THREE.Mesh(bodyGeo, matBody);
  body.position.y = -0.025;
  root.add(body);

  const insideGeo = new THREE.CylinderGeometry(0.20, 0.16, 0.53, 32);
  const inside = new THREE.Mesh(insideGeo, matInside);
  inside.position.y = -0.035;
  root.add(inside);

  const rimGeo = new THREE.TorusGeometry(0.22, 0.012, 8, 32);
  const rim = new THREE.Mesh(rimGeo, matBody);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.25;
  root.add(rim);

  const handleGeo = new THREE.TorusGeometry(0.10, 0.025, 12, 24);
  const handle = new THREE.Mesh(handleGeo, matBody);
  handle.position.set(0.22, 0.0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  const attachGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 12);
  const attachTop = new THREE.Mesh(attachGeo, matBody);
  attachTop.rotation.z = Math.PI / 2;
  attachTop.position.set(0.22, 0.10, 0);
  root.add(attachTop);

  const attachBot = new THREE.Mesh(attachGeo, matBody);
  attachBot.rotation.z = Math.PI / 2;
  attachBot.position.set(0.22, -0.10, 0);
  root.add(attachBot);

  return root;
}