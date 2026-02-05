const topicID = document.body.getAttribute('data-topic');
const storageKey = `lastDrawDate_${topicID}`;

const alreadyDrawnPage = "EmotionalEnergy_Answer/EmotionalEnergy_Limited.html";
const btnDraw = document.querySelector('.btn-draw');
const container = document.querySelector('.main-container');
const mainCard = document.querySelector('.card-inner');
const display = document.querySelector('.card-display');



let cards = []; 

// 將所有點擊邏輯合併到同一個監聽器
btnDraw.addEventListener('click', function() {
    // 1. 檢查日期限制
    const today = new Date().toISOString().slice(0, 10);
    const lastDrawDate = localStorage.getItem(storageKey);
    
   if (lastDrawDate === today) {
        window.location.href = alreadyDrawnPage;
        return; // 攔截，不讓後面的程式碼執行
    }

    // 2. 執行洗牌前置動畫
    btnDraw.classList.add('fade-out');
    container.classList.add('focus-mode');

    // 3. 初始化三張牌
    setupThreeCards();

    // 4. 開始洗牌流程
    setTimeout(() => {
        let count = 0;
        let speed = 400; 
        
        function shuffleStep() {
            swapRandomTwo(); 
            count++;
            if (count < 15) { 
                speed = Math.max(100, speed - 25); 
                setTimeout(shuffleStep, speed);
            } else {
                finishShuffle(); 
            }
        }
        shuffleStep();
    }, 600);
});

function setupThreeCards() {
    const leftCard = createFake();
    const rightCard = createFake();
    
    leftCard.className = 'card-back fake-card pos-left';
    mainCard.className = 'card-inner pos-center';
    rightCard.className = 'card-back fake-card pos-right';
    
    display.appendChild(leftCard);
    display.appendChild(rightCard);
    
    cards = [leftCard, mainCard, rightCard];
}

function createFake() {
    const div = document.createElement('div');
    div.innerHTML = `<img src="image/CardB_backSide_fixed.png" class="card-image">`;
    return div;
}

function swapRandomTwo() {
    let idx1 = Math.floor(Math.random() * 3);
    let idx2;
    do { idx2 = Math.floor(Math.random() * 3); } while (idx1 === idx2);

    const class1 = cards[idx1].className;
    const class2 = cards[idx2].className;
    
    const posPattern = /pos-\w+/;
    const pos1 = class1.match(posPattern)[0];
    const pos2 = class2.match(posPattern)[0];

    cards[idx1].className = class1.replace(pos1, pos2);
    cards[idx2].className = class2.replace(pos2, pos1);
}

function finishShuffle() {
    setTimeout(() => {
        cards.forEach(card => {
            if (card.className.includes('pos-center')) {
                card.classList.add('fly-away');
            } else {
                card.style.transition = "all 0.2s ease-in";
                card.style.opacity = '0';
                card.style.transform += ' scale(0.5)';
            }
        });

        setTimeout(() => {
            const resultPages = [
                'EmotionalEnergy_Answer/EmotionalAnswer_A01.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_A02.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_A03.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_A04.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_B01.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_B02.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_B03.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_B04.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_C01.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_C02.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_C03.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_C04.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_D01.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_D02.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_D03.html', 
                'EmotionalEnergy_Answer/EmotionalAnswer_D04.html', 
                 
            ];
            
            const randomIndex = Math.floor(Math.random() * resultPages.length);
            const targetPage = resultPages[randomIndex];

            // --- 重要：跳轉前存入日期，標記今日已抽過 ---
            const today = new Date().toISOString().slice(0, 10);
            localStorage.setItem(storageKey, today);

            window.location.href = targetPage;
        }, 1000);

    }, 300);
}