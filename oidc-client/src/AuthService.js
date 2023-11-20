import { UserManager } from 'oidc-client-ts';
import oidcConfig from './authConfig';

class AuthService {
  constructor() {
    this.userManager = new UserManager(oidcConfig);
  }

  signinRedirect() {
    return this.userManager.signinRedirect();
  }

  async signoutRedirect() {
    await this.userManager.signoutRedirect();
  }

  async getUser() {
    const user = this.userManager.getUser()
    return user;
  }

  async getAccessToken() {
    const user = this.getUser();
    if (user) {
      console.log(user)
      return user.access_token
    }
    else return undefined;
  }

  async signinRedirectCallback() {
    await this.userManager.signinRedirectCallback();
    window.location = "/";
  }
}

export default new AuthService();
