
// *******************************Scroll top and button************************************************//
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('scrollToBottom').addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});


// **********************************start-nav-bar-responsive-js**********************************//
const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.menu-container');

menuToggle.addEventListener('click', () => {
    menuContainer.classList.toggle('open');
});

// ***********************************display-products**************************************//
const productLists = {
    accessories: [
        { id: 1, name: "Sony DSRL Camera", price: 279.99, image: "imges/product5.png" },
        { id: 2, name: "Court Suit", price: 49.99, image: "imges/product3.png" },
        { id: 3, name: "Nemo Adult Fish", price: 39.99, image: "imges/product1.png" },
        { id: 4, name: "Iphone 14 Pro", price: 499.99, image: "imges/product4.png" },
        { id: 5, name: "Table Fan", price: 24.99, image: "imges/jewellery-1.jpg" },
        { id: 6, name: "Sealing Bulb", price: 14.99, image: "imges/watch-4.jpg" },
        { id: 7, name: "jewellery", price: 14.99, image: "imges/jewellery-3.jpg" },
        { id: 8, name: "watch", price: 14.99, image: "imges/watch-2.jpg" },

    ],
    shoes: [
        { id: 9, name: "Sports Item", price: 99.99, image: "imges/sports-6.jpg" },
        { id: 10, name: "Casual Wear", price: 59.99, image: "imges/1.jpg" },
        { id: 11, name: "Party Wear", price: 120.00, image: "imges/party-wear-1.jpg" },
        { id: 12, name: "Running Shoes", price: 89.99, image: "imges/shoe-2_1.jpg" },
        { id: 13, name: "Formal Shoes", price: 74.99, image: "imges/shoe-3.jpg" },
        { id: 14, name: "Sneakers", price: 49.99, image: "imges/shoe-4.jpg" },
        { id: 15, name: "Shoe", price: 49.99, image: "imges/shoe-1_1.jpg" },
        { id: 16, name: "Sports", price: 49.99, image: "imges/sports-2.jpg" },
    ],
clothes :[
        { id: 17, name: "Clothes Item 1", price: 49.99, image: "imges/clothes-1.jpg" },
        { id: 18, name: "Jacket 2", price: 79.99, image: "imges/jacket-2.jpg" },
        { id: 19, name: "Jacket 3", price: 89.99, image: "imges/jacket-3.jpg" },
        { id: 20, name: "Jacket 4", price: 99.99, image: "imges/jacket-4.jpg" },
        { id: 21, name: "Jacket 5", price: 59.99, image: "imges/jacket-5.jpg" },
        { id: 22, name: "Jacket 6", price: 69.99, image: "imges/jacket-6.jpg" },
        { id: 23, name: "Shirt 1", price: 39.99, image: "imges/shirt-1.jpg" },
        { id: 24, name: "Shirt 2", price: 44.99, image: "imges/2.jpg" }
    ],
    
};

const productGrid = document.getElementById("product-grid");
const cart = [];
const productGrids = {
    accessories: document.querySelector("#product-grid-accessories"),
    shoes: document.querySelector("#product-grid-shoes"),
    clothes : document.querySelector("#product-grid-clothes"),

};

const cartItemsContainer = document.getElementById("cart-items-container");
const cartSidebar = document.getElementById("cart-sidebar");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const closeCartButton = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout-btn");



function createProductCard({ id, name, price, image }) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="info">
            <h3>${name}</h3>
            <div class="price">$${price.toFixed(2)}</div>
            <div class="actions">
                <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
            </div>
        </div>
    `;
    return productCard;
}

function renderProducts(section, productList) {
    const productGrid = productGrids[section];
    if (!productGrid) {
        console.error(`Product grid for section "${section}" not found.`);
        return;
    }
    productGrid.innerHTML = ""; 
    productList.forEach((product) => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
        total += item.price;
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
    cartCount.innerText = cart.length;
}

function createCartItem({ id, name, price, image }) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="cart-item-inner">
        <img src="${image}" alt="${name}" class="cart-item-image">
        <div class="item-info">
          <h3>${name}</h3>
          <div class="price">$${price.toFixed(2)}</div>
        </div>
        <button class="remove-btn" data-id="${id}">&times;</button>
      </div>
    `;
    return cartItem;
}

