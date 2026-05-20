const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

const budget = [
  { area: "Produto e engenharia", fase: "0-90 dias", tipo: "Indispensavel", valor: 118000, impacto: 95, risco: 24, descricao: "MVP navegavel, DAJ, perfis, agenda, IA profissional demonstrativa e base de publicacao." },
  { area: "Backend seguro", fase: "90-180 dias", tipo: "Indispensavel", valor: 142000, impacto: 92, risco: 18, descricao: "Autenticacao, banco, permissoes por perfil, logs e armazenamento privado." },
  { area: "Governanca e juridico", fase: "0-180 dias", tipo: "Indispensavel", valor: 48000, impacto: 86, risco: 12, descricao: "LGPD, termos, politicas, classificacao de documentos e revisao humana." },
  { area: "Design e frontend", fase: "0-120 dias", tipo: "Necessario", valor: 62000, impacto: 78, risco: 20, descricao: "Paineis, dashboards, responsividade, narrativa publica e rotas institucionais." },
  { area: "Cloud, dominios e seguranca", fase: "12 meses", tipo: "Necessario", valor: 36000, impacto: 74, risco: 10, descricao: "Cloudflare, dominios, monitoramento, backups, ambiente e protecao." },
  { area: "Web Summit e captacao", fase: "2026", tipo: "Necessario", valor: 72000, impacto: 81, risco: 26, descricao: "Materiais, agenda, viagem, demonstracao, follow-up e relacionamento." },
  { area: "Conteudo e documentacao", fase: "0-180 dias", tipo: "Necessario", valor: 28000, impacto: 66, risco: 16, descricao: "Documentos, pitch, demonstrativos, manuais e relatorios." },
  { area: "Comercial e parcerias", fase: "180-365 dias", tipo: "Crescimento", valor: 96000, impacto: 84, risco: 35, descricao: "Prospecao, pilotos com escritorios, universidades e parceiros." },
  { area: "IA e automacao avancada", fase: "180-365 dias", tipo: "Crescimento", valor: 124000, impacto: 88, risco: 42, descricao: "Orquestracao, agentes, revisao assistida e integracoes com fluxos juridicos." },
  { area: "Reserva tecnica", fase: "12 meses", tipo: "Contingencia", valor: 52000, impacto: 54, risco: 5, descricao: "Margem para imprevistos, retrabalho, compliance e infraestrutura." },
];

const scenarios = {
  conservador: { label: "Conservador", factor: 0.74, runway: 9, foco: "provar MVP, reduzir custo fixo e validar demanda" },
  base: { label: "Base", factor: 1, runway: 12, foco: "produto seguro, pilotos e Web Summit" },
  expansao: { label: "Expansao", factor: 1.42, runway: 18, foco: "backend, time, go-to-market e IA avancada" },
};

const profiles = {
  anjo: { ticket: 75000, label: "Investidor-anjo", tese: "primeiro cheque e validacao rapida" },
  banco: { ticket: 220000, label: "Banco", tese: "credito, convenio e inovacao institucional" },
  fundo: { ticket: 550000, label: "Fundo", tese: "escala SaaS, IA vertical e dados governados" },
  parceiro: { ticket: 120000, label: "Parceiro estrategico", tese: "canal, receita compartilhada e integracao" },
  escritorio: { ticket: 48000, label: "Escritorio juridico", tese: "piloto pago, DAJ e IA profissional" },
  universidade: { ticket: 36000, label: "Universidade", tese: "pesquisa, extensao, alunos e eventos" },
};

let sortKey = "valor";
let sortDir = -1;

function q(selector) { return document.querySelector(selector); }
function qa(selector) { return [...document.querySelectorAll(selector)]; }
function scaledRows() {
  const scenario = scenarios[q("#scenario")?.value || "base"];
  const type = q("#typeFilter")?.value || "todos";
  return budget
    .map((row) => ({ ...row, ajustado: Math.round(row.valor * scenario.factor) }))
    .filter((row) => type === "todos" || row.tipo === type);
}

function total(rows) { return rows.reduce((sum, row) => sum + row.ajustado, 0); }

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
  const max = Math.max(...rows.map((r) => r.ajustado));
  const gap = 10;
  const barH = Math.max(14, (h - gap * (rows.length + 1)) / rows.length);
  ctx.font = "12px Inter, Arial";
  rows.forEach((row, index) => {
    const y = gap + index * (barH + gap);
    const bw = (row.ajustado / max) * (w - 170);
    ctx.fillStyle = "rgba(217,173,89,.22)";
    ctx.fillRect(150, y, w - 170, barH);
    ctx.fillStyle = "#d9ad59";
    ctx.fillRect(150, y, bw, barH);
    ctx.fillStyle = "#dce8f4";
    ctx.fillText(row.area.slice(0, 21), 6, y + barH * .7);
    ctx.fillText(brl.format(row.ajustado), 158 + bw, y + barH * .7);
  });
}

function drawDonut(canvas, rows) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  const grouped = Object.values(rows.reduce((acc, row) => {
    acc[row.tipo] ||= { tipo: row.tipo, valor: 0 };
    acc[row.tipo].valor += row.ajustado;
    return acc;
  }, {}));
  const sum = total(rows);
  const cx = canvas.clientWidth / 2;
  const cy = canvas.clientHeight / 2;
  const radius = Math.min(cx, cy) - 18;
  const colors = ["#d9ad59", "#4fd5e8", "#4fb477", "#f4d58d"];
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
      <td><strong>${row.area}</strong><br><small>${row.descricao}</small></td>
      <td><span class="pill">${row.tipo}</span></td>
      <td>${row.fase}</td>
      <td>${brl.format(row.ajustado)}</td>
      <td>${row.impacto}</td>
      <td>${row.risco}</td>
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
  q("#scenarioNote").textContent = `${scenario.label}: ${scenario.foco}. Perfil selecionado: ${profile.label}, tese de conversa: ${profile.tese}.`;
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

document.addEventListener("DOMContentLoaded", initDashboard);

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
    { categoria: "Materiais impressos", valor: print, uso: "One-page, cartões, QR codes, pasta, pitch e documentos de apoio." },
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

document.addEventListener("DOMContentLoaded", initSummitCalculator);
