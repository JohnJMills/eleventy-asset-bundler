watch: 
	cp package.json dist/
	npx esbuild eleventy.ts --watch --bundle --format=esm --target=node20.13.1 --outfile=dist/eleventy.js

build: 
	cp package.json dist/
	npx esbuild eleventy.ts --bundle --minify --format=esm --target=node20.13.1 --outfile=dist/eleventy.js

test: 
	npx vitest run 

run sample:
	cd ./sample && npx @11ty/eleventy --config=sample.eleventy.js