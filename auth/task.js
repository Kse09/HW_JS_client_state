document.addEventListener('DOMContentLoaded', () => {
    const signin = document.getElementById('signin');
    const welcome = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const form = document.getElementById('signin__form');

    function showWelcome(userId) {
        userIdSpan.textContent = userId;
        welcome.classList.add('welcome_active');
        signin.classList.remove('signin_active');
    }

    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
        showWelcome(storedUserId);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('user_id', data.user_id);
                showWelcome(data.user_id);
            } else {
                alert('Неверный логин/пароль');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке запроса');
        });
    });
});