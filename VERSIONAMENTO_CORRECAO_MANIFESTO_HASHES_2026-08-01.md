# Versionamento — correção do manifesto de hashes

Data: 2026-08-01
Versão: 1.0
Classificação: PÚBLICO-CONTROLADO / TRANSPARÊNCIA / CORREÇÃO

## Achado

A revisão integral dos pacotes comparou os bytes publicados com o manifesto
vigente. Os três PDFs e a fonte editável do one-page estavam corretos. As
fontes editáveis do pitch e do panorama respondiam normalmente, mas seus
hashes já não correspondiam aos valores declarados no manifesto v3.

## Correção

- preserva o manifesto v3 de 30/07/2026 como histórico;
- publica o manifesto v4 de 01/08/2026;
- recalcula os dois hashes sobre os bytes servidos em produção;
- atualiza os links públicos para apontar ao manifesto v4;
- não altera os PDFs nem o conteúdo editorial das fontes editáveis.

## Hashes corrigidos

- fonte do pitch: `66D08CF88DAC22A7F1E685F65B83F8791A084B172440DF83362A36780210C7E7`;
- fonte do panorama: `5CBC075D48EF78CD33EE755FBA5E30B384ED44B1F66A438AFBD306ECB64169E3`.

## Regra preservada

Um manifesto novo acrescenta e corrige rastreabilidade sem apagar a versão
anterior. Hash histórico registra o arquivo naquele momento; hash vigente deve
corresponder exatamente ao arquivo atualmente servido.

© Jus 9 Tecnologia Jurídica — autoria preservada.
