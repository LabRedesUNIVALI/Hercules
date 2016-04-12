# Hercules
Sistema de Provas Objetivas Hercules

**Reunião nº 1**: Proposta <br>
**Data**: 18/03/2016. <br>
**Horário**: 17hrs às 18:30hrs. <br>
**Participantes**: Fabrício Bortoluzzi, André L. Vargas, Gustavo Dal Pont.

Nesta reunião, foram introduzidos os seguintes requisitos funcionais:

* O sistema deve permitir a realização de provas objetivas através do computador;
* Deverá ser possível cadastrar um banco de questões;
* Cada questão deverá possuir uma opção de resposta certa e um número de opções erradas;
* Em uma prova, a ordem que as perguntas estarão disponibilizadas deve ser sorteada;
* As opções de resposta das questões também devem estar embaralhadas entre si;
* Deverá ser possível realizar a impressão da prova respondida após a aplicação da mesma;
* O professor decidirá se uma prova será encerrada no prazo limite, obrigatoriamente, ou se autoriza o término em acaso;
* O sistema deverá controlar o início e o fim da aplicação de uma prova, de acordo com um agendamento informado pelo professor;
* A interface durante a realização da prova deverá exibir um contador regressivo, indicando o tempo restante para a finalização da prova.
* O sistema deve consultar os dados da turma diretamente na própria Intranet da UNIVALI (Web crawling);
* O sistema deverá dar integridade à uma prova por meio de uma hash;
* Deverá ser possível consultar uma prova a partir da hash impressa;
* O sistema deverá armazenar permanentemente todas as provas no banco de dados;
* Deverá ser permitido ao professor analisar o índice de acertos e erros, e visualizar exibições gráficas das respostas erradas mais selecionadas;
* O sistema deverá permitir que o aluno faça um comentário, opcionalmente, sobre a qualidade de cada questão;
* O sistema deverá apresentar uma pesquisa de satisfação mediante ao término;
* Ao gerar uma prova, o sistema deve gerar também um identificador único;
* O identificador deverá possuir o formato com o ano, mes e dia da aplicação da prova, seguido por um hífen e um código randômico de 6 caracteres alfanuméricos. Ex.: __20160322-a5cb3e__;
* O identificador deverá ser utilizado pelo aluno para ter acesso a prova, e poderá ser usado até 30 minutos após i início da aplicação.
* Durante a realização da prova, o sistema deverá exibir uma questão por vez;
* Deverá ser permitido pular questões;
* Deverá contabilizar o tempo em cada questão;
* O sistema deverá salvar os dados em tempo real, para suportar quedas de energia elétrica;
* A interface deverá apresentar um botão de enviar a prova definitivamente para avaliação;
* O professor não poderá alterar uma prova em execução;
* O sistema deverá oferecer uma pré-visualização da prova gerada.

**Reunião nº 2**: Proposta <br>
**Data**: 08/04/2016. <br>
**Horário**: 18hrs às 18:30hrs. <br>
**Participantes**: Fabrício Bortoluzzi, André L. Vargas, Gustavo Dal Pont.

A partir desta reunião, os participantes chegaram às seguintes conclusões:

* O sistema deverá permitir que o professor, ao gerar uma prova, selecione questões que ele deseja que estejam nela. As restantes serão adicionadas aleatoriamente pelo sistema.
* O professor poderá selecionar quantas questões a prova terá. O máximo de questões que uma prova pode ter é igual ao número de questões cadastradas.
