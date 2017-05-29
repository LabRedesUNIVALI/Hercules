# Configuration

### TODO
- [ ] Finish this doc
- [x] Create a shell script to automate annoying processes

### Pre-requisites
You'll need these to get started:
* [A Linux distro](https://en.wikipedia.org/wiki/List_of_Linux_distributions) :penguin:
* [Docker engine](https://docs.docker.com/engine/installation/linux/) @ latest version :whale:
* [Docker compose](https://docs.docker.com/compose/install/) :octopus:

### Configuration
This guide will help you to set up the development and production environments from the very beginning. If you have problem with unix commands, ask [this guy](http://explainshell.com/) :shell:

At first, clone the repo to a folder of your choice, and enter the newly created folder:
```bash
# Choose a folder to host project files
cd /path/to/project

# Clone the repo
git clone https://github.com/bortoluzzi/Hercules hercules

# Enter the directory
cd hercules
```

Before we start lifting the containers, we need to create an __env file__. An env file contains declarations of _environment variables_. We made this process simple and interactive for you :blue_heart:. The result of all our love is in the file [setup_env.sh](../docker/setup_env.sh). Just run this script in your shell:
```bash
# Assuming that you're already inside `hercules` folder
./docker/setup_env.sh
```
You'll be asked for either accept the defaults or provide new values to some important environment variables. Once you do, the script will create a file named `.env` at the project's root. This file content should look like this:
```
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://hercules_db/hercules
```
The left side of `=` symbol define the variable name, as the right side attach a value to it. These variables are quite important to our project. Here you can check what each variable mean:

Variable name | Description
--------------|-------------
NODE_ENV | Represents the environment where Node.js is running. The most common values are "development" and "production".
PORT | The port which our Node.js HTTP server will run. In this case, also references the port which our containers will expose, and link to docker host.
MONGODB_URI | Used by Node.js application to connect to a MongoDB database. It's value must be a valid [_connection string_](https://docs.mongodb.com/manual/reference/connection-string/).

#### :heavy_exclamation_mark: A note on "MONGODB_URI"
Usually we identify the host of a connection string as an IP address or `localhost`. In this case, though, our MongoDB instance is not running at the same container than Node.js server. So, we can't just specify `localhost` and expect everything to work. Also, we don't have and IP address to reference. You'll notice that we used `hercules_db` to reference the database host. And that's all about it, works perfectly. Docker containers can naturally access each other,

This file content will be passed to `docker-compose` and containers context, through the `env_file` option in [docker-compose.yml](../docker/docker-compose.yml).
