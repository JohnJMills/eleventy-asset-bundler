watch: 
	cp package.json dist/
	npx esbuild src/index.ts --watch --bundle --minify --format=esm --target=node20.13.1 --outfile=dist/index.js

build: 
	cp package.json dist/
	npx esbuild src/index.ts --bundle --minify --format=esm --target=node20.13.1 --outfile=dist/index.js

test: 
	npx vitest run 
	# --config ./path/to/vitest.config.js