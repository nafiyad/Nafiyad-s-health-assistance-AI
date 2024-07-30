const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const API_KEY = process.env.OPENAI_API_KEY;
    const endpointUrl = 'https://api.openai.com/v1/chat/completions';

    const requestBody = JSON.parse(event.body);

    try {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        console.log(data);  // Log the data to check the response structure

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error:', error);  // Log any errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
