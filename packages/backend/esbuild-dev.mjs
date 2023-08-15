import { ctx } from './esbuild.mjs';

await ctx.watch();
console.log('esbuild watching...');
