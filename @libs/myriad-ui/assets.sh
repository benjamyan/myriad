#!/usr/bin/env bash
echo "";
echo "START ASSET";
echo "";
rsync -av --exclude=*.{ts,js,tsx,zip,txt} ./src/assets ./lib;
echo "";
echo "DONE ASSET";
echo "";
echo "";
