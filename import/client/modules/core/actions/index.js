export default {
    main:{
        login: ({Meteor, LocalState, FlowRouter}, username, password, signup = undefined) => {
            if(signup){
                //signup
                Accounts.createUser({username,password}, (e)=>{
                    if(e){
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
                }
                LocalState.set('LOGIN_ERROR','');
            });
            FlowRouter.redirect('/');
        }
    }
}
