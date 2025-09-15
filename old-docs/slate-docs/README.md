<p align="center"><img src="https://s3.amazonaws.com/dydx-assets/logo_large_white.png" width="256" /></p>

**Documentation Powered by Slate and Presented on [docs.dydx.exchange](https://dydxprotocol.github.io/teacher)**

Getting Started with Slate & Running Changes Locally
------------------------------

Quick start on MacOS:

```bash
# install ruby version manager
\curl -sSL https://get.rvm.io | bash -s stable --ruby
# version 2.6.6 required to run v3-teacher (set CFLAGS due to commmon error: https://github.com/rvm/rvm/issues/5039#issuecomment-774577714)
CFLAGS="-Wno-error=implicit-function-declaration" rvm install 2.6.6
gem install bundler
bundle install
# Will run on http://localhost:4567
bundle exec middleman server 
```

To get started with Slate, please check out the [Getting Started](https://github.com/slatedocs/slate/wiki#getting-started)
section in the Slate [wiki](https://github.com/slatedocs/slate/wiki).

Slate supports running Slate in three different ways:
* [Natively](https://github.com/slatedocs/slate/wiki/Using-Slate-Natively)
* [Using Vagrant](https://github.com/slatedocs/slate/wiki/Using-Slate-in-Vagrant)
* [Using Docker](https://github.com/slatedocs/slate/wiki/Using-Slate-in-Docker)

------------------------------

Quick start on docker-compose:

### Install

[Install docker](https://docs.docker.com/engine/installation/#supported-platforms)

[Install Docker Compose](https://docs.docker.com/compose/install/) or on mac `brew install docker-compose`

### Run

Start server on http://localhost:4567/

```
docker-compose up
```
