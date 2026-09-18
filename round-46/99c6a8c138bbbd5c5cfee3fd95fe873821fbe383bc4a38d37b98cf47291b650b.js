export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3, metalness: 0.0 });
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.8, metalness: 0.0 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.2, metalness: 0.6 });

  // Mug body
  const mugPoints = [];
  const mugH = 0.28;
  const mugR = 0.12;
  const wallThick = 0.015;
  // Bottom outer
  mugPoints.push(new THREE.Vector2(0, 0));
  // Rounded bottom
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const angle = Math.PI / 2 * t;
    const r = wallThick + (mugR - wallThick) * Math.sin(angle);
    const y = (mugR - wallThick) * (1 - Math.cos(angle));
    mugPoints.push(new THREE.Vector2(r, y));
  }
  // Side
  const sideH = mugH - (mugR - wallThick);
  for (let i = 0; i <= 5; i++) {
    const t = i / 5;
    const r = mugR - wallThick * t;
    const y = (mugR - wallThick) + sideH * t;
    mugPoints.push(new THREE.Vector2(r, y));
  }
  // Rim outer
  mugPoints.push(new THREE.Vector2(mugR + 0.005, mugH));
  // Rim top
  mugPoints.push(new THREE.Vector2(mugR + 0.005, mugH + 0.005));
  // Rim inner
  mugPoints.push(new THREE.Vector2(mugR - wallThick, mugH + 0.005));
  // Inner wall
  for (let i = 0; i <= 5; i++) {
    const t = i / 5;
    const r = mugR - wallThick - wallThick * t;
    const y = mugH + 0.005 - sideH * t;
    mugPoints.push(new THREE.Vector2(r, y));
  }
  // Inner bottom
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const angle = Math.PI / 2 * t;
    const r = wallThick + (mugR - 2 * wallThick) * Math.sin(angle);
    const y = (mugR - 2 * wallThick) * (1 - Math.cos(angle));
    mugPoints.push(new THREE.Vector2(r, y));
  }
  mugPoints.push(new THREE.Vector2(0, 0));

  const mugGeo = new THREE.LatheGeometry(mugPoints, 32);
  const mugMesh = new THREE.Mesh(mugGeo, ceramicMat);
  mugMesh.position.y = 0.02;
  root.add(mugMesh);

  // Coffee inside
  const coffeeGeo = new THREE.CylinderGeometry(mugR - wallThick - 0.005, mugR - wallThick - 0.005, 0.01, 32);
  const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffeeMesh.position.y = mugH - 0.02;
  root.add(coffeeMesh);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.06, 0.012, 16, 32, Math.PI);
  const handleMesh = new THREE.Mesh(handleGeo, ceramicMat);
  handleMesh.position.set(mugR + 0.03, mugH * 0.55, 0);
  handleMesh.rotation.z = Math.PI / 2;
  root.add(handleMesh);

  // Saucer
  const saucerPoints = [];
  const saucerR = 0.22;
  const saucerH = 0.02;
  saucerPoints.push(new THREE.Vector2(0, 0));
  saucerPoints.push(new THREE.Vector2(saucerR, 0));
  saucerPoints.push(new THREE.Vector2(saucerR, saucerH));
  saucerPoints.push(new THREE.Vector2(saucerR - 0.05, saucerH));
  saucerPoints.push(new THREE.Vector2(saucerR - 0.05, saucerH + 0.005));
  saucerPoints.push(new THREE.Vector2(0.05, saucerH + 0.005));
  saucerPoints.push(new THREE.Vector2(0.05, saucerH + 0.01));
  saucerPoints.push(new THREE.Vector2(0, saucerH + 0.01));
  const saucerGeo = new THREE.LatheGeometry(saucerPoints, 32);
  const saucerMesh = new THREE.Mesh(saucerGeo, ceramicMat);
  saucerMesh.position.y = -0.01;
  root.add(saucerMesh);

  // Spoon
  const spoonGroup = new THREE.Group();
  // Bowl
  const spoonBowlPoints = [];
  const sbR = 0.035;
  const sbH = 0.02;
  spoonBowlPoints.push(new THREE.Vector2(0, 0));
  spoonBowlPoints.push(new THREE.Vector2(sbR, 0));
  spoonBowlPoints.push(new THREE.Vector2(sbR, sbH));
  spoonBowlPoints.push(new THREE.Vector2(0, sbH));
  const spoonBowlGeo = new THREE.LatheGeometry(spoonBowlPoints, 16);
  const spoonBowlMesh = new THREE.Mesh(spoonBowlGeo, metalMat);
  spoonGroup.add(spoonBowlMesh);

  // Handle
  const spoonHandleGeo = new THREE.CylinderGeometry(0.004, 0.003, 0.2, 8);
  const spoonHandleMesh = new THREE.Mesh(spoonHandleGeo, metalMat);
  spoonHandleMesh.position.set(0, sbH / 2 + 0.1, 0);
  spoonGroup.add(spoonHandleMesh);

  spoonGroup.rotation.z = Math.PI / 2;
  spoonGroup.position.set(0.15, 0.02, 0.1);
  root.add(spoonGroup);

  // Center everything
  // Actually, let's just position everything relative to origin so it fits in [-0.5, 0.5]
  // The current positions are fine.
  // Let's adjust saucer y to be at 0, and mug on top.
  // Actually, I'll just shift everything down by 0.05 to center vertically.
  root.position.y = -0.05;

  return root;
}