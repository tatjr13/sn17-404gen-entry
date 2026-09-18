export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0f, roughness: 0.7, metalness: 0.0 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5, metalness: 0.1 });

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.36, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0.18;
  root.add(body);

  // Mug inside (to hide back faces if viewed from top, though not strictly necessary)
  // Actually, just a coffee surface is enough.

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.005, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.33;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.11, 0.022, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = Math.PI / 2;
  handle.position.set(0.18, 0.18, 0);
  root.add(handle);

  // Handle connectors (small boxes to blend into body)
  const connGeo = new THREE.BoxGeometry(0.04, 0.06, 0.04);
  const conn1 = new THREE.Mesh(connGeo, ceramicMat);
  conn1.position.set(0.18, 0.26, 0);
  root.add(conn1);
  const conn2 = new THREE.Mesh(connGeo, ceramicMat);
  conn2.position.set(0.18, 0.10, 0);
  root.add(conn2);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.18, 0.006, 12, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.36;
  root.add(rim);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.015, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  saucer.position.y = 0.0075;
  root.add(saucer);

  // Saucer rim
  const saucerRimGeo = new THREE.TorusGeometry(0.28, 0.004, 12, 32);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = 0.015;
  root.add(saucerRim);

  // Saucer inner depression
  const innerGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.005, 32);
  const inner = new THREE.Mesh(innerGeo, ceramicMat);
  inner.position.y = 0.012;
  root.add(inner);

  // Logo/Label
  const logoGeo = new THREE.BoxGeometry(0.09, 0.04, 0.002);
  const logo = new THREE.Mesh(logoGeo, darkMat);
  logo.position.set(0, 0.18, 0.181);
  root.add(logo);

  // Spoon on saucer
  const spoonHandleGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22, 8);
  const spoonHandle = new THREE.Mesh(spoonHandleGeo, darkMat);
  spoonHandle.rotation.z = Math.PI / 2;
  spoonHandle.position.set(0.15, 0.02, 0.15);
  root.add(spoonHandle);

  const spoonBowlGeo = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const spoonBowl = new THREE.Mesh(spoonBowlGeo, darkMat);
  spoonBowl.rotation.x = -Math.PI / 2;
  spoonBowl.position.set(0.26, 0.02, 0.15);
  root.add(spoonBowl);

  return root;
}