export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.35,
    metalness: 0.0
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.6,
    metalness: 0.0
  });

  // Mug body profile
  const profilePoints = [
    new THREE.Vector2(0, -0.3),
    new THREE.Vector2(0.22, -0.3),
    new THREE.Vector2(0.26, -0.2),
    new THREE.Vector2(0.28, 0),
    new THREE.Vector2(0.30, 0.15),
    new THREE.Vector2(0.31, 0.25),
    new THREE.Vector2(0.30, 0.3),
    new THREE.Vector2(0.28, 0.32),
    new THREE.Vector2(0, 0.32)
  ];

  const bodyGeo = new THREE.LatheGeometry(profilePoints, 32);
  const bodyMesh = new THREE.Mesh(bodyGeo, ceramicMat);
  root.add(bodyMesh);

  // Interior (bottom and inner walls) - actually LatheGeometry creates both sides if double-sided, but let's just use side: THREE.DoubleSide or create a separate inner mesh.
  // Simpler: just use DoubleSide on the body material, or create a slightly smaller lathe for interior.
  // Let's stick to DoubleSide for simplicity, or just one material.
  ceramicMat.side = THREE.DoubleSide;

  // Handle
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.30, 0.15, 0),
    new THREE.Vector3(0.45, 0.15, 0),
    new THREE.Vector3(0.52, 0.0, 0),
    new THREE.Vector3(0.45, -0.15, 0),
    new THREE.Vector3(0.30, -0.15, 0)
  ]);
  const handleGeo = new THREE.TubeGeometry(handleCurve, 24, 0.035, 12, false);
  const handleMesh = new THREE.Mesh(handleGeo, ceramicMat);
  root.add(handleMesh);

  // Add a small lip/rim detail? Maybe a torus at the top.
  const rimGeo = new THREE.TorusGeometry(0.29, 0.015, 8, 32);
  const rimMesh = new THREE.Mesh(rimGeo, ceramicMat);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.y = 0.32;
  root.add(rimMesh);

  // Add a saucer? Maybe not necessary.
  // Let's add a small coaster or just keep it simple.
  // Actually, a coffee mug is fine.

  // Center it: currently y goes from -0.3 to 0.32. Center is ~0.01. Good.
  // x/z goes to ~0.55. Fits in [-0.5, 0.5]? 0.55 is slightly over.
  // Let's scale everything down by 0.9 to be safe.
  root.scale.set(0.9, 0.9, 0.9);

  return root;
}