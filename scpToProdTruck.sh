#!/bin/sh
yarn buildtruck
rm -f truckowner.zip
zip -r truckowner.zip build
scp truckowner.zip tadatruck@18.139.49.142:/home/tadatruck/zips