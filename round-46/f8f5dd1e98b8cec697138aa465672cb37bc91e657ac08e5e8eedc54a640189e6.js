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
  
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    metalness: 0.1,
    roughness: 0.2,
    emissive: 0xffffaa,
    emissiveIntensity: 0.3
  });
  
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.0,
    roughness: 0.9
  });
  
  // Base - flat cylinder
  const baseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.04, 24);
  const base = new THREE.Mesh(baseGeo, darkMat);
  base.position.y = -0.42;
  root.add(base);
  
  // Base rubber pad
  const padGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.01, 24);
  const pad = new THREE.Mesh(padGeo, rubberMat);
  pad.position.y = -0.44;
  root.add(pad);
  
  // Lower arm
  const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12);
  const lowerArm = new THREE.Mesh(armGeo, metalMat);
  lowerArm.position.set(0, -0.25, 0);
  lowerArm.rotation.z = 0.3;
  root.add(lowerArm);
  
  // Joint
  const jointGeo = new THREE.SphereGeometry(0.03, 12, 12);
  const joint = new THREE.Mesh(jointGeo, darkMat);
  joint.position.set(0.05, -0.09, 0);
  root.add(joint);
  
  // Upper arm
  const upperArm = new THREE.Mesh(armGeo, metalMat);
  upperArm.position.set(0.08, 0.05, 0);
  upperArm.rotation.z = -0.5;
  root.add(upperArm);
  
  // Head joint
  const headJoint = new THREE.Mesh(jointGeo, darkMat);
  headJoint.position.set(0.15, 0.18, 0);
  root.add(headJoint);
  
  // Lamp head - truncated cone
  const headGeo = new THREE.CylinderGeometry(0.06, 0.12, 0.15, 24, 1, true);
  const head = new THREE.Mesh(headGeo, metalMat);
  head.position.set(0.15, 0.25, 0);
  head.rotation.z = -0.3;
  root.add(head);
  
  // Head cap
  const capGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.01, 24);
  const cap = new THREE.Mesh(capGeo, darkMat);
  cap.position.set(0.15, 0.32, 0);
  cap.rotation.z = -0.3;
  root.add(cap);
  
  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.04, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.12, 0.18, 0);
  root.add(bulb);
  
  // Bulb base
  const bulbBaseGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.03, 12);
  const bulbBase = new THREE.Mesh(bulbBaseGeo, darkMat);
  bulbBase.position.set(0.13, 0.21, 0);
  root.add(bulbBase);
  
  return root;
}