# Le Grain Cafeteria — protótipo de site

Protótipo mobile-first do site da **Le Grain Cafeteria** (Ponta Verde, Maceió), feito para apresentação à cafeteria.

- Cardápio com fotos, categorias e busca
- Sacola que monta o pedido e envia pronto para o WhatsApp da cafeteria
- Status "aberto/fechado" calculado pelo horário de Maceió
- Seção de kits presente, horários, mapa e links para Instagram e WhatsApp

> Itens e preços do cardápio são **ilustrativos** até a cafeteria enviar o cardápio oficial.

## Como editar o cardápio

Tudo fica em [`js/cardapio.js`](js/cardapio.js): categorias, itens (nome, descrição, preço, foto), destaques de Natal, horários e número do WhatsApp.
As fotos ficam em `img/` em duas versões: `nome.webp` (grande) e `nome-sm.webp` (miniatura).

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Site estático puro (HTML, CSS e JavaScript), sem build. Publicado via GitHub Pages em https://fernandobalbino.github.io/Landing-page/legrain/

Desenvolvido por Fernando Balbino.
