(() => {
  "use strict";
  const D = window.LEGRAIN;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const byId = Object.fromEntries(D.itens.map((i) => [i.id, i]));
  const waURL = (msg) => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(msg)}`;
  const ICON_PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12M12 6v12"/></svg>';
  const ICON_MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg>';
  const ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const photo = (item, size = "sm", eager = false) =>
    item.img
      ? `<img src="img/${item.img}${size === "sm" ? "-sm" : ""}.webp" alt="${esc(item.nome)}" ${eager ? "" : 'loading="lazy"'} decoding="async">`
      : `<div class="ph" role="img" aria-label="${esc(item.nome)}"></div>`;

  /* ---------- links de WhatsApp com mensagem ---------- */
  $$("[data-wa]").forEach((a) => (a.href = waURL(a.dataset.wa)));

  /* ---------- aviso de protótipo ---------- */
  const proto = $("#proto");
  try { if (sessionStorage.getItem("lg-proto") === "0") proto.hidden = true; } catch (e) {}
  $("[data-close-proto]").addEventListener("click", () => {
    proto.hidden = true;
    try { sessionStorage.setItem("lg-proto", "0"); } catch (e) {}
  });

  /* ---------- horário e status (fuso de Maceió) ---------- */
  const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  function agoraMaceio() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Maceio", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const h = Number(get("hour")) % 24 + Number(get("minute")) / 60;
    return { dia, h };
  }
  function proximaAbertura(dia) {
    for (let k = 1; k <= 7; k++) {
      const d = (dia + k) % 7;
      if (D.horarios[d]) return { d, k, abre: D.horarios[d][0] };
    }
    return null;
  }
  function statusTexto() {
    const { dia, h } = agoraMaceio();
    const hoje = D.horarios[dia];
    if (hoje && h >= hoje[0] && h < hoje[1]) {
      const falta = hoje[1] - h;
      return { aberto: true, txt: falta <= 0.5 ? `Fecha às ${hoje[1]}h` : `Aberto até ${hoje[1]}h` };
    }
    if (hoje && h < hoje[0]) return { aberto: false, txt: `Abre hoje às ${hoje[0]}h` };
    const p = proximaAbertura(dia);
    if (!p) return { aberto: false, txt: "Fechado" };
    const quando = p.k === 1 ? "amanhã" : DIAS[p.d].toLowerCase();
    return { aberto: false, txt: `Abre ${quando} às ${p.abre}h` };
  }
  function renderStatus() {
    const s = statusTexto();
    const el = $("[data-status]");
    el.classList.toggle("is-open", s.aberto);
    $("[data-status-text]").textContent = s.txt;
  }
  function renderHorarios() {
    const { dia } = agoraMaceio();
    const ordem = [1, 2, 3, 4, 5, 6, 0];
    $("[data-hours]").innerHTML = ordem.map((d) => {
      const hr = D.horarios[d];
      return `<tr class="${d === dia ? "is-today" : ""}"><th scope="row">${DIAS[d]}</th>${
        hr ? `<td>${hr[0]}h às ${hr[1]}h</td>` : '<td class="closed">Fechado</td>'
      }</tr>`;
    }).join("");
  }
  renderStatus();
  renderHorarios();
  setInterval(renderStatus, 60000);

  /* ---------- destaques (Natal) ---------- */
  $("[data-destaques]").innerHTML = D.destaques.map((id) => {
    const it = byId[id];
    return `<button type="button" class="feat" data-open="${it.id}">
      <span class="feat-photo">${photo(it, "big")}</span>
      <span class="feat-name">${esc(it.nome)}</span>
      <span class="feat-price">${brl.format(it.preco)}</span>
    </button>`;
  }).join("");

  /* ---------- cardápio ---------- */
  const menuEl = $("[data-menu]");
  menuEl.innerHTML = D.categorias.map((c) => {
    const itens = D.itens.filter((i) => i.cat === c.id);
    return `<section class="cat" id="cat-${c.id}" data-cat="${c.id}" aria-labelledby="t-${c.id}">
      <h3 class="cat-title" id="t-${c.id}">${esc(c.nome)}</h3>
      <div class="grid">${itens.map((it) => `
        <article class="card" data-card="${it.id}" data-text="${esc((it.nome + " " + it.desc).toLowerCase())}">
          <div class="card-photo-wrap">
            <button type="button" class="card-open" data-open="${it.id}" aria-label="${esc(it.nome)}, ${brl.format(it.preco)}. Ver detalhes">
              <span class="card-photo">${photo(it)}</span>
            </button>
            <button type="button" class="add" data-quick="${it.id}" aria-label="Adicionar ${esc(it.nome)} à sacola">${ICON_PLUS}</button>
          </div>
          <button type="button" class="card-open" data-open="${it.id}" tabindex="-1" aria-hidden="true">
            <span class="card-name">${esc(it.nome)}</span>
            <span class="card-desc">${esc(it.desc)}</span>
            <span class="card-price">${brl.format(it.preco)}</span>
          </button>
        </article>`).join("")}
      </div>
    </section>`;
  }).join("");

  /* chips */
  const chipsEl = $("[data-chips]");
  chipsEl.innerHTML = D.categorias.map((c) => `<button type="button" class="chip" data-chip="${c.id}">${esc(c.nome)}</button>`).join("");
  const setChip = (id) => {
    $$(".chip", chipsEl).forEach((b) => {
      const on = b.dataset.chip === id;
      b.setAttribute("aria-current", on ? "true" : "false");
      if (on) chipsEl.scrollTo({ left: b.offsetLeft - chipsEl.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
    });
  };
  let travando = false;
  chipsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-chip]");
    if (!b) return;
    const sec = $(`#cat-${b.dataset.chip}`);
    if (!sec || sec.hidden) return;
    travando = true;
    setChip(b.dataset.chip);
    sec.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setTimeout(() => (travando = false), 900);
  });
  setChip(D.categorias[0].id);
  const io = new IntersectionObserver((entries) => {
    if (travando) return;
    const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (vis[0]) setChip(vis[0].target.dataset.cat);
  }, { rootMargin: "-140px 0px -55% 0px" });
  $$(".cat", menuEl).forEach((s) => io.observe(s));

  /* busca */
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const emptyEl = $("[data-empty]");
  $("[data-search]").addEventListener("input", (e) => {
    const q = norm(e.target.value.trim());
    let total = 0;
    $$(".cat", menuEl).forEach((sec) => {
      let n = 0;
      $$(".card", sec).forEach((card) => {
        const ok = !q || norm(card.dataset.text).includes(q);
        card.hidden = !ok;
        if (ok) n++;
      });
      sec.hidden = n === 0;
      total += n;
    });
    emptyEl.hidden = total > 0;
    $$(".chip", chipsEl).forEach((b) => (b.hidden = $(`#cat-${b.dataset.chip}`).hidden));
    const link = $("[data-wa-link]", emptyEl);
    link.href = waURL(`${link.dataset.waLink}${e.target.value.trim()}?`);
  });

  /* ---------- sacola ---------- */
  let bag = {};
  try { bag = JSON.parse(localStorage.getItem("lg-bag") || "{}") || {}; } catch (e) { bag = {}; }
  Object.keys(bag).forEach((id) => { if (!byId[id] || !(bag[id] > 0)) delete bag[id]; });
  const salvar = () => { try { localStorage.setItem("lg-bag", JSON.stringify(bag)); } catch (e) {} };
  const contar = () => Object.values(bag).reduce((a, b) => a + b, 0);
  const somar = () => Object.entries(bag).reduce((a, [id, q]) => a + byId[id].preco * q, 0);

  const bagbar = $("[data-bagbar]");
  const fab = $("[data-fab]");
  function renderBagbar() {
    const n = contar();
    bagbar.hidden = n === 0;
    fab.hidden = n > 0;
    $("[data-bag-count]").textContent = n;
    $("[data-bag-total]").textContent = brl.format(somar());
  }
  function addBag(id, q = 1) {
    bag[id] = (bag[id] || 0) + q;
    if (bag[id] <= 0) delete bag[id];
    salvar();
    renderBagbar();
  }

  const toastEl = $("[data-toast]");
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("is-on"), 1800);
  }

  document.addEventListener("click", (e) => {
    const quick = e.target.closest("[data-quick]");
    if (quick) {
      const it = byId[quick.dataset.quick];
      addBag(it.id, 1);
      quick.classList.add("is-done");
      quick.innerHTML = ICON_CHECK;
      setTimeout(() => { quick.classList.remove("is-done"); quick.innerHTML = ICON_PLUS; }, 1100);
      toast(`Adicionado: ${it.nome}`);
      return;
    }
    const open = e.target.closest("[data-open]");
    if (open) abrirItem(open.dataset.open);
  });

  /* ---------- detalhe do item ---------- */
  const itemSheet = $("[data-item-sheet]");
  let atual = null, qtd = 1;
  function abrirItem(id) {
    atual = byId[id];
    qtd = 1;
    $("[data-item-photo]").innerHTML = photo(atual, "big", true);
    $("[data-item-name]").textContent = atual.nome;
    $("[data-item-desc]").textContent = atual.desc;
    $("[data-item-price]").textContent = brl.format(atual.preco);
    atualizarQtd();
    abrir(itemSheet);
  }
  function atualizarQtd() {
    $("[data-item-qty]").textContent = qtd;
    $("[data-add]").textContent = `Adicionar ${brl.format(atual.preco * qtd)}`;
    $("[data-item-direct]").href = waURL(
      `Olá, Le Grain! Vim pelo site e gostaria de pedir:\n• ${qtd}x ${atual.nome}`
    );
  }
  $$("[data-qty]", itemSheet).forEach((b) =>
    b.addEventListener("click", () => { qtd = Math.max(1, Math.min(20, qtd + Number(b.dataset.qty))); atualizarQtd(); })
  );
  $("[data-add]").addEventListener("click", () => {
    addBag(atual.id, qtd);
    fechar(itemSheet);
    toast(`${qtd}x ${atual.nome} na sacola`);
  });

  /* ---------- sheet da sacola ---------- */
  const bagSheet = $("[data-bag-sheet]");
  function renderBag() {
    const ids = Object.keys(bag);
    $("[data-bag-list]").innerHTML = ids.map((id) => {
      const it = byId[id];
      return `<li class="bag-row">
        <span class="bag-thumb">${photo(it)}</span>
        <span><span class="bag-name">${esc(it.nome)}</span><br><span class="bag-sub">${brl.format(it.preco * bag[id])}</span></span>
        <span class="stepper">
          <button type="button" data-bag-step="${id}" data-d="-1" aria-label="Tirar um ${esc(it.nome)}">${ICON_MINUS}</button>
          <output>${bag[id]}</output>
          <button type="button" data-bag-step="${id}" data-d="1" aria-label="Mais um ${esc(it.nome)}">${ICON_PLUS}</button>
        </span>
      </li>`;
    }).join("");
    $("[data-bag-sum]").textContent = brl.format(somar());
  }
  bagbar.addEventListener("click", () => { renderBag(); abrir(bagSheet); });
  bagSheet.addEventListener("click", (e) => {
    const b = e.target.closest("[data-bag-step]");
    if (!b) return;
    addBag(b.dataset.bagStep, Number(b.dataset.d));
    if (contar() === 0) { fechar(bagSheet); return; }
    renderBag();
  });
  $("[data-bag-clear]").addEventListener("click", () => {
    bag = {}; salvar(); renderBagbar(); fechar(bagSheet); toast("Sacola vazia");
  });
  $("[data-bag-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const linhas = Object.entries(bag).map(([id, q]) => `• ${q}x ${byId[id].nome} (${brl.format(byId[id].preco * q)})`);
    const nome = String(f.get("nome") || "").trim();
    const obs = String(f.get("obs") || "").trim();
    const msg = [
      "Olá, Le Grain! Vim pelo site e gostaria de fazer um pedido:",
      "",
      ...linhas,
      "",
      `Total estimado: ${brl.format(somar())}`,
      `Como prefiro: ${f.get("modo")}`,
      nome ? `Nome: ${nome}` : null,
      obs ? `Observações: ${obs}` : null
    ].filter((l) => l !== null).join("\n");
    window.open(waURL(msg), "_blank", "noopener");
  });

  /* ---------- abrir/fechar dialogs ---------- */
  function abrir(dlg) {
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function fechar(dlg) {
    if (dlg.open) dlg.close();
  }
  $$("dialog").forEach((dlg) => {
    dlg.addEventListener("close", () => (document.body.style.overflow = ""));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) fechar(dlg); });
    $$("[data-close]", dlg).forEach((b) => b.addEventListener("click", () => fechar(dlg)));
  });

  /* botão flutuante só aparece depois do topo (o hero já tem os botões) */
  const heroActions = $(".hero-actions");
  if (heroActions && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => fab.classList.toggle("is-away", e.isIntersecting)).observe(heroActions);
  }

  renderBagbar();
})();
