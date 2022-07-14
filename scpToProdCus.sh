#!/bin/sh
yarn buildtada
rm -f customer.zip
zip -r customer.zip build
scp customer.zip tadatruck@18.139.49.142:/home/tadatruck/zips