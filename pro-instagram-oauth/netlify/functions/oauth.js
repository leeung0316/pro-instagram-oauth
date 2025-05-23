
const querystring = require("querystring");

exports.handler = async (event, context) => {
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing code parameter" }),
    };
  }

  const client_id = process.env.INSTAGRAM_CLIENT_ID;
  const client_secret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirect_uri = process.env.INSTAGRAM_REDIRECT_URI;

  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: querystring.stringify({
      client_id,
      client_secret,
      grant_type: "authorization_code",
      redirect_uri,
      code,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
