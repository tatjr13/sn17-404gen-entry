export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.6 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffffaa, emissiveIntensity: 0.5 });
  const matSwitch = new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.1, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, matMetal);
  base.position.y = -0.38;
  root.add(base);

  // Lower arm
  const lowerArmGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.22, 16);
  const lowerArm = new THREE.Mesh(lowerArmGeo, matMetal);
  lowerArm.position.set(0, -0.25, 0);
  lowerArm.rotation.z = Math.PI / 6; // 30 degrees
  root.add(lowerArm);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, matMetal);
  joint.position.set(0.06, -0.15, 0);
  root.add(joint);

  // Upper arm
  const upperArmGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.22, 16);
  const upperArm = new THREE.Mesh(upperArmGeo, matMetal);
  upperArm.position.set(0.06, -0.02, 0);
  upperArm.rotation.z = -Math.PI / 6; // -30 degrees
  root.add(upperArm);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.08, 0.15, 0.12, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, matDark);
  shade.position.set(0.12, 0.08, 0);
  root.add(shade);

  // Shade top cap (optional, maybe just leave open or add a small disc)
  const topCapGeo = new THREE.CircleGeometry(0.08, 32);
  const topCap = new THREE.Mesh(topCapGeo, matDark);
  topCap.position.set(0.12, 0.14, 0);
  topCap.rotation.x = -Math.PI / 2;
  root.add(topCap);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, matBulb);
  bulb.position.set(0.12, 0.05, 0);
  root.add(bulb);

  // Switch on lower arm
  const switchGeo = new THREE.BoxGeometry(0.03, 0.015, 0.025);
  const sw = new THREE.Mesh(switchGeo, matSwitch);
  sw.position.set(0.03, -0.28, 0.025);
  sw.rotation.z = Math.PI / 6;
  root.add(sw);

  // Add some details: screws on base
  const screwGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.005, 8);
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const screw = new THREE.Mesh(screwGeo, matDark);
    screw.position.set(Math.cos(angle) * 0.1, -0.36, Math.sin(angle) * 0.1);
    root.add(screw);
  }

  // Cable from base
  const cablePoints = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    cablePoints.push(new THREE.Vector3(0.14 + t * 0.1, -0.38 - t * 0.05, t * 0.05));
  }
  const cableCurve = new THREE.CatmullRomCurve3(cablePoints);
  const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.008, 8, false);
  const cable = new THREE.Mesh(cableGeo, matDark);
  root.add(cable);

  return root;
}