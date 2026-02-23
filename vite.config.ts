/// <reference types="vitest/config" />
import dotenv from 'dotenv';
import swc from 'unplugin-swc';
import { defineConfig, type UserConfig, type UserConfigFnObject } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import type { Plugin } from 'vite';

dotenv.config({ override: true, path: '.env' });

const {
  PORT = '3022',
  ENABLE_SWAGGER = 'true',
  TRANSPORT = 'http',
  DB_REAL_TIME_LOCKS = 'in-memory',
} = process.env;

const configFunction: UserConfigFnObject = ({ mode }) => {
  const isTest = mode === 'test';

  const viteNodePlugins: Plugin[] = VitePluginNode({
    adapter: 'nest',
    outputFormat: 'esm',
    appPath: './src/main.ts',
    tsCompiler: 'swc',
    swcOptions: {
      sourceMaps: true,
      jsc: {
        baseUrl: __dirname,
        paths: {
          '~/*': ['./src/*'],
        },
      },
    },
    exportName: 'viteNodeApp',
  });

  const viteConfig: UserConfig = {
    define: {
      ENABLE_SWAGGER: JSON.stringify(ENABLE_SWAGGER === 'true'),
      TRANSPORT: JSON.stringify(TRANSPORT),
      DB_REAL_TIME_LOCKS: JSON.stringify(DB_REAL_TIME_LOCKS),
    },
    server: {
      port: Number.parseInt(PORT),
    },
    build: {
      outDir: './build',
      sourcemap: true,
    },
    plugins: [
      ...viteNodePlugins,
      ...(isTest ? [swc.vite({ jsc: { target: 'esnext' } })] : []),
    ],
    optimizeDeps: {
      exclude: [
        '@nestjs/microservices',
        '@nestjs/websockets',
        'cache-manager',
        'class-transformer',
        'class-validator',
        'fastify-swagger',
        'cpu-features',
      ],
    },
    test: {
      globals: true,
      name: 'backend',
      environment: 'node',
      alias: {
        '@test': './test',
      },
      setupFiles: ['./vitest-setup.ts'],
    },
    resolve: {
      alias: {
        '@test': './test',
      },
    },
  };

  return viteConfig;
};

export default defineConfig(configFunction);
