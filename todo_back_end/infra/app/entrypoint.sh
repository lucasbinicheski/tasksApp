#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z api-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

echo "Creating database relations..."
python app/manage.py recreate_db
echo "Relations has been created."
python app/manage.py run -h 0.0.0.0