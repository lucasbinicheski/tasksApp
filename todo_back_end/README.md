- Run application: `docker compose -f infra/docker-compose.yaml up -d --build`
- ** Se docker compose não rodar, tente docker-compose  
- Run tests: `docker compose -f infra/docker-compose.yaml exec api python -m pytest "app/tests" -p no:warnings`
- Steps for authentication and authorization:
  - Go to localhost:5004/doc
  - Create a user (_/user/register_)
  - Authenticate yourself by _Authorize_ button with _username_ e _password_