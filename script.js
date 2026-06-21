const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

const budget = [
  { area: "Produto e engenharia", fase: "0-90 dias", tipo: "Curto prazo", valor: 176000, impacto: 96, risco: 24, descricao: "DAJ, agenda real, documentos, perfis, fluxos de MVP, roteiros de demo e primeira camada de testes de produto.", cautela: "Separar demonstracao de producao; usar dados ficticios ate o backend seguro." },
  { area: "Design e frontend", fase: "0-90 dias", tipo: "Curto prazo", valor: 88000, impacto: 82, risco: 20, descricao: "Refino visual dos portais, dashboards, formularios, chat Charlie Echo, responsividade, PWA e padrao de navegacao.", cautela: "Preservar links antigos, acessibilidade e identidade visual de cada modulo." },
  { area: "Conteudo e documentacao", fase: "0-90 dias", tipo: "Curto prazo", valor: 42000, impacto: 70, risco: 16, descricao: "Pitch, one-page, documentos de governanca, manuais, roteiros comerciais, guias para IAs e materiais de follow-up.", cautela: "Classificar publico, interno, sigiloso e cofre antes de publicar." },
  { area: "Backend seguro", fase: "90-180 dias", tipo: "Medio prazo", valor: 236000, impacto: 94, risco: 18, descricao: "Login real, permissoes por perfil, banco, logs, auditoria, APIs, Drive Saver, agenda, areas privadas e trilhas de acesso.", cautela: "Nao operar dados reais sem HTTPS, permissao, auditoria, backup e revisao tecnica." },
  { area: "Governanca e juridico", fase: "90-180 dias", tipo: "Medio prazo", valor: 74000, impacto: 88, risco: 12, descricao: "LGPD, termos, politicas, contratos, classificacao documental, revisao humana e governanca da Familia Virtual.", cautela: "Revisao humana obrigatoria em conteudo juridico, financeiro, societario ou sensivel." },
  { area: "Cloud, dominios e seguranca", fase: "90-180 dias", tipo: "Medio prazo", valor: 54000, impacto: 78, risco: 10, descricao: "Cloudflare, dominios, Workers, Pages, DNS, logs, monitoramento, backup, rollback, e-mail e protecao de rotas.", cautela: "Registrar DNS, deploy, secrets, rollback e responsaveis sem publicar credenciais." },
  { area: "Comercial e parcerias", fase: "180-365 dias", tipo: "Longo prazo", valor: 138000, impacto: 86, risco: 35, descricao: "Prospeccao, eventos, follow-up, parceiros, universidades, escritorios, bancos, hubs e primeiras trilhas de relacionamento.", cautela: "Nao publicar nomes, negociacoes, condicoes ou dados de leads sem autorizacao." },
  { area: "Equipe e operacao", fase: "180-365 dias", tipo: "Longo prazo", valor: 192000, impacto: 90, risco: 30, descricao: "Bolsa operacional, apoio tecnico, atendimento, cadastro, QA, producao de conteudo, revisao humana e rotina administrativa.", cautela: "Contratar em etapas, com responsabilidades, entregaveis e revisao de custo fixo." },
  { area: "IA e automacao avancada", fase: "180-365 dias", tipo: "Longo prazo", valor: 168000, impacto: 89, risco: 42, descricao: "Memoria governada, agentes, PDF/download, triagem juridica, automacoes, classificacao documental e integracoes assistidas.", cautela: "Manter limites de IA, supervisao humana, logs seguros e fallback sem dados reais." },
  { area: "Reserva tecnica", fase: "180-365 dias", tipo: "Longo prazo", valor: 80000, impacto: 58, risco: 5, descricao: "Margem para imprevistos, retrabalho, compliance, infraestrutura, contingencia de evento e ajustes de seguranca.", cautela: "Usar apenas para risco real, nao para expansao nao revisada." },
];

