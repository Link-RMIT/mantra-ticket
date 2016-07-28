import React from 'react';
class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.Login.bind(this)}>
                <p>User Name:</p>
                <input ref="usernameRef" type="text" name="email" id="email" /><br />
                <p>Password:</p>
                <input ref="passwordRef" type="password" name="password" id="password" /><br />
                <p>Sign up</p>
                <input ref="signupRef" type="checkbox" name="signup" checked="checked" /><br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
    Login(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const {login} = this.props;
        const {usernameRef, passwordRef,signupRef} = this.refs;
        login(usernameRef.value, passwordRef.value, signupRef.value);
    }
}

export default LoginForm;
