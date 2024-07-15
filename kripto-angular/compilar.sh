#!/bin/bash
rm -rf dist
npm run build
cd dist
zip -r $1 RestoBar724
