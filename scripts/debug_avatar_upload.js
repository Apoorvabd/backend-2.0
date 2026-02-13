
import axios from 'axios';
import FormData from 'form-data';

async function debugAvatarUpload() {
    const form = new FormData();
    // Simulate a file
    form.append('avatar', Buffer.from('fake image content'), { filename: 'avatar.png', contentType: 'image/png' });
    form.append('fullName', 'Debug User');
    form.append('email', `debug${Date.now()}@example.com`);
    form.append('username', `debuguser${Date.now()}`);
    form.append('password', 'password123');

    try {
        const response = await axios.post('http://localhost:8002/api/v1/users/register', form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log('Success:', response.status);
        console.log('Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Response Status:', error.response.status);
            console.log('Error Response Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

debugAvatarUpload();
