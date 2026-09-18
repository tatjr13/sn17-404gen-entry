export default function generate(THREE) {
  const root = new THREE.Group();

  const matMetal = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.6, roughness: 0.3 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.6 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, metalness: 0.0, roughness: 0.2, emissive: 0x333300 });

  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.04, 32);
  const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 12);
  const arm2Geo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 12);
  const jointGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const shadeGeo = new THREE.CylinderGeometry(0.02, 0.12, 0.12, 32, 1, true);
  const bulbGeo = new THREE.SphereGeometry(0.03, 12, 12);
  const switchGeo = new THREE.BoxGeometry(0.03, 0.01, 0.01);
  const knobGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 12);
  const chainGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.08, 6);
  const chainEndGeo = new THREE.SphereGeometry(0.005, 6, 6);

  const base = new THREE.Mesh(baseGeo, matDark);
  base.position.y = -0.28;
  root.add(base);

  const arm1 = new THREE.Mesh(armGeo, matMetal);
  arm1.position.set(0, -0.125, 0);
  arm1.rotation.z = Math.PI / 8;
  root.add(arm1);

  const joint1 = new THREE.Mesh(jointGeo, matMetal);
  joint1.position.set(0.03, 0.005, 0);
  root.add(joint1);

  const arm2 = new THREE.Mesh(arm2Geo, matMetal);
  arm2.position.set(0.03, 0.10, 0);
  arm2.rotation.z = -Math.PI / 6;
  root.add(arm2);

  const joint2 = new THREE.Mesh(jointGeo, matMetal);
  joint2.position.set(0.08, 0.20, 0);
  root.add(joint2);

  const shade = new THREE.Mesh(shadeGeo, matDark);
  shade.position.set(0.08, 0.26, 0);
  shade.rotation.x = Math.PI;
  root.add(shade);

  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.08, 0.23, 0);
  root.add(bulb);

  const sw = new THREE.Mesh(switchGeo, matDark);
  sw.position.set(0.13, -0.28, 0);
  root.add(sw);

  const knob = new THREE.Mesh(knobGeo, matMetal);
  knob.position.set(-0.13, -0.28, 0);
  knob.rotation.z = Math.PI / 2;
  root.add(knob);

  const chain = new THREE.Mesh(chainGeo, matMetal);
  chain.position.set(0.08, 0.19, 0);
  root.add(chain);

  const chainEnd = new THREE.Mesh(chainEndGeo, matMetal);
  chainEnd.position.set(0.08, 0.15, 0);
  root.add(chainEnd);

  return root;
}