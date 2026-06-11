"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D backdrop: a slowly rotating wireframe icosahedron with
 * glowing vertices, wrapped in a particle starfield. The camera drifts
 * toward the mouse for a parallax depth effect.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Wireframe icosahedron
    const geo = new THREE.IcosahedronGeometry(2.5, 1);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35,
      })
    );
    scene.add(wire);

    // Glowing vertices
    const vertices = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.07,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(vertices);

    // Inner core
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const core = new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeo),
      new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.2,
      })
    );
    scene.add(core);

    // Particle starfield
    const starCount = 800;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 18;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.025,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(stars);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        wire.rotation.y = t * 0.12;
        wire.rotation.x = Math.sin(t * 0.18) * 0.25;
        vertices.rotation.copy(wire.rotation);
        core.rotation.y = -t * 0.2;
        core.rotation.z = t * 0.1;
        stars.rotation.y = t * 0.015;

        camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 0.7 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      geo.dispose();
      coreGeo.dispose();
      starGeo.dispose();
      wire.material.dispose();
      vertices.material.dispose();
      core.material.dispose();
      stars.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
