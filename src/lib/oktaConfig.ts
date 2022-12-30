export const oktaConfig = {
    clientId: '0oa7r389nx3pSlGJX5d7',
    issuer: 'https://dev-08938168.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
