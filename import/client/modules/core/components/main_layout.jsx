import React from 'react';

const Layout = ({content = () => null, nav = [] }) => (
    <div>
        <header>
            <h1>Ticket</h1>
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

export default Layout;
