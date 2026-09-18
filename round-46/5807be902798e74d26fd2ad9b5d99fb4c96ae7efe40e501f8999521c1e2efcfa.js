export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.3, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.6 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.8, metalness: 0.0 });

  // Mug body
  const mugProfile = [
    new THREE.Vector2(0.12, 0),
    new THREE.Vector2(0.13, 0.02),
    new THREE.Vector2(0.14, 0.05),
    new THREE.Vector2(0.15, 0.1),
    new THREE.Vector2(0.16, 0.15),
    new THREE.Vector2(0.17, 0.2),
    new THREE.Vector2(0.18, 0.25),
    new THREE.Vector2(0.19, 0.3),
    new THREE.Vector2(0.20, 0.35),
    new THREE.Vector2(0.21, 0.38),
    new THREE.Vector2(0.22, 0.40)
  ];
  const mugGeo = new THREE.LatheGeometry(mugProfile, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.05;
  root.add(mug);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.22, 0.25, 0);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = Math.PI / 4;
  root.add(handle);

  // Saucer
  const saucerProfile = [
    new THREE.Vector2(0.02, 0),
    new THREE.Vector2(0.05, 0.01),
    new THREE.Vector2(0.10, 0.02),
    new THREE.Vector2(0.15, 0.03),
    new THREE.Vector2(0.20, 0.04),
    new THREE.Vector2(0.25, 0.05),
    new THREE.Vector2(0.28, 0.06),
    new THREE.Vector2(0.30, 0.07)
  ];
  const saucerGeo = new THREE.LatheGeometry(saucerProfile, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = 0;
  root.add(saucer);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.02, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.38;
  root.add(coffee);

  // Spoon
  const spoonGroup = new THREE.Group();
  const spoonHandleGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.35, 12);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.y = 0.175;
  spoonGroup.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.04, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.y = 0.35;
  spoonBowl.rotation.x = Math.PI;
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(-0.15, 0.05, 0.1);
  spoonGroup.rotation.z = Math.PI / 6;
  spoonGroup.rotation.y = -Math.PI / 4;
  root.add(spoonGroup);

  // Scale to fit in unit cube
  root.scale.set(0.8, 0.8, 0.8);

  return root;
}