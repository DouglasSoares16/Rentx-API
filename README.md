*3 Pontos que umas aplicação irá ter*

**RF** => Requisitos Funcionais <br>
    *São as funcionalidades que a nossa aplicação irá ter*
<br>

**RNF** => Requisitos Não Funcionais<br>
    *Requisitos não funcionais são requisitos que não estão ligados diretamente com a aplicação, com as regras de negócio*
<br>

**RN** => Regras de Negócio<br>
    *São de fato as regras por traz de nossos requisitos funcionais*


##
<br>


# Cadastro de carro

**RF**
* Deve ser possível cadastrar um novo carro


**RN**
* O cadastro deve ser possível apenas por usuários administradores 
* Não deve ser possível cadastrar um carro com uma placa já existente
* O carro ao ser cadastrado por padrão deve está disponível

<br>

# Listar Carros

**RF**
* Deve ser possível listar todos os carro disponíveis
* Deve ser possível listar todos os carros disponíveis pela categoria
* Deve ser possível listar todos os carros disponíveis pela marca
* Deve ser possível listar todos os carros disponíveis pelo o nome

**RN**
* O usuário não precisa estar logado no sistema

<br>

# Cadastro de Especificação do carro

**RF**
* Deve ser possível cadastrar uma especificação para um carro
* Deve ser possível listar todas as especificações
* Deve ser possível listar todos os carros

**RN**
* O cadastro deve ser possível apenas por usuários administradores
* Não deve ser possível cadastrar uma especificação para um carro inexistente
* Não deve ser possível cadastrar uma especificação já existente para um mesmo carro

<br>

# Upload de imagem do carro

**RF**
* Deve ser possível fazer upload de imagens do carro
* Deve ser possível listar todos os carros

**RNF**
* Utilizar o Multer para o upload

**RN**
* O usuário poderá cadastrar mais de uma imagem para o mesmo carro
* O upload deve ser possível apenas por usuários administradores

<br>

# Aluguel de carro

**RF**
* Deve ser possível cadastrar um aluguel 

**RN**
* O aluguel deve ter duração mínima de 24 hora
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro