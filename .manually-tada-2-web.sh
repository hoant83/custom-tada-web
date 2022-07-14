#!/bin/sh
git checkout develop
git pull origin develop
rm -r ./truckowner
rm -r ./tadatruck
rm -r ./admin
rm -r ./buildall
mkdir truckowner
mkdir tadatruck
mkdir admin
mkdir buildall
yarn
REACT_APP_THEME=truckowner yarn build && mv build truckowner
REACT_APP_THEME=tadatruck yarn build && mv build tadatruck
REACT_APP_THEME=admin yarn build && mv build admin
mv truckowner buildall
mv tadatruck buildall
mv admin buildall
zip -r build.zip ./buildall
scp -r ./build.zip netpower@192.168.181.173:/home/netpower/builds/tada-2/web
ssh netpower@192.168.181.173 "sh /home/netpower/builds/tada-2/web/tada-2.sh"

