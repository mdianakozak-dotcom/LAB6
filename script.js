// Очікуємо відкриття сторінки, щоб JS не почав шукати кнопки раніше, ніж браузер їх намалює
document.addEventListener('DOMContentLoaded', function() {


    const openButton = document.getElementById('openDialog');
    const closeButton = document.getElementById('closeDialog');
    const dialogWindow = document.getElementById('myDialog');

    // Натискання на кнопку "Порада мандрівникам"
    openButton.addEventListener('click', function() {
        // Зміна стилю елемента через властивість .style
        dialogWindow.style.display = 'block';
        
        console.log("Користувач відкрив вікно");
    });

    // Натискання на хрестик
    closeButton.addEventListener('click', function() {
        dialogWindow.style.display = 'none';
    });

    // Зміна кольору кнопки, коли на неї наводять мишкою
    openButton.addEventListener('mouseover', function() {
        openButton.style.boxShadow = '0 0 15px lightpink';
    });

    openButton.addEventListener('mouseout', function() {
        openButton.style.boxShadow = 'none';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://69f0ab3ec1533dbedc9d811c.mockapi.io/foods';
    
    const foodsBody = document.getElementById('foodsBody');
    const loading = document.getElementById('loading');
    const table = document.getElementById('foodsTable');
    const noData = document.getElementById('noData');
    
    const categoryFilter = document.getElementById('categoryFilter');
    const spicyFilter = document.getElementById('spicyFilter');
    const applyFilterBtn = document.getElementById('applyFilter');
    const resetFilterBtn = document.getElementById('resetFilter');

    let allFoods = [];

    // Завантаження даних з API
    async function loadFoods() {
        try {
            loading.style.display = 'block';
            table.style.display = 'none';
            noData.style.display = 'none';

            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Помилка завантаження');

            allFoods = await response.json();
            
            // Заповнюємо select категоріями
            populateCategories();
            
            renderFoods(allFoods);
        } catch (error) {
            console.error(error);
            loading.textContent = 'Помилка завантаження даних. Спробуйте пізніше.';
        }
    }

    // Заповнення селекту категорій
    function populateCategories() {
        const categories = [...new Set(allFoods.map(food => food.category))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }

    // Відображення страв
    function renderFoods(foods) {
        foodsBody.innerHTML = '';
        loading.style.display = 'none';

        if (foods.length === 0) {
            noData.style.display = 'block';
            table.style.display = 'none';
            return;
        }

        foods.forEach(food => {
            const row = document.createElement('tr');
            
            const spicyStars = '🌶️'.repeat(food.spicyLevel || 1);
            
            row.innerHTML = `
                <td><img src="${food.image || 'images/default.jpg'}" alt="${food.name}" onerror="this.src='images/default.jpg'"></td>
                <td><strong>${food.name}</strong><br><small>${food.englishName || ''}</small></td>
                <td>${food.description || 'Опис відсутній'}</td>
                <td>${food.category}</td>
                <td class="spicy">${spicyStars} (${food.spicyLevel || '?'})</td>
                <td>${food.price ? food.price + ' ₩' : '—'}</td>
            `;
            foodsBody.appendChild(row);
        });

        table.style.display = 'table';
    }

    // Фільтрація
    function filterFoods() {
        const selectedCategory = categoryFilter.value;
        const selectedSpicy = spicyFilter.value;

        let filtered = allFoods;

        if (selectedCategory) {
            filtered = filtered.filter(food => food.category === selectedCategory);
        }

        if (selectedSpicy) {
            filtered = filtered.filter(food => food.spicyLevel == selectedSpicy);
        }

        renderFoods(filtered);
    }

    // Обробники подій
    applyFilterBtn.addEventListener('click', filterFoods);
    
    resetFilterBtn.addEventListener('click', () => {
        categoryFilter.value = '';
        spicyFilter.value = '';
        renderFoods(allFoods);
    });

    // Завантажуємо дані при відкритті сторінки
    loadFoods();
});

// Функція для поради на сторінці Культура
function getAdvice() {
    const season = document.getElementById('seasonSelect').value;
    const level = document.querySelector('input[name="level"]:checked').value;
    const modal = document.getElementById('adviceModal');
    const resultText = document.getElementById('adviceText');
    const resultImg = document.getElementById('adviceImg');
    
    if (season === "") {
        alert("Будь ласка, спочатку обери пору року!");
        return;
    }

    let text = "";
    let imgSrc = "";

    if (season === "spring") {
        imgSrc = "images/парк.jpg";
        text = "<strong>Весна в Кореї</strong> — це справжній вибух ніжності. Коли вся країна вкривається рожевим цвітом сакури (beot-kkot), атмосфера стає магічною. Парк Йоідо в Сеулі — епіцентр цього свята, де вздовж річки Хан розквітають тисячі дерев. ";
        
        if (level === "pro") {
            text += "Як справжньому знавцю, ми також радимо відвідати місто Чінхе на найбільший фестиваль сакури в країні або прогулятися секретним садом палацу Чхандоккун, де весна відчувається особливо приватно.";
        } else {
            text += "Радимо взяти напрокат велосипед, купити полуничне молоко в найближчому магазині та насолодитися пікніком під пелюстками, що падають, як сніг.";
        }

    } else if (season === "autumn") {
        imgSrc = "images/осінь.jpg";
        text = "<strong>Осінь</strong> — це пора «танпхун», коли корейські гори та парки забарвлюються в неймовірні вогняні кольори. Повітря стає прохолодним і прозорим, що ідеально підходить для довгих прогулянок. ";
        
        if (level === "pro") {
            text += "Для фанатів культури це найкращий час, щоб відвідати село Хахве в Андоні, де проходять фестивалі масок, або насолодитися вечірнім туром у палаці Кьонбоккун, який восени відкритий для нічних відвідувань.";
        } else {
            text += "Обов'язково зробіть фотосесію в ханбоці на фоні жовтих дерев гінкго біля палаців Сеула. Це виглядає точно як кадри з улюбленої історичної дорами!";
        }

    } else if (season === "winter") {
        imgSrc = "images/зима.jpg";
        text = "<strong>Зима в Кореї</strong> морознюча, але неймовірно затишна. Міста прикрашаються мільйонами вогнів, а в повітрі пахне смаженими каштанами. ";
        
        if (level === "pro") {
            text += "Знавцям ми рекомендуємо спробувати нічне катання на лижах на курортах Канвондо або відвідати фестиваль льодяних скульптур. Також це найкращий час для чімчільбанів (традиційних саун), щоб відчути справжній корейський релакс.";
        } else {
            text += "Щоб не змерзнути, обов'язково спробуйте вуличну їжу: гарячий суп ттоккук або солодкі млинці хотток. А вечірні вогні в Саду ранкового спокою створять відчуття справжньої зимової казки.";
        }
    }

    resultImg.src = imgSrc;
    resultText.innerHTML = text;
    modal.style.display = 'flex';
}

function closeAdvice() {
    document.getElementById('adviceModal').style.display = 'none';
}