function addToCart(productId) {
    const product =
        productLists.accessories.find((p) => p.id === productId) ||
        productLists.shoes.find((p) => p.id === productId) ||
        productLists.clothes.find((p) => p.id === productId); 

    if (!product) {
        console.error(`Product with ID ${productId} not found in any list.`);
        return;
    }

    cart.push(product);
    updateCart();
}


function removeFromCart(productId) {
    const index = cart.findIndex((p) => p.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function setupEventListeners() {
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart-btn")) {
            const productId = parseInt(e.target.getAttribute("data-id"));
            if (!isNaN(productId)) {
                addToCart(productId);
            }
        } else if (e.target.classList.contains("remove-btn")) {
            const productId = parseInt(e.target.getAttribute("data-id"));
            if (!isNaN(productId)) {
                removeFromCart(productId);
            }
        } else if (e.target.id === "cart-icon") {
            cartSidebar.classList.toggle("open");
        } else if (e.target.id === "close-cart") {
            cartSidebar.classList.remove("open");
        } else if (e.target.id === "checkout-btn") {
            alert("Proceed to checkout");
        }
    });
}

function initialize() {
    renderProducts("accessories", productLists.accessories);
    renderProducts("shoes", productLists.shoes);
    renderProducts("clothes", productLists.clothes);
    setupEventListeners();
}

initialize();



//**********************************************script-accordion*******************************************//
function toggleAccordion(item) {
    const getcontent = item.parentElement.parentElement.querySelector(".content-acoordion");
  
    if (!getcontent) {
      console.warn("No content-acoordion element found.");
      return;
    }
  
    getcontent.classList.toggle("active");
  
    if (getcontent.classList.contains("active")) {
      getcontent.style.height = `${getcontent.scrollHeight}px`;
    } else {
      getcontent.style.height = `0`;
    }
  
    item.classList.toggle("add-minus");
    if (item.classList.contains("add-minus")) {
      item.innerText = "_";
      item.style.transform = "translateY(-11px)";
    } else {
      item.innerText = "+";
      item.style.transform = "translateY(0px)";
    }
  }
  


// /********************************************function-stars-rating***************************************/

function createProductCard({ id, name, price, image }) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <div class="info">
        <h3>${name}</h3>
        <div class="price">$${price.toFixed(2)}</div>
        <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
        <div class="rating">
          <span class="rating-star" data-value="1">★</span>
          <span class="rating-star" data-value="2">★</span>
          <span class="rating-star" data-value="3">★</span>
          <span class="rating-star" data-value="4">★</span>
          <span class="rating-star" data-value="5">★</span>
          <span class="rating-number">0.0</span>
          <span class="fav-icon"></span>
        </div>
      </div>
    `;

    const stars = productCard.querySelectorAll(".rating-star");
    const ratingNumber = productCard.querySelector(".rating-number");

    stars.forEach((star, index) => {
        star.addEventListener("click", (event) => {
            const starWidth = star.offsetWidth;
            const clickX = event.offsetX;
            const isHalf = clickX < starWidth / 2;

            stars.forEach((s, i) => {
                s.classList.remove("full", "half");
                if (i < index || (i === index && !isHalf)) {
                    s.classList.add("full");
                } else if (i === index && isHalf) {
                    s.classList.add("half");
                }
            });

            const rating = isHalf ? index + 0.5 : index + 1;
            ratingNumber.textContent = rating.toFixed(1);
        });
    });

    const favIcon = productCard.querySelector(".fav-icon");

    favIcon.textContent = "♥"; 
    favIcon.style.fontSize = "20px"; 
    favIcon.style.color = "black"; 
    favIcon.style.cursor = "pointer"; 
    favIcon.style.transition = "color 0.3s ease"; 

    favIcon.addEventListener("click", () => {
        if (favIcon.style.color === "black") {
            favIcon.style.color = "#ff6f61"; 
        } else {
            favIcon.style.color = "black"; 
        }
    });

    return productCard;
}
