import React from 'react';
class CaseList extends React.Component {
    render() {
        const { queue, my_cases } = this.props;
        const that = this;
        return (
            <div>
                <fieldset>
                    <legend>Queue:</legend>
                    <ul>
                        {queue
                         .map((the_case,i) =>(
                            <li key={the_case._id}>

                                <button onClick={that.AssignToMe.bind(that,the_case)}>Assign</button>
                                <a href={"/case/"+the_case._id}>{the_case.content}</a>
                            </li>
                         ))}
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>My Cases:</legend>
                    <ul>
                        {my_cases
                         .map((the_case) =>(
                             <li key={the_case._id}>
                                 <button onClick={that.Release.bind(that, the_case)}>Release</button>
                                 <button onClick={that.Resolve.bind(that, the_case)}>Resolve</button> -
                                 <a href={"/case/"+the_case._id}>{the_case.content}</a>
                             </li>
                         ))}
                    </ul>
                </fieldset>
            </div>
        );
    }
    AssignToMe(the_case) {
        this.props.assign_to_self(the_case._id);
    }
    Release(the_case){
        this.props.release(the_case._id);
    }
    Resolve(the_case){
        this.props.resolve(the_case._id);
    }
}

export default CaseList;
