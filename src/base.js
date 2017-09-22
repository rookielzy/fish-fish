import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAXt6i8iyXeu0Bo82HadUqyqAn3JLIAw8w",
    authDomain: "fish-fish-rookielzy.firebaseapp.com",
    databaseURL: "https://fish-fish-rookielzy.firebaseio.com"
});

const base = Rebase.createClass(app.database());
export default base;