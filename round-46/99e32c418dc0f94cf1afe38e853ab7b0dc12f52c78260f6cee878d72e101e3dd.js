export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.5, roughness: 0.3 });
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.1, roughness: 0.7 });
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffddaa, emissiveIntensity: 0.8, metalness: 0.0, roughness: 0.2 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.2, roughness: 0.5 });

  // Base
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 32);
  const base = new THREE.Mesh(baseGeo, metalMat);
  base.position.set(-0.1, -0.27, 0);
  root.add(base);

  // Base knob
  const knobGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.015, 16);
  const knob = new THREE.Mesh(knobGeo, darkMat);
  knob.position.set(-0.1, -0.245, 0.08);
  root.add(knob);

  // Pole
  const poleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 16);
  const pole = new THREE.Mesh(poleGeo, metalMat);
  pole.position.set(-0.1, -0.12, 0);
  root.add(pole);

  // Arm
  const armGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.25, 16);
  const arm = new THREE.Mesh(armGeo, metalMat);
  arm.position.set(-0.1, 0.03, 0);
  arm.rotation.z = Math.PI / 6; // 30 degrees
  root.add(arm);

  // Joint at pole top
  const jointGeo = new THREE.SphereGeometry(0.025, 16, 16);
  const joint = new THREE.Mesh(jointGeo, darkMat);
  joint.position.set(-0.1, 0.03, 0);
  root.add(joint);

  // Shade
  const shadeGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.12, 32, 1, true);
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  // Arm end position calculation:
  // start: (-0.1, 0.03, 0)
  // length: 0.25, angle: 30 deg
  // dx = 0.25 * cos(30) = 0.2165
  // dy = 0.25 * sin(30) = 0.125
  // end: (-0.1 + 0.2165, 0.03 + 0.125, 0) = (0.1165, 0.155, 0)
  shade.position.set(0.1165, 0.155, 0);
  shade.rotation.z = Math.PI / 6; // align with arm
  root.add(shade);

  // Bulb
  const bulbGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.1165, 0.12, 0);
  root.add(bulb);

  // Shade bottom cap (optional, but cylinder is open by default with openEnded=true)
  // Actually, I'll make shade closed or add a bottom disc.
  // Let's just use openEnded=false for shade, or add a bottom mesh.
  // I'll change shadeGeo to openEnded=false, but then it has a top cap too.
  // Better: keep openEnded=true, add bottom disc.
  const bottomGeo = new THREE.CircleGeometry(0.12, 32);
  const bottom = new THREE.Mesh(bottomGeo, shadeMat);
  bottom.position.set(0.1165, 0.095, 0);
  bottom.rotation.z = Math.PI / 6;
  root.add(bottom);

  return root;
}