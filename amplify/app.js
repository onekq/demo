import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import { Auth } from 'aws-amplify';

async function signIn() {
    try {
        const user = await Auth.federatedSignIn({provider: 'Google'}); // or 'Facebook'
        console.log(user);
        checkUser(); // Refresh user state
    } catch (error) {
        console.error('Error signing in', error);
    }
}

async function signOut() {
    try {
        await Auth.signOut();
        checkUser(); // Refresh user state
    } catch (error) {
        console.error('Error signing out', error);
    }
}

async function checkUser() {
    try {
        const user = await Auth.currentAuthenticatedUser();
        document.getElementById('username').innerText = user.username;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('greeting').style.display = 'block';
    } catch (error) {
        console.log('Not signed in');
        document.getElementById('auth').style.display = 'block';
        document.getElementById('greeting').style.display = 'none';
    }
}

window.signIn = signIn;
window.signOut = signOut;
window.checkUser = checkUser;
