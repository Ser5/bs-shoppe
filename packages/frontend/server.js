import fs                from 'fs';
import path              from 'path';
import { fileURLToPath } from 'url';
import express           from 'express';
import { createServer as createViteServer } from 'vite';
//import { initApiRouter } from './src/router-api.ts';

//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));



async function createServer (
	root   = process.cwd(),
	isProd = (process.env.NODE_ENV === 'production'),
	hmrPort = 5173
) {
	const resolve = (p) => path.resolve(__dirname, p);

	const indexProd = isProd
		? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
		: '';

	const manifest = isProd
		? JSON.parse(
			fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
		)
		: {};

	const app = express();

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
		next();
	});

	let viteServer;
	if (!isProd) {
		viteServer = await createViteServer({
			base: '/',
			root,
			server: {
				middlewareMode: true,
			},
			appType: 'custom',
		})
		// use vite's connect instance as middleware
		app.use(viteServer.middlewares);
	} else {
		//@ts-ignore
		app.use((await import('compression')).default());
		app.use(
			'/',
			(await import('serve-static')).default(resolve('dist/client'), {
				index: false,
			}),
		)
	}

	//initApiRouter(app);

	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl;

			let template, render;
			if (!isProd) {
				// always read fresh template in dev
				template = fs.readFileSync(resolve('index.html'), 'utf-8');
				template = await viteServer.transformIndexHtml(url, template);
				render   = (await viteServer.ssrLoadModule('/src/entry-server.ts')).render;
			} else {
				template = indexProd;
				//@ts-ignore
				render = (await import('./dist/server/entry-server.js')).render;
			}

			const [appHtml, preloadLinks] = await render(url, manifest);

			const html = template
				.replace(`<!--preload-links-->`, preloadLinks)
				.replace(`<!--app-html-->`,      appHtml);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			viteServer && viteServer.ssrFixStacktrace(e);
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	});

	return {app, viteServer};
}



createServer().then(({app}) =>
	app.listen(5173, () => {
		console.log('http://localhost:5173');
	})
);
