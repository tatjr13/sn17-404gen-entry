export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.25,
    metalness: 0.0
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.7,
    metalness: 0.0
  });

  // Mug body profile
  const profilePoints = [
    new THREE.Vector2(0, -0.2),
    new THREE.Vector2(0.15, -0.2),
    new THREE.Vector2(0.16, -0.18),
    new THREE.Vector2(0.18, -0.15),
    new THREE.Vector2(0.2, -0.1),
    new THREE.Vector2(0.22, 0),
    new THREE.Vector2(0.23, 0.1),
    new THREE.Vector2(0.22, 0.18),
    new THREE.Vector2(0.2, 0.2),
    new THREE.Vector2(0.18, 0.22),
    new THREE.Vector2(0.18, 0.24),
    new THREE.Vector2(0, 0.24)
  ];

  const bodyGeo = new THREE.LatheGeometry(profilePoints, 32);
  const bodyMesh = new THREE.Mesh(bodyGeo, ceramicMat);
  root.add(bodyMesh);

  // Handle
  const handleCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.2, 0.15, 0),
    new THREE.Vector3(0.38, 0.15, 0),
    new THREE.Vector3(0.38, -0.05, 0),
    new THREE.Vector3(0.2, -0.05, 0)
  );
  const handleGeo = new THREE.TubeGeometry(handleCurve, 24, 0.025, 8, false);
  const handleMesh = new THREE.Mesh(handleGeo, ceramicMat);
  root.add(handleMesh);

  // Saucer base
  const saucerGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32);
  const saucerMesh = new THREE.Mesh(saucerGeo, ceramicMat);
  saucerMesh.position.y = -0.21;
  root.add(saucerMesh);

  // Saucer rim
  const rimGeo = new THREE.TorusGeometry(0.3, 0.015, 8, 32);
  const rimMesh = new THREE.Mesh(rimGeo, ceramicMat);
  rimMesh.position.y = -0.2;
  rimMesh.rotation.x = Math.PI / 2;
  root.add(rimMesh);

  // Interior
  const interiorGeo = new THREE.CircleGeometry(0.17, 24);
  const interiorMesh = new THREE.Mesh(interiorGeo, darkMat);
  interiorMesh.position.y = 0.235;
  interiorMesh.rotation.x = -Math.PI / 2;
  root.add(interiorMesh);

  return root;
}