const budgetDetails = [
  { area: "Produto e engenharia", item: "DAJ e fluxos de MVP", valor: 42000, entrega: "Refino de DAJ, cadastros, estados e fluxos por perfil.", governanca: "Dados ficticios ate producao." },
  { area: "Produto e engenharia", item: "Agenda real e eventos", valor: 24000, entrega: "Google Agenda, retorno por modulo, listagem e testes.", governanca: "Escopos minimos e revisao humana." },
  { area: "Produto e engenharia", item: "Documentos e Drive Saver", valor: 30000, entrega: "Mini backend, classificacao e salvamento governado.", governanca: "Cofre nunca automatico." },
  { area: "Produto e engenharia", item: "Perfis, formularios e MVPs", valor: 38000, entrega: "Perfis de usuario, modulos, formularios e Demo Autor/Editor.", governanca: "Separar publico, interno e sensivel." },
  { area: "Produto e engenharia", item: "Testes e integracoes", valor: 42000, entrega: "QA, rotas, PWA, downloads, scripts e regressao.", governanca: "Registrar falhas antes do uso real." },

  { area: "Design e frontend", item: "Refino visual dos portais", valor: 26000, entrega: "Home, historia, MVPs, investimentos e paginas de apoio.", governanca: "Preservar identidade visual." },
  { area: "Design e frontend", item: "Dashboards e graficos", valor: 18000, entrega: "Tabelas, filtros, legendas, graficos e leitura mobile.", governanca: "Estimativas nao vinculantes." },
  { area: "Design e frontend", item: "Chat Charlie Echo", valor: 16000, entrega: "Menus, memoria, acoes, PDF/download e padroes de tela.", governanca: "Avisos proporcionais." },
  { area: "Design e frontend", item: "PWA, responsividade e formularios", valor: 28000, entrega: "Service worker, mobile, scroll, foto/avatar e estados.", governanca: "Consentimento e minimizacao." },

  { area: "Conteudo e documentacao", item: "Pitch, one-page e deck", valor: 11000, entrega: "Materiais para investidores, parceiros, bancos e evento.", governanca: "Distinguir visao e compromisso formal." },
  { area: "Conteudo e documentacao", item: "Governanca publica", valor: 9000, entrega: "Termos, politicas, versoes publicas e avisos de MVP.", governanca: "Sem detalhes sensiveis." },
  { area: "Conteudo e documentacao", item: "Guias internos para IA", valor: 9000, entrega: "Instrucoes para Charlie Echo operar modulos e mini backend.", governanca: "Sem chaves ou tokens." },
  { area: "Conteudo e documentacao", item: "Roteiros e versionamento", valor: 13000, entrega: "Follow-up, roteiro de demo, versionamento e registro.", governanca: "Separar publico e interno." },

  { area: "Backend seguro", item: "Login real", valor: 42000, entrega: "OAuth Google, sessao, cookies seguros, callback por modulo e logout.", governanca: "Segredos somente em ambiente autorizado." },
  { area: "Backend seguro", item: "Permissoes por perfil", valor: 32000, entrega: "Papeis como fundador, advogado lider, assessor, equipe, laboratorio, autor e editora.", governanca: "Menor privilegio." },
  { area: "Backend seguro", item: "Banco de dados operacional", valor: 38000, entrega: "Modelos, migracoes, registros e relacionamento entre modulos.", governanca: "Backup, minimizacao e LGPD." },
  { area: "Backend seguro", item: "Logs e auditoria", valor: 24000, entrega: "Quem acessou, quando, origem, acao, modulo e alteracao.", governanca: "Sem conteudo sigiloso desnecessario." },
  { area: "Backend seguro", item: "APIs governadas", valor: 28000, entrega: "Rotas para agenda, documentos, perfis, permissao, contexto da IA e status.", governanca: "Validacao, rate limit e origem permitida." },
  { area: "Backend seguro", item: "Drive Saver e Agenda", valor: 30000, entrega: "Google Drive Saver, Google Calendar, retorno por modulo e execucao segura.", governanca: "COFRE_NAO_AUTOMATICO bloqueado." },
  { area: "Backend seguro", item: "Areas privadas e cofre write-only", valor: 26000, entrega: "Separar publico, interno, entrada para revisao e escrita restrita no cofre.", governanca: "Sem leitura ampla por IA publica." },
  { area: "Backend seguro", item: "Backup, testes e rollback", valor: 16000, entrega: "Recuperacao, teste de falha, rollback e verificacao de deploy.", governanca: "Procedimento documentado." },

  { area: "Governanca e juridico", item: "LGPD e privacidade", valor: 18000, entrega: "Finalidade, consentimento, retencao e direitos do titular.", governanca: "Revisao humana juridica." },
  { area: "Governanca e juridico", item: "Termos, politicas e contratos", valor: 16000, entrega: "Uso, privacidade, cookies, pilotos e parcerias.", governanca: "Sem promessa de producao antecipada." },
  { area: "Governanca e juridico", item: "Classificacao documental", valor: 12000, entrega: "Publico, interno, sigiloso, revisao e cofre.", governanca: "Responsavel humano." },
  { area: "Governanca e juridico", item: "Familia Virtual e riscos", valor: 28000, entrega: "Papeis, limites, continuidade e mapa de riscos.", governanca: "Governanca primeva sob aviso humano." },

  { area: "Cloud, dominios e seguranca", item: "Cloudflare, DNS e dominios", valor: 20000, entrega: "Workers, Pages, assets, DNS, SSL e subdominios.", governanca: "Rollback e responsaveis." },
  { area: "Cloud, dominios e seguranca", item: "Secrets e variaveis", valor: 8000, entrega: "Wrangler secrets, rotacao e checklist.", governanca: "Nunca commitar segredo." },
  { area: "Cloud, dominios e seguranca", item: "Monitoramento, e-mail e rotas", valor: 18000, entrega: "Saude, alertas, e-mails institucionais e rotas.", governanca: "Evitar coleta excessiva." },
  { area: "Cloud, dominios e seguranca", item: "Protecao de rotas", valor: 8000, entrega: "Headers, cache seguro e regras de acesso.", governanca: "Menor acesso." },

  { area: "Comercial e parcerias", item: "Follow-up pos-evento", valor: 26000, entrega: "Contatos, mensagens, reunioes e funil apos Web Summit.", governanca: "Nao expor leads." },
  { area: "Comercial e parcerias", item: "Parcerias institucionais", valor: 28000, entrega: "Bancos, universidades, hubs, escritorios e entidades.", governanca: "Registrar status." },
  { area: "Comercial e parcerias", item: "Materiais comerciais", valor: 22000, entrega: "Decks, one-page, propostas e paginas de apoio.", governanca: "Valores como estimativa." },
  { area: "Comercial e parcerias", item: "Pilotos e canais", valor: 62000, entrega: "Pilotos controlados, canais, comunidade e relacionamento.", governanca: "Dados reais so com contrato e backend seguro." },

  { area: "Equipe e operacao", item: "Bolsa operacional do fundador", valor: 48000, entrega: "Foco de execucao, reunioes, produto e direcao.", governanca: "Prestacao por marcos." },
  { area: "Equipe e operacao", item: "Apoio tecnico", valor: 42000, entrega: "Desenvolvimento, QA, publicacao, infraestrutura e automacoes.", governanca: "Revisao de codigo." },
  { area: "Equipe e operacao", item: "Atendimento, cadastro e administracao", valor: 46000, entrega: "Triagem, perfis, formularios, agenda e relatorios.", governanca: "Minimizar dados pessoais." },
  { area: "Equipe e operacao", item: "Conteudo e revisao humana", valor: 56000, entrega: "Textos, guias, treinamento e revisao especializada.", governanca: "Decisoes finais humanas." },

  { area: "IA e automacao avancada", item: "Memoria governada", valor: 32000, entrega: "Memoria por sala, modulo, usuario, perfil e contexto.", governanca: "Usuario controla memoria." },
  { area: "IA e automacao avancada", item: "Agentes por modulo", valor: 30000, entrega: "Especialistas para DAJ, autor/editor, universidade, laboratorio e social.", governanca: "Limites por ambiente." },
  { area: "IA e automacao avancada", item: "PDF, download e pacotes", valor: 22000, entrega: "Relatorios, fichas, arquivos locais e historico.", governanca: "Sem segredo em pacote publico." },
  { area: "IA e automacao avancada", item: "Triagem e automacoes", valor: 52000, entrega: "Classificar pedidos, documentos, agenda, tarefas e status.", governanca: "Cofre sem automacao aberta." },
  { area: "IA e automacao avancada", item: "Integracoes e fallback", valor: 32000, entrega: "API segura, fallback local, observabilidade e continuidade.", governanca: "Nao pedir chave em chat." },

  { area: "Reserva tecnica", item: "Contingencia de infraestrutura", valor: 22000, entrega: "Instabilidade, escala, cache, dominios e incidentes.", governanca: "Uso com registro." },
  { area: "Reserva tecnica", item: "Retrabalho e seguranca", valor: 20000, entrega: "Correcoes emergenciais, bugs e reforco tecnico.", governanca: "Priorizar risco real." },
  { area: "Reserva tecnica", item: "Compliance e evento", valor: 28000, entrega: "Ajustes juridicos, materiais, deslocamento e demonstracao.", governanca: "Revisao humana." },
  { area: "Reserva tecnica", item: "Margem tecnica final", valor: 10000, entrega: "Ferramentas, testes e emergencias controladas.", governanca: "Justificar uso." },
];
const scenarios = {
  conservador: { label: "Conservador", factor: 0.72, runway: 9, foco: "provar MVP, reduzir custo fixo e validar demanda" },
  base: { label: "Base", factor: 1, runway: 12, foco: "produto seguro, pilotos e relacionamento pos-evento" },
  expansao: { label: "Expansao", factor: 1.36, runway: 18, foco: "backend, time, go-to-market e IA avancada" },
};

