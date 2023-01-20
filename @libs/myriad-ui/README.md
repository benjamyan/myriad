<!-- find -D -path ./src/assets -type d -links 2 -exec mkdir -p "./lib/assets/{}" \; -->

<!-- rsync -av --exclude='*.{ts,js,tsx}' ./src/assets/**/ ./lib/assets -->
<!-- rsync -av --exclude=*.{ts,js,tsx,txt,zip} ./src/assets/** ./lib/assets --dry-run -v -->
<!-- rsync -av --exclude=*.{ts,js,tsx,zip,txt} ./src/assets/** ./lib/assets -->

Working:
<!-- rm -rf ./lib && mkdir ./lib ./lib/assets && rsync -av --exclude=*.{ts,js,tsx,zip,txt} ./src/assets/** ./lib/assets -v -->