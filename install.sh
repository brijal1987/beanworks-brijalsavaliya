#!/bin/sh
LIST_OF_APPS="nodejs npm mysql-server"

sudo apt-get update  # To get the latest package lists
sudo apt-get install -y $LIST_OF_APPS