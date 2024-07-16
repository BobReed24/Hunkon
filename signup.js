// signup.js

async function submitForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const payload = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://api.github.com/repos/<username>/<repo>/dispatches', {
            method: 'POST',
            headers: {
                'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'update-json',
                client_payload: payload
            })
        });

        if (!response.ok) {
            throw new Error('Error triggering GitHub Action');
        }

        alert('Form submitted successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
    }
}

document.getElementById('signupForm').addEventListener('submit', submitForm);
