const toObj = (key_array)=>{
    return key_array.reduce((s,a)=>{
        s[a]=undefined;
        return s;
    },{});
};



const parse = (stack,def)=>{
    if (typeof(def)!=='object'){
        return stack.join('.');
    }
    Object.keys(def).forEach((k)=>{
        stack.push(k);
        def[k] = parse(stack,def[k]);
        stack.pop();
    });
    return def;
};

let definitions = {
    cases: {
        list:{
            support:undefined,
            customer:undefined,
        },
    },
    notes: {
        list:undefined
    },
};



export const Publications = parse([],definitions);