const profiles = {
  anjo: { ticket: 120000, label: "Investidor-anjo", tese: "primeiro cheque e validacao rapida", pedido: "ponte para validacao, material e primeiras entregas" },
  banco: { ticket: 380000, label: "Banco ou parceiro financeiro", tese: "credito, convenio e inovacao institucional", pedido: "linha de credito, patrocinio ou parceria de inovacao" },
  fundo: { ticket: 900000, label: "Fundo", tese: "escala SaaS, IA vertical e dados governados", pedido: "pre-seed, tese de tracao e governanca de dados" },
  parceiro: { ticket: 220000, label: "Parceiro estrategico", tese: "canal, receita compartilhada e integracao", pedido: "piloto conjunto, canal comercial ou integracao" },
  escritorio: { ticket: 72000, label: "Escritorio juridico", tese: "piloto pago, DAJ e IA profissional", pedido: "piloto controlado com dados ficticios ou sanitizados" },
  universidade: { ticket: 58000, label: "Universidade", tese: "pesquisa, extensao, alunos e eventos", pedido: "pesquisa aplicada, extensao, eventos e validacao academica" },
};
let sortKey = "valor";
let sortDir = -1;

const typeColors = {
  "Curto prazo": "#d9ad59",
  "Medio prazo": "#4fd5e8",
  "Longo prazo": "#4fb477",
};

