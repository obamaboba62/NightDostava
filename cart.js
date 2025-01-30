document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.querySelector(".cart-items");
    const cartModal = document.getElementById("cart-modal");
    const cartButton = document.querySelector(".cart-btn");
    const closeCartButton = document.querySelector(".close-cart");
    const copyCartIdButton = document.querySelector(".copy-cart-id");

    // Проверяем, есть ли товары в локальном хранилище
    if (localStorage.getItem("cart")) {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        cart.push(...storedCart);
        updateCart();
    }

    // Функция добавления товара в корзину
    function addToCart(event) {
        const button = event.target;
        const product = button.closest(".product");
        const productName = product.querySelector("p").textContent;
        const productPrice = parseInt(button.getAttribute("data-price"));

        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        saveCart();
        updateCart();
    }

    // Добавляем обработчики на кнопки "Добавить в корзину"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.removeEventListener("click", addToCart); // Удаляем старый обработчик
        button.addEventListener("click", addToCart);
    });

    // Функция обновления корзины
    function updateCart() {
        cartItemsList.innerHTML = "";
        let totalItems = 0;

        cart.forEach((item, index) => {
            totalItems += item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - ${item.price} грн x${item.quantity}
                <button class="remove-item" data-index="${index}">🗑</button>
            `;
            cartItemsList.appendChild(li);
        });

        cartCount.textContent = totalItems;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Функция удаления товара из корзины
    function removeFromCart(event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            saveCart();
            updateCart();
        }
    }

    cartItemsList.addEventListener("click", removeFromCart);

    // Функция сохранения корзины
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Открытие корзины
    cartButton.addEventListener("click", () => {
        cartModal.classList.add("active");
    });

    // Закрытие корзины
    closeCartButton.addEventListener("click", () => {
        cartModal.classList.remove("active");
    });

    // Копирование ID-корзины
    copyCartIdButton.addEventListener("click", () => {
        const cartId = `#${Math.floor(Math.random() * 100000)}`;
        navigator.clipboard.writeText(cartId);
        alert(`ID-корзины скопирован: ${cartId}`);
    });

    // Первое обновление корзины
    updateCart();
});
