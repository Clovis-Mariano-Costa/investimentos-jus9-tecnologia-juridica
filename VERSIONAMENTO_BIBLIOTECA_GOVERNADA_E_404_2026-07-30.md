# Versionamento — biblioteca governada e 404

Data: 2026-07-30  
Versão: 1.0  
Classificação: PÚBLICO-CONTROLADO / GOVERNANÇA

## Problemas encontrados

- rota inexistente do domínio de investimentos respondia HTTP 200 com a página inicial;
- biblioteca promovia documentos vigentes, históricos e ainda não revisados sem separação suficiente;
- pre-money de R$ 7,2 milhões, post-money de R$ 8 milhões e participação de 10% apareciam como referências correntes sem validação documental adequada;
- materiais de Web Summit e BNDES continuavam indexados como conteúdo corrente.

## Correções

- página `404.html` adicionada para ativar o comportamento 404 nativo do Cloudflare Pages;
- biblioteca reconstruída com estados vigente, em revisão e histórico preservado;
- números societários não validados retirados da narrativa corrente;
- hipótese de até R$ 800 mil apresentada como não vinculante e liberada por marcos;
- alocação do dashboard harmonizada com o pitch vigente;
- cabeçalhos `X-Robots-Tag` adicionados aos principais materiais históricos;
- sitemap retirou rotas históricas de evento;
- arquitetura editorial e regra de classificação documentadas.

## Verificação local

- XML do sitemap válido;
- `git diff --check` sem erro;
- zero ocorrência dos valores de valuation retirados nas quatro páginas correntes;
- biblioteca renderizada no navegador com título, hierarquia e ações visíveis;
- 41 de 41 recursos com extensão explícita responderam corretamente no rastreador local;
- erros de rotas sem extensão no servidor local são esperados; o Cloudflare Pages aplica URLs limpas em produção.

## Verificação obrigatória após implantação

- rota aleatória deve retornar HTTP 404;
- `/documentos`, `/`, `/dashboard` e `/transparencia` devem responder 200;
- pitch e relatório vigentes devem continuar respondendo com PDF;
- cabeçalhos de documentos históricos devem conter `X-Robots-Tag`.

