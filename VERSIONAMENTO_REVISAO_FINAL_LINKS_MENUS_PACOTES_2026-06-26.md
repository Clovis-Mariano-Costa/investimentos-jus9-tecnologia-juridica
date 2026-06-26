# Versionamento - Revisao Final de Links, Menus e Pacotes

Data: 2026-06-26
Classificacao: PUBLICO / REVISAO FINAL / LINKS / MENUS / TRANSPARENCIA

## Escopo

Revisao final do pacote de publicacao online de investidores, com foco em:

- links internos;
- links externos;
- menus semanticos;
- sitemap;
- mapa de links oficiais;
- contato publico;
- familia do Portal da Transparencia;
- regra de revisao final de todos os pacotes.

## Correcoes aplicadas

- Corrigido link Equipe em `web-summit.html`: de rota quebrada no dominio principal para `https://equipe.jus9tecnologia.com.br/`.
- Padronizados contatos publicos do `web-summit.html` para `Contato@jus9tecnologia.com.br`.
- Removido link publico direto para ChatGPT/Codex em orientacao interna que retornava 403 em auditoria automatizada.
- Corrigido `ORIENTACOES/MAPA_DE_LINKS_SEMANTICOS_OFICIAIS.md`, que estava com caracteres corrompidos.
- Criado `MAPA_LINKS_SEMANTICOS_JUS9_v2_1.md`.
- Menus de paginas publicas receberam o caminho minimo para Inicio, Dashboard, Documentos, Transparencia, Hashes, Versionamento, Riscos e Seguranca quando faltava.
- `sitemap.xml` ampliado para as principais paginas publicas do portal de investidores.

## Regra de menu minimo

Toda pagina publica da frente de investidores deve oferecer caminho visivel para:

- Inicio;
- Dashboard;
- Documentos;
- Transparencia;
- Hashes;
- Versionamento;
- Riscos;
- Seguranca.

Menus contextuais podem acrescentar links especificos, desde que nao removam a trilha de transparencia.

## Resultado das auditorias locais

- Varredura local: 943 referencias.
- Links internos locais: 807.
- Links externos locais: 119.
- Contatos `mailto:`: 17.
- Issues locais: 0.
- HTMLs com menu de transparencia: 31 de 32.
- Excecao consciente: `downloads/modelos/jus9-modelo-documento-institucional.html`, por ser template de documento e nao pagina de navegacao.

## Resultado das auditorias HTTP antes da publicacao

- Internos em producao testados contra a lista nova: 108/108 com HTTP 200.
- Externos testaveis: 31/31 com HTTP 200.
- Nenhum `http://` navegavel inseguro encontrado; apenas namespace tecnico do sitemap.

## Regra do ultimo pacote

O ultimo pacote de cada ciclo Mao na Massa deve revisar todos os pacotes publicados no ciclo:

- nomes;
- datas;
- links;
- menus;
- hashes;
- documentos;
- avisos juridicos;
- classificacao;
- ausencia de dados pessoais;
- responsividade;
- deploy;
- site publicado;
- ensino de Charlie Echo.

Nada deve ser tratado como final se ainda houver link quebrado, rota sem destino, documento sem status, arquivo sensivel exposto ou pagina publica sem caminho de transparencia.
