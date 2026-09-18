export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.35,
    metalness: 0.0
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    roughness: 0.25,
    metalness: 0.65
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.5,
    metalness: 0.1
  });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.28, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.04;
  root.add(body);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.11, 0.008, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.18;
  root.add(rim);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.012, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.14, 0.04, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.015, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.12;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.18, 0.006, 12, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.112;
  root.add(saucerRim);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.006, 0.22, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(0.11, 0, 0);
  spoonBowl.rotation.z = -Math.PI / 2;
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(-0.05, -0.105, 0.05);
  spoonGroup.rotation.y = Math.PI / 4;
  root.add(spoonGroup);

  // Coffee liquid surface
  const coffeeGeo = new THREE.CircleGeometry(0.105, 32);
  const coffee = new THREE.Mesh(coffeeGeo, darkMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.16;
  root.add(coffee);

  return root;
}