# Configuração

### TODO
- [ ] Finalizar este documento
- [x] Criar um script shell para automatizar processor irritantes

### Pré-requisitos
Você vai precisar disto para começar:
* [Uma distribuição linux](https://en.wikipedia.org/wiki/List_of_Linux_distributions) :penguin:
* [Docker engine](https://docs.docker.com/engine/installation/linux/) @ latest version :whale:
* [Docker compose](https://docs.docker.com/compose/install/) :octopus:

### Configuração
Este guia vai te ajudar a iniciar o ambiente de desenvolvimento e produção desde o começo. Se você tem problemas com comandos unix, pergunte [para este cara](http://explainshell.com/) :shell:

Para começar, clone o repositório para uma pasta de sua escolha, e entre na nova pasta criada:
```bash
# Escolha a pasta para guardar os arquivos do projeto
cd /caminho/para/o/projeto

# Clone o repositório
git clone https://github.com/bortoluzzi/Hercules hercules

# Entre no diretório
cd hercules
```

Antes de começarmos a subir os containers, precisamos criar um __arquivo de ambiente__. Um arquivo de ambiente contém a declaração das _variáveis de ambiente_. Fizemos este processo simples e interativo para você :blue_heart: O resultado de todo nosso amor está em [setup_env.sh](../setup_env.sh). Apenas rode este script no seu shell:
```bash
# Assumindo que você já está dentro da pasta `hercules`
./setup_env.sh
```
Você vai ser perguntado para aceitar os padrões ou fornecer novos valores para algumas variáveis de ambiente importantes. Assim que fizer, o script vai criar um arquivo chamado `.env` na raiz do projeto. O conteúdo deste arquivo deve ser mais ou menos como assim:
```
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://hercules_db/hercules
```
A parte esquerda do símbolo `=` define o nome da variável, na parte da direita o valor da variável. Estas variáveis são bem importantes para o nosso projeto. Aqui você pode ver o que cara variável significa:

Nome da variável | Descrição
--------------|-------------
NODE_ENV | Representa o ambiente que o Node.js esta rodando. Os valores mais comuns são "development" e "production", respectivamente desenvolvimento e produção.
PORT | A porta que nosso servidor HTTP Node.js vai rodar. Neste caso, também referenciamos a porta que nossos containers vão expor, e ligar com o host do docker.
MONGODB_URI | Usado pela aplicação Node.js para conectar com a base de dados MongoDB. Este valor deve ser uma valida [_string de conexão_](https://docs.mongodb.com/manual/reference/connection-string/).

#### :heavy_exclamation_mark: Uma nota em "MONGODB_URI"
Geralmente nós identificamos o host de uma string de conexão como um endereço de IP ou `localhost`. Porém, neste caso, nosso instância do MongoDB não esta rodando no mesmo container do servidor Node.js. Então, não podemos simplesmente especificar `localhost` e esperar que tudo vai rodar. Também, nós não temos um endereço de IP para referência. Você vai notar que nós usamos `hercules_db` para referênciar o servidor da base de dados. E isto é tudo sobre isto, funciona perfeitamente. Containers do docker podem acessar naturalmente um ao outro.

O conteúdo desde arquivo vai ser passado para o `docker-compose` e o contexto dos containers, através da opção `env_file` dentro de [docker-compose.yml](../docker-compose.yml).
