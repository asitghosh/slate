#!/bin/bash

docker build -t slate-base -f slate-base.Dockerfile .
docker build --no-cache -t slate-extract:build -f source/slate-extract.Dockerfile ./source
docker rm --force slate-extract || true
docker create --name slate-extract slate-extract:build
docker cp slate-extract:/app/slate/build ./build
