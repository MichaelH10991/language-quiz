#!/bin/bash
timestamp=$(date)
export REACT_APP_TIMESTAMP=$timestamp
export REACT_APP_QUIZ_API_URI=https://ck2hqui3j6.execute-api.eu-west-1.amazonaws.com/prod

BUCKET="s3://language-quiz/"

# build the app
npm install
npm run build

# deploy
aws --profile mike s3 cp build/ $BUCKET --recursive