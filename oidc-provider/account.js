import connect from './mongodb.js';

export default class Account {
  static async findAccount(ctx, id) {
    const db = await connect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username: id });
    
    if (!user) {
      console.log("no user")
      return undefined;
    }
    try 
{    return {
      accountId: id,
      async claims(use, scope) {
        // return the claims for the user based on the use-case and scope
        return {
          sub: id, // it is essential to always return a sub claim
          username: user.username,
          password: user.pwdhash,
          // ... add more claims
        };
      },
    };}

    catch {
      console.log("error here")
    }
  }
}
