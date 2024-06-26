import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { dts } from 'rollup-plugin-dts';

import pkg from './package.json';

const sourcemap = true;
const input = 'src/index.ts';
const banner = `/* @license ${pkg.name} v${pkg.version} */`;

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input,
    output: [
      {
        format: 'cjs',
        dir: path.dirname(pkg.main),
        sourcemap,
        banner
      },
      {
        format: 'esm',
        dir: path.dirname(pkg.module),
        sourcemap,
        banner
      }
    ],
    external: [...Object.keys(pkg.peerDependencies ?? {})],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: { noEmit: true },
        noForceEmit: true,
        tslib: 'tslib'
      }),
      resolve({
        extensions: ['.js', '.ts']
      }),
      commonjs({
        include: /node_modules/,
        ignoreDynamicRequires: true
      }),
      babel({
        exclude: /node_modules/,
        extensions: ['.js', '.ts'],
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-typescript']
      }),
      json(),
      terser()
    ]
  },
  {
    input,
    output: [{ file: pkg.types, format: 'esm' }],
    plugins: [dts()]
  }
];
