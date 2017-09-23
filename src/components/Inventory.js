import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';
import firebase from 'firebase/app';
import 'firebase/auth';

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            owner: null
        };
    }

    componentDidMount() {
        base.initializedApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user});
            }
        });
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish);
    }

    authenticate = provider => {
        let providerTest;
        if (provider === 'github') {
            providerTest = new firebase.auth.GithubAuthProvider();
        } else if (provider === 'facebook') {
            providerTest = new firebase.auth.FacebookAuthProvider();
        }
        base.initializedApp.auth().signInWithPopup(providerTest).then((result) => {
            // This gives you a GitHub Access Token.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            this.authHandler(result);
          }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('You have signed up with a different provider for that email.');
              // Handle linking here if your app allows it.
            } else {
              console.error(error);
            }
          });
    }

    logout = () => {
        base.initializedApp.auth().signOut().then(() => {
            this.setState({ uid: null });
        });
    }

    authHandler = authData => {
        const storeRef = firebase.database().ref(this.props.storeId);

        storeRef.once('value', snapshot => {
            const data = snapshot.val() || {};

            if (!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        });
    }

    renderLogin = () => {
        return (
            <nav className="login">
                <h2>商品清单</h2>
                <p>登录账号来管理贵店的商品清单</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
            </nav>
        );
    }

    renderInventory = key => {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={e => this.handleChange(e, key)} />
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={e => this.handleChange(e, key)} />
                <select name="status" value={fish.status} onChange={e => this.handleChange(e, key)} >
                    <option value="available">新鲜可售!</option>
                    <option value="unavailable">卖完啦!</option>
                </select>
                <textarea name="desc" value={fish.desc} placeholder="Fish Desc" onChange={e => this.handleChange(e, key)} ></textarea>
                <input name="image" value={fish.image} type="text" placeholder="Fish Image" onChange={e => this.handleChange(e, key)} />
                <button onClick={() => this.props.removeFish(key)}>移除商品</button>
            </div>
        );

    }

    render() {
        const logout = <button onClick={() => this.logout()}>注销!</button>;

        if (!this.state.uid) {
            return (
                <div>{this.renderLogin()}</div>
            );
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>不好意思，您不是该店的管理员!</p>
                    {logout}
                </div>
            );
        }
        return (
            <div>
                <h2>商品清单</h2>
                {logout}
                {
                    Object.keys(this.props.fishes).map(this.renderInventory)
                }
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>加载商品样式</button>
            </div>
        );
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
};

export default Inventory;