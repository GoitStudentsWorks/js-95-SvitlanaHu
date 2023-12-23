document.addEventListener('DOMContentLoaded', () => {
    const subscriptionForm = document.querySelector('.footer-sub-form');

    subscriptionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = subscriptionForm.querySelector('.footer-email-input');
        const email = emailInput.value;

        // Перевірка валідності email
        if (!emailInput.checkValidity()) {
            alert('Please enter a valid email address.');
            return;
        }

        // Об'єкт, що відправляється на сервер
        const subscriptionData = { email };

        try {
            const response = await fetch('https://food-boutique.b.goit.study/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriptionData),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else if (response.status === 409) {
                alert('This email is already subscribed.');
            } else {
                throw new Error('Failed to subscribe.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
