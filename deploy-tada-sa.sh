#!/bin/sh
rm -r ./truckowner
rm -r ./tadatruck
rm -r ./admin
rm -r ./buildall
mkdir truckowner
mkdir tadatruck
mkdir admin
mkdir buildall
git checkout feature/dev-p2-sa
git pull origin feature/dev-p2-sa
yarn
yarn build-st-sa-truckowner && mv build/* truckowner
yarn build-st-sa-customer && mv build/* tadatruck
yarn build-st-sa-admin && mv build/* admin
zip -r -9 build.zip admin truckowner tadatruck
scp -r ./build.zip netpower@192.168.181.173:/home/netpower/builds/tada-sa/web
ssh netpower@192.168.181.173 "sh /home/netpower/builds/tada-sa/web/tada-sa.sh"
