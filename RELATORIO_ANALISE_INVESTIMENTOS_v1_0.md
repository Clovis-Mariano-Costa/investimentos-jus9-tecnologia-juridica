# Relatório — Análise e atualização do pacote Investimentos Jus 9

## Diretriz aplicada
O pacote foi revisado com foco em dados necessários, cálculos e ligações relevantes. Não houve alteração visual ampla nem reescrita estrutural desnecessária.

## Alterações realizadas

1. Correção de ligação quebrada
- Criada a página `web-summit.html`, pois o menu apontava para ela e o arquivo não existia no pacote analisado.

2. Pitch Deck
- Incluído o arquivo `documentos/Jus9_Pitch_Deck_Web_Summit_Rio_2026.pptx`.
- Adicionado card em `documentos.html` para baixar o Pitch Deck.

3. Dados institucionais
- Atualizada a página inicial para refletir: empresa fundada em 2012, fase MVP/pre-seed, pre-revenue e foco Web Summit Rio 2026.
- Ajustado texto de investidor-anjo para faixa `R$ 50 mil a R$ 250 mil`, compatível com o dashboard.

4. Cálculos e dashboard
- Corrigido `script.js` para não quebrar em páginas que não possuem dashboard.
- Adicionado cálculo derivado de “Resultado no horizonte” no dashboard.
- Alocação de capital agora mostra percentual e valor em reais.
- Títulos do gráfico de trajetória agora mostram valores em reais.

5. Ligações com repertórios recém-criados
- Adicionado link “Equipe” no menu principal do pacote Investimentos, apontando para `https://www.jus9tecnologia.com.br/equipe/`.
- Adicionado botão “Conheça a equipe” na página inicial e no Web Summit.

6. Consistência de domínio e contato
- Padronizado rodapé para `investimentos.jus9tecnologia.com.br`.
- Contato ajustado para `clovis@jus9tecnologia.com.br`.

## O que não foi mexido
- Arquitetura visual principal.
- Dados de cenários brutos em `data/cenarios.json`, porque os percentuais fecham em 100% e os valores de alocação somam corretamente ao capital selecionado.
- Páginas por perfil, exceto navegação, domínio/contato e correção pontual de faixa do anjo.

## Observações
As projeções continuam tratadas como ilustrativas. Valores finais devem ser validados por cotações, contratos, revisão financeira e validação operacional.
