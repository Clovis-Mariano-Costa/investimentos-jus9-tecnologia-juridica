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

function renderDashboard() {
  if (!q("#dashboard")) return;
  const rows = scaledRows();
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
  const typeGroups = groupedBy(rows, "tipo").map((item, index) => ({ ...item, color: colorFor(item.label, index) }));
  const legendNote = selectedType === "todos"
    ? "Cada cor representa um tipo de despesa."
    : `Filtro ativo: ${selectedType}. A cor destaca o tipo selecionado.`;
  renderLegend("#barLegend", typeGroups, legendNote);
  renderLegend("#donutLegend", typeGroups, legendNote);
  renderTable(rows);
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
