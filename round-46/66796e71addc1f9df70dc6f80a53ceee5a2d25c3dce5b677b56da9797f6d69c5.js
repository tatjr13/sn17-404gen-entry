export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.8 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6, metalness: 0.0 });

  // Mug body
  const mugBodyGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.3, 32, 1, true);
  const mugBody = new THREE.Mesh(mugBodyGeo, ceramicMat);
  mugBody.position.y = 0.05;
  root.add(mugBody);

  // Mug bottom
  const mugBottomGeo = new THREE.CircleGeometry(0.1, 32);
  const mugBottom = new THREE.Mesh(mugBottomGeo, ceramicMat);
  mugBottom.rotation.x = -Math.PI / 2;
  mugBottom.position.y = -0.1;
  root.add(mugBottom);

  // Mug interior (optional, but adds realism)
  const mugInnerGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.28, 32, 1, true);
  const mugInner = new THREE.Mesh(mugInnerGeo, darkMat);
  mugInner.position.y = 0.05;
  root.add(mugInner);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.12, 0.05, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.11;
  root.add(saucer);

  // Saucer rim
  const rimGeo = new THREE.TorusGeometry(0.22, 0.01, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.1;
  root.add(rim);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 16);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.04, 16, 16, 0, Math.PI, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.rotation.x = -Math.PI / 2;
  spoonBowl.position.x = 0.125;
  spoonGroup.add(spoonBowl);

  const spoonConnGeo = new THREE.CylinderGeometry(0.04, 0.015, 0.02, 16);
  const spoonConn = new THREE.Mesh(spoonConnGeo, metalMat);
  spoonConn.rotation.z = Math.PI / 2;
  spoonConn.position.x = 0.11;
  spoonGroup.add(spoonConn);

  spoonGroup.position.set(0.15, -0.09, 0);
  spoonGroup.rotation.y = Math.PI / 6;
  root.add(spoonGroup);

  return root;
}