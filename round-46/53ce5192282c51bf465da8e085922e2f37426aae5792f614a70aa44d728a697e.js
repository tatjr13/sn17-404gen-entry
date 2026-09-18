export default function generate(THREE) {
  const root = new THREE.Group();

  const mugMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.35, metalness: 0.05 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.7, metalness: 0.0 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xd32f2f, roughness: 0.4, metalness: 0.1 });

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
  const saucer = new THREE.Mesh(saucerGeo, mugMat);
  saucer.position.y = -0.14;
  root.add(saucer);

  // Mug body
  const bodyGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.24, 32);
  const body = new THREE.Mesh(bodyGeo, mugMat);
  body.position.y = -0.01;
  root.add(body);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.08, 0.025, 16, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, mugMat);
  handle.position.set(0.16, -0.01, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  // Coffee
  const coffeeGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.04, 32);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.07;
  root.add(coffee);

  // Rim
  const rimGeo = new THREE.TorusGeometry(0.16, 0.01, 16, 32);
  const rim = new THREE.Mesh(rimGeo, mugMat);
  rim.position.y = 0.11;
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  // Stripe
  const stripeGeo = new THREE.TorusGeometry(0.15, 0.005, 8, 32);
  const stripe = new THREE.Mesh(stripeGeo, stripeMat);
  stripe.position.y = 0.05;
  stripe.rotation.x = Math.PI / 2;
  root.add(stripe);

  return root;
}