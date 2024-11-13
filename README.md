<h1 align="center"><b>REMÉDIO SOLIDÁRIO – SOFTWARE DE GESTÃO DE REAPROVEITAMENTO DE REMÉDIOS PELA REDE PÚBLICA DE SAÚDE</b></h1>

<p align="center">
  <img src="https://github.com/KarenBoscolo/PIRemediosGeral/assets/149967716/89a5dc51-ac92-4dc1-a3c0-be602f63570d" alt="Remédio Solidário">
</p>

Tendo em vista um problema conhecido e divulgado da falta de medicamentos para atendimento de parte da população que depende do serviço público de saúde, além dos riscos do descarte incorreto deles, buscou-se uma solução social e tecnológica para suprir esta oferta deficitária da rede pública.

Este trabalho tem como objetivo a criação de um programa de tecnologia, denominado Remédio Solidário, a ser disponibilizado a farmácias municipais, integrantes dos Postos de Saúde Municipais, atendidas pelo SUS (Sistema Único de Saúde), para controle informatizado da recepção, cadastramento, controle de validade e dispensação de receitas, e posterior reutilização de sobras de medicamentos em posse da população para complementação e suplementação da demanda existente.

As informações necessárias para a definição do problema foram obtidas através de levantamento bibliográfico, bem como juntamente à comunidade e profissionais que atuam na área da saúde e distribuição de medicamentos.

O desenvolvimento do sistema organiza de forma simples a recepção e redistribuição dos medicamentos auxiliando no controle e no reaproveitamento destes produtos em condições de uso, evitando também, desta forma, o descarte incorreto destes produtos.

Por fim, considera-se que mediante as opiniões da comunidade e de profissionais atuantes nos órgãos públicos, a implantação do software tem um potencial de ajudar a trazer eficiência na distribuição de forma simples e intuitiva.


# UNIVESP-PI-DRP04-PJI240-SALA-004GRUPO-008
Projeto Integrador - UNIVESP: Aprimoramento de software com framework web em Cloud com metodologias Design Thinking.

Integrantes do Grupo:

- Alex Vilela da Silva, RA 2204547
- Bernardo Lima dos Santos, RA 1811895
- Felipe Marcelino do Nascimento, RA 2220467
- Filipe Faria Maquiaveli, RA 1905672
- Franciele Cristina da Silva Lima, RA 2227071
- Karen Cristina Boscolo, RA 1903501
- Marcio de Avila Ribeiro Breda, RA 2100939
- Mariana Della Coletta Moioli Capelari, RA 2200830


__________________________________________________________________________

## Arquitetura

<img src="img/Arquitetura Framework 3.png" alt="Arquitetura" width="800">

<p> 1 - O usuário inicia a interação com a aplicação através de uma interface de login. Neste momento, ocorre a validação das credenciais e a autorização para o uso dos recursos da aplicação. Este processo é fundamental para garantir a segurança e integridade dos dados.</p>
<p> 2 - O NGINX atua como um servidor web reverso, responsável por distribuir o tráfego de rede de forma eficiente e segura para o backend hospedado na instância EC2. Ele melhora o desempenho da aplicação ao servir conteúdos estáticos rapidamente, além de ser capaz de balancear carga e fornecer caching. </p>
<p> 3 - Para otimizar a entrega de conteúdo, é utilizado um CDN (Content Delivery Network), que faz cache dos arquivos estáticos, como imagens, CSS e JavaScript. O uso de CDN melhora significativamente a performance ao reduzir o tempo de resposta para o usuário final, uma vez que os arquivos são servidos a partir do servidor mais próximo da localização geográfica do usuário. </p>
<p> 4 - O backend realiza operações de leitura e escrita em um banco de dados MySQL. Todos os dados da aplicação, incluindo informações de usuários e dados de transações, são armazenados de forma segura. </p>
<p> 5 - A sincronização do código-fonte da aplicação com o GitHub permite uma integração contínua (CI) e entrega contínua (CD), facilitando o deploy de novas versões diretamente na instância EC2. Um script Bash pode ser configurado para fazer a sincronização automática, reduzindo a necessidade de intervenções manuais. </p>
<p> 6 - O gerenciamento e monitoramento de recursos são realizados através de ferramentas como o AWS CloudWatch e AWS IAM. O CloudWatch é responsável por coletar e monitorar métricas, enquanto o IAM (Identity and Access Management) fornece controle de acesso granular aos serviços AWS, aumentando a segurança. </p>




