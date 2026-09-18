export default function generate(THREE) {
  const root = new THREE.Group();

  const matBase = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.6, roughness: 0.4 });
  const matArm = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffcc, metalness: 0.0, roughness: 0.5 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xcc0000, metalness: 0.2, roughness: 0.6 });

  const baseGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16, 1);
  const base = new THREE.Mesh(baseGeo, matBase);
  base.position.set(0, -0.22, 0);
  root.add(base);

  const arm1Geo = new THREE.CylinderGeometry(0.012, 0.012, 0.22, 8, 1);
  const arm1 = new THREE.Mesh(arm1Geo, matArm);
  arm1.position.set(0, -0.10, 0);
  root.add(arm1);

  const jointGeo = new THREE.SphereGeometry(0.02, 8, 8);
  const joint = new THREE.Mesh(jointGeo, matArm);
  joint.position.set(0, 0.01, 0);
  root.add(joint);

  const arm2Geo = new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8, 1);
  const arm2 = new THREE.Mesh(arm2Geo, matArm);
  arm2.position.set(0, 0.01, 0);
  arm2.rotation.z = Math.PI / 3;
  root.add(arm2);

  const shadeGeo = new THREE.CylinderGeometry(0.04, 0.1, 0.12, 16, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matShade);
  shade.position.set(0.078, -0.035, 0);
  shade.rotation.z = Math.PI / 3;
  root.add(shade);

  const bulbGeo = new THREE.SphereGeometry(0.025, 8, 8);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.078, -0.07, 0);
  root.add(bulb);

  const switchGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 8, 1);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.03, -0.03, 0.015);
  sw.rotation.z = Math.PI / 3;
  root.add(sw);

  return root;
}