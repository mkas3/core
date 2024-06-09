import type { RollupBabelInputPluginOptions as RollupBabelOptions } from '@rollup/plugin-babel';
import babel from '@rollup/plugin-babel';
import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import commonJS from '@rollup/plugin-commonjs';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import type { Options as RollupTerserOptions } from '@rollup/plugin-terser';
import terser from '@rollup/plugin-terser';
import type { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';
import * as path from 'path';
import type {
  InputPluginOption,
  OutputOptions,
  Plugin as RollupPlugin,
  RollupOptions
} from 'rollup';
import type { Options as RollupDtsOptions } from 'rollup-plugin-dts';
import { dts } from 'rollup-plugin-dts';

export type RollupConfigOptions<T> = T & {
  disabled?: boolean;
};

export type GenerateRollupConfigParams = {
  pkg: {
    name: string;
    main: string;
    types: string;
    module: string;
    version: string;
    peerDependencies?: Record<string, string>;
    [x: string]: unknown;
  };
  tsconfigPath?: string;
  sourcemap?: boolean | 'inline' | 'hidden';
  external?: (string | RegExp)[];
  plugins?: InputPluginOption[];
  options?: RollupOptions[];
  input?: {
    entry?: string;
    pattern?: string;
    ignorePattern?: string;
  };
  output?: {
    main?: OutputOptions;
    types?: OutputOptions;
    module?: OutputOptions;
  };
  configs?: {
    babel?: RollupConfigOptions<RollupBabelOptions>;
    dts?: RollupConfigOptions<RollupDtsOptions>;
    terser?: RollupConfigOptions<RollupTerserOptions>;
    commonJS?: RollupConfigOptions<RollupCommonJSOptions>;
    typescript?: RollupConfigOptions<RollupTypescriptOptions>;
    nodeResolve?: RollupConfigOptions<RollupNodeResolveOptions>;
  };
};

const getRollupPlugin = <Options = unknown>(
  pluginFn: (options?: Options) => RollupPlugin,
  externalOptions?: RollupConfigOptions<Options>,
  initialOptions?: Options
) => {
  if (typeof externalOptions !== 'undefined' && (!externalOptions || externalOptions.disabled))
    return false;

  return pluginFn({
    ...((typeof initialOptions === 'object' ? initialOptions : {}) as Options),
    ...((typeof externalOptions === 'object' ? externalOptions : {}) as Options)
  });
};

export const generateRollupConfig = ({
  input: {
    entry = 'src/index.ts',
    pattern = 'src/**/*.{ts,tsx}',
    ignorePattern = 'src/**/*.{test,stories}.{ts,tsx}'
  } = {},
  sourcemap = 'inline',
  external = [],
  options = [],
  plugins = [],
  configs = {},
  output = {},
  pkg
}: GenerateRollupConfigParams) => {
  const inputPattern = path.join(process.cwd(), pattern);
  const banner = `/* @license ${pkg.name} v${pkg.version} */`;

  const config: RollupOptions[] = [
    {
      input: Object.fromEntries(
        globSync(inputPattern.replace(/\\/g, '/'), {
          ignore: ignorePattern.replace(/\\/g, '/')
        }).map((file) => {
          return [
            path.relative(
              path.dirname(entry),
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(`file:///${file}`, import.meta.url))
          ];
        })
      ),
      output: [
        {
          format: 'cjs',
          dir: path.dirname(pkg.main),
          sourcemap,
          banner,
          exports: 'named',
          ...output.main
        },
        {
          format: 'esm',
          dir: path.dirname(pkg.module),
          sourcemap,
          banner,
          exports: 'auto',
          ...output.module
        }
      ],
      external: [...Object.keys(pkg.peerDependencies ?? {}), ...external],
      plugins: [
        getRollupPlugin(typescript, configs.typescript, {
          tsconfig: './tsconfig.json',
          compilerOptions: { noEmit: true },
          noForceEmit: true,
          tslib: 'tslib'
        }),
        getRollupPlugin(nodeResolve, configs.nodeResolve, {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        getRollupPlugin(commonJS, configs.commonJS, {
          include: /node_modules/,
          ignoreDynamicRequires: true
        }),
        ...plugins,
        getRollupPlugin(babel, configs.babel, {
          exclude: /node_modules/,
          babelHelpers: 'bundled',
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
        }),
        getRollupPlugin(terser, configs.terser)
      ]
    },
    {
      input: entry,
      output: [{ file: pkg.types, format: 'esm', ...output?.types }],
      plugins: [getRollupPlugin(dts, configs.dts)]
    },
    ...options
  ];

  return config;
};
