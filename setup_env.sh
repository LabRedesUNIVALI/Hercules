#! /bin/bash

# Color declarations
FG_BROWN='\033[0;33m';
FG_RED='\033[0;31m';
FG_GREEN='\033[0;32m';
FG_CYAN='\033[0;36m';
BG_CYAN='\033[46m';
RESET='\033[0m';

# Pre-estabilished values
ENV="development";
PORT="3000";
MONGODB_URL="mongodb://hercules_db/hercules";

# Control flow variables
VALUES_OK=false;

echo -e "${FG_BROWN}This script will help you to generate .env file,\nused to hold environment variables passed to containers context.\nPlease accept or provide the following values:\n ${RESET}";

getinput() {

    echo -ne "${BG_CYAN}NODE_ENV${RESET} (${FG_BROWN}${ENV}${RESET}): ";
    read input_env;

    echo -ne "${BG_CYAN}PORT${RESET} (${FG_BROWN}${PORT}${RESET}): ";
    read input_port;

    echo -ne "${BG_CYAN}MONGODB_URL${RESET} (${FG_BROWN}${MONGODB_URL}${RESET}): ";
    read input_mongodb_url;

    if [ ! -z "$input_env" ]; then
        ENV=$input_env;
    fi;

    if [ ! -z "$input_port" ]; then
        PORT=$input_port;
    fi;

    if [ ! -z "$input_mongodb_url" ]; then
        MONGODB_URL=$input_mongodb_url;
    fi;

}

while [ "$VALUES_OK" != "true" ]; do

    getinput;

    echo -e "\nDo you agree with these values? \n";

    echo -e "${FG_BROWN}NODE_ENV${RESET}: ${FG_GREEN}${ENV}";
    echo -e "${FG_BROWN}PORT${RESET}: ${FG_GREEN}${PORT}";
    echo -e "${FG_BROWN}MONGODB_URL${RESET}: ${FG_GREEN}${MONGODB_URL}${RESET}";

    echo -ne "\n[Y/n]: ";

    read yn;

    case $yn in
        [Yy]* ) VALUES_OK=true;;
        [Nn]* ) VALUES_OK=false;;
        * ) VALUES_OK=true;;
    esac;

    echo "";

done;

echo -e "${FG_CYAN}Creating .env file...";

echo "NODE_ENV=$ENV" > .env;
echo "PORT=$PORT" >> .env;
echo "MONGODB_URL=$MONGODB_URL" >> .env;

echo -e "${FG_GREEN}Created .env file. You're ready to start";

exit 0;
