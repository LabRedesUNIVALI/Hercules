# Configuration

### TODO
- [ ] Finish this doc
- [x] Create a shell script to automate annoying processes

### Pre-requisites
You'll need these to get started:
* A Linux distro :penguin:
* [Docker engine](https://docs.docker.com/engine/installation/linux/) @ latest version :whale:
* [Docker compose](https://docs.docker.com/compose/install/) :octopus:

### Configuration
This guide will help you to set up the development and production environments from the very beginning. If you have problem with unix commands, ask [this guy](http://explainshell.com/) :shell:

At first, clone the repo to a folder of your choice, and enter into the newly created folder:
```bash
cd /path/to/project
git clone https://github.com/bortoluzzi/Hercules hercules
cd hercules
```

Now, you'll need to set up a _environment variable_ that will hold the complete path of the folder where the project source files are located. We use this variable to reference the folder in [docker-compose.yml](../docker-compose.yml), for example. Run the following commands:
```bash
su - # To become superuser (it will ask your root password)

echo "HERCULES_PATH=/path/to/project/hercules" >> /etc/environment
source /etc/environment
```
This will setup the only _environment variable_ that we need in the docker host :whale:

Before we start lifting the containers, we need also to set an __env file__. An env file also contains _environment variables_, just like the variables we echoed to `/etc/environment` in the docker host. Except that this env file will be passed to the containers context. We made it simple and interactive for you :blue_heart: The result of all our love is in the file [setup_env.sh](../setup_env.sh). Just run this script in your shell:
```bash
# Assuming that you're already inside `hercules` folder
./setup_env.sh
```
You'll be asked for either accept the defaults or provide new values to some important environment variables. Once you do, the script will create a file named `.env` at the project's root. This file should look like this:
```
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://hercules_db/hercules
```
This file will be passed to the containers context, through the `env_file` option in [docker-compose.yml](../docker-compose.yml).
