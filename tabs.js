document.addEventListener("DOMContentLoaded", function () {
    // Получаем все кнопки и вкладки
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    // Функция для показа нужной вкладки
    function showTab(tabName) {
        // Скрываем все вкладки
        tabContents.forEach(tab => {
            tab.style.display = "none";
        });

        // Убираем активный класс у всех кнопок
        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Показываем нужную вкладку и активируем кнопку
        document.getElementById(tabName).style.display = "block";
        document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
    }

    // Вешаем обработчик клика на каждую кнопку вкладки
    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const tabName = this.getAttribute("data-tab");
            showTab(tabName);
        });
    });

    // Показываем вкладку "Еда" при загрузке
    showTab("food");
});