const fallbackColors = ["#d9ad59", "#4fd5e8", "#4fb477", "#f4d58d", "#e98686", "#9f8cff"];

function q(selector) { return document.querySelector(selector); }
function qa(selector) { return [...document.querySelectorAll(selector)]; }
function sumRaw(rows) { return rows.reduce((sum, row) => sum + row.valor, 0); }
function total(rows) { return rows.reduce((sum, row) => sum + (row.ajustado ?? row.valor), 0); }

function colorFor(label, index = 0) {
  return typeColors[label] || fallbackColors[index % fallbackColors.length];
}

function groupedBy(rows, key) {
  return Object.values(rows.reduce((acc, row) => {
    const label = row[key];
    acc[label] ||= { label, valor: 0, count: 0 };
    acc[label].valor += row.ajustado ?? row.valor;
    acc[label].count += 1;
    return acc;
  }, {}));
}

function renderLegend(selector, items, note = "") {
  const legend = q(selector);
  if (!legend) return;
  if (!items.length) {
    legend.innerHTML = "";
    return;
  }
  legend.innerHTML = items.map((item, index) => {
    const color = item.color || colorFor(item.label, index);
    const value = item.valor ? ` <strong>${brl.format(item.valor)}</strong>` : "";
    return `<span><i style="background:${color}"></i>${item.label}${value}</span>`;
  }).join("") + (note ? `<small>${note}</small>` : "");
}

