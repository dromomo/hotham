/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import './Rotation.css';
import { Euler } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Z_Axis: THREE.Mesh;
    Z_Axis_1: THREE.Mesh;
    Z_Axis_2: THREE.Mesh;
    left_quest2_mesh: THREE.Mesh;
  };
  materials: {
    Blue: THREE.MeshStandardMaterial;
    Green: THREE.MeshStandardMaterial;
    Red: THREE.MeshStandardMaterial;
    ['shell:quest2ControllerMAT']: THREE.MeshStandardMaterial;
  };
};

function degreesToRadians(degrees: number): number {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function radiansToDegrees(radians: number): number {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    '/axis_widget.glb'
  ) as unknown as GLTFResult;
  return (
    <group rotation={props.rotation} ref={group} {...props} dispose={null}>
      <group userData={{ name: 'Axis Helper' }}>
        <group userData={{ name: '3D Widget' }}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Z_Axis.geometry}
            material={materials.Blue}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Z_Axis_1.geometry}
            material={materials.Green}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Z_Axis_2.geometry}
            material={materials.Red}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.left_quest2_mesh.geometry}
          material={materials['shell:quest2ControllerMAT']}
          userData={{ name: 'left_quest2_mesh' }}
        />
      </group>
      <group userData={{ name: 'right_quest2_controller_world' }} />
    </group>
  );
}

interface RotationProps {
  rotation: THREE.Euler;
  setRotation: (r: THREE.Euler) => void;
}

function RotationEditor({ rotation, setRotation }: RotationProps): JSX.Element {
  const quaternion = new THREE.Quaternion();
  quaternion.setFromEuler(rotation);
  return (
    <div className="RotationEditor">
      <form>
        <label>
          X:
          <input
            onChange={(e) =>
              setRotation(
                new THREE.Euler(
                  degreesToRadians(parseFloat(e.target.value)),
                  rotation.y,
                  rotation.z
                )
              )
            }
            type="number"
            value={radiansToDegrees(rotation.x)}
          />
        </label>
        <label>
          Y:
          <input
            onChange={(e) =>
              setRotation(
                new THREE.Euler(
                  rotation.x,
                  degreesToRadians(parseFloat(e.target.value)),
                  rotation.z
                )
              )
            }
            type="number"
            value={radiansToDegrees(rotation.y)}
          />
        </label>
        <label>
          Z:
          <input
            onChange={(e) =>
              setRotation(
                new THREE.Euler(
                  rotation.x,
                  rotation.y,
                  degreesToRadians(parseFloat(e.target.value))
                )
              )
            }
            type="number"
            value={radiansToDegrees(rotation.z)}
          />
        </label>
      </form>
    </div>
  );
}

function prettyQuaternion(q: THREE.Quaternion): string {
  return `Quaternion::new(${q.w}, ${q.x}, ${q.y}, ${q.z})`;
}

function prettyEuler(e: THREE.Euler): string {
  return `[${radiansToDegrees(e.x)}, ${radiansToDegrees(
    e.y
  )}, ${radiansToDegrees(e.z)}]`;
}

function QuaternionMultiplier(props: {
  rotationResult: THREE.Euler;
  rotationA: THREE.Euler;
  rotationB: THREE.Euler;
  setRotation: (r: THREE.Euler) => void;
}): JSX.Element {
  const [q1, setq1] = useState<THREE.Quaternion>(new THREE.Quaternion());
  const [q2, setq2] = useState<THREE.Quaternion>(new THREE.Quaternion());
  const { rotationResult, rotationA, rotationB, setRotation } = props;

  const result = new THREE.Quaternion();
  result.setFromEuler(rotationResult);

  useEffect(() => {
    const _q1 = new THREE.Quaternion();
    _q1.setFromEuler(rotationA);
    setq1(_q1);

    const _q2 = new THREE.Quaternion();
    _q2.setFromEuler(rotationB);
    setq2(_q2);

    const resultEuler = new THREE.Euler();
    const result = _q1.multiply(_q2);
    resultEuler.setFromQuaternion(result);

    setRotation(resultEuler);
  }, [setRotation, rotationA, rotationB]);

  return (
    <div className="RotationEditor">
      <div>
        <p>Q1:</p>
        <code>{prettyQuaternion(q1)}</code>
      </div>
      <div>
        <p>Q2:</p>
        <code>{prettyQuaternion(q2)}</code>
      </div>
      <div>
        <p>Q1 * Q2:</p>
        <code>{prettyQuaternion(result)}</code>
        <br />
        <code>{prettyEuler(rotationResult)}</code>
      </div>
    </div>
  );
}

export default function Rotation({ quaternion }: { quaternion: number[] }) {
  const [offsetRotation, setOffsetRotation] = useState<THREE.Euler>(
    new THREE.Euler()
  );

  const [x, y, z, w] = quaternion;
  const rotationFromApp = new THREE.Quaternion(x, y, z, w);
  const rotationFromAppEuler = new Euler();
  rotationFromAppEuler.setFromQuaternion(rotationFromApp);

  const offsetQuaternion = new THREE.Quaternion();
  offsetQuaternion.setFromEuler(offsetRotation);

  rotationFromApp.multiply(offsetQuaternion);
  const rotationResult = new THREE.Euler();
  rotationResult.setFromQuaternion(rotationFromApp);

  return (
    <div className="App">
      <Canvas style={{ flex: 4 }}>
        <Suspense fallback={null}>
          <Model rotation={rotationResult} />
          <Environment preset="sunset" />
          <OrbitControls />
        </Suspense>
      </Canvas>

      <div className="RotationEditor">
        <RotationEditor
          rotation={offsetRotation}
          setRotation={setOffsetRotation}
        />
        <code>{prettyQuaternion(offsetQuaternion)}</code>
      </div>
    </div>
  );
}

useGLTF.preload('/axis_widget.glb');