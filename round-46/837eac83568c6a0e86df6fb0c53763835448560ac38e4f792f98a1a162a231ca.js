export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.2, metalness: 0.6 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.8, metalness: 0.0 });

  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = -0.06;
  root.add(saucer);

  const rimGeo = new THREE.TorusGeometry(0.22, 0.005, 8, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.05;
  root.add(rim);

  const mugGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.24, 32);
  const mug = new THREE.Mesh(mugGeo, ceramicMat);
  mug.position.y = 0.06;
  root.add(mug);

  const bottomGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.01, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.position.y = -0.055;
  root.add(bottom);

  const topRimGeo = new THREE.TorusGeometry(0.14, 0.008, 8, 32);
  const topRim = new THREE.Mesh(topRimGeo, ceramicMat);
  topRim.rotation.x = Math.PI / 2;
  topRim.position.y = 0.18;
  root.add(topRim);

  const coffeeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.005, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.16;
  root.add(coffee);

  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.16, 0.06, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.2, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandle.position.set(-0.15, -0.04, 0.1);
  spoonHandle.rotation.z = Math.PI / 4;
  spoonHandle.rotation.y = Math.PI / 6;
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonBowl.position.set(-0.25, -0.04, 0.18);
  spoonBowl.rotation.x = -Math.PI / 2;
  spoonBowl.rotation.z = Math.PI / 4;
  spoonBowl.scale.set(1, 0.3, 1.5);
  root.add(spoonBowl);

  return root;
}