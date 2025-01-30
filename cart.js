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
