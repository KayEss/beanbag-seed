# Requirements capture #

This is really just a test to see if anything useful can be done.

## Pre-requisites ##

Eventually this will be dockerized, but for now these steps will allow you to run the system.

You need to have nodejs, npm and bower installed. There's a ton of stuff on the web about how to get this going. You'll need to clone this repository, and then run it in the beanbag docker container.

    sudo docker run -p 9090:2222 -u $(id -u):$(id -g) -v $(pwd):/srv -dt kayess/beanbag

Use bower to install the components needed.

    npm install
    bower install

Run gulp to build the web service.

    gulp

