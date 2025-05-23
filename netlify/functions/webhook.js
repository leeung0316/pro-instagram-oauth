
const VERIFY_TOKEN = "proWebhookSecretToken"; // Meta 설정과 동일해야 함

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters;

    if (params['hub.verify_token'] === VERIFY_TOKEN) {
      return {
        statusCode: 200,
        body: params['hub.challenge'],
      };
    } else {
      return {
        statusCode: 403,
        body: 'Verification token mismatch',
      };
    }
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
