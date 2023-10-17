FROM python:3.11.2-slim-buster

WORKDIR /usr/src/todo_back_end

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

COPY requirements.txt infra/requirements.txt
RUN pip install -r infra/requirements.txt

COPY entrypoint.sh infra/entrypoint.sh
RUN chmod +x /usr/src/todo_back_end/infra/entrypoint.sh
