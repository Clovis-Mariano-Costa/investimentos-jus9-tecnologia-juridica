# Portal de Investidores Jus 9 v1.3

Projeto destinado ao subdomínio investidores.jus9tecnologia.com.br.

Este portal fica separado do site principal da Jus 9.

# v1.5 — Detalhamento e dashboards por perfil

- Criada `detalhamento.html`.
- Criados dashboards por perfil:
  - dashboard-anjo.html
  - dashboard-banco.html
  - dashboard-fundo.html
  - dashboard-parceiro.html
  - dashboard-escritorio.html
  - dashboard-universidade.html
  - dashboard-patrocinador.html
  - dashboard-aceleradora.html
  - dashboard-mercado.html
- Incluída opção Mercado / visão S.A.
- Link “Detalhamento” adicionado ao cabeçalho do portal.

# v2.0 — Dashboard interativo

- Projeto preparado para `investimentos.jus9tecnologia.com.br`.
- Criado `dashboard.html`.
- Criados dados JSON em `/data`.
- Criado script Python em `/scripts/gerar_dados_investidores.py`.
- Gráficos e tabelas são clicáveis e alteram o foco do relatório.
- Botão “Limpar foco” retorna à visão-base.


## v2.1 — Dashboard, cadastros, DAJ e investidores

- Dashboard recebeu atenção especial para leitura executiva.
- MVP recebeu abertura de DAJ como cadastro inicial do cliente, com foto, anexos, auditoria e número `DAJ-AAAAMM-sequencial`.
- Reforçada a regra: clientes não acessam DAJ; acompanhamento é interno da equipe.
- Qualquer membro autorizado pode abrir DAJ; demais cadastros seguem com Advogado Líder ou delegação registrada.
- Criado aviso: a execução pode ser delegada, mas a responsabilidade não.
- Workspace recebeu histórico de fotos em estilo rede privada, sem expor dados sensíveis.
- Investidores recebeu gráficos de pizza, página de despesas/lucro e dados por horizonte.
