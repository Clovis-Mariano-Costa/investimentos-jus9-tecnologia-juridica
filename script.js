let scenarios = {};
let currentFocus = null;

function brl(v){
  return Number(v || 0).toLocaleString("pt-BR", {style:"currency", currency:"BRL", maximumFractionDigits:0});
}
function pct(v){ return Math.round(Number(v || 0) * 100) + "%"; }
function safe(id){ return document.getElementById(id); }

async function loadData(){
  const profile = safe("profile");
  const period = safe("period");
  const range = safe("range");
  if(!profile || !period || !range){ return; }
  scenarios = await fetch("data/cenarios.json").then(r => r.json());
  ["profile","period","range"].forEach(id => {
    safe(id).addEventListener("change", () => { currentFocus=null; render(); });
  });
  const clear = safe("clearFocus");
  if(clear) clear.addEventListener("click", () => { currentFocus=null; render(); });
  render();
}
function key(){ return `${safe("profile").value}|${safe("period").value}|${safe("range").value}`; }
function scenario(){ return scenarios[key()] || scenarios["anjo|curto|50_250"]; }
function focus(type, data){
  currentFocus = {type, data};
  render();
  const panel = safe("focusPanel");
  if(panel) panel.scrollIntoView({behavior:"smooth", block:"center"});
}
function horizonResult(s){
  const last = (s.timeline || [])[s.timeline.length - 1] || {revenue:0, expense:0};
  return Number(last.revenue || 0) - Number(last.expense || 0);
}
function render(){
  const s = scenario();
  if(safe("headline")) safe("headline").textContent = s.headline;
  if(safe("soul")) safe("soul").textContent = s.soul;
  if(safe("periodMessage")) safe("periodMessage").textContent = s.periodMessage;
  renderKpis(s); renderAllocation(s); renderTimeline(s); renderFive(s); renderCostTable(s); renderFocus(s);
}
function renderKpis(s){
  const el = safe("kpis"); if(!el) return;
  el.innerHTML = "";
  const extra = [
    {label:"Resultado no horizonte", value: brl(horizonResult(s)), why:"receita projetada menos despesa projetada no horizonte selecionado"}
  ];
  [...(s.kpis || []), ...extra].forEach(k => {
    const div = document.createElement("div");
    div.className = "kpi-card";
    div.onclick = () => focus("indicador", k);
    div.innerHTML = `<span>${k.label}</span><strong>${k.value}</strong>`;
    el.appendChild(div);
  });
}
function renderAllocation(s){
  const el = safe("allocation"); if(!el) return;
  el.innerHTML = "";
  (s.allocation || []).forEach(a => {
    const div = document.createElement("div");
    div.className = "bar-row clickable";
    div.onclick = () => focus("uso do capital", a);
    div.innerHTML = `<div class="bar-label">${a.label}<small>${brl(a.value)}</small></div><div class="bar-track"><div class="bar-fill" style="width:${pct(a.pct)}"></div></div><div class="bar-value">${pct(a.pct)}</div>`;
    el.appendChild(div);
  });
}
function renderTimeline(s){
  const el = safe("timeline"); if(!el) return;
  el.innerHTML = "";
  const max = Math.max(1, ...(s.timeline || []).map(x => Math.max(x.revenue || 0, x.expense || 0)));
  (s.timeline || []).forEach(t => {
    const div = document.createElement("div");
    div.className = "timeline-col clickable";
    div.onclick = () => focus("trajetória", t);
    const revH = Math.max(14, ((t.revenue || 0)/max)*190);
    const expH = Math.max(14, ((t.expense || 0)/max)*190);
    div.innerHTML = `<div class="timeline-bar" title="Receita: ${brl(t.revenue)}" style="height:${revH}px"></div><div class="timeline-expense" title="Despesa: ${brl(t.expense)}" style="height:${expH}px"></div><div class="timeline-label">${t.label}</div>`;
    el.appendChild(div);
  });
}
function renderFive(s){
  const el = safe("five"); if(!el) return;
  el.innerHTML = "";
  (s.fiveSeconds || []).forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "five-item clickable";
    div.onclick = () => focus("5 segundos", {label:item, value:i+1, why:s.soul});
    div.innerHTML = `<strong>${i+1}.</strong> ${item}`;
    el.appendChild(div);
  });
}
function renderCostTable(s){
  const tbody = safe("costRows"); if(!tbody) return;
  tbody.innerHTML = "";
  (s.costTable || []).forEach(r => {
    const tr = document.createElement("tr");
    tr.className = "clickable";
    tr.onclick = () => focus("custo", r);
    tr.innerHTML = `<td>${r.category}</td><td>${r.item}</td><td>${brl(r.value)}</td><td>${r.reason}</td>`;
    tbody.appendChild(tr);
  });
}
function renderFocus(s){
  const el = safe("focusPanel"); if(!el) return;
  if(!currentFocus){
    el.innerHTML = `<h3>Leitura em 5 segundos</h3><p><strong>${s.profileLabel}</strong> quer ver: ${(s.fiveSeconds || []).join(", ")}.</p><p>${s.riskLanguage}</p><p><strong>Capital selecionado:</strong> ${brl(s.amount)} · <strong>Runway:</strong> ${s.runway} meses · <strong>Resultado horizonte:</strong> ${brl(horizonResult(s))}</p><p><strong>Manobra declarada:</strong> projeções ilustrativas e hipóteses sinalizadas; dados finais dependem de validação operacional, cotações e contratos.</p>`;
    return;
  }
  const d = currentFocus.data || {};
  const value = d.value !== undefined && typeof d.value === "number" ? brl(d.value) : (d.value || "");
  el.innerHTML = `<h3>Foco: ${currentFocus.type}</h3><p><strong>${d.label || d.item || d.category || "Dado selecionado"}</strong></p><p>${d.why || d.reason || d.note || value || ""}</p><p>${value ? `<strong>Valor:</strong> ${value}. ` : ""}Este foco reorganiza a leitura do relatório para explicar a razão do número, seu impacto e o risco associado.</p>`;
}
document.addEventListener("DOMContentLoaded", loadData);
