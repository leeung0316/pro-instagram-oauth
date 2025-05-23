
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const code = event.queryStringParameters.code;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing code' }),
    };
  }

  const params = new URLSearchParams();
  params.append('client_id', process.env.INSTAGRAM_CLIENT_ID);
  params.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI);
  params.append('code', code);

  try {
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: params,
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
