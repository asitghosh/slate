#!/bin/bash
# This script extract sources for DEV and PROD from docker image slate
# Mainly used to validate docker image is ok
# Pass version you want run in argument
set -e

SLATE_VERSION=unknown
if [ ! -z "$1" ];
then
	SLATE_VERSION=$1
fi

function slate_build {
	echo "Remove docker container named 'slate-extract' if present"
	docker rm --force slate-extract || true
	echo "Run slate:$SLATE_VERSION with MIDDLEMAN_COMMAND=$1 to extract sources"
	docker run --env MIDDLEMAN_COMMAND="$1" --name slate-extract docker.appdirect.tools/documentation/slate:${SLATE_VERSION}
	docker wait slate-extract
	echo "Copy source to ./build/$2 folder"
	docker cp slate-extract:/app/slate/build ./build/$2
}

echo "Clean Build Folder"
rm -rf build
mkdir build

echo "Build slate for DEV"
slate_build "build -e development" dev
echo "Build slate for PROD"
slate_build "build" prod
