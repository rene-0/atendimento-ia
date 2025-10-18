import { ChatCompletionMessageParam } from "openai/resources/index"

const menu = [
  { id: 1, name: "X-Bacon Supreme", price: 25.9 },
  { id: 2, name: "Mega Frango Crispy", price: 23.5 },
  { id: 3, name: "Cheddar Duplo Smash", price: 27.0 },
  { id: 4, name: "Dogão Explosivo", price: 19.9 },
  { id: 5, name: "Veggie Power Burger", price: 22.9 },
  { id: 6, name: "Picanha Artesanal", price: 29.9 },
  { id: 7, name: "Hot Chicken BBQ", price: 24.5 },
  { id: 8, name: "X-Tudo da Casa", price: 31.9 },
  { id: 9, name: "Tropical Burger (Abacaxi + Frango)", price: 26.0 },
  { id: 10, name: "Cheese Onion Melt", price: 25.0 },
  { id: 11, name: "Sanduíche Clássico da Vovó", price: 21.9 },
  { id: 12, name: "X-Calabresa Apimentado", price: 24.9 },
  { id: 13, name: "Double Cheese Lover", price: 28.5 },
  { id: 14, name: "Wrap de Frango com Cream Cheese", price: 20.9 },
  { id: 15, name: "Burger da Madrugada", price: 32.0 },
  { id: 16, name: "Combo Smash + Fritas + Refri", price: 37.9 },
  { id: 17, name: "Combo Frango Crispy + Refri", price: 34.5 },
  { id: 18, name: "Combo Veggie + Suco Natural", price: 33.0 },
  { id: 19, name: "Batata Frita Artesanal", price: 14.9 },
  { id: 20, name: "Anéis de Cebola Crocantes", price: 16.9 },
  { id: 21, name: "Milkshake de Ovomaltine", price: 18.9 },
  { id: 22, name: "Milkshake de Morango", price: 17.9 },
  { id: 23, name: "Refrigerante Lata", price: 6.0 },
  { id: 24, name: "Suco Natural 300ml", price: 7.5 },
  { id: 25, name: "Água Mineral", price: 4.5 },
]

const drinks = [
  { id: 1, name: "Refrigerante Lata (Coca-Cola)", price: 6.0 },
  { id: 2, name: "Refrigerante Lata (Guaraná)", price: 6.0 },
  { id: 3, name: "Refrigerante 600ml", price: 8.5 },
  { id: 4, name: "Água Mineral Sem Gás 500ml", price: 4.5 },
  { id: 5, name: "Água Mineral Com Gás 500ml", price: 5.0 },
  { id: 6, name: "Suco Natural de Laranja 300ml", price: 7.5 },
  { id: 7, name: "Suco Natural de Abacaxi com Hortelã 300ml", price: 8.0 },
  { id: 8, name: "Suco Natural de Morango 300ml", price: 8.5 },
  { id: 9, name: "Vitamina de Banana com Aveia", price: 9.0 },
  { id: 10, name: "Milkshake de Chocolate", price: 17.9 },
  { id: 11, name: "Milkshake de Morango", price: 17.9 },
  { id: 12, name: "Milkshake de Ovomaltine", price: 18.9 },
  { id: 13, name: "Cerveja Long Neck Heineken", price: 10.0 },
  { id: 14, name: "Cerveja Long Neck Budweiser", price: 9.5 },
  { id: 15, name: "Cerveja Artesanal Pilsen 500ml", price: 14.9 },
  { id: 16, name: "Cerveja Artesanal IPA 500ml", price: 15.9 },
  { id: 17, name: "Chá Gelado Limão 500ml", price: 7.0 },
  { id: 18, name: "Chá Gelado Pêssego 500ml", price: 7.0 },
  { id: 19, name: "Café Expresso Curto", price: 5.0 },
  { id: 20, name: "Cappuccino Cremoso 300ml", price: 9.0 },
  { id: 21, name: "Chocolate Quente Artesanal", price: 10.5 },
  { id: 22, name: "Energético Red Bull", price: 12.0 },
  { id: 23, name: "Smoothie de Frutas Vermelhas", price: 11.5 },
  { id: 24, name: "Smoothie Tropical (Manga + Laranja)", price: 11.5 },
  { id: 25, name: "Suco Verde Detox", price: 10.0 },
]

export const defaultRules: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "Você é um atendente virtual de uma lanchonete.",
  },
  {
    role: "system",
    content: "Sempre ofereça o cardápio e registre pedidos.",
  },
  {
    role: "system",
    content: `Cardápio atual:
      ${menu.map((i) => `${i.id} - ${i.name} R$${i.price.toFixed(2)}`).join("\n")}`,
  },
  {
    role: "system",
    content: "Quando o cliente pedir algo, responda de forma simpática e registre internamente o pedido.",
  },
  {
    role: "system",
    content: "Quando o cliente escolher o lanche perguntar se ele quer bebida para acompanhar.",
  },
  {
    role: "system",
    content: `Bebidas atual:
      ${drinks.map((i) => `${i.id} - ${i.name} R$${i.price.toFixed(2)}`).join("\n")}`,
  },
  {
    role: "system",
    content:
      "Caso o cliente queira ou não bebida, perguntar o endereço para entrega. O custo da entrega é R$5,00. O cleinte pode também quer retirar no local.",
  },
  {
    role: "system",
    content: "No final, sempre informe o valor total do pedido, incluindo a taxa de entrega se for o caso. E pedir confirmação do pedido.",
  },
]
