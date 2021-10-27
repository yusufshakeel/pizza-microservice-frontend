# pizza-microservice-frontend
This is a microservice project. This repository contains frontend code.

# Prerequisite

* Homebrew (for Mac)
* Node +10.0.0
* Docker
* Kubernetes enabled (Docker for Mac/Win)
* [Skaffold](https://skaffold.dev/)

# STRIPE setup

Set `STRIPE_PSP_PUBLIC_KEY` in this file `src/constants/app-constants.js` 
with your Stripe `Publishable key`

### For local development I have set the following on my Mac

File: `/etc/hosts`

```
##
# for pizza microservice project
# https://github.com/yusufshakeel/pizza-microservice-backend
##
127.0.0.1 pizza.localdev
# End of section
```

So, when I open https://pizza.localdev it goes to localhost.

# To build docker image run the following command

```
$ npm run docker-build
```

# To deploy run the following command

```
$ skaffold dev
```