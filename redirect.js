// URL API для определения IP и страны
const GEOLOCATION_API = 'https://ipapi.co/json/';

// Объект с сайтами для разных стран
const sitesByCountry = {
    US: 'https://us-specific-site.com',
    DE: 'https://de-specific-site.com',
    IN: 'https://in-specific-site.com',
    DEFAULT: 'https://yandex.ru'
};

let installPrompt = null;
const installButton = document.querySelector("#installButton");

// window.addEventListener("beforeinstallprompt", (event) => {
//     event.preventDefault();
//     installPrompt = event;
//     installButton.removeAttribute("hidden");
// });

installButton.addEventListener("click", async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
    installPrompt = null;
    installButton.setAttribute("hidden", "");
}

// let deferredPrompt;
//
// window.addEventListener('beforeinstallprompt', (event) => {
//     event.preventDefault(); // отменить автоматический показ
//     deferredPrompt = event; // сохранить событие для использования позже
//
//     // Показываем кнопку установки, если нужно
//     const installButton = document.getElementById('installButton');
//     if (installButton) {
//         installButton.style.display = 'block';
//         installButton.addEventListener('click', () => {
//             // Показываем системный запрос на установку
//             deferredPrompt.prompt();
//             deferredPrompt.userChoice.then((choiceResult) => {
//                 if (choiceResult.outcome === 'accepted') {
//                     console.log('Пользователь установил приложение');
//                 } else {
//                     console.log('Пользователь отклонил установку');
//                 }
//                 deferredPrompt = null; // сбрасываем
//             });
//         });
//     }
// });

// Регистрация Service Worker (если поддерживается браузером)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => {
            console.log('Service Worker зарегистрирован');
        })
        .catch((error) => {
            console.error('Ошибка регистрации Service Worker:', error);
        });
}

// Функция для определения редиректа
// fetch(GEOLOCATION_API)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Не удалось получить данные геолокации.');
//         }
//         return response.json();
//     })
//     .then(data => {
//         const countryCode = data.country || 'DEFAULT'; // Код страны (например, "US")
//         const redirectUrl = sitesByCountry[countryCode] || sitesByCountry.DEFAULT;
//         console.log(`Пользователь из ${countryCode}, редирект на ${redirectUrl}`);
//     //----    window.location.href = redirectUrl; // Выполняем редирект
//     })
//     .catch(error => {
//         console.error('Ошибка при определении местоположения:', error);
//         alert('Не удалось определить местоположение. Попробуйте позже.');
//     });