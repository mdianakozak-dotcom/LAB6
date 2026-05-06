document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('doramaForm');
    const resultArea = document.getElementById('resultArea');

    const doramaData = {
        romance: [
            { 
                title: "Одружись зі мною", 
                img: "images/Одружись зі мною.jpg", 
                desc: "Дівчина, яка пережила зраду нареченого, несподівано отримує шанс стати власницею шикарного таунхауса, призначеного тільки для молодят. Оскільки її офіційний шлюб вже розірвано, вона пропонує колезі зіграти роль чоловіка, адже він випадково тезка її колишнього коханого. Коли вони прикидаються ідеальною парою, між ними починають виникати справжні почуття, і гра перетворюється на ризиковане випробування емоцій. Їх удаваний союз поступово ставить під загрозу всі колишні уявлення про любов і довіру." 
            },
            { 
                title: "Аварійна посадка - кохання", 
                img: "images/crash landing on you.jpg", 
                desc: "Юн Се Рі - спадкоємиця великої корпорації у Південній Кореї. Одного разу вона потрапляє у самий вир урагану і опиняється на території Північної Кореї. Вона намагається повернутися додому і в цьому їй намагається допомогти капітан патруля Рі Джун Хек. Після низки невдач, їй все ж вдається потрапити додому, де її чекає багато несподіванок і боротьба за владу з братами." 
            }
        ],
        thriller: [
            { 
                title: "Коли дзвонить телефон", 
                img: "images/Коли дзвонить телефон.jpg", 
                desc: "Головний герой успішний прес-секретар президента, чия кар'єра сяє, але особисте життя похмуре. Його політичний шлюб з Хон Хі Джу, донькою власника газети, існує лише для виду, оскільки вони не спілкуються і живуть окремо. Коли Хі Джу викрадають і чоловік ігнорує її прохання про допомогу, вона, охоплена гнівом, вирішує анонімно погрожувати йому." 
            },
            { 
                title: "Квітка зла", 
                img: "images/Flower of evil.jpg", 
                desc: "Сімейний чоловік, на ім’я Пек Хі Сон ховає темну таємницю: він нездатний відчувати справжні емоції. Його дружина – детектив Чха Чжі Он розслідує злочин, який пов'язаний із минулим її чоловіка. Коли Чжі Он наближається до розкриття істини, вона починає підозрювати, що той, кого вона любить, може бути злочинцем, якого вона шукає." 
            }
        ],
        history: [
            { 
                title: "Смачного, ваша величносте", 
                img: "images/Смачного, ваше величносте.jpg", 
                desc: "Французький шеф-кухар Йонг Джи Йонг досягає тріумфу на міжнародному кулінарному конкурсі, але загадково опиняється в епоху Чосон, де їй доводиться пристосовуватися до життя при дворі. Її завдання-готувати королівські страви в стилі ф'южн для вимогливого короля-тирана, що володіє вишуканим смаком і непростою натурою. Кожне приготоване нею блюдо стає випробуванням не тільки для її кулінарної майстерності, але і для винахідливості, оскільки придворні інтригани і суперницькі наложниці уважно стежать за кожним її кроком. Поступово Джи Йонг вдається вразити монарха." 
            },
            { 
                title: "Алхімія душ", 
                img: "images/алхімія душ.jpg", 
                desc: "У світі, де магія існує поряд зі звичайним життям, король країни Дэхо звертається до мага Геона з неординарною пропозицією: дозволити королеві використовувати його тіло для народження спадкоємця. Геон погоджується, і так народжується Чан Ук, проте, він виявляється незаконнопорожнім сином короля, і його магічні здібності блоковані." 
            }
        ]
    };

    // ====================== НОВИЙ КОД ДЛЯ ЛАБОРАТОРНОЇ ======================
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("✅ Форма спрацювала");

    const formData = new FormData(form);
    let isValid = true;

    // === ВАЛІДАЦІЯ (виправлена) ===
    const name = (formData.get('userName') || '').trim();
    const color = (formData.get('userColor') || '').trim();
    const genre = formData.get('genre') || '';

    if (name === "" || !/^[а-яА-Яa-zA-ZіІїЇєЄґҐ\s]+$/.test(name)) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    if (color === "") {
        document.getElementById('colorError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('colorError').style.display = 'none';
    }

    if (!genre) {
        document.getElementById('genreError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('genreError').style.display = 'none';
    }

    if (!isValid) {
        console.log("Валідація не пройдена");
        return;
    }

        // === ВІДПРАВКА НА СЕРВЕР (doramas) ===
    const dataToSend = {
        userName: name,
        favoriteColor: color,
        genre: genre,
        timing: formData.get('timing'),
        features: formData.getAll('feature'),
        submittedAt: new Date().toISOString()
    };

    fetch('https://69f0ab3ec1533dbedc9d811c.mockapi.io/doramas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) throw new Error('Помилка сервера');
        return response.json();
    })
    .then(data => {
    console.log('✅ Успішно відправлено:', data);
    
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `<strong>✅ Дані успішно відправлені на сервер!</strong>`;
    resultArea.appendChild(successMsg);

    // Додаємо кнопку "Заповнити ще раз" без перезавантаження
    const newButton = document.createElement('button');
    newButton.className = 'btn-info';
    newButton.style.marginTop = '15px';
    newButton.textContent = 'Заповнити ще одну анкету';
    newButton.onclick = () => {
        form.style.display = 'block';
        resultArea.style.display = 'none';
        form.reset();                    // очищуємо форму
        // видаляємо попередні повідомлення успіху
        document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
    };
    resultArea.appendChild(newButton);
})
    .catch(err => {
        console.error(err);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = `<strong>❌ Не вдалося відправити дані</strong>`;
        resultArea.appendChild(errorMsg);
    });
    
    // === Показ рекомендації дорами ===
    form.style.display = 'none';
    resultArea.style.display = 'block';

    const options = doramaData[genre];
    const randomIndex = Math.floor(Math.random() * options.length);
    const selected = options[randomIndex];

    document.getElementById('resTitle').textContent = selected.title;
    document.getElementById('resImg').src = selected.img;
    document.getElementById('resDesc').textContent = selected.desc;

    const features = formData.getAll('feature');
    document.getElementById('formDataOutput').innerHTML = `
        <p><strong>Користувач:</strong> ${name}</p>
        <p><strong>Колір настрою:</strong> ${color}</p>
        <p><strong>Час перегляду:</strong> ${formData.get('timing')}</p>
        <p><strong>Фільтри:</strong> ${features.length > 0 ? features.join(', ') : 'без додаткових умов'}</p>
    `;
});
        
    }); 

