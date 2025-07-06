"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simplex_noise_1 = require("../simplex-noise");
function fbm(x, y, params) {
    let result = 0.0;
    let persistence = 1.0, lacunarity = 1.0;
    let noiseFunction = (0, simplex_noise_1.createNoise2D)(Math.random);
    let octavesI = Math.floor(params.octaves);
    for (let i = 0; i < octavesI; i++) {
        result += noiseFunction(x * lacunarity, y * lacunarity) * persistence;
        persistence *= params.persistence;
        lacunarity /= params.lacunarity;
    }
    return result;
}
function generate_mesh(gl, params) {
    let sizeI = Math.floor(params.size);
    let positions = [];
    let indices = [];
    for (let i = 0; i < sizeI; i++) {
        for (let j = 0; j < sizeI; j++) {
            let x = i * params.noiseScale, y = j * params.noiseScale;
            let z = fbm(x, y, params.noiseParams);
            let index = positions.push();
            if (i != sizeI - 1 && j != sizeI - 1) {
                indices.concat();
            }
        }
    }
    let vertex_bufferid = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_bufferid);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
    let element_bufferid = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertex_bufferid);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indices), gl.STATIC_DRAW);
    return vertex_bufferid;
}
