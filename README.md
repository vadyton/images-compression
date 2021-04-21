# images-compression

Wrapper module for preserving directory structure when using [`imagemin`](https://github.com/imagemin/imagemin).

## Install

```
$ npm install images-compression --save-dev
```


## Usage

```js
import imagesCompression from 'images-compression';

imagesCompression('images/**/*.{jpg,jpeg,png,svg,gif}');
```

Run your script with Node.js terminal command:

```
$ node script.js
```


## API

### imagesCompression(inputDir)

Returns a undefined.

#### inputDir

Type: `string`

File paths or [glob patterns](https://github.com/sindresorhus/globby#globbing-patterns).

## License

MIT © [kovalev-alexey](https://github.com/kovalev-alexey)
