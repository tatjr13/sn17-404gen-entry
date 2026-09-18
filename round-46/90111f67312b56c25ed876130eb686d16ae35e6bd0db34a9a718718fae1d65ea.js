export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.35,
    metalness: 0.0
  });

  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x2a1a0f,
    roughness: 0.7,
    metalness: 0.0
  });

  const saucerMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    roughness: 0.4,
    metalness: 0.0
  });

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, saucerMat);
  saucer.position.y = -0.16;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.24, 0.008, 8, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, saucerMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = -0.15;
  root.add(saucerRim);

  // Mug body
  const mugGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.38, 32, 1, true);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.02;
  root.add(mug);

  // Mug bottom
  const bottomGeo = new THREE.CircleGeometry(0.12, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.17;
  root.add(bottom);

  // Mug rim
  const rimGeo = new THREE.TorusGeometry(0.14, 0.012, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.21;
  root.add(rim);

  // Coffee
  const coffeeGeo = new THREE.CircleGeometry(0.135, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.19;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.07, 0.018, 12, 24);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.rotation.y = Math.PI / 2;
  handle.position.set(0.14, 0.05, 0);
  root.add(handle);

  // Spoon (optional but adds detail)
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.25, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, new THREE.MeshStandardMaterial({color: 0xcccccc, roughness: 0.2, metalness: 0.6}));
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.05, -0.14, 0.15);
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, spoonHandle.material);
  spoonBowl.rotation.x = Math.PI;
  spoonBowl.position.set(0.175, -0.14, 0.15);
  root.add(spoonBowl);

  return root;
}