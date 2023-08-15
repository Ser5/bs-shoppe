import { ctx } from './esbuild.mjs';

await ctx.rebuild();
console.log('es built.');
ctx.dispose();
