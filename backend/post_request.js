const axios = require('axios');

axios.post('https://services.leadconnectorhq.com/hooks/4lsGu1wo8FEGVlYKFkgU/webhook-trigger/43a7c444-5a64-40c4-961b-79048d0196b4', {
    name: 'Mustafa mahmoud',
    email: 'm2jengnnn@gmail.com'
})
.then(response => console.log('Success:', response.data))
.catch(error => console.error('Error:', error));
