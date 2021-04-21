import { rmdirSync } from 'fs';
import imagemin from './lib/imagemin.js';
import jpegtran from 'imagemin-jpegtran';
import optipng from 'imagemin-optipng';
import svgo from 'imagemin-svgo';
import { extendDefaultPlugins } from 'svgo';
import gifsicle from 'imagemin-gifsicle';
import moveFile from 'move-file';

const WORK_DIR = 'imagesCompression';
const PLUGINS = [
    jpegtran({ progressive: true }), 
    optipng({ optimizationLevel: 1 }), 
    svgo({
        plugins: extendDefaultPlugins([
            {name: 'removeViewBox', active: false}
        ])
    }), 
    gifsicle()
];

const compressImages = async (inputDir, workDir, plugins) => {
    let files = [];

    try {
        files = await imagemin([inputDir], {
            destination: workDir,
            plugins
        });
    } catch (e) {
        e.message = 'Error occurred when handling files';
        throw e;
    }

    return files;
}

const moveFiles = async (files) => {
    await Promise.all(
        files.map(async file => {
            try {
                await moveFile(file[0].destinationPath, file[0].sourcePath);
            } catch (e) {    
                e.message = 'Error occurred when handling file';
                throw e;
            }
        })
    );
}

export default async function imagesCompression(inputDir) {
    if (typeof inputDir !== 'string') {
        throw new TypeError(`Expected an \`String\`, got \`${typeof inputDir}\``);
    }

    const files = await compressImages(inputDir, WORK_DIR, PLUGINS);

    await moveFiles(files);

    rmdirSync(WORK_DIR, {
        recursive: true
    });
}
