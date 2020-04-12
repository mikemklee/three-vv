import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { StyledApp } from './App.styles';
import GithubLink from '../GithubLink/GithubLink';

const Stats = require('stats.js');

export type TOOL = 'pick' | '';

function App() {
  const statsRef = useRef<any>(null);

  // General scene-related THREE refs
  const observed = useRef<HTMLDivElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const labelRendererRef = useRef<CSS2DRenderer | null>(null);
  const callbackRef = useRef<Function>(() => console.log('hi'));
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const createLabel = (
      target: THREE.Vector3,
      label: string = '',
      small: boolean = false
    ) => {
      const labelDiv = document.createElement('div');
      labelDiv.textContent = label || `[${target.toArray()}]`;
      labelDiv.style.marginTop = '-1em';

      if (small) {
        labelDiv.style.color = '#888888';
        labelDiv.style.fontSize = '12px';
      } else {
        labelDiv.style.color = 'white';
      }

      const labelObj = new CSS2DObject(labelDiv);
      labelObj.position.copy(target);
      return labelObj;
    };

    const drawVector = (vector: THREE.Vector3) => {
      // get length of vector
      const length = vector.length();

      // set direction as normalized vector
      const dir = vector.clone().normalize();

      // create helper
      const origin = new THREE.Vector3(0, 0, 0);
      const hex = 0x00ffff;
      const vectorHelper = new THREE.ArrowHelper(
        dir,
        origin,
        length,
        hex,
        0.2,
        0.1
      );

      // create label
      const vectorLabel = createLabel(vector);
      sceneRef.current!.add(vectorLabel);

      const containerObj = new THREE.Object3D();
      containerObj.add(vectorHelper);
      sceneRef.current!.add(containerObj);

      objectRef.current = containerObj as THREE.Object3D;
    };

    const drawGrid = () => {
      // create grid helper for XY plane
      const size = 10;
      const divisions = 10;
      const gridHelper = new THREE.GridHelper(size, divisions, 0xffffff);
      gridHelper.rotateX(Math.PI / 2);

      // create helper for Z axis
      const material = new THREE.LineBasicMaterial({ color: 0xffffff });
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(0, 0, -5),
      ]);
      const zAxis = new THREE.LineSegments(geometry, material);

      // add labels
      const xAxisLabel = createLabel(new THREE.Vector3(size / 2, 0, 0), 'X');
      const yAxisLabel = createLabel(new THREE.Vector3(0, -(size / 2), 0), 'Y');
      const zAxisLabel = createLabel(new THREE.Vector3(0, 0, size / 2), 'Z');
      const axesLabels = new THREE.Group();
      axesLabels.add(xAxisLabel, yAxisLabel, zAxisLabel);

      const gridGroup = new THREE.Group();
      gridGroup.add(gridHelper, zAxis, axesLabels);

      sceneRef.current!.add(gridGroup);
    };

    const zoomToFit = () => {
      const box = new THREE.Box3().expandByObject(objectRef.current!);

      cameraRef.current!.zoom =
        Math.min(
          window.innerWidth / (box.max.x - box.min.x),
          window.innerHeight / (box.max.y - box.min.y)
        ) * 0.4;
      cameraRef.current!.updateProjectionMatrix();
    };

    const appElement = observed.current;

    if (appElement) {
      // stats setup
      const stats = new Stats();
      document.body.appendChild(stats.dom);

      // init renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      const bgColor = 0x263238 / 2;
      renderer.setClearColor(bgColor, 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio || 1);

      // init label renderer
      const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0';
      labelRenderer.domElement.style.outline = 'none';

      // init camera
      const camera = new THREE.OrthographicCamera(
        -window.innerWidth / 2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        -window.innerHeight / 2
      );
      camera.position.x = 5;
      camera.position.y = -20;
      camera.position.z = 15;
      camera.up = new THREE.Vector3(0, 0, 1);
      camera.updateProjectionMatrix();

      // init scene
      const scene = new THREE.Scene();
      scene.add(camera);

      // init controls and raycaster stuff
      const controls = new OrbitControls(camera, labelRenderer.domElement);
      controls.enablePan = false;
      controls.enableKeys = false;

      // setup render loop
      function animate(): void {
        stats.begin();

        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);

        stats.end();

        requestAnimationFrame(animate);

        controls.update();
        callbackRef.current();
      }

      // resize handler
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        camera.left = -window.innerWidth / 2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = -window.innerHeight / 2;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      // attach rendering canvas to DOM
      appElement.appendChild(renderer.domElement);

      // attach label canvas to DOM
      appElement.appendChild(labelRenderer.domElement);

      // define default render callback
      callbackRef.current = () => {};

      // update refs
      statsRef.current = stats;
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      labelRendererRef.current = labelRenderer;
      controlsRef.current = controls;

      // trigger animation
      animate();

      // draw grid
      drawGrid();

      // add example vector helper
      drawVector(new THREE.Vector3(3, -4, 5));

      // adjust camera zoom
      zoomToFit();
    }
    return () => {
      // cleanup function
    };
  }, [observed]);

  return (
    <StyledApp ref={observed}>
      <GithubLink />
    </StyledApp>
  );
}

export default App;
