
let scenarios = {};
let currentFocus = null;

function brl(v){
  return "R$ " + Number(v).toLocaleString("pt-BR");
}
async function loadData(){
  scenarios = await fetch("data/cenarios.json").then(r => r.json()).catch(()=>({}));
  window.investmentPhases = await fetch("data/fases-investimento.json").then(r => r.json()).catch(()=>({}));
  const hasDashboard = document.getElementById("profile") && document.getElementById("period") && document.getElementById("range");
  if(!hasDashboard) return;
  ["profile","period","range"].forEach(id => {
    const node = document.getElementById(id);
    if(node) node.addEventListener("change", () => { currentFocus=null; render(); });
  });
  const clear = document.getElementById("clearFocus");
  if(clear) clear.addEventListener("click", () => { currentFocus=null; render(); });
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
  renderPhasePies(s);
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


// v2.1 — gráficos de pizza e leitura financeira por horizonte
function currentPhase(){
  const periodEl = document.getElementById("period");
  const p = periodEl ? periodEl.value : "curto";
  return (window.investmentPhases && window.investmentPhases[p]) || null;
}
function pieSvg(parts, title){
  const total = parts.reduce((a,b)=>a+b.value,0) || 1;
  let start = 0;
  const cx=70, cy=70, r=58;
  const colors=["#e7c36c","#8fb3ff","#f4a261","#9ae6b4","#d8b4fe","#fca5a5"];
  const segs = parts.map((p,i)=>{
    const angle = (p.value/total)*Math.PI*2;
    const end = start + angle;
    const x1 = cx + r*Math.cos(start), y1 = cy + r*Math.sin(start);
    const x2 = cx + r*Math.cos(end), y2 = cy + r*Math.sin(end);
    const large = angle > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    start = end;
    return `<path d="${d}" fill="${colors[i%colors.length]}" opacity=".92"><title>${p.label}: ${Math.round(p.value/total*100)}%</title></path>`;
  }).join("");
  const legend = parts.map((p,i)=>`<button class="pie-legend" onclick="focus('pizza', {label:'${p.label.replace(/'/g,"&#39;")}', value:'${Math.round(p.value/total*100)}%', why:'${title}'})"><span style="background:${colors[i%colors.length]}"></span>${p.label} <b>${Math.round(p.value/total*100)}%</b></button>`).join("");
  return `<div class="pie-box"><svg viewBox="0 0 140 140" role="img" aria-label="${title}">${segs}<circle cx="70" cy="70" r="28" fill="#07111f" opacity=".92"></circle><text x="70" y="74" text-anchor="middle" font-size="14" font-weight="900" fill="#e7c36c">Jus 9</text></svg><div class="pie-legends">${legend}</div></div>`;
}
function renderPhasePies(s){
  const phase = currentPhase();
  if(!phase) return;
  const allocPie = document.getElementById('allocationPie');
  if(allocPie) allocPie.innerHTML = pieSvg((phase.alloc||[]).map(x=>({label:x[0], value:x[1]})), 'Alocação estimada do capital');
  const need = (phase.necessario[0]+phase.necessario[1])/2;
  const opt = (phase.opcional[0]+phase.opcional[1])/2;
  const needPie = document.getElementById('needOptionalPie');
  if(needPie) needPie.innerHTML = pieSvg([{label:'Necessário',value:need},{label:'Opcional / aceleração',value:opt}], 'Necessário x opcional no horizonte selecionado');
  const rev = (phase.receita[0]+phase.receita[1])/2;
  const exp = need + opt;
  const profitPie = document.getElementById('profitPie');
  if(profitPie) profitPie.innerHTML = pieSvg([{label:'Despesa estimada',value:Math.max(exp,1)},{label:'Receita estimada',value:Math.max(rev,1)}], 'Receita x despesa estimada');
}
