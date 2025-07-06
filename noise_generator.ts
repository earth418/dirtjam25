import * as THREE from 'three';
import { createNoise2D } from "./js/simplex-noise.ts";

interface noiseParams {
    octaves : number;
    noiseScale : number;
    persistence : number;
    lacunarity : number;
}

interface meshParams {
    size : number;
    horz_scale : number;
    vert_scale : number;
    noiseParams : noiseParams;
}

function fbm(x : number, y : number, params : noiseParams): number {

    let result = 0.0;
    let persistence = params.persistence;
    let lacunarity = 1.0;
    let noiseFunction = createNoise2D(Math.random);

    let octavesI = Math.floor(params.octaves);
    for (let i = 0; i < octavesI; i++) {
        console.log(x);
        result += noiseFunction(x * lacunarity * params.noiseScale, y * lacunarity * params.noiseScale) * persistence;
        persistence *= params.persistence;
        lacunarity /= params.lacunarity;
    }

    return result;
}

export function generate_mesh(params: meshParams): THREE.BufferGeometry {
    let sizeI = Math.floor(params.size);

    const geometry = new THREE.BufferGeometry();

    let positions = [];
    let indices = [];

    for (let i = 0; i < sizeI; i++) {
        for (let j = 0; j < sizeI; j++) {
            let x = i * params.horz_scale, z = j * params.horz_scale;
            let y = params.vert_scale * fbm(x, z, params.noiseParams);

            let index = Math.floor(positions.length / 3);
            positions.push(x, y, z);

            if (i != sizeI - 1 && j != sizeI - 1) {
                indices.push(index, index + 1,     index + sizeI + 1);
                indices.push(index, index + sizeI + 1, index + sizeI);
            }
        }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    // console.log(positions);

    return geometry;
}