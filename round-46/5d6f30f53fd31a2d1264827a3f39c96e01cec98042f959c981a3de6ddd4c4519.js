export default function generate(THREE) {
  const root = new THREE.Group();
  
  // Materials
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.6,
    roughness: 0.3
  });
  
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.5,
    roughness: 0.4
  });
  
  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0x2a4a6b,
    metalness: 0.2,
    roughness: 0.6,
    side: THREE.DoubleSide
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
  const base = new THREE.Mesh(baseGeo, darkMetalMat);
  base.position.y = -0.42;
  root.add(base);
  
  // Base rubber pad
  const padGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.01, 24);
  const pad = new THREE.Mesh(padGeo, rubberMat);
  pad.position.y = -0.44;
  root.add(pad);
  
  // Vertical pole
  const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25, 12);
  const pole = new THREE.Mesh(poleGeo, metalMat);
  pole.position.y = -0.28;
  root.add(pole);
  
  // Joint sphere at top of pole
  const jointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const joint = new THREE.Mesh(jointGeo, darkMetalMat);
  joint.position.y = -0.155;
  root.add(joint);
  
  // Arm - angled cylinder
  const armGroup = new THREE.Group();
  armGroup.position.y = -0.155;
  
  const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 12);
  const arm = new THREE.Mesh(armGeo, metalMat);
  arm.rotation.z = Math.PI / 6;
  arm.position.x = 0.13;
  arm.position.y = 0.075;
  armGroup.add(arm);
  
  // Arm joint at end
  const armJointGeo = new THREE.SphereGeometry(0.03, 16, 16);
  const armJoint = new THREE.Mesh(armJointGeo, darkMetalMat);
  armJoint.position.x = 0.26;
  armJoint.position.y = 0.15;
  armGroup.add(armJoint);
  
  // Lamp head group
  const headGroup = new THREE.Group();
  headGroup.position.x = 0.26;
  headGroup.position.y = 0.15;
  
  // Lamp shade - cone shape
  const shadeGeo = new THREE.ConeGeometry(0.12, 0.1, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.rotation.x = Math.PI;
  shade.position.y = -0.05;
  headGroup.add(shade);
  
  // Shade rim
  const rimGeo = new THREE.TorusGeometry(0.12, 0.008, 8, 24);
  const rim = new THREE.Mesh(rimGeo, darkMetalMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.1;
  headGroup.add(rim);
  
  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.y = -0.02;
  headGroup.add(bulb);
  
  // Bulb base
  const bulbBaseGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.03, 12);
  const bulbBase = new THREE.Mesh(bulbBaseGeo, metalMat);
  bulbBase.position.y = 0.01;
  headGroup.add(bulbBase);
  
  // Socket
  const socketGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.04, 12);
  const socket = new THREE.Mesh(socketGeo, darkMetalMat);
  socket.position.y = 0.03;
  headGroup.add(socket);
  
  // Clamp mechanism on base
  const clampGeo = new THREE.BoxGeometry(0.08, 0.06, 0.04);
  const clamp = new THREE.Mesh(clampGeo, darkMetalMat);
  clamp.position.set(0.15, -0.42, 0);
  root.add(clamp);
  
  // Clamp screw
  const screwGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.05, 8);
  const screw = new THREE.Mesh(screwGeo, metalMat);
  screw.rotation.z = Math.PI / 2;
  screw.position.set(0.15, -0.42, 0.025);
  root.add(screw);
  
  // Knob on joint
  const knobGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 12);
  const knob = new THREE.Mesh(knobGeo, rubberMat);
  knob.position.set(0.035, -0.155, 0);
  root.add(knob);
  
  // Second arm segment for more interesting shape
  const arm2Group = new THREE.Group();
  arm2Group.position.set(0.26, 0.15, 0);
  
  const arm2Geo = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 12);
  const arm2 = new THREE.Mesh(arm2Geo, metalMat);
  arm2.rotation.z = -Math.PI / 4;
  arm2.position.x = 0.053;
  arm2.position.y = 0.053;
  arm2Group.add(arm2);
  
  // Second joint
  const joint2Geo = new THREE.SphereGeometry(0.025, 12, 12);
  const joint2 = new THREE.Mesh(joint2Geo, darkMetalMat);
  joint2.position.x = 0.106;
  joint2.position.y = 0.106;
  arm2Group.add(joint2);
  
  // Lamp head on second arm
  const head2Group = new THREE.Group();
  head2Group.position.set(0.106, 0.106, 0);
  
  const shade2Geo = new THREE.ConeGeometry(0.08, 0.07, 24, 1, true);
  const shade2 = new THREE.Mesh(shade2Geo, shadeMat);
  shade2.rotation.x = Math.PI;
  shade2.position.y = -0.035;
  head2Group.add(shade2);
  
  const rim2Geo = new THREE.TorusGeometry(0.08, 0.006, 8, 24);
  const rim2 = new THREE.Mesh(rim2Geo, darkMetalMat);
  rim2.rotation.x = Math.PI / 2;
  rim2.position.y = -0.07;
  head2Group.add(rim2);
  
  const bulb2Geo = new THREE.SphereGeometry(0.03, 12, 12);
  const bulb2 = new THREE.Mesh(bulb2Geo, bulbMat);
  bulb2.position.y = -0.015;
  head2Group.add(bulb2);
  
  arm2Group.add(head2Group);
  root.add(arm2Group);
  
  root.add(armGroup);
  root.add(headGroup);
  
  return root;
}