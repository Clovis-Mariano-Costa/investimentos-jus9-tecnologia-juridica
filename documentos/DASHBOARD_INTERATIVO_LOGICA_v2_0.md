<!--
Jus 9 Tecnologia Jurídica
Repositório: investimentos-jus9-tecnologia-juridica
Software livre com autoria preservada.
Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © **Jus 9 Tecnologia Jurídica**. Direitos autorais da produção reservados.
A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
Referência oficial: https://investidores.jus9tecnologia.com.br/
E-mail de contato: clovis@jus9tecnologia.com.br
DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
-->

# Dashboard Interativo de Investimentos — Jus 9 v2.0

## Lógica dos 5 segundos

O visitante escolhe:

1. Perfil
2. Prazo
3. Faixa de investimento

A partir disso, o dashboard apresenta a leitura mais importante para aquele perfil. Cada dado é clicável e muda o foco do relatório.

## Botão Limpar foco

Remove o foco no dado clicado e retorna à visão-base dos três filtros.

## Dados

Os dados são armazenados em JSON:

- `data/perfis.json`
- `data/prazos.json`
- `data/faixas.json`
- `data/cenarios.json`

O script Python `scripts/gerar_dados_investidores.py` documenta e gera os cenários.

## Observação

Valores são projeções ilustrativas e devem ser validados por cotações, contratos, dados reais e revisão financeira.
