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
        const response = await fetch('https://api.github.com/repos/bobreed24/accounts/contents/accounts.json', {
            method: 'GET',
            headers: {
                'Authorization': `token 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`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch file contents');
        }

        const fileContents = await response.json();
        const decodedContent = atob(fileContents.content);
        const accounts = JSON.parse(decodedContent);

        // Add new account data to the existing array
        accounts.push(payload);

        // Update file in the repository
        await updateFile(JSON.stringify(accounts));

        alert('Form submitted successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
    }
}

async function updateFile(content) {
    const encodedContent = btoa(content); // Encode content to base64

    try {
        const response = await fetch('https://api.github.com/repos/bobreed24/accounts/contents/accounts.json', {
            method: 'PUT',
            headers: {
                'Authorization': `token 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`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Add new account data',
                content: encodedContent,
                sha: fileContents.sha // Include the SHA checksum of the file
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update file');
        }

        console.log('File updated successfully:', await response.json());
    } catch (error) {
        console.error('Error updating file:', error);
        throw error; // Re-throw error to handle it in the submitForm function
    }
}

document.getElementById('signupForm').addEventListener('submit', submitForm);
