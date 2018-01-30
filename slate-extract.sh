#!/bin/bash
# This script extract sources from docker image slate
# Mainly used to validate docker image is ok
# Pass version you want run in argument
set -e

SLATE_VERSION=latest
if [ ! -z "$1" ];
then
	SLATE_VERSION=$1
fi

echo "Remove docker container named 'slate-extract' if present"
docker rm --force slate-extract || true
echo "Run slate:$SLATE_VERSION to extract sources"
docker run --env goal_env=build --name slate-extract docker.appdirect.tools/documentation/slate:${SLATE_VERSION}
docker wait slate-extract
echo "Copy source to ./build folder"
docker cp slate-extract:/app/slate/build ./build
