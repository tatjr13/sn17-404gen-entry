export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const matDarkMetal = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const matShade = new THREE.MeshStandardMaterial({ color: 0xf5f0e6, metalness: 0.05, roughness: 0.8 });
  const matBulb = new THREE.MeshStandardMaterial({ color: 0xffffee, metalness: 0.0, roughness: 0.2, emissive: 0xffaa00, emissiveIntensity: 0.6 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8, roughness: 0.2 });
  const matChain = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6, roughness: 0.4 });

  // Geometries
  const geoBase = new THREE.CylinderGeometry(0.25, 0.28, 0.06, 32);
  const geoArm = new THREE.CylinderGeometry(0.03, 0.03, 1, 16); // scale Y for length
  const geoJoint = new THREE.SphereGeometry(0.045, 16, 16);
  const geoShade = new THREE.CylinderGeometry(0.05, 0.18, 0.15, 32, 1, true);
  const geoBulb = new THREE.SphereGeometry(0.04, 16, 16);
  const geoChain = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
  const geoChainEnd = new THREE.SphereGeometry(0.012, 8, 8);

  // Base
  const base = new THREE.Mesh(geoBase, matDarkMetal);
  base.position.y = -0.35;
  root.add(base);

  // Lower arm
  const lowerArm = new THREE.Mesh(geoArm, matDarkMetal);
  lowerArm.scale.y = 0.35;
  lowerArm.position.y = -0.32 + 0.175; // center of arm
  root.add(lowerArm);

  // Joint
  const joint = new THREE.Mesh(geoJoint, matJoint);
  joint.position.y = 0.03;
  root.add(joint);

  // Upper arm
  const upperArm = new THREE.Mesh(geoArm, matDarkMetal);
  upperArm.scale.y = 0.3;
  upperArm.position.y = 0.03 + 0.15;
  root.add(upperArm);

  // Shade
  const shade = new THREE.Mesh(geoShade, matShade);
  shade.position.y = 0.33;
  root.add(shade);

  // Bulb
  const bulb = new THREE.Mesh(geoBulb, matBulb);
  bulb.position.y = 0.25;
  root.add(bulb);

  // Pull chain
  const chain = new THREE.Mesh(geoChain, matChain);
  chain.position.set(0.12, 0.28, 0);
  root.add(chain);

  const chainEnd = new THREE.Mesh(geoChainEnd, matChain);
  chainEnd.position.set(0.12, 0.205, 0);
  root.add(chainEnd);

  // Add some decorative rings on the base
  const geoRing = new THREE.TorusGeometry(0.26, 0.01, 8, 32);
  const ring1 = new THREE.Mesh(geoRing, matJoint);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = -0.32;
  root.add(ring1);

  const ring2 = new THREE.Mesh(geoRing, matJoint);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -0.38;
  root.add(ring2);

  // Add a small knob on the joint
  const geoKnob = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 12);
  const knob = new THREE.Mesh(geoKnob, matJoint);
  knob.rotation.z = Math.PI / 2;
  knob.position.set(0.045, 0.03, 0);
  root.add(knob);

  return root;
}