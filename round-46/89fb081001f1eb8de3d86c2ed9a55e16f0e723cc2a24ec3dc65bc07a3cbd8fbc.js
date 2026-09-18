export default function generate(THREE) {
  const root = new THREE.Group();
  
  // Materials
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.6,
    roughness: 0.3
  });
  
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.4,
    roughness: 0.5
  });
  
  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xf5e6c8,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0xffffaa,
    emissiveIntensity: 0.3
  });
  
  // Base - flat cylinder
  const baseGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.04, 24);
  const base = new THREE.Mesh(baseGeo, darkMat);
  base.position.y = -0.38;
  root.add(base);
  
  // Base ring detail
  const ringGeo = new THREE.TorusGeometry(0.16, 0.008, 8, 24);
  const ring = new THREE.Mesh(ringGeo, metalMat);
  ring.position.y = -0.36;
  ring.rotation.x = Math.PI / 2;
  root.add(ring);
  
  // Lower arm
  const lowerArmGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 12);
  const lowerArm = new THREE.Mesh(lowerArmGeo, metalMat);
  lowerArm.position.set(0, -0.2, 0);
  lowerArm.rotation.z = 0.3;
  root.add(lowerArm);
  
  // Joint 1
  const jointGeo = new THREE.SphereGeometry(0.02, 12, 12);
  const joint1 = new THREE.Mesh(jointGeo, darkMat);
  joint1.position.set(0.04, -0.08, 0);
  root.add(joint1);
  
  // Upper arm
  const upperArmGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.2, 12);
  const upperArm = new THREE.Mesh(upperArmGeo, metalMat);
  upperArm.position.set(0.08, 0.05, 0);
  upperArm.rotation.z = -0.5;
  root.add(upperArm);
  
  // Joint 2
  const joint2 = new THREE.Mesh(jointGeo, darkMat);
  joint2.position.set(0.15, 0.15, 0);
  root.add(joint2);
  
  // Shade - truncated cone
  const shadeGeo = new THREE.CylinderGeometry(0.06, 0.12, 0.1, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.15, 0.22, 0);
  root.add(shade);
  
  // Shade top cap
  const topCapGeo = new THREE.CircleGeometry(0.06, 24);
  const topCap = new THREE.Mesh(topCapGeo, shadeMat);
  topCap.position.set(0.15, 0.27, 0);
  topCap.rotation.x = -Math.PI / 2;
  root.add(topCap);
  
  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.025, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.15, 0.18, 0);
  root.add(bulb);
  
  // Bulb socket
  const socketGeo = new THREE.CylinderGeometry(0.015, 0.018, 0.03, 12);
  const socket = new THREE.Mesh(socketGeo, darkMat);
  socket.position.set(0.15, 0.155, 0);
  root.add(socket);
  
  return root;
}