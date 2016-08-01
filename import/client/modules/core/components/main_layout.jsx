import React from 'react';


class Layout extends React.Component {
    render() {
        const {content = () => null, nav = [] } = this.props;
        const logoutButtonStyle = {
            visibility: this.props.display_logout_button?'visible':'hidden',
        }
        return (
            <div>
                <header>
                    <h1>Ticket</h1>
                    <div><b>Nav</b> - {
                        nav.map((i,key)=>{
                            return (<a href="{i.url}" key='{key}'>{i.name}</a>);
                        })
                                      }
                    </div>
                    <button onClick={this.Logout.bind(this)} style={logoutButtonStyle}>
                        Logout
                    </button>


                </header>

                <div>
                    {content()}
                </div>

                <footer>
                </footer>
            </div>
        );
    }
    Logout(){
        this.props.logout();
    }
}



export default Layout;
