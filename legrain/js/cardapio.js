/*
 * Cardápio da Le Grain Cafeteria
 * ------------------------------------------------------------
 * PROTÓTIPO: nomes, descrições e preços são ilustrativos.
 * Para atualizar, edite só este arquivo:
 *   - "categorias": ordem e nome das abas do cardápio
 *   - "itens": cada produto (img = nome do arquivo em /img, sem extensão;
 *     deixe img vazio "" para usar o ícone do grão no lugar da foto)
 *   - "destaques": ids que aparecem no carrossel de Natal
 */
window.LEGRAIN = {
  whatsapp: "5582981031989",
  instagram: "legraincafeteria",
  endereco: "Rua Manoel Ribeiro da Rocha, 110, Ponta Verde, Maceió - AL, 57035-395",
  // 0 = domingo ... 6 = sábado; null = fechado
  horarios: {
    0: null,
    1: [14, 21],
    2: [9, 21],
    3: [9, 21],
    4: [9, 21],
    5: [9, 21],
    6: [9, 21]
  },

  categorias: [
    { id: "natal", nome: "Natal" },
    { id: "cafes", nome: "Cafés" },
    { id: "croissants", nome: "Croissants" },
    { id: "doces", nome: "Doces" },
    { id: "regional", nome: "Regional" },
    { id: "salgados", nome: "Salgados" },
    { id: "bebidas", nome: "Bebidas geladas" },
    { id: "kits", nome: "Kits presente" }
  ],

  destaques: ["croissant-natal", "latte-red-velvet", "brownie-guirlanda", "cappuccino-canela", "brownie-arvore"],

  itens: [
    // Natal
    { id: "croissant-natal", cat: "natal", nome: "Croissant de Natal", desc: "Croissant folhado com fios de creme de avelã e morango fresco.", preco: 24.9, img: "croissant-natal" },
    { id: "latte-red-velvet", cat: "natal", nome: "Latte Red Velvet", desc: "Latte cremoso servido sobre calda de frutas vermelhas.", preco: 18.9, img: "latte-red-velvet" },
    { id: "brownie-guirlanda", cat: "natal", nome: "Brownie Guirlanda", desc: "Brownie de chocolate decorado como guirlanda natalina.", preco: 14.9, img: "brownie-guirlanda" },
    { id: "brownie-arvore", cat: "natal", nome: "Brownie Árvore", desc: "Brownie com chantilly verde em forma de árvore de Natal.", preco: 13.9, img: "brownie-arvore" },
    { id: "box-natal", cat: "natal", nome: "Box Café de Natal", desc: "Croissant e café na caixa decorada para presentear.", preco: 49.9, img: "box-natal" },

    // Cafés
    { id: "cappuccino-canela", cat: "cafes", nome: "Cappuccino com canela", desc: "Espresso, leite vaporizado e espuma alta com canela polvilhada.", preco: 14.9, img: "cappuccino-canela" },
    { id: "cappuccino-love", cat: "cafes", nome: "Cappuccino da casa", desc: "O clássico da Le Grain, com desenho de canela na espuma.", preco: 12.9, img: "cappuccino-love" },
    { id: "espresso", cat: "cafes", nome: "Espresso", desc: "Curto e encorpado, servido com água com gás.", preco: 7.9, img: "" },
    { id: "cafe-coado", cat: "cafes", nome: "Café coado", desc: "Coado na hora, para tomar sem pressa.", preco: 8.9, img: "" },

    // Croissants
    { id: "croissant-doce-de-leite", cat: "croissants", nome: "Croissant de doce de leite", desc: "Recheado e coberto com doce de leite e castanhas.", preco: 22.9, img: "croissant-doce-de-leite" },
    { id: "croissant-salada", cat: "croissants", nome: "Croissant salada", desc: "Cream cheese, tomate, folhas verdes e nozes.", preco: 24.9, img: "croissant-salada" },
    { id: "croissant-carne-queijo", cat: "croissants", nome: "Croissant de carne e queijo", desc: "Carne desfiada bem temperada com queijo derretido.", preco: 26.9, img: "croissant-carne-queijo" },
    { id: "croissants-tradicionais", cat: "croissants", nome: "Croissants tradicionais", desc: "Porção com manteiga e geleia de frutas vermelhas.", preco: 19.9, img: "croissants-tradicionais" },

    // Doces
    { id: "torta-limao", cat: "doces", nome: "Torta de limão", desc: "Massa amanteigada, creme de limão e merengue maçaricado.", preco: 16.9, img: "hero-torta" },
    { id: "bolo-vulcao", cat: "doces", nome: "Bolo vulcão", desc: "Bolo de chocolate com calda escorrendo, morango e cereja.", preco: 19.9, img: "bolo-vulcao" },
    { id: "bolo-chocolate", cat: "doces", nome: "Fatia de bolo de chocolate", desc: "Camadas de chocolate com recheio cremoso.", preco: 15.9, img: "bolo-chocolate-gelado" },
    { id: "waffle-frutas", cat: "doces", nome: "Waffle com frutas vermelhas", desc: "Waffle quentinho, frutas vermelhas e mel para regar.", preco: 24.9, img: "waffle-frutas" },

    // Regional
    { id: "cafe-regional", cat: "regional", nome: "Café regional", desc: "Tapioca, cuscuz, ovo frito e banana-da-terra.", preco: 32.9, img: "cafe-regional" },
    { id: "bolo-de-rolo", cat: "regional", nome: "Bolo de rolo", desc: "Fatias finas do clássico com goiabada.", preco: 12.9, img: "bolo-de-rolo" },

    // Salgados
    { id: "combo-prime", cat: "salgados", nome: "Promoção Prime", desc: "Um salgado e uma bebida, com preço especial.", preco: 16.9, img: "combo-prime" },
    { id: "folhado", cat: "salgados", nome: "Folhado assado", desc: "Massa folhada assada na hora, recheio do dia.", preco: 12.9, img: "folhado" },

    // Bebidas
    { id: "milkshake-frutas", cat: "bebidas", nome: "Milkshake de frutas vermelhas", desc: "Sorvete batido com calda de frutas vermelhas e morango.", preco: 21.9, img: "milkshake-frutas" },
    { id: "milkshake-hibisco", cat: "bebidas", nome: "Milkshake de morango e hibisco", desc: "Cremoso, com calda de hibisco por cima.", preco: 22.9, img: "milkshake-hibisco" },
    { id: "soda-frutas-vermelhas", cat: "bebidas", nome: "Soda italiana de frutas vermelhas", desc: "Xarope de frutas vermelhas, água com gás e gelo.", preco: 14.9, img: "soda-frutas-vermelhas" },
    { id: "soda-maca-verde", cat: "bebidas", nome: "Soda italiana de maçã verde", desc: "Maçã verde, manjericão, água com gás e muito gelo.", preco: 14.9, img: "soda-maca-verde" },

    // Kits presente
    { id: "kit-afeto", cat: "kits", nome: "Box Afeto", desc: "Croissant, café, bolo, brownie e cartão com mensagem.", preco: 69.9, img: "kit-afeto" },
    { id: "kit-fechado", cat: "kits", nome: "Box Afeto com laço", desc: "A Box Afeto fechada com laço de cetim, pronta para entregar.", preco: 74.9, img: "kit-fechado" }
  ]
};
