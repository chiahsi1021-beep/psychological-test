function flipCard(card) {
    card.classList.toggle('is-flipped');

    const footer = document.querySelector('.card-footer');
    if (card.classList.contains('is-flipped')) {
        footer.classList.add('is-visible');
    } else {
        footer.classList.remove('is-visible');
    }
}


document.getElementById('btnShare').addEventListener('click', async () => {
    // 檢查瀏覽器是否支援 Web Share API
    if (navigator.share) {
        try {
            await navigator.share({
                title: '每日能量指引', // 分享的標題
                text: '這是我今天抽到的能量指引，快來看看你的！', // 分享的文字
                url: window.location.href // 分享當前結果頁的網址
            });
            console.log('分享成功！');
        } catch (err) {
            console.log('使用者取消分享或發生錯誤：', err);
        }
    } else {
        // 如果瀏覽器不支援（例如電腦版 Chrome），可以改為複製連結
        alert('您的瀏覽器不支援直接分享，請直接複製網址分享給好友！');
        // 進階做法：可以寫一段自動複製網址到剪貼簿的代碼
    }
});