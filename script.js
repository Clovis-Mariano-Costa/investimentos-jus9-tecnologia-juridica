/**
 * Jus 9 Tecnologia Jurídica
 * Repositório: investimentos-jus9-tecnologia-juridica
 * Software livre com autoria preservada.
 * Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © Jus 9 Tecnologia Jurídica. Direitos autorais da produção reservados.
 * A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
 * Referência oficial: https://investidores.jus9tecnologia.com.br/
 * E-mail de contato: clovis@jus9tecnologia.com.br
 * DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
 */


let scenarios = {};
let currentFocus = null;

function brl(v){
  return "R$ " + Number(v).toLocaleString("pt-BR");
}
async function loadData(){
  scenarios = await fetch("data/cenarios.json").then(r => r.json());
  ["profile","period","range"].forEach(id => {
    document.getElementById(id).addEventListener("change", () => { currentFocus=null; render(); });
  });
  document.getElementById("clearFocus").addEventListener("click", () => { currentFocus=null; render(); });
  render();
}
function key(){
  return `${document.getElementById("profile").value}|${document.getElementById("period").value}|${document.getElementById("range").value}`;
}
function scenario(){
  return scenarios[key()] || scenarios["anjo|curto|50_250"];
}
function focus(type, data){
  currentFocus = {type, data};
  render();
  document.getElementById("focusPanel").scrollIntoView({behavior:"smooth", block:"center"});
}
function render(){
  const s = scenario();
  document.getElementById("headline").textContent = s.headline;
  document.getElementById("soul").textContent = s.soul;
  document.getElementById("periodMessage").textContent = s.periodMessage;
  renderKpis(s);
  renderAllocation(s);
  renderTimeline(s);
  renderFive(s);
  renderCostTable(s);
  renderFocus(s);
}
function renderKpis(s){
  const el = document.getElementById("kpis");
  el.innerHTML = "";
  s.kpis.forEach(k => {
    const div = document.createElement("div");
    div.className = "kpi-card";
    div.onclick = () => focus("indicador", k);
    div.innerHTML = `<span>${k.label}</span><strong>${k.value}</strong>`;
    el.appendChild(div);
  });
}
function renderAllocation(s){
  const el = document.getElementById("allocation");
  el.innerHTML = "";
  s.allocation.forEach(a => {
    const div = document.createElement("div");
    div.className = "bar-row clickable";
    div.onclick = () => focus("uso do capital", a);
    div.innerHTML = `<div class="bar-label">${a.label}</div><div class="bar-track"><div class="bar-fill" style="width:${Math.round(a.pct*100)}%"></div></div><div class="bar-value">${Math.round(a.pct*100)}%</div>`;
    el.appendChild(div);
  });
}
function renderTimeline(s){
  const el = document.getElementById("timeline");
  el.innerHTML = "";
  const max = Math.max(...s.timeline.map(x => Math.max(x.revenue, x.expense)));
  s.timeline.forEach(t => {
    const div = document.createElement("div");
    div.className = "timeline-col clickable";
    div.onclick = () => focus("trajetória", t);
    const revH = Math.max(14, (t.revenue/max)*190);
    const expH = Math.max(14, (t.expense/max)*190);
    div.innerHTML = `<div class="timeline-bar" title="Receita" style="height:${revH}px"></div><div class="timeline-expense" title="Despesa" style="height:${expH}px"></div><div class="timeline-label">${t.label}</div>`;
    el.appendChild(div);
  });
}
function renderFive(s){
  const el = document.getElementById("five");
  el.innerHTML = "";
  s.fiveSeconds.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "five-item clickable";
    div.onclick = () => focus("5 segundos", {label:item, value:i+1, why:s.soul});
    div.innerHTML = `<strong>${i+1}.</strong> ${item}`;
    el.appendChild(div);
  });
}
function renderCostTable(s){
  const tbody = document.getElementById("costRows");
  tbody.innerHTML = "";
  s.costTable.forEach(r => {
    const tr = document.createElement("tr");
    tr.className = "clickable";
    tr.onclick = () => focus("custo", r);
    tr.innerHTML = `<td>${r.category}</td><td>${r.item}</td><td>${brl(r.value)}</td><td>${r.reason}</td>`;
    tbody.appendChild(tr);
  });
}
function renderFocus(s){
  const el = document.getElementById("focusPanel");
  if(!currentFocus){
    el.innerHTML = `<h3>Leitura em 5 segundos</h3><p><strong>${s.profileLabel}</strong> quer ver: ${s.fiveSeconds.join(", ")}.</p><p>${s.riskLanguage}</p><p><strong>Manobra declarada:</strong> projeções ilustrativas e hipóteses sinalizadas; dados finais dependem de validação operacional, cotações e contratos.</p>`;
    return;
  }
  const d = currentFocus.data;
  el.innerHTML = `<h3>Foco: ${currentFocus.type}</h3><p><strong>${d.label || d.item || d.category || "Dado selecionado"}</strong></p><p>${d.why || d.reason || d.note || d.value || ""}</p><p>Este foco reorganiza a leitura do relatório para explicar a razão do número, seu impacto e o risco associado.</p>`;
}
document.addEventListener("DOMContentLoaded", loadData);
