# API Rentx | Aluguel de Carros

<h3>API Rest de ALuguel de Carros, desenvolvido durante o curso <b>Ignite Pro</b> da <b>Rocketseat</b>

## 🚀 Tecnologias
- TypeScript
- Node
- TypeOrm
- JWT
- BcryptJS
- Multer
- Tsyringe
- Jest
- Postgres

<br>

## 💻 Padrão utilizado
- Arquitetura *SOLID*

<br>

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

**RN**
* O cadastro deve ser possível apenas por usuários administradores
* Não deve ser possível cadastrar uma especificação para um carro inexistente
* Não deve ser possível cadastrar uma especificação já existente para um mesmo carro

<br>

# Upload de imagem do carro

**RF**
* Deve ser possível fazer upload de imagens do carro

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
* O usuário deve estar logado na aplicação
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
* Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

<br>

# Devolução do carro

**RF**
* Deve ser possível realizar a devolução de um carro

**RN**
* O usuário deve estar logado na aplicação
* Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa
* Ao realizar a devolução, o status do carro deverá ser alterado para disponível
* Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
* Ao realizar a devolução, deverá ser calculado o total do aluguel
* Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado uma multa proporcional aos dias de atraso
* Caso haja multa, deverá ser somado ao total do aluguel

<br>

# Listagem de Aluguéis do usuário

**RF**
* Deve ser possível realizar a busca de todos os aluguéis do usuário

**RN**
* O usuário deve estar logado na aplicação

<br>

# Recuperação de senha

**RF**
* Deve ser possível o usuário recuperar a senha informando o seu email
* O usuário deve receber um email com o passo a passo para a recuperação da senha
* O usuário deve conseguir inserir uma nova senha

**RN**
* O usuário precisa informar uma nova senha
* O link enviado para a recuperação deve expirar em 3 horas