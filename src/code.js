'use strict';

// This class is used for logins
class Login {
    constructor(hash) {
        this.sessions = [];
        this.users = [];
        this.passwords = [];
        Object.keys(hash).map(k => ({ k, v: hash[k] })).map(e => {
            this.users = this.users.concat([e.k]);
            this.passwords = this.passwords.concat([e.v]);
        });
    }

    logout(user) {
        this.sessions.forEach((session, i) => {
            if (session === user) {
                this.sessions[i] = null;
            }
        });
        this.sessions = this.sessions.filter(session => session !== null);
    }

    // Checks if user exists
    userExists(user) {
        const exists = this.users.filter(currUser => user === currUser);
        return exists.length > 0;
    }

    // Register user
    registerUser(user, password) {
        let lastIndex = this.users.length;
        this.users[lastIndex] = user;
        this.passwords[lastIndex] = password;
    }

    removeUser(user) {
        const index = this.users.indexOf(user);
        this.users[index] = null;
        this.passwords[index] = null;
        this.users = this.users.filter(user => user !== null);
        this.passwords = this.passwords.filter(password => password !== null);
    }

    checkPassword(user, password) {
        const index = this.users.indexOf(user);
        const passwordCorrect = this.passwords[index] === password;
        return passwordCorrect;
    }

    updatePassword(user, oldPassword, newPassword) {
        // First we check if the user exists
      
        if (this.userExists(user)) {
            let index = this.users.indexOf(user);
            if (this.passwords[index] === oldPassword) {
                this.passwords[index] = newPassword;
                return true;
            }
        }
        return false;
    }

    login(user, password) {
        let index = this.users.indexOf(user);
        if (this.passwords[index] === password) {
            this.sessions.push(user);
        }
    }
}

let registeredUsers = {
    user1: 'pass1',
    user2: 'pass2',
    user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');
