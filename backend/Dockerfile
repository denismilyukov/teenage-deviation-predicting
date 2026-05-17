FROM python:3.14-slim

WORKDIR /code

# Копируем всё из текущей папки (где лежит Dockerfile) в /code
COPY . /code/

# Устанавливаем зависимости
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Запускаем приложение (файл main.py в корне)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]