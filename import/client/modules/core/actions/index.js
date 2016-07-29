export default {
    main:{
        login: ({Meteor, LocalState, FlowRouter}, username, password, signup = undefined) => {
            console.log(signup);
            if(signup){
                //signup
                console.log('signup');
                Accounts.createUser({username,password}, (e)=>{
                    if(e){
                        console.log('create fail',e);
                        LocalState
                            .set('LOGIN_ERROR', e.reason);
                    }else{
                        FlowRouter.redirect('/');
                    }
                });
                return;
            }
            else{
                Meteor.loginWithPassword(
                    username,
                    password,
                    (e)=>{
                        if(e){
                            console.log(e);
                            LocalState
                                .set('LOGIN_ERROR', e.reason);
                        }
                });
            }
        },
        logout:({Meteor, LocalState, FlowRouter}) => {
            Meteor.logout((e)=> {
                // callback
                if(e){
                    LocalState.set('LOGIN_ERROR',e);
                    console.log(e);
                }
                LocalState.set('LOGIN_ERROR','');
            });
            console.log('logout');
            FlowRouter.redirect('/');
        }
    }
}
