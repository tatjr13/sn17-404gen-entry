export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3, metalness: 0.0 });
  const liquidMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b, roughness: 0.1, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.6 });
  const saucerMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.4, metalness: 0.0 });

  // Geometries
  const mugBodyGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.25, 32);
  const mugInnerGeo = new THREE.CylinderGeometry(0.10, 0.08, 0.23, 32);
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.02, 32);
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 16, 32);
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.20, 16);
  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const liquidGeo = new THREE.CylinderGeometry(0.095, 0.075, 0.02, 32);

  // Mug Body
  const mugBody = new THREE.Mesh(mugBodyGeo, ceramicMat);
  mugBody.position.y = 0.05;
  root.add(mugBody);

  // Mug Inner (to show thickness)
  const mugInner = new THREE.Mesh(mugInnerGeo, ceramicMat);
  mugInner.position.y = 0.06;
  root.add(mugInner);

  // Saucer
  const saucer = new THREE.Mesh(saucerGeo, saucerMat);
  saucer.position.y = -0.12;
  root.add(saucer);

  // Handle
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, 0.05, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Liquid
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.position.y = 0.14;
  root.add(liquid);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.y = 0.1;
  spoonGroup.add(spoonHandle);

  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.y = 0.2;
  spoonBowl.rotation.x = Math.PI;
  spoonGroup.add(spoonBowl);

  spoonGroup.rotation.z = Math.PI / 6;
  spoonGroup.rotation.y = Math.PI / 4;
  spoonGroup.position.set(0.05, -0.10, 0.05);
  root.add(spoonGroup);

  return root;
}