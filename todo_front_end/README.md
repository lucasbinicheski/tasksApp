 ### 🎲 Iniciar a aplicação (Com Docker)

Antes de executar o projeto, certifique-se de que você tenha o Docker e o Docker Compose instalados em sua máquina.

   - Docker
   - Docker Compose

Como executar o projeto
1. Clone o repositório


2. Crie um arquivo .env

Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias. Você pode usar o arquivo .env.example como base.

3. Construa a imagem do Docker

*(Usuário Linux):
sudo docker build -f Dockerfile.dev -t tasks-app .

*(Usuário Windows -> Abrir CMD em modo Administrador):
docker build -f Dockerfile.dev -t tasks-app .

Agora construa a imagem do Docker a partir do arquivo Dockerfile.dev:

*(Usuário Linux):
sudo docker-compose -f docker-compose.dev.yml up     

*(Usuário Windows -> Abir CMD em modo Administrador):
docker-compose -f docker-compose.dev.yml up     

4. Execute o projeto

Por fim, execute o projeto utilizando o arquivo docker-compose.dev.yml:

docker-compose -f docker-compose.dev.yml up

Isso irá construir e executar o container Docker com o projeto. Você pode acessá-lo em seu navegador através do endereço http://localhost:3000.
 
