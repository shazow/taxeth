build: deps
	npm run build

test: deps
	npm run tests

run: deps
	npm run dev

deps: node_modules/

node_modules/: package.json
	npm install
	touch node_modules/
