import React from 'react';
class LoginForm extends React.Component {
    render() {
        const {error_message=''} = this.props;
        return (
            <div>
                <form onSubmit={this.Login.bind(this)}>
                    <p>User Name:</p>
                    <input ref="usernameRef" type="text" name="email" id="email" /><br />
                    <p>Password:</p>
                    <input ref="passwordRef" type="password" name="password" id="password" /><br />
                    <p>Sign up
                        <input ref="signupRef" type="checkbox" name="signup"/></p><br />
                        <input type="submit" value="Submit" />
                </form>
                <p>{error_message}</p>
            </div>

        );
    }
    Login(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        const {login} = this.props;
        const {usernameRef, passwordRef,signupRef} = this.refs;
        login(usernameRef.value, passwordRef.value, signupRef.checked);
    }
}

export default LoginForm;
