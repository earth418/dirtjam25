import * as THREE from 'three';
interface noiseParams {
    octaves: number;
    persistence: number;
    lacunarity: number;
}
interface meshParams {
    size: number;
    noiseScale: number;
    noiseParams: noiseParams;
}
export declare function generate_mesh(params: meshParams): THREE.BufferGeometry;
export {};
