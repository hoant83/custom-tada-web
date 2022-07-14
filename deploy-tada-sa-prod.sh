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
yarn build-prod-sa-truckowner && mv build/* truckowner
yarn build-prod-sa-customer && mv build/* tadatruck
yarn build-prod-sa-admin && mv build/* admin
zip -r -9 build.zip admin truckowner tadatruck
scp -r ./build.zip tadatruck@13.212.5.196:/home/tadatruck/builds/tada/web
ssh tadatruck@13.212.5.196 "sh /home/tadatruck/builds/tada/web/tada.sh"
