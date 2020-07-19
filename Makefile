all:
	mkdir -p ./out
	qjsc -o ./out/sitio ./src/index.js

optimized:
	mkdir -p ./out
	qjsc -flto -o ./out/sitio ./src/index.js