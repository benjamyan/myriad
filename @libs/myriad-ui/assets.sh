#!/usr/bin/env bash
rsync -av --exclude=*.{ts,js,tsx,zip,txt} ./src/assets ./lib;
rsync -av --include=*.{scss,css,sass} ./src/* ./lib;
