import { createNoise2D } from "../simplex-noise";

interface noiseParams {
    octaves : number;
    persistence : number;
    lacunarity : number;
}

interface meshParams {
    size : number;
    noiseScale : number;
    noiseParams : noiseParams;
}

function fbm(x : number, y : number, params : noiseParams): number {

    let result = 0.0;
    let persistence = 1.0, lacunarity = 1.0;
    let noiseFunction = createNoise2D(Math.random);

    let octavesI = Math.floor(params.octaves);
    for (let i = 0; i < octavesI; i++) {
        result += noiseFunction(x * lacunarity, y * lacunarity) * persistence;
        persistence *= params.persistence;
        lacunarity /= params.lacunarity;
    }

    return result;
}

function generate_mesh(gl, params: meshParams): number {
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