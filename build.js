// Monolith Umbra Theme build script
//
// Compiles src/scss/index.scss into theme.css (compressed) and Monolith-Umbra.css
// (expanded), then copies theme.css into the test vault defined by
// OBSIDIAN_PATH in .env.
//
// Usage:
//   node build.js          one-off build
//   node build.js --watch  rebuild on changes

const fs = require('node:fs');
const path = require('node:path');
const sass = require('sass');

const SRC = path.join(__dirname, 'src');
const SCSS_ENTRY = path.join(SRC, 'scss/index.scss');
const CSS_DIR = path.join(SRC, 'css');
const LICENSE = path.join(CSS_DIR, 'license.css');
const PLUGIN_COMPAT = path.join(CSS_DIR, 'plugin-compatibility.css');
const STYLE_SETTINGS = path.join(CSS_DIR, 'style-settings.css');
const FONT_DIR = path.join(SRC, 'fonts');
const FONT_LICENSE = path.join(FONT_DIR, 'OFL-1.1.md');

function embeddedFonts() {
	const faces = [
		['Coastal Quattro', 'CoastalQuattro-Regular.woff2'],
		['Coastal Mono', 'CoastalMono-Regular.woff2'],
	].map(([family, file]) => {
		const data = fs.readFileSync(path.join(FONT_DIR, file)).toString('base64');
		return `@font-face {\n  font-family: '${family}';\n  src: url('data:font/woff2;base64,${data}') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}`;
	});
	const ofl = fs.readFileSync(FONT_LICENSE, 'utf8').replaceAll('*/', '* /');
	return `/*\nCoastal Mono and Coastal Quattro are custom builds of Iosevka 34.7.0.\n${ofl}\n*/\n${faces.join('\n')}`;
}

function loadEnv() {
	try {
		const raw = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
		for (const line of raw.split('\n')) {
			const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
			if (!m) continue;
			let val = m[2].trim();
			if ((val.startsWith('"') && val.endsWith('"')) ||
				(val.startsWith("'") && val.endsWith("'"))) {
				val = val.slice(1, -1);
			}
			process.env[m[1]] = val;
		}
	} catch (e) {
		if (e.code !== 'ENOENT') throw e;
	}
}

function build() {
	const t0 = Date.now();
	const expanded = sass.compile(SCSS_ENTRY, { style: 'expanded' }).css;
	// Minification temporarily disabled — re-enable by switching back to 'compressed'.
	// const compressed = sass.compile(SCSS_ENTRY, { style: 'compressed' }).css;

	const license = fs.readFileSync(LICENSE, 'utf8');
	const pluginCompat = fs.readFileSync(PLUGIN_COMPAT, 'utf8');
	const styleSettings = fs.readFileSync(STYLE_SETTINGS, 'utf8');
	const fonts = embeddedFonts();

	const themeCss = [license, fonts, expanded, pluginCompat, styleSettings].join('\n');
	const expandedCss = [license, fonts, expanded, pluginCompat, styleSettings].join('\n');

	fs.writeFileSync(path.join(__dirname, 'theme.css'), themeCss);
	fs.writeFileSync(path.join(__dirname, 'Monolith-Umbra.css'), expandedCss);

	if (process.env.OBSIDIAN_PATH && process.env.HOME) {
		const dest = path.join(process.env.HOME, process.env.OBSIDIAN_PATH, 'theme.css');
		try {
			fs.mkdirSync(path.dirname(dest), { recursive: true });
			fs.writeFileSync(dest, themeCss);
		} catch (e) {
			console.warn(`Skipped vault copy: ${e.message}`);
		}
	}

	console.log(`Built in ${Date.now() - t0}ms`);
}

function safeBuild() {
	try { build(); } catch (e) { console.error(e.message); }
}

loadEnv();
safeBuild();

if (process.argv.includes('--watch')) {
	const chokidar = require('chokidar');
	const watcher = chokidar.watch(['src/**/*.scss', 'src/**/*.css'], {
		cwd: __dirname,
		ignoreInitial: true,
	});
	let pending = false;
	const trigger = () => {
		if (pending) return;
		pending = true;
		setTimeout(() => { pending = false; safeBuild(); }, 30);
	};
	watcher.on('all', trigger);
	console.log('Watching src/**/*.{scss,css}...');
}
