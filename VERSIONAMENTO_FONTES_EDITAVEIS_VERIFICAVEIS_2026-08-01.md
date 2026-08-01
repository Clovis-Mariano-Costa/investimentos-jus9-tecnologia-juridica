# Versionamento — fontes editáveis verificáveis

Data: 2026-08-01
Versão: 1.0
Classificação: PÚBLICO-CONTROLADO / TRANSPARÊNCIA / CORREÇÃO DEFINITIVA

## Causa raiz

A proteção de e-mail da Cloudflare transforma o HTML servido e gera um novo
valor `data-cfemail` entre requisições. O conteúdo visível e o tamanho permanecem
equivalentes, mas o SHA-256 muda. Portanto, o HTML renderizado não é um artefato
adequado para verificação criptográfica permanente.

## Solução

- mantém os HTMLs como visualizações navegáveis;
- publica um ZIP verificável para cada fonte editável;
- inclui em cada ZIP o HTML e o logo oficial, preservando a estrutura relativa;
- publica manifesto v5 com hashes dos ZIPs estáveis;
- preserva os manifestos v3 e v4 como histórico da descoberta e da correção;
- não altera PDFs nem conteúdo editorial.

## SHA-256 dos ZIPs

- one-page: `2F04FD2DDD12BABA68FCE6A936FE8963FC1AAFCA32AD0F2D1CE054F4899DC92E`;
- pitch: `057017946AA59875D21376E12A3DEAF890194B832E4009E93462639E9FD43C96`;
- panorama: `10030CF76B2499E65EDD3E195EEF4932E9FB94AF1424B4141A6F07299BD9DA67`.

## Uso

Para apenas consultar, abra a visualização HTML. Para editar ou conferir a
integridade, baixe o ZIP, calcule seu SHA-256 e extraia-o preservando as pastas.

© Jus 9 Tecnologia Jurídica — autoria preservada.
