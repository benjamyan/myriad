#!/usr/bin/env bash
# rsync -av --exclude=*.{ts,js,tsx,zip,txt} ./src/* ./lib;
rsync -av --include=*.{scss,css,sass} ./src/* ./lib;
# rm -f ./src/*.{ts,d.ts,d}
