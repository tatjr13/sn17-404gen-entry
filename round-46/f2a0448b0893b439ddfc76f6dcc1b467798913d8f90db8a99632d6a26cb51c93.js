export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.35,
    metalness: 0.05
  });
  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x3b2314,
    roughness: 0.7,
    metalness: 0.0
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.5,
    metalness: 0.1
  });

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.22, 0.20, 0.50, 32, 1, false);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  body.position.y = 0;
  root.add(body);

  // Inside (shell)
  const insideGeo = new THREE.CylinderGeometry(0.205, 0.185, 0.48, 32, 1, true);
  const inside = new THREE.Mesh(insideGeo, ceramicMat);
  inside.position.y = 0.01;
  root.add(inside);

  // Bottom cap
  const bottomGeo = new THREE.CircleGeometry(0.20, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.25;
  root.add(bottom);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.21, 0.015, 16, 32);
  const rim = new THREE.Mesh(rimGeo, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.25;
  root.add(rim);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.195, 0.195, 0.02, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.22;
  root.add(coffee);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.14, 0.035, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0.28, 0, 0);
  root.add(handle);

  // Handle connectors (small cylinders to blend)
  const connGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.06, 16);
  const connTop = new THREE.Mesh(connGeo, ceramicMat);
  connTop.rotation.z = Math.PI / 2;
  connTop.position.set(0.28, 0.14, 0);
  root.add(connTop);
  const connBot = new THREE.Mesh(connGeo, ceramicMat);
  connBot.rotation.z = Math.PI / 2;
  connBot.position.set(0.28, -0.14, 0);
  root.add(connBot);

  // Decorative band
  const bandGeo = new THREE.CylinderGeometry(0.225, 0.225, 0.04, 32, 1, true);
  const band = new THREE.Mesh(bandGeo, darkMat);
  band.position.y = -0.1;
  root.add(band);

  return root;
}