function scaledRows() {
  const scenario = scenarios[q("#scenario")?.value || "base"];
  const type = q("#typeFilter")?.value || "todos";
  return budget
    .map((row) => ({ ...row, ajustado: Math.round(row.valor * scenario.factor) }))
    .filter((row) => type === "todos" || row.tipo === type);
}

function parentForDetail(detail) {
  return budget.find((row) => row.area === detail.area) || {};
}

function detailRows() {
  const scenario = scenarios[q("#scenario")?.value || "base"];
  const type = q("#typeFilter")?.value || "todos";
  return budgetDetails
    .map((detail) => {
      const parent = parentForDetail(detail);
      return {
        ...detail,
        tipo: parent.tipo || "",
        fase: parent.fase || "",
        ajustado: Math.round(detail.valor * scenario.factor),
      };
    })
    .filter((row) => type === "todos" || row.tipo === type);
}

function fitLabel(text, max = 24) {
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function drawBars(canvas, rows) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!rows.length) {
    ctx.fillStyle = "#dce8f4";
    ctx.font = "14px Inter, Arial";
    ctx.fillText("Sem itens para o filtro selecionado.", 12, 28);
    return;
  }
  const max = Math.max(...rows.map((r) => r.ajustado ?? r.valor));
  const gap = 10;
  const barH = Math.max(14, (h - gap * (rows.length + 1)) / rows.length);
  ctx.font = "12px Inter, Arial";
  rows.forEach((row, index) => {
    const y = gap + index * (barH + gap);
    const value = row.ajustado ?? row.valor;
    const bw = (value / max) * (w - 182);
    const color = colorFor(row.tipo, index);
    ctx.fillStyle = "rgba(217,173,89,.18)";
    ctx.fillRect(156, y, w - 178, barH);
    ctx.fillStyle = color;
    ctx.fillRect(156, y, bw, barH);
    ctx.fillStyle = "#dce8f4";
    ctx.fillText(fitLabel(row.area, 22), 6, y + barH * .68);
    ctx.fillText(brl.format(value), Math.min(164 + bw, w - 86), y + barH * .68);
  });
}

