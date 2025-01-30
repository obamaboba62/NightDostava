document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");
    let cartModal = document.getElementById("cart-modal");
    let cartItemsList = document.querySelector(".cart-items");
    let closeCartButton = document.querySelector(".close-cart");
    let copyCartIdButton = document.querySelector(".copy-cart-id");

    let cartID = localStorage.getItem("cartID");

    // Генерация уникального ID корзины (если нет)
    if (!cartID) {
        cartID = "ND-" + Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("cartID", cartID);
    }

    // Функция обновления количества товаров в корзине
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Функция отображения товаров в корзине
    function renderCart() {
        cartItemsList.innerHTML = ""; // Очищаем список перед загрузкой

        if (cart.length === 0) {
            cartItemsList.innerHTML = "<li>🛒 Ваша корзина пуста</li>";
        } else {
            cart.forEach((item, index) => {
                let li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - ${item.price} грн
                    <button class="remove-item" data-index="${index}">🗑️</button>
                `;
                cartItemsList.appendChild(li);
            });

            // Вешаем обработчик на кнопки удаления
            document.querySelectorAll(".remove-item").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    removeFromCart(index);
                });
            });
        }

        updateCartCount();
    }

    // Функция удаления товара из корзины
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Открытие корзины
    document.querySelector(".cart-container").addEventListener("click", function () {
        renderCart();
        cartModal.classList.add("active");
    });

    // Закрытие корзины
    closeCartButton.addEventListener("click", function () {
        cartModal.classList.remove("active");
    });

    // Копирование ID корзины
    copyCartIdButton.addEventListener("click", function () {
        navigator.clipboard.writeText(cartID).then(() => {
            alert("✅ ID вашей корзины скопирован: " + cartID);
        });
    });

    // Добавление товара в корзину
    function addToCart(productName, price) {
        cart.push({ name: productName, price: price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Вешаем обработчик на кнопки "Добавить в корзину"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.parentElement.querySelector("p").textContent;
            let price = this.getAttribute("data-price");
            addToCart(product, price);
        });
    });

    // Обновляем количество товаров при загрузке
    updateCartCount();
});
// Открытие окна с ID-корзины
function openIdModal() {
    document.getElementById("id-modal").classList.add("active");
    document.getElementById("cart-id-text").textContent = "Ваш ID: " + localStorage.getItem("cartID");
}

// Закрытие окна
function closeIdModal() {
    document.getElementById("id-modal").classList.remove("active");
}

// Копирование ID-корзины
function copyCartId() {
    let cartID = localStorage.getItem("cartID");
    navigator.clipboard.writeText(cartID).then(() => {
        alert("✅ ID вашей корзины скопирован: " + cartID);
    });
}
// Функция обновления количества товаров в корзине
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Вызываем обновление корзины при загрузке страницы
document.addEventListener("DOMContentLoaded", updateCartCount);
// Функция открытия корзины
function openCart() {
    let cartModal = document.getElementById("cart-modal");
    let cartItemsContainer = document.querySelector(".cart-items");

    // Очищаем текущее содержимое
    cartItemsContainer.innerHTML = "";

    // Получаем сохранённые товары
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>🛒 Ваша корзина пуста</p>";
    } else {
        cart.forEach((item, index) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - ${item.price} грн 
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            `;
            cartItemsContainer.appendChild(listItem);
        });
    }

    cartModal.classList.add("active");
}

// Функция закрытия корзины
function closeCart() {
    document.getElementById("cart-modal").classList.remove("active");
}

// Функция добавления товара в корзину
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let productName = this.getAttribute("data-name");
        let productPrice = this.getAttribute("data-price");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name: productName, price: productPrice });
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
    });
});

// Функция обновления количества товаров в корзине
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    openCart();
    updateCartCount();
}

// Вызываем обновление корзины при загрузке страницы
document.addEventListener("DOMContentLoaded", updateCartCount);
