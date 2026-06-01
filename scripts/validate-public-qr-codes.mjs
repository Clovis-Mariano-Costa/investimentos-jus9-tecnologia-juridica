import fs from "node:fs/promises";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const expected = {
  Label: "Instalar app Jus 9 Verde",
  Url: "https://jus9verde.jus9tecnologia.com.br/instalar-app",
  Slug: "instalar-app-jus9-verde",
};

const manifestText = await fs.readFile(new URL("../qr-codes/qr-codes-manifest.json", import.meta.url), "utf8");
const manifest = JSON.parse(manifestText.replace(/^\uFEFF/, ""));
const page = await fs.readFile(new URL("../qr-codes.html", import.meta.url), "utf8");
const svg = await fs.readFile(new URL(`../qr-codes/${expected.Slug}.svg`, import.meta.url), "utf8");
const png = await fs.readFile(new URL(`../qr-codes/${expected.Slug}.png`, import.meta.url));
const entry = manifest.find((item) => item.Slug === expected.Slug);

assert(entry, "entrada do QR Code de instalacao da Jus 9 Verde ausente");
assert(entry.Label === expected.Label && entry.Url === expected.Url, "entrada do QR Code da Jus 9 Verde incorreta");
assert(page.includes(`qr-codes/${expected.Slug}.svg`), "card SVG da Jus 9 Verde ausente");
assert(page.includes(`qr-codes/${expected.Slug}.png`), "download PNG da Jus 9 Verde ausente");
assert(page.includes(expected.Url), "link publico de instalacao da Jus 9 Verde ausente");
assert(svg.includes("<svg"), "arquivo SVG do QR Code invalido");
assert(png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), "arquivo PNG do QR Code invalido");

console.log("PUBLIC_QR_CODES_OK instalar-app-jus9-verde png,svg,manifest,page");
