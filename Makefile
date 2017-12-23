build: deps
	npm run build

test: deps
	npm run tests

run: deps
	npm run dev

push:
	git subtree push --prefix dist origin gh-pages

deps: node_modules/

node_modules/: package.json
	npm install
	touch node_modules/