function drawDonut(canvas, rows, groupKey = "tipo") {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  const grouped = groupedBy(rows, groupKey);
  const sum = total(rows);
  if (!rows.length || !sum) {
    ctx.fillStyle = "#dce8f4";
    ctx.font = "14px Inter, Arial";
    ctx.fillText("Sem itens", 12, 28);
    return;
  }
  const cx = canvas.clientWidth / 2;
  const cy = canvas.clientHeight / 2;
  const radius = Math.min(cx, cy) - 18;
  let start = -Math.PI / 2;
  grouped.forEach((item, index) => {
    const angle = (item.valor / sum) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = colorFor(item.label, index);
    ctx.fill();
    start += angle;
  });
  ctx.beginPath();
  ctx.fillStyle = "#071323";
  ctx.arc(cx, cy, radius * .58, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "700 18px Inter, Arial";
  ctx.textAlign = "center";
  ctx.fillText(brl.format(sum), cx, cy + 6);
  ctx.textAlign = "left";
}

function renderTable(rows) {
  const body = q("#budgetBody");
  if (!body) return;
  const sorted = [...rows].sort((a, b) => {
    const av = a[sortKey] ?? a.ajustado;
    const bv = b[sortKey] ?? b.ajustado;
    return av > bv ? sortDir : av < bv ? -sortDir : 0;
  });
  body.innerHTML = sorted.map((row) => `
    <tr data-area="${row.area}">
      <td><strong>${row.area}</strong></td>
      <td><span class="pill">${row.tipo}</span></td>
      <td>${row.fase}</td>
      <td>${brl.format(row.ajustado)}</td>
      <td>${row.impacto}</td>
      <td>${row.risco}</td>
      <td>${row.descricao}</td>
    </tr>
  `).join("");
}

function renderDetailTables(details) {
  const detailBody = q("#detailBudgetBody");
  if (detailBody) {
    detailBody.innerHTML = details.map((row) => `
      <tr>
        <td><strong>${row.area}</strong></td>
        <td>${row.item}</td>
        <td>${row.fase}</td>
        <td>${brl.format(row.ajustado)}</td>
        <td>${row.entrega}</td>
        <td>${row.governanca}</td>
      </tr>
    `).join("");
  }

  const areaSummary = Object.values(details.reduce((acc, row) => {
    acc[row.area] ||= { area: row.area, fase: row.fase, tipo: row.tipo, total: 0, count: 0, max: row };
    acc[row.area].total += row.ajustado;
    acc[row.area].count += 1;
    if (row.ajustado > acc[row.area].max.ajustado) acc[row.area].max = row;
    return acc;
  }, {}));
  const areaBody = q("#areaSummaryBody");
  if (areaBody) {
    areaBody.innerHTML = areaSummary.map((row) => `
      <tr>
        <td><strong>${row.area}</strong></td>
        <td>${row.fase}</td>
        <td>${row.count}</td>
        <td>${brl.format(row.total)}</td>
        <td>${row.max.item} (${brl.format(row.max.ajustado)})</td>
      </tr>
    `).join("");
  }

  const phaseSummary = Object.values(details.reduce((acc, row) => {
    acc[row.fase] ||= { fase: row.fase, tipo: row.tipo, total: 0, count: 0 };
    acc[row.fase].total += row.ajustado;
    acc[row.fase].count += 1;
    return acc;
  }, {}));
  const phaseBody = q("#phaseSummaryBody");
  if (phaseBody) {
    phaseBody.innerHTML = phaseSummary.map((row) => `
      <tr>
        <td><strong>${row.fase}</strong></td>
        <td><span class="pill">${row.tipo}</span></td>
        <td>${row.count}</td>
        <td>${brl.format(row.total)}</td>
        <td>${row.tipo === "Medio prazo" ? "fundacao tecnica segura" : row.tipo === "Curto prazo" ? "prova e demonstracao" : "escala e operacao"}</td>
      </tr>
    `).join("");
  }
}

function renderDashboard() {
  if (!q("#dashboard")) return;
  const rows = scaledRows();
  const details = detailRows();
  const selectedType = q("#typeFilter")?.value || "todos";
  const scenario = scenarios[q("#scenario").value];
  const profile = profiles[q("#profile").value];
  const sum = total(rows);
  const ticket = profile.ticket;
  q("#kpiTotal").textContent = brl.format(sum);
  q("#kpiTicket").textContent = brl.format(ticket);
  q("#kpiCoverage").textContent = pct.format(Math.min(ticket / sum, 1));
  q("#kpiRunway").textContent = `${scenario.runway} meses`;
  q("#scenarioNote").textContent = `${scenario.label}: ${scenario.foco}. Perfil selecionado: ${profile.label}; tese de conversa: ${profile.tese}.`;
  drawBars(q("#barChart"), rows);
  drawDonut(q("#donutChart"), rows);
  const phaseRows = groupedBy(details, "fase").map((row) => ({ area: row.label, tipo: row.label, valor: row.valor, ajustado: row.valor }));
  drawBars(q("#phaseChart"), phaseRows);
  const backendDetails = details
    .filter((row) => row.area === "Backend seguro")
    .map((row) => ({ area: row.item, tipo: row.area, valor: row.ajustado, ajustado: row.ajustado }));
  drawBars(q("#backendDetailChart"), backendDetails);
  const typeGroups = groupedBy(rows, "tipo").map((item, index) => ({ ...item, color: colorFor(item.label, index) }));
  const phaseGroups = groupedBy(details, "fase").map((item, index) => ({ ...item, color: colorFor(item.label, index) }));
  const backendLegend = backendDetails.map((row, index) => ({ label: row.area, valor: row.valor, color: fallbackColors[index % fallbackColors.length] }));
  const legendNote = selectedType === "todos"
    ? "Cada cor representa um tipo de despesa."
    : `Filtro ativo: ${selectedType}. A cor destaca o tipo selecionado.`;
  renderLegend("#barLegend", typeGroups, legendNote);
  renderLegend("#donutLegend", typeGroups, legendNote);
  renderLegend("#phaseLegend", phaseGroups, "Fases recalculadas conforme o cenario selecionado.");
  renderLegend("#backendDetailLegend", backendLegend, "Abertura do bloco Backend seguro; Login real e um item proprio.");
  renderTable(rows);
  renderDetailTables(details);
}

function initDashboard() {
  if (!q("#dashboard")) return;
  ["#scenario", "#profile", "#typeFilter"].forEach((selector) => q(selector).addEventListener("change", renderDashboard));
  qa("th[data-sort]").forEach((th) => th.addEventListener("click", () => {
    const next = th.dataset.sort;
    sortDir = sortKey === next ? sortDir * -1 : -1;
    sortKey = next;
    renderDashboard();
  }));
  window.addEventListener("resize", renderDashboard);
  renderDashboard();
}

function priorityRows() {
  const priority = q("#priorityFilter")?.value || "todos";
  const deadline = q("#deadlineFilter")?.value || "todos";
  return budget
    .filter((row) => priority === "todos" || row.tipo === priority)
    .filter((row) => deadline === "todos" || row.fase === deadline);
}

function renderPriorityTable(rows) {
  const body = q("#priorityBody");
  if (!body) return;
  body.innerHTML = rows.map((row) => `
    <tr>
      <td><span class="pill">${row.tipo}</span></td>
      <td><strong>${row.area}</strong><br><small>${row.descricao}</small></td>
      <td>${row.fase}</td>
      <td>${brl.format(row.valor)}</td>
      <td>${row.impacto}</td>
      <td>${row.risco}</td>
      <td>Planejar captacao por fase</td>
    </tr>
  `).join("");
}

function renderPriorityDashboard() {
  if (!q("#priorityDashboard")) return;
  const rows = priorityRows();
  q("#priorityTotal").textContent = brl.format(sumRaw(rows));
  q("#beforeTripTotal").textContent = "Encerrado";
  q("#priorityCount").textContent = String(rows.length);
  q("#priorityRisk").textContent = String(Math.max(...rows.map((row) => row.risco), 0));
  drawBars(q("#priorityBarChart"), rows);
  drawDonut(q("#priorityDonutChart"), rows, "fase");
  renderPriorityTable(rows);
}

function initPriorityDashboard() {
  if (!q("#priorityDashboard")) return;
  ["#priorityFilter", "#deadlineFilter"].forEach((selector) => q(selector).addEventListener("change", renderPriorityDashboard));
  window.addEventListener("resize", renderPriorityDashboard);
  renderPriorityDashboard();
}

function renderCategories() {
  if (!q("#categoriesDashboard")) return;
  const categoryRows = budget.map((row) => {
    const prazo = row.fase;
    return { ...row, prazo };
  });
  q("#categoryTotal").textContent = brl.format(sumRaw(budget));
  q("#categoryBeforeTrip").textContent = "Encerrado";
  q("#categoryLargest").textContent = budget.reduce((max, row) => row.valor > max.valor ? row : max, budget[0]).area;
  drawBars(q("#categoryStackChart"), budget);
  const profileRows = Object.entries(profiles).map(([key, profile]) => ({
    area: profile.label,
    tipo: key,
    fase: "Ticket",
    valor: profile.ticket,
    impacto: 0,
    risco: 0,
    descricao: profile.tese,
  }));
  drawBars(q("#profileTicketChart"), profileRows);
  q("#categoryBody").innerHTML = categoryRows.map((row) => `
    <tr>
      <td><span class="pill">${row.tipo}</span></td>
      <td>${row.prazo}</td>
      <td>${brl.format(row.valor)}</td>
      <td><strong>${row.area}</strong></td>
      <td>${row.descricao}</td>
      <td>${row.cautela}</td>
    </tr>
  `).join("");
  q("#profileBody").innerHTML = Object.values(profiles).map((profile) => `
    <tr>
      <td><strong>${profile.label}</strong></td>
      <td>${brl.format(profile.ticket)}</td>
      <td>${profile.tese}</td>
      <td>${profile.pedido}</td>
      <td><a href="dashboard.html">Simular</a></td>
    </tr>
  `).join("");
}

function moneyInput(id) {
  return Number(document.getElementById(id)?.value || 0);
}

function renderSummitCalculator() {
  if (!document.getElementById("summitCalc")) return;
  const ticket = moneyInput("summitTicket");
  const flight = moneyInput("summitFlight");
  const nights = moneyInput("summitNights");
  const hotelNight = moneyInput("summitHotelNight");
  const foodDay = moneyInput("summitFoodDay");
  const localTransport = moneyInput("summitLocalTransport");
  const print = moneyInput("summitPrint");
  const demoKit = moneyInput("summitDemoKit");
  const reservePct = moneyInput("summitReservePct") / 100;
  const hotel = nights * hotelNight;
  const food = (nights + 1) * foodDay;
  const rows = [
    { categoria: "Ingresso Web Summit Rio", valor: ticket, uso: "Acesso ao evento, meetups, talks, expo e Night Summit." },
    { categoria: "Passagem", valor: flight, uso: "Deslocamento Florianópolis/Rio/Florianópolis." },
    { categoria: "Hospedagem", valor: hotel, uso: `${nights} noites para chegada, evento e saída com margem.` },
    { categoria: "Alimentação", valor: food, uso: `${nights + 1} dias de alimentação sem depender do improviso.` },
    { categoria: "Transporte local", valor: localTransport, uso: "Aeroporto, hotel, Riocentro e reuniões laterais." },
    { categoria: "Materiais impressos", valor: print, uso: "One-page, cartões, QR Codes, pasta, pitch e documentos de apoio." },
    { categoria: "Demo kit", valor: demoKit, uso: "Backup offline, adaptadores, internet reserva, manutenção e contingência técnica." },
  ];
  const base = rows.reduce((sum, row) => sum + row.valor, 0);
  const reserve = Math.round(base * reservePct);
  const grand = base + reserve;
  const minimum = ticket + flight + hotel + food + localTransport;
  document.getElementById("summitBaseTotal").textContent = brl.format(base);
  document.getElementById("summitReserve").textContent = brl.format(reserve);
  document.getElementById("summitGrandTotal").textContent = brl.format(grand);
  document.getElementById("summitMinimum").textContent = brl.format(minimum);
  document.getElementById("summitBudgetBody").innerHTML = rows.map((row) => `
    <tr>
      <td><strong>${row.categoria}</strong></td>
      <td>${brl.format(row.valor)}</td>
      <td>${row.uso}</td>
    </tr>
  `).join("");
}

function initSummitCalculator() {
  if (!document.getElementById("summitCalc")) return;
  document.querySelectorAll("#summitCalc input").forEach((input) => input.addEventListener("input", renderSummitCalculator));
  renderSummitCalculator();
}

document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
  initPriorityDashboard();
  renderCategories();
  initSummitCalculator();
});
