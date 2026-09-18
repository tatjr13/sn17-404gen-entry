export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.4, metalness: 0.1 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.2 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.35, 32, 1, true);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = -0.05;
  root.add(body);

  // Mug bottom
  const bottomGeo = new THREE.CircleGeometry(0.15, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.225;
  root.add(bottom);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.12, 0.025, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.22, 0, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.28, 0.26, 0.03, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.24;
  root.add(saucer);

  // Coffee liquid
  const liquidGeo = new THREE.CircleGeometry(0.17, 32);
  const liquidMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b, roughness: 0.3, metalness: 0.0 });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.rotation.x = -Math.PI / 2;
  liquid.position.y = 0.12;
  root.add(liquid);

  return root;
}