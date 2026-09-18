export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, metalness: 0.4, roughness: 0.5 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0xb5a642, metalness: 0.6, roughness: 0.3 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0xf0e6d2, metalness: 0.1, roughness: 0.8, side: THREE.DoubleSide });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffddaa, emissiveIntensity: 0.3 });
  const jointMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.4 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.04, 24);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, -0.42, 0);
  root.add(base);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 12);
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(0, -0.25, 0);
  root.add(pole);

  // Joint
  const jointGeo = new THREE.SphereGeometry(0.03, 12, 12);
  const joint = new THREE.Mesh(jointGeo, jointMat);
  joint.position.set(0, -0.125, 0);
  root.add(joint);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.2, 12);
  const arm = new THREE.Mesh(armGeo, poleMat);
  arm.position.set(0.05, -0.038, 0);
  arm.rotation.z = -Math.PI / 6;
  root.add(arm);

  // Shade
  const shadeGeo = new THREE.ConeGeometry(0.1, 0.12, 24, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0.13, 0.099, 0);
  shade.rotation.z = -Math.PI / 6;
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.02, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.13, 0.09, 0);
  root.add(bulb);

  // Shade inner rim (optional, adds detail)
  const rimGeo = new THREE.TorusGeometry(0.1, 0.005, 8, 24);
  const rim = new THREE.Mesh(rimGeo, poleMat);
  rim.position.set(0.13, 0.099, 0);
  rim.rotation.z = -Math.PI / 6;
  rim.rotation.y = Math.PI / 2;
  root.add(rim);

  return root;
}