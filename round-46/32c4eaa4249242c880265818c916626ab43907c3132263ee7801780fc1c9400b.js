export default function generate(THREE) {
  const root = new THREE.Group();

  // Mug body profile
  const profile = [
    [0.15, 0],
    [0.15, 0.25],
    [0.12, 0.25],
    [0.12, 0.01],
    [0.01, 0.01],
    [0.01, 0],
    [0, 0]
  ];

  const bodyGeo = new THREE.LatheGeometry(profile, 32);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.4,
    metalness: 0.1
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32);
  const handle = new THREE.Mesh(handleGeo, bodyMat);
  handle.position.set(0.15, 0.125, 0);
  handle.rotation.y = Math.PI / 2;

  // Coffee liquid
  const liquidGeo = new THREE.CircleGeometry(0.11, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x3b2314,
    roughness: 0.2,
    metalness: 0.0
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.position.set(0, 0.24, 0);
  liquid.rotation.x = -Math.PI / 2;

  root.add(body);
  root.add(handle);
  root.add(liquid);

  // Center vertically
  root.position.y = -0.125;

  return root;
}