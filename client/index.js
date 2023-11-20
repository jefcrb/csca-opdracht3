const express = require('express');
const { UserManager } = require('oidc-client-ts');

const app = express();
const port = 3000; // This should be different from your OIDC provider port

// Serve static files from the 'public' folder
app.use(express.static('public'));

const userManager = new UserManager({
  authority: 'http://localhost:4000', // Your OIDC provider URL
  client_id: 'csca-client', // The client ID from your .env file
  redirect_uri: 'http://localhost:3000/callback', // Make sure this matches the one in your .env file
  response_type: 'code',
  scope: 'openid profile',
  post_logout_redirect_uri: 'http://localhost:3000/',
});

// Redirect to OIDC provider for login
app.get('/login', (req, res) => {
  userManager.signinRedirect().catch((error) => {
    console.error('Error during login redirect:', error);
    res.status(500).send('Login error');
  });
});

// Handle callback from OIDC provider
app.get('/callback', (req, res) => {
  userManager.signinRedirectCallback().then((user) => {
    if (user) {
      res.send(`Hello ${user.profile.name}, you are now logged in!`);
    } else {
      res.send('No user info found');
    }
  }).catch((error) => {
    console.error('Error during callback handling:', error);
    res.status(500).send('Callback handling error');
  });
});

app.listen(port, () => {
  console.log(`SPA client listening at http://localhost:${port}`);
});
