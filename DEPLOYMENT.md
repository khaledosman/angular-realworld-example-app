# Guide de déploiement de l'application

Ce document explique comment déployer l'application en environnement de production.

## Prérequis

* Docker 20.10+
* Un compte sur [Docker Hub](https://hub.docker.com/)
* Accès au serveur de production (via SSH)

## Étapes de déploiement manuel

### 1. Construire l'image Docker

Cette commande crée l'image locale en utilisant le `Dockerfile` présent dans le répertoire courant.

```bash
docker build -t angular-app:latest .
