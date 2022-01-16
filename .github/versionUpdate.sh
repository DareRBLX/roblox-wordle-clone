#!/bin/bash
PKGVERSION=$(cat ./package.json | grep version | cut -d '"' -f 4)
PKGNAME=$(cat ./package.json | grep name | cut -d '"' -f 4)
GIT_COMMIT=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD )
ROJO_VERSION=$(./rojo -V)
TSC_VERSION=$(rbxtsc --version)
HOSTNAME=$(hostname)
UNAME=$(uname -sr)
echo "Building $PKGNAME@$PKGVERSION ($GIT_BRANCH@$GIT_COMMIT) (with $ROJO_VERSION & rbxtsc $TSC_VERSION (node $(node -v)) on $HOSTNAME running $UNAME)"
echo "export {};print(\`$PKGNAME@$PKGVERSION ($GIT_BRANCH#$GIT_COMMIT)" > ./src/client/version.client.ts
echo "built with $ROJO_VERSION & rbxtsc $TSC_VERSION (node $(node -v))" >> ./src/client/version.client.ts
echo "on $HOSTNAME running $UNAME" >> ./src/client/version.client.ts
echo "Built at $(date)\`);" >> ./src/client/version.client.ts
