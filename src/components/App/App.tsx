import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  const callbackRef = useRef<Function>(() => console.log('hi'));
  const controlsRef = useRef<OrbitControls | null>(null);

  const drawVector = (vector: THREE.Vector3) => {
    // set direction
    const dir = vector;

    // get scalar before normalizing
    const length = dir.length();

    // normalize vector
    dir.normalize();

    const origin = new THREE.Vector3(0, 0, 0);
    const hex = 0x00ffff;
    const helper = new THREE.ArrowHelper(dir, origin, length, hex);

    const containerObj = new THREE.Object3D();
    containerObj.add(helper);
    sceneRef.current!.add(containerObj);

    objectRef.current = containerObj as THREE.Object3D;

    const box = new THREE.Box3().expandByObject(containerObj);

    cameraRef.current!.zoom =
      Math.min(
        window.innerWidth / (box.max.x - box.min.x),
        window.innerHeight / (box.max.y - box.min.y)
      ) * 0.4;
    cameraRef.current!.updateProjectionMatrix();
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

    const gridGroup = new THREE.Group();
    gridGroup.add(gridHelper, zAxis);

    sceneRef.current!.add(gridGroup);
    console.log('Grid loaded');
  };

  useEffect(() => {
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

      // init scene
      const scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0x736f6e, 1.25);
      scene.add(ambientLight);

      let camera = new THREE.OrthographicCamera(
        -window.innerWidth / 2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        -window.innerHeight / 2
      );

      camera.position.x = 20;
      camera.position.y = -20;
      camera.position.z = 20;
      camera.up = new THREE.Vector3(0, 0, 1);
      camera.updateProjectionMatrix();

      const pointLight = new THREE.PointLight(0xffffff, 0.25);
      camera.add(pointLight);

      scene.add(camera);

      // init controls and raycaster stuff
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableKeys = false;

      // setup render loop
      function animate(): void {
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(animate);
        controls.update();
        callbackRef.current();
      }

      // resize handler
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.left = -window.innerWidth / 2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = -window.innerHeight / 2;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      // attach rendering canvas to DOM
      appElement.appendChild(renderer.domElement);

      // define default render callback
      callbackRef.current = () => {};

      // trigger animation
      animate();

      statsRef.current = stats;
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;

      // draw grid
      drawGrid();

      // add example vector helper
      drawVector(new THREE.Vector3(5, -5, 5));
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
