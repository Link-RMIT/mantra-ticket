import React from 'react';


class Layout extends React.Component {
    render() {
        const {content = () => null, nav = [] } = this.props;
        return (
            <div>
                <header>
                    <h1>Ticket</h1>
                    <button onClick={this.Logout.bind(this)}>Logout</button>
                        <div><b>navigation</b>
                            {
                                nav.map((i,key)=>{
                                    return (<a href="{i.url}" key='{key}'>{i.name}</a>);
                                })
                            }
                        </div>
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
