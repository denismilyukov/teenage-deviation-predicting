# Развёртывание FastAPI + React в Docker

Этот шаблон представляет собой базовую настройку веб-приложения с использованием **FastAPI** (backend) и **React** (frontend), упакованных в контейнеры Docker.

## Требования

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Развёртывание

1. **Клонируйте репозиторий**
```bash
   git clone https://yourrepositoryurl/plain-fastapi-react-docker.git
   cd plain-fastapi-react-docker
```
2. **Соберите и запустите контейнеры**

```bash
   docker-compose up --build
```
После запуска:

Backend будет доступен по адресу: http://localhost

Frontend — по адресу: http://localhost:3000  
3. **Остановка приложения**
Для остановки и удаления контейнеров, сетей и volume'ов:

```bash

docker-compose down -v
```
"# FastAPI-React-Docker-Template" 
