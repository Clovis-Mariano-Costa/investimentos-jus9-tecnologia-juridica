"""
Jus 9 Tecnologia Jurídica
Repositório: investimentos-jus9-tecnologia-juridica
Software livre com autoria preservada.
Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © Jus 9 Tecnologia Jurídica. Direitos autorais da produção reservados.
A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
Referência oficial: https://investidores.jus9tecnologia.com.br/
E-mail de contato: clovis@jus9tecnologia.com.br
DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
"""

from pathlib import Path
import json

# Gerador de dados do dashboard de investimentos Jus 9.
# Uso:
#   python scripts/gerar_dados_investidores.py
#
# Este script documenta a lógica dos dados e pode ser ampliado com custos reais,
# pesquisas de mercado, cotações, cenários e exportação para planilhas/PDF.

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

profiles = json.loads((DATA / "perfis.json").read_text(encoding="utf-8"))
periods = json.loads((DATA / "prazos.json").read_text(encoding="utf-8"))
ranges = json.loads((DATA / "faixas.json").read_text(encoding="utf-8"))

base_alloc = [
    {"key": "produto", "label": "Produto & programação", "pct": 0.35, "why": "MVP demonstrativo vira sistema real."},
    {"key": "operacao", "label": "Operação & implantação", "pct": 0.20, "why": "Treinamento, suporte e implantação."},
    {"key": "juridico", "label": "Jurídico / LGPD / segurança", "pct": 0.15, "why": "Proteção de dados, sigilo e governança."},
    {"key": "comercial", "label": "Comercial & expansão", "pct": 0.12, "why": "Canais, pilotos e receita recorrente."},
    {"key": "marca", "label": "Marca, conteúdo & eventos", "pct": 0.10, "why": "Confiança institucional e presença pública."},
    {"key": "reserva", "label": "Reserva operacional", "pct": 0.08, "why": "Contingência e segurança de execução."}
]

def build_scenario(profile_key, period_key, range_key):
    profile = profiles[profile_key]
    period = periods[period_key]
    range_obj = ranges[range_key]
    amount = range_obj["amount"]
    runway = max(2, round(amount / (45000 if amount < 500000 else 90000 if amount < 2000000 else 220000), 1))
    revenue_end = round(amount * (0.55 if period_key == "curtissimo" else 1.2 if period_key == "curto" else 4.2 if period_key == "medio" else 18.5))
    breakeven = "não previsto" if period_key == "curtissimo" else "9–12 meses" if period_key == "curto" else "18–24 meses" if period_key == "medio" else "36–60 meses"
    allocation = [{**x, "value": round(amount*x["pct"])} for x in base_alloc]
    return {
        "profile": profile_key,
        "profileLabel": profile["label"],
        "period": period_key,
        "periodLabel": period["label"],
        "range": range_key,
        "rangeLabel": range_obj["label"],
        "amount": amount,
        "runway": runway,
        "breakeven": breakeven,
        "headline": f"{profile['label']} • {period['label']} • {range_obj['label']}",
        "fiveSecondTitle": "O que este perfil precisa ver em 5 segundos",
        "fiveSeconds": profile["five_seconds"],
        "soul": profile["soul"],
        "riskLanguage": profile["risk_language"],
        "periodMessage": period["message"],
        "allocation": allocation
    }

scenarios = {}
for pk in profiles:
    for tk in periods:
        for rk in ranges:
            scenarios[f"{pk}|{tk}|{rk}"] = build_scenario(pk, tk, rk)

(DATA / "cenarios.json").write_text(json.dumps(scenarios, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Gerados {len(scenarios)} cenários em {DATA / 'cenarios.json'}")
