import * as esbuild from 'esbuild';

export let ctx = await esbuild.context({
	entryPoints: ['index.ts'],
	bundle: true,
	format: 'esm',
	platform: 'node',
	external: ['express'],
	outfile: 'dist/index.js',
});

//await ctx.watch();
