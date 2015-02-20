#!/bin/bash

export BROWSER_NAME=${BROWSER_NAME:=chrome}
export TEST_SERVER_PORT=${TEST_SERVER_PORT:=8880}

webdriver-manager update;
http-server -p $TEST_SERVER_PORT --silent &

HTTP_PID=$!

webdriver-manager start > /dev/null &
DRIVER_PID=$!

npm run build
babel-node test/runner

TEST_RUNNER_EXIT=$?

kill $HTTP_PID
kill $DRIVER_PID

if [ $TEST_RUNNER_EXIT == "0" ]; then
    exit 0
else
    exit 1
fi;
