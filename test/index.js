import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import cssmin from '../index.js';

test('bundle single file', async () => {
  const result = cssmin('./test/scenarios/single/index.css');

  assert.strictEqual(result, `body {
  background-color: red;
}
`);
});

test('bundle multiple file', async () => {
  const result = cssmin('./test/scenarios/multiple/index.css');

  assert.strictEqual(result, `.subTest {
  background-color: pink;
}

.test {
  background-color: blue;
}

body {
  background-color: red;
}
`);
});

test('bundle file from sub directory', async () => {
  const result = cssmin('./test/scenarios/subdirectory/index.css');

  assert.strictEqual(result, `.subTest {
  background-color: pink;
}

.test {
  background-color: blue;
}

body {
  background-color: red;
}
`);
});

test('bundle dependency in sub directory', async () => {
  const result = cssmin('./test/scenarios/dependencysub/index.css');

  assert.strictEqual(result, `mui-text-input input:focus {
  border-color: blue;
  outline: none;
}
mui-text-input input {
  display: block;
  font-family: arial;
  font-weight: bold;
  font-size: 100%;
  width: 100%;
  border: 2px solid black;
  padding: var(--input-padding);
}

body {
  background-color: red;
}
`);
});

test('bundle from dependency', async () => {
  const result = cssmin('./test/scenarios/dependency/index.css');

  assert.strictEqual(result, `mui-text-input input:focus {
  border-color: blue;
  outline: none;
}
mui-text-input input {
  display: block;
  font-family: arial;
  font-weight: bold;
  font-size: 100%;
  width: 100%;
  border: 2px solid black;
  padding: var(--input-padding);
}

body {
  background-color: red;
}
`);
});

test('bundle same file twice', async () => {
  const result = cssmin('./test/scenarios/sameFileTwice/index.css');

  assert.strictEqual(result, fs.readFileSync('./test/scenarios/sameFileTwice/index.bundle.css', {encoding: 'utf-8'}));
});

test('bundle with media query and other import options', async () => {
  const result = cssmin('./test/scenarios/mediaQuery/index.css');

  assert.strictEqual(result, fs.readFileSync('./test/scenarios/mediaQuery/index.bundle.css', {encoding: 'utf-8'}));
});

test('bundle files with recursive import', async () => {
  const result = cssmin('./test/scenarios/recursive/index.css');

  assert.strictEqual(result, fs.readFileSync('./test/scenarios/recursive/index.bundle.css', {encoding: 'utf-8'}));
});
