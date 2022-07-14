#!/bin/sh
yarn buildadmin
rm -f admin.zip
zip -r admin.zip build
scp admin.zip tadatruck@18.139.49.142:/home/tadatruck/zips