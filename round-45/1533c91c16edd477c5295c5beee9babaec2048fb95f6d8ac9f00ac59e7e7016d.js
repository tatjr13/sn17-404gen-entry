export default function generate(THREE) {
  const root = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.4,
    metalness: 0.1
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.2,
    metalness: 0.5
  });
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0xecf0f1,
    roughness: 0.5,
    metalness: 0.0
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xe74c3c,
    roughness: 0.3,
    metalness: 0.2
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.7,
    metalness: 0.1
  });

  // Geometries
  const baseGeo = new THREE.BoxGeometry(0.8, 0.05, 0.5);
  const screenGeo = new THREE.BoxGeometry(0.7, 0.02, 0.45);
  const keyGeo = new THREE.BoxGeometry(0.04, 0.01, 0.04);
  const standGeo = new THREE.CylinderGeometry(0.02, 0.03, 0.05, 16);
  const knobGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 16);
  const knobTopGeo = new THREE.SphereGeometry(0.015, 16, 16);

  // Base
  const base = new THREE.Mesh(baseGeo, bodyMat);
  base.position.y = -0.025;
  root.add(base);

  // Screen
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.01, -0.05);
  root.add(screen);

  // Screen content (simple grid lines)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x333333 });
  for (let i = -0.3; i <= 0.3; i += 0.1) {
    const points = [
      new THREE.Vector3(i, 0.021, -0.25),
      new THREE.Vector3(i, 0.021, 0.15)
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeo, lineMat);
    root.add(line);
  }
  for (let j = -0.25; j <= 0.15; j += 0.1) {
    const points = [
      new THREE.Vector3(-0.35, 0.021, j),
      new THREE.Vector3(0.35, 0.021, j)
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeo, lineMat);
    root.add(line);
  }

  // Keys
  const keyPositions = [];
  const rows = 4;
  const cols = 10;
  const keySpacingX = 0.06;
  const keySpacingZ = 0.06;
  const startX = -0.25;
  const startZ = 0.1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * keySpacingX;
      const z = startZ + r * keySpacingZ;
      keyPositions.push(new THREE.Vector3(x, 0.005, z));
    }
  }

  const keysMesh = new THREE.InstancedMesh(keyGeo, keyMat, keyPositions.length);
  const dummy = new THREE.Object3D();
  keyPositions.forEach((pos, i) => {
    dummy.position.copy(pos);
    dummy.updateMatrix();
    keysMesh.setMatrixAt(i, dummy.matrix);
  });
  root.add(keysMesh);

  // Stand
  const stand = new THREE.Mesh(standGeo, darkMat);
  stand.position.set(0, 0.025, -0.2);
  root.add(stand);

  // Knobs
  const knob1 = new THREE.Mesh(knobGeo, accentMat);
  knob1.position.set(-0.1, 0.06, -0.2);
  root.add(knob1);
  const knob1Top = new THREE.Mesh(knobTopGeo, accentMat);
  knob1Top.position.set(-0.1, 0.07, -0.2);
  root.add(knob1Top);

  const knob2 = new THREE.Mesh(knobGeo, accentMat);
  knob2.position.set(0.1, 0.06, -0.2);
  root.add(knob2);
  const knob2Top = new THREE.Mesh(knobTopGeo, accentMat);
  knob2Top.position.set(0.1, 0.07, -0.2);
  root.add(knob2Top);

  // Power button
  const powerBtnGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.005, 16);
  const powerBtn = new THREE.Mesh(powerBtnGeo, accentMat);
  powerBtn.position.set(0.35, 0.0025, 0.35);
  root.add(powerBtn);

  // LED indicator
  const ledGeo = new THREE.SphereGeometry(0.005, 8, 8);
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.0
  });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0.35, 0.005, 0.3);
  root.add(led);

  return root;
}