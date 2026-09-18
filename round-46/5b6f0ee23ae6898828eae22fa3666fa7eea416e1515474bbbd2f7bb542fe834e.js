export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.35,
    metalness: 0.0
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.6,
    metalness: 0.0
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    roughness: 0.2,
    metalness: 0.75
  });

  // Geometries
  const mugBodyGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.22, 32);
  const mugRimGeo = new THREE.TorusGeometry(0.12, 0.012, 16, 32);
  const mugInnerGeo = new THREE.CylinderGeometry(0.105, 0.085, 0.20, 32);
  const handleGeo = new THREE.TorusGeometry(0.055, 0.014, 16, 32);
  const saucerGeo = new THREE.CylinderGeometry(0.20, 0.18, 0.02, 32);
  const saucerRimGeo = new THREE.TorusGeometry(0.19, 0.008, 16, 32);
  const spoonHandleGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.22, 12);
  const spoonBowlGeo = new THREE.SphereGeometry(0.028, 16, 16);

  // Mug body
  const mugBody = new THREE.Mesh(mugBodyGeo, ceramicMat);
  mugBody.position.set(0, 0, 0);
  root.add(mugBody);

  // Mug rim
  const mugRim = new THREE.Mesh(mugRimGeo, ceramicMat);
  mugRim.position.set(0, 0.11, 0);
  mugRim.rotation.x = Math.PI / 2;
  root.add(mugRim);

  // Mug interior
  const mugInner = new THREE.Mesh(mugInnerGeo, darkMat);
  mugInner.position.set(0, 0.01, 0);
  root.add(mugInner);

  // Handle
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, 0, 0);
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.set(0, -0.12, 0);
  root.add(saucer);

  // Saucer rim
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.position.set(0, -0.11, 0);
  saucerRim.rotation.x = Math.PI / 2;
  root.add(saucerRim);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonGroup.add(spoonHandle);

  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.11, 0, 0);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(0.05, -0.11, 0.12);
  spoonGroup.rotation.y = Math.PI / 4;
  root.add(spoonGroup);

  return root;
}