export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.25, metalness: 0.0 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.0 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x2a5298, roughness: 0.4, metalness: 0.1 });
  const liquidMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.1, metalness: 0.0 });

  const bodyPts = [];
  const steps = 30;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let r;
    if (t < 0.05) r = 0.11;
    else if (t < 0.92) r = 0.11 + 0.025 * Math.sin((t - 0.05) * Math.PI);
    else r = 0.14;
    const y = (t - 0.5) * 0.38;
    bodyPts.push(new THREE.Vector2(r, y));
  }
  const bodyGeo = new THREE.LatheGeometry(bodyPts, 32);
  const body = new THREE.Mesh(bodyGeo, ceramicMat);
  root.add(body);

  const innerPts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let r;
    if (t < 0.05) r = 0.09;
    else if (t < 0.92) r = 0.09 + 0.015 * Math.sin((t - 0.05) * Math.PI);
    else r = 0.12;
    const y = (t - 0.5) * 0.38;
    innerPts.push(new THREE.Vector2(r, y));
  }
  const innerGeo = new THREE.LatheGeometry(innerPts, 32);
  const inner = new THREE.Mesh(innerGeo, darkMat);
  root.add(inner);

  const bottomGeo = new THREE.CircleGeometry(0.11, 32);
  const bottom = new THREE.Mesh(bottomGeo, ceramicMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -0.19;
  root.add(bottom);

  const handleGeo = new THREE.TorusGeometry(0.075, 0.018, 16, 32);
  const handle = new THREE.Mesh(handleGeo, ceramicMat);
  handle.position.set(0.175, 0.02, 0);
  handle.rotation.z = Math.PI / 2;
  root.add(handle);

  const saucerPts = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const r = 0.14 + 0.12 * t;
    const y = -0.21 - 0.008 * t;
    saucerPts.push(new THREE.Vector2(r, y));
  }
  const saucerGeo = new THREE.LatheGeometry(saucerPts, 32);
  const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
  root.add(saucer);

  const bandGeo = new THREE.TorusGeometry(0.125, 0.004, 8, 32);
  const band = new THREE.Mesh(bandGeo, accentMat);
  band.position.y = 0.04;
  band.rotation.x = Math.PI / 2;
  root.add(band);

  const liquidGeo = new THREE.CircleGeometry(0.115, 32);
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.rotation.x = -Math.PI / 2;
  liquid.position.y = 0.14;
  root.add(liquid);

  return root;
}