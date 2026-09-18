export default function generate(THREE) {
  const root = new THREE.Group();

  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.65,
    roughness: 0.3
  });

  const brass = new THREE.MeshStandardMaterial({
    color: 0xc9a84c,
    metalness: 0.75,
    roughness: 0.25
  });

  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xf0ead6,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide
  });

  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xfff8e7,
    metalness: 0.0,
    roughness: 0.1,
    emissive: 0xffeebb,
    emissiveIntensity: 0.4
  });

  const baseGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.035, 24);
  const base = new THREE.Mesh(baseGeo, darkMetal);
  base.position.y = -0.38;
  root.add(base);

  const baseRingGeo = new THREE.TorusGeometry(0.155, 0.006, 8, 24);
  const baseRing = new THREE.Mesh(baseRingGeo, brass);
  baseRing.position.y = -0.362;
  baseRing.rotation.x = Math.PI / 2;
  root.add(baseRing);

  const lowerArmGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.24, 12);
  const lowerArm = new THREE.Mesh(lowerArmGeo, brass);
  lowerArm.position.set(0.01, -0.21, 0);
  lowerArm.rotation.z = 0.25;
  root.add(lowerArm);

  const jointGeo = new THREE.SphereGeometry(0.022, 12, 12);
  const joint1 = new THREE.Mesh(jointGeo, darkMetal);
  joint1.position.set(0.03, -0.095, 0);
  root.add(joint1);

  const upperArmGeo = new THREE.CylinderGeometry(0.011, 0.011, 0.2, 12);
  const upperArm = new THREE.Mesh(upperArmGeo, brass);
  upperArm.position.set(0.045, 0.015, 0);
  upperArm.rotation.z = -0.35;
  root.add(upperArm);

  const joint2 = new THREE.Mesh(jointGeo, darkMetal);
  joint2.position.set(0.08, 0.115, 0);
  root.add(joint2);

  const shadeGeo = new THREE.CylinderGeometry(0.055, 0.11, 0.14, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.08, 0.21, 0);
  root.add(shade);

  const topCapGeo = new THREE.CircleGeometry(0.055, 24);
  const topCap = new THREE.Mesh(topCapGeo, shadeMat);
  topCap.position.set(0.08, 0.28, 0);
  topCap.rotation.x = -Math.PI / 2;
  root.add(topCap);

  const bulbGeo = new THREE.SphereGeometry(0.028, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.08, 0.175, 0);
  root.add(bulb);

  const socketGeo = new THREE.CylinderGeometry(0.018, 0.022, 0.035, 12);
  const socket = new THREE.Mesh(socketGeo, darkMetal);
  socket.position.set(0.08, 0.145, 0);
  root.add(socket);

  const socketRingGeo = new THREE.TorusGeometry(0.02, 0.003, 6, 12);
  const socketRing = new THREE.Mesh(socketRingGeo, brass);
  socketRing.position.set(0.08, 0.16, 0);
  socketRing.rotation.x = Math.PI / 2;
  root.add(socketRing);

  const chainGeo = new THREE.CylinderGeometry(0.0015, 0.0015, 0.1, 6);
  const chain = new THREE.Mesh(chainGeo, brass);
  chain.position.set(0.11, 0.11, 0);
  root.add(chain);

  const chainBallGeo = new THREE.SphereGeometry(0.007, 8, 8);
  const chainBall = new THREE.Mesh(chainBallGeo, brass);
  chainBall.position.set(0.11, 0.06, 0);
  root.add(chainBall);

  const finialGeo = new THREE.CylinderGeometry(0.008, 0.006, 0.015, 8);
  const finial = new THREE.Mesh(finialGeo, brass);
  finial.position.set(0.08, 0.29, 0);
  root.add(finial);

  const finialBallGeo = new THREE.SphereGeometry(0.006, 8, 8);
  const finialBall = new THREE.Mesh(finialBallGeo, brass);
  finialBall.position.set(0.08, 0.298, 0);
  root.add(finialBall);

  return root;
}