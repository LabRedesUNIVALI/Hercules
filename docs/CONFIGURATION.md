# Configuration

### TODO
- [ ] Finish this doc
- [ ] Create a shell script to automate annoying processes

### Pre-requisites
You'll need these to get started:
* A Linux distro :penguin:
* [Docker engine](https://docs.docker.com/engine/installation/linux/) @ latest version :whale:
* [Docker compose](https://docs.docker.com/compose/install/) :octopus:

### Configuration
This guide will help you to set up the development and production environments from the very beginning. If you have problem with unix commands, ask [this guy](http://explainshell.com/) :shell:

At first, clone the repo to a folder of your choice:
```bash
cd /path/to/project
git clone https://github.com/bortoluzzi/Hercules
```

Set up some environment variables to use within docker containers. The values can be different for `dev`/`prod` environments. In your shell, type the following commands:
```bash
su - # To become superuser (it will ask your root password)

# Write the variables to /etc/environment
echo "HERCULES_PATH=/path/to/project/Hercules" >> /etc/environment
echo "HERCULES_NODE_ENV=development" >> /etc/environment
echo "HERCULES_NODE_PORT=3000" >> /etc/environment
echo "HERCULES_MONGODB_URL=mongodb://hercules_db/hercules" >> /etc/environment
```
