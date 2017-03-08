#!/bin/bash

imageTag='codealchemist/google-permissions'
localPort=80
dockerPort=80

if [[ "$(docker images -q $imageTag 2> /dev/null)" == "" ]] || [[ $1 == "rebuild" ]]; then
    # Build a new docker image.
    docker build -t $imageTag .
    sleep 1
fi

# Start image.
docker run \
-e "PORT=$dockerPort" \
-p $localPort:$dockerPort -d $imageTag

# Start image overriding credentials.json and default port:
# docker run \
# -e "OAUTH2_CLIENT_ID=YOUR_CLIENT_ID" \
# -e "OAUTH2_CLIENT_SECRET=YOUR_CLIENT_SECRET" \
# -e "OAUTH2_CALLBACK=/auth/google/callback" \
# -e "PORT=$dockerPort" \
# -p $localPort:$dockerPort -d $imageTag
