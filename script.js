const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

const budget = [
  { area: "Segurança mínima e backup", fase: "Antes da viagem", tipo: "Emergência", valor: 18000, impacto: 94, risco: 12, descricao: "Varredura de segredos, backup offline, demonstração sem dados reais e plano de contingência.", cautela: "Não expor senhas, tokens, .env, dados reais ou documentos sigilosos." },
  { area: "Material de conversa", fase: "Antes da viagem", tipo: "Urgência", valor: 26000, impacto: 86, risco: 18, descricao: "One-page, QR Codes, roteiro, pitch curto, página de parcerias e follow-up.", cautela: "Usar somente material público revisado e sem promessa de retorno." },
  { area: "Viagem e evento", fase: "Antes da viagem", tipo: "Necessidade imediata", valor: 72000, impacto: 91, risco: 26, descricao: "Ingresso, deslocamento, hospedagem, alimentação, transporte local, internet e contingência.", cautela: "Confirmar cotações, autorização de materiais e logística real." },
  { area: "Produto e engenharia", fase: "0-90 dias", tipo: "Curto prazo", valor: 118000, impacto: 95, risco: 24, descricao: "MVP navegável, DAJ, perfis, agenda, IA profissional demonstrativa e base de publicação.", cautela: "Separar demonstração de produção; usar dados fictícios." },
  { area: "Design e frontend", fase: "0-90 dias", tipo: "Curto prazo", valor: 62000, impacto: 78, risco: 20, descricao: "Painéis, dashboards, responsividade, narrativa pública e rotas institucionais.", cautela: "Preservar links antigos e revisar codificação visual." },
  { area: "Conteúdo e documentação", fase: "0-90 dias", tipo: "Curto prazo", valor: 28000, impacto: 66, risco: 16, descricao: "Documentos, pitch, demonstrativos, manuais, relatórios e orientação para IAs.", cautela: "Classificar público, interno, sigiloso e secreto antes de publicar." },
  { area: "Backend seguro", fase: "90-180 dias", tipo: "Médio prazo", valor: 142000, impacto: 92, risco: 18, descricao: "Autenticação, banco, permissões por perfil, logs e armazenamento privado.", cautela: "Não simular login real sem infraestrutura, HTTPS e revisão técnica." },
  { area: "Governança e jurídico", fase: "90-180 dias", tipo: "Médio prazo", valor: 48000, impacto: 86, risco: 12, descricao: "LGPD, termos, políticas, classificação de documentos e revisão humana.", cautela: "Revisão humana obrigatória em conteúdo jurídico, financeiro e societário." },
  { area: "Cloud, domínios e segurança", fase: "90-180 dias", tipo: "Médio prazo", valor: 36000, impacto: 74, risco: 10, descricao: "Cloudflare, domínios, monitoramento, backups, ambiente e proteção.", cautela: "Registrar DNS, Pages, Workers, rollback e responsáveis." },
  { area: "Comercial e parcerias", fase: "180-365 dias", tipo: "Longo prazo", valor: 96000, impacto: 84, risco: 35, descricao: "Prospecção, pilotos com escritórios, universidades, bancos, hubs e parceiros.", cautela: "Não publicar nomes, negociações ou condições sem autorização." },
  { area: "IA e automação avançada", fase: "180-365 dias", tipo: "Longo prazo", valor: 124000, impacto: 88, risco: 42, descricao: "Orquestração, agentes, revisão assistida e integrações com fluxos jurídicos.", cautela: "Manter limites de IA, supervisão humana e logs seguros." },
  { area: "Reserva técnica", fase: "180-365 dias", tipo: "Longo prazo", valor: 52000, impacto: 54, risco: 5, descricao: "Margem para imprevistos, retrabalho, compliance e infraestrutura.", cautela: "Usar apenas para risco real, não para expansão não revisada." },
];

const scenarios = {
  conservador: { label: "Conservador", factor: 0.74, runway: 9, foco: "provar MVP, reduzir custo fixo e validar demanda" },
  base: { label: "Base", factor: 1, runway: 12, foco: "produto seguro, pilotos e Web Summit" },
  expansao: { label: "Expansão", factor: 1.42, runway: 18, foco: "backend, time, go-to-market e IA avançada" },
};

const profiles = {
  anjo: { ticket: 75000, label: "Investidor-anjo", tese: "primeiro cheque e validação rápida", pedido: "ponte para validação, material e primeiras entregas" },
  banco: { ticket: 220000, label: "Banco ou parceiro financeiro", tese: "crédito, convênio e inovação institucional", pedido: "linha de crédito, patrocínio ou parceria de inovação" },
  fundo: { ticket: 550000, label: "Fundo", tese: "escala SaaS, IA vertical e dados governados", pedido: "pré-seed, tese de tração e governança de dados" },
  parceiro: { ticket: 120000, label: "Parceiro estratégico", tese: "canal, receita compartilhada e integração", pedido: "piloto conjunto, canal comercial ou integração" },
  escritorio: { ticket: 48000, label: "Escritório jurídico", tese: "piloto pago, DAJ e IA profissional", pedido: "piloto controlado com dados fictícios ou sanitizados" },
  universidade: { ticket: 36000, label: "Universidade", tese: "pesquisa, extensão, alunos e eventos", pedido: "pesquisa aplicada, extensão, eventos e validação acadêmica" },
};

let sortKey = "valor";
let sortDir = -1;

function q(selector) { return document.querySelector(selector); }
function qa(selector) { return [...document.querySelectorAll(selector)]; }
function sumRaw(rows) { return rows.reduce((sum, row) => sum + row.valor, 0); }
function total(rows) { return rows.reduce((sum, row) => sum + (row.ajustado ?? row.valor), 0); }

function scaledRows() {
  const scenario = scenarios[q("#scenario")?.value || "base"];
  const type = q("#typeFilter")?.value || "todos";
  return budget
    .map((row) => ({ ...row, ajustado: Math.round(row.valor * scenario.factor) }))
    .filter((row) => type === "todos" || row.tipo === type);
}

function fitLabel(text, max = 24) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
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
    ctx.fillStyle = "rgba(217,173,89,.22)";
    ctx.fillRect(156, y, w - 178, barH);
    ctx.fillStyle = "#d9ad59";
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
  const grouped = Object.values(rows.reduce((acc, row) => {
    const key = row[groupKey];
    acc[key] ||= { label: key, valor: 0 };
    acc[key].valor += row.ajustado ?? row.valor;
    return acc;
  }, {}));
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
  const colors = ["#d9ad59", "#4fd5e8", "#4fb477", "#f4d58d", "#e98686", "#9f8cff"];
  let start = -Math.PI / 2;
  grouped.forEach((item, index) => {
    const angle = (item.valor / sum) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
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
      <td>${row.fase === "Antes da viagem" ? "Resolver antes de embarcar" : "Planejar captação por fase"}</td>
    </tr>
  `).join("");
}

function renderPriorityDashboard() {
  if (!q("#priorityDashboard")) return;
  const rows = priorityRows();
  const beforeTrip = budget.filter((row) => row.fase === "Antes da viagem");
  q("#priorityTotal").textContent = brl.format(sumRaw(rows));
  q("#beforeTripTotal").textContent = brl.format(sumRaw(beforeTrip));
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
    const prazo = row.fase === "Antes da viagem" ? "Curtíssimo prazo / antes da viagem" : row.fase;
    return { ...row, prazo };
  });
  q("#categoryTotal").textContent = brl.format(sumRaw(budget));
  q("#categoryBeforeTrip").textContent = brl.format(sumRaw(budget.filter((row) => row.fase === "Antes da viagem")));
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
