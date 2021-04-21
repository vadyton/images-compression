import { sep, join } from "path";
import imagemin from "imagemin";
import globby from "globby";

export default async (inputDir = [], options = {}) => {
    const files = await globby(inputDir, { 
        onlyFiles: true,
        expandDirectories: {
            extensions: ['jpg', 'jpeg', 'png', 'svg', 'gif']
        }
    });
    
    return Promise.all(
        files.map(async file => {
            try {
                const { destination, plugins } = options;
                const fileParts = file.split(sep);
                const outputDestination = join(
                    destination,
                    fileParts.slice(1, fileParts.length - 1).join(sep)
                );

                return await imagemin([file], {
                    destination: outputDestination,
                    plugins
                });
            } catch (e) {
                e.message = `Error occurred when handling file: ${file}\n\n${err.stack}`;
                throw e;
            }
        })
    );
};