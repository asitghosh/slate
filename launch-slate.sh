#!/bin/bash

docker build -t slate-base -f slate-base.Dockerfile .
docker build --no-cache -t slate -f source/slate-source.Dockerfile ./source

open http://localhost:4567/index.html
docker run --rm -p 4567:4567 -it slate
