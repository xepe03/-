const menus = [
    {
        name: "돼지국밥",
        image: "images/돼지국밥.jpg",
        calories: "400-500 kcal",
        proteins: "20-30g",
        carbs: "35-45g",
        fats: "15-25g",
        price: 10000
    },
    {
        name: "순대국밥",
        image: "images/순대국밥.jpg",
        calories: "500 kcal",
        proteins: "25g",
        carbs: "45g",
        fats: "25g",
        price: 10000
    },
    {
        name: "투움바파스타",
        image: "images/alfredo.jpg",
        calories: "750 kcal",
        proteins: "25g",
        carbs: "80g",
        fats: "40g",
        price: 15000
    },
    {
        name: "옛날통닭(한마리)",
        image: "images/옛날통닭.jpg",
        calories: "1300 kcal",
        proteins: "110g",
        carbs: "15g",
        fats: "90g",
        price: 13000
    },
    {
        name: "찜닭(한 그릇, 약 600g)",
        image: "images/찜닭.jpg",
        calories: "800 kcal",
        proteins: "50g",
        carbs: "70g",
        fats: "35g",
        price: 18000
    }
];

function getRandomMenu() {
    const selectedPrice = document.getElementById('price').value;

    const filteredMenus = menus.filter(menu => {
        let priceMatch = false;

        switch(selectedPrice) {
            case '0-10000':
                priceMatch = menu.price <= 10000;
                break;
            case '10000-20000':
                priceMatch = menu.price > 10000 && menu.price <= 20000;
                break;
            case '20000-30000':
                priceMatch = menu.price > 20000 && menu.price <= 30000;
                break;
            case '30000+':
                priceMatch = menu.price > 30000;
                break;
        }

        return priceMatch;
    });

    if (filteredMenus.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredMenus.length);
    return filteredMenus[randomIndex];
}

function displayMenu(menu) {
    if (menu) {
        document.getElementById('menuName').textContent = menu.name;
        document.getElementById('menuImage').src = menu.image;
        document.getElementById('menuImage').alt = menu.name;
        document.getElementById('calories').textContent = `칼로리: ${menu.calories}`;
        document.getElementById('proteins').textContent = `단백질: ${menu.proteins}`;
        document.getElementById('carbs').textContent = `탄수화물: ${menu.carbs}`;
        document.getElementById('fats').textContent = `지방: ${menu.fats}`;
        
        // '포장하러 GO!' 버튼이 이미 있는지 확인하고 없을 경우 추가
        if (!document.getElementById('goButton')) {
            const goButton = document.createElement('button');
            goButton.id = 'goButton';
            goButton.textContent = '포장하러 GO!';
            goButton.style.marginTop = '10px'; // 위쪽 여백 추가

            goButton.addEventListener('click', function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const query = menu.name;
                        const naverMapsUrl = `https://map.naver.com/v5/search/${encodeURIComponent(query)}?c=15,${latitude},${longitude}&type=SITE_1`;
                        window.open(naverMapsUrl, '_blank');
                    }, function(error) {
                        alert('위치를 가져올 수 없습니다. 위치 정보를 활성화 해주세요.');
                    });
                } else {
                    alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
                }
            });

            // '다른 메뉴 보기' 버튼 위에 '포장하러 GO!' 버튼 추가
            const rerollButton = document.getElementById('rerollButton');
            rerollButton.parentNode.insertBefore(goButton, rerollButton);
        }
    } else {
        document.getElementById('menuName').textContent = "죄송합니다 적합한 음식이 없습니다";
        document.getElementById('menuImage').src = "";
        document.getElementById('menuImage').alt = "";
        document.getElementById('calories').textContent = "";
        document.getElementById('proteins').textContent = "";
        document.getElementById('carbs').textContent = "";
        document.getElementById('fats').textContent = "";
    }
}

document.getElementById('generateButton').addEventListener('click', function() {
    const loader = document.getElementById('loader');
    loader.style.display = "block"; // 로딩 아이콘 표시

    setTimeout(function() {
        const selectedMenu = getRandomMenu();
        displayMenu(selectedMenu);

        const modal = document.getElementById('myModal');
        modal.style.display = "flex";

        document.querySelector('.close').onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        loader.style.display = "none"; // 로딩 아이콘 숨김
    }, 1000); // 1초 대기 후 메뉴 표시
});

document.getElementById('rerollButton').addEventListener('click', function() {
    const selectedMenu = getRandomMenu();
    displayMenu(selectedMenu);
});
// 건의하기 버튼 이벤트 핸들러 추가
document.getElementById('suggestionButton').addEventListener('click', function() {
    window.location.href = "comment.html"; // 건의하기 페이지로 이동
});