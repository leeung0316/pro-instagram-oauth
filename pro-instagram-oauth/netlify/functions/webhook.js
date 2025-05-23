
exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters;
    return {
      statusCode: 200,
      body: params['hub.challenge'] || 'No challenge',
    };
  }

  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body);
    console.log('Webhook received:', body);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'ok' }),
    };
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};
