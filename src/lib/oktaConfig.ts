export const oktaConfig = {
    clientId: '0oa7r389nx3pSlGJX5d7',
    issuer: 'https://dev-08938168.okta.com/oauth2/default',
    redirectUri: 'http://ann-traders-app.s3-website.ap-south-1.amazonaws.com/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
