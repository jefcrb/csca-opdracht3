const oidcConfig = {
  authority: "http://localhost:4000",
  client_id: "csca-client",
  client_secret: "csca-secret",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "http://localhost:3000",
};
  
  export default oidcConfig;
