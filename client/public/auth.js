// Assuming oidc-client-ts exposes UserManager globally
const userManager = new UserManager({
    authority: 'http://localhost:4000',
    client_id: 'csca-client',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile',
    post_logout_redirect_uri: 'http://localhost:3000',
});

document.getElementById('login').addEventListener('click', () => {
    userManager.signinRedirect().catch(function (error) {
        console.error('Error during login:', error);
    });
});

// Check if we're returning from the OIDC provider with a login response
userManager.signinRedirectCallback().then(function () {
    window.location = '/';
}).catch(function (error) {
    console.error('Error handling redirect callback:', error);
});
