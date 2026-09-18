export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f0,
    roughness: 0.5,
    metalness: 0.0
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.3,
    metalness: 0.7
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.8,
    metalness: 0.1
  });

  // Geometries
  const mugBodyGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.28, 32, 1, true);
  const mugBottomGeo = new THREE.CircleGeometry(0.09, 32);
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucerRimGeo = new THREE.TorusGeometry(0.22, 0.01, 16, 32);
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 16, 32, Math.PI);
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22, 12);
  const spoonBowlGeo = new THREE.SphereGeometry(0.035, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowlFlatGeo = new THREE.CircleGeometry(0.035, 16);

  // Mug Body
  const mugBody = new THREE.Mesh(mugBodyGeo, ceramicMat);
  mugBody.position.y = 0.04;
  root.add(mugBody);

  // Mug Bottom
  const mugBottom = new THREE.Mesh(mugBottomGeo, ceramicMat);
  mugBottom.rotation.x = -Math.PI / 2;
  mugBottom.position.y = -0.1;
  root.add(mugBottom);

  // Saucer
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.11;
  root.add(saucer);

  // Saucer Rim
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.1;
  root.add(saucerRim);

  // Handle
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.11, 0.04, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.11, 0, 0);
  spoonGroup.add(spoonHandle);

  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.rotation.x = -Math.PI / 2;
  spoonBowl.position.set(0.22, 0, 0);
  spoonGroup.add(spoonBowl);

  const spoonBowlFlat = new THREE.Mesh(spoonBowlFlatGeo, metalMat);
  spoonBowlFlat.rotation.x = -Math.PI / 2;
  spoonBowlFlat.position.set(0.22, 0, 0);
  spoonGroup.add(spoonBowlFlat);

  spoonGroup.rotation.y = Math.PI / 4;
  spoonGroup.position.set(0, -0.09, 0);
  root.add(spoonGroup);

  // Add a small coffee stain or liquid surface inside
  const liquidGeo = new THREE.CircleGeometry(0.105, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x3b2314,
    roughness: 0.2,
    metalness: 0.0
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.rotation.x = -Math.PI / 2;
  liquid.position.y = 0.12;
  root.add(liquid);

  return root;
}