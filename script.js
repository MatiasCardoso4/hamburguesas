const menuItems = [
  {
    id: 1, // ID único
    name: "Cheeseburger",
    price: 5.99,
    ingredientes: [
      "Carne de res",
      "Queso cheddar",
      "Lechuga",
      "Tomate",
      "Pan de hamburguesa",
      "Salsa especial",
    ],
    image: "./assests/Cheeseburger.png",
    descripcion:
      "Clásica hamburguesa con carne de res jugosa y queso derretido en un pan suave.",
  },
  {
    id: 2, // ID único
    name: "BBQ Burger",
    price: 6.99,
    ingredientes: [
      "Carne de res",
      "Salsa barbacoa",
      "Cebolla crujiente",
      "Queso cheddar",
      "Pan brioche",
    ],
    image: "./assests/BBQ_Burger.png",
    descripcion:
      "Hamburguesa con salsa barbacoa ahumada, cebolla crujiente y queso cheddar.",
  },
  {
    id: 3, // ID único
    name: "Double Burger",
    price: 7.99,
    ingredientes: [
      "Doble carne de res",
      "Doble queso cheddar",
      "Lechuga",
      "Tomate",
      "Pepinillos",
      "Salsa especial",
      "Pan de hamburguesa",
    ],
    image: "./assests/Double_burguer.png",
    descripcion:
      "Doble carne de res con queso derretido, lechuga, tomate y salsa especial.",
  },
  {
    id: 4, // ID único
    name: "Spicy Burger",
    price: 6.49,
    ingredientes: [
      "Carne de res",
      "Jalapeños",
      "Queso pepper jack",
      "Salsa picante",
      "Lechuga",
      "Pan de hamburguesa",
    ],
    image: "./assests/Spicy_Burger.png",
    descripcion:
      "Hamburguesa con un toque picante, jalapeños, salsa especial y queso pepper jack.",
  },
  {
    id: 5, // ID único
    name: "Mushroom Swiss",
    price: 6.99,
    ingredientes: [
      "Carne de res",
      "Champiñones salteados",
      "Queso suizo",
      "Cebolla caramelizada",
      "Pan de hamburguesa",
    ],
    image: "./assests/Mushroom_Swiss.png",
    descripcion:
      "Hamburguesa con champiñones salteados y queso suizo derretido.",
  },
  {
    id: 6, // ID único
    name: "Avocado Burger",
    price: 7.99,
    ingredientes: [
      "Carne de res",
      "Aguacate",
      "Queso suizo",
      "Lechuga",
      "Mayonesa",
      "Pan brioche",
    ],
    image: "./assests/Avocado_Burger.png",
    descripcion:
      "Hamburguesa con cremoso aguacate, queso suizo y salsa especial.",
  },
  {
    id: 7, // ID único
    name: "Chicken Burger",
    price: 6.49,
    ingredientes: [
      "Pechuga de pollo a la parrilla",
      "Lechuga",
      "Tomate",
      "Mayonesa",
      "Pan de hamburguesa",
    ],
    image: "./assests/Chicken_Burger.png",
    descripcion:
      "Hamburguesa de pollo a la parrilla con lechuga, tomate y mayonesa.",
  },
];
const menuContainer = document.getElementById("menu");
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSidebar = document.getElementById("cart-sidebar");
const cartButton = document.getElementById("cart");
const checkoutOrder = document.getElementById("checkout");

menuItems.forEach((item) => {
  const card = document.createElement("div");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const img = document.createElement("img");
  const button = document.createElement("button");
  const divRow = document.createElement("div");

  button.addEventListener("click", () => addToCart(item.name, item.price,item.id));

  h3.textContent = `${item.name}`;
  span.textContent = `$${item.price}`;
  img.src = `${item.image}`;
  img.alt = `${item.name}`;
  button.innerHTML = "Agregar";
  card.classList.add("card");
  divRow.classList.add("row");
  divRow.append(button, span);
  card.append(h3, img, divRow);
  menuContainer.append(card);
});

function addToCart(name, price,id) {
  cart.push({ name, price,id });
  updateCart();
}


function deleteProduct(id) {
  cart = cart.filter(p => p.id !== id)
  updateCart()
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement("li");
    li.classList.add('cart-item')
    const span = document.createElement("span");
    const h3 = document.createElement("h3");
    const button  =document.createElement('button')
    button.innerText = 'Eliminar'
    button.classList.add('delete-btn')
    button.addEventListener('click', ()=>deleteProduct(item.id))
    h3.textContent = `${item.name} - `;
    span.textContent = `$${item.price.toFixed(2)}`;
    li.append(h3,span,button)
   cartItems.append(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

let message = "🍔 *Pedido de hamburguesas:*\n\n ";

function sendCartToWhatsapp() {
  let total = 0;
  cart.forEach((item) => {
    message += `- ${item.name} *$${item.price.toFixed(2)}*\n `;
    total += item.price;
  });

  message += `\n- *Total*: $${total.toFixed(2)}`;

  let phoneNumber = "+541162373100";
  let whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  window.open(whatsappURL, "_blank");
}

cartButton.addEventListener("click", () =>
  cartSidebar.classList.toggle("hidden")
);
checkoutOrder.addEventListener("click", sendCartToWhatsapp);
