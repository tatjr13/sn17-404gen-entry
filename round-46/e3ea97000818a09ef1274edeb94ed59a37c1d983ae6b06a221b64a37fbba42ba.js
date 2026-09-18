export default function generate(THREE) {
  const root = new THREE.Group();

  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.4 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.3 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, metalness: 0.1, roughness: 0.6 });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffee, metalness: 0.0, roughness: 0.2, emissive: 0xffffaa, emissiveIntensity: 0.5 });
  const switchMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.4, roughness: 0.3 });

  const baseGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.05, 32);
  const base = new THREE.Mesh(baseGeo, darkMat);
  base.position.y = -0.4;
  root.add(base);

  const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.575, 16);
  const pole = new THREE.Mesh(poleGeo, metalMat);
  pole.position.y = -0.1125;
  root.add(pole);

  const shadeGeo = new THREE.CylinderGeometry(0.02, 0.12, 0.15, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.y = 0.275;
  root.add(shade);

  const bulbGeo = new THREE.SphereGeometry(0.03, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.y = 0.25;
  root.add(bulb);

  const switchGeo = new THREE.BoxGeometry(0.015, 0.04, 0.015);
  const switchMesh = new THREE.Mesh(switchGeo, switchMat);
  switchMesh.position.set(0.025, -0.15, 0);
  root.add(switchMesh);

  const finialGeo = new THREE.SphereGeometry(0.02, 16, 16);
  const finial = new THREE.Mesh(finialGeo, metalMat);
  finial.position.y = 0.35;
  root.add(finial);

  return root;
}