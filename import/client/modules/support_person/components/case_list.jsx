import React from 'react';
class CaseList extends React.Component {
    render() {
        const { case_list } = this.props;
        const that = this;
        return (
            <div>
                <fieldset>
                    <legend>Queue:</legend>
                    <ul>
                        {case_list
                         .filter((the_case) => {
                             return !the_case.supportPersonId;
                         })
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
                        {case_list
                         .filter((the_case)=>{
                             return the_case.supportPersonId;
                         })
                         .map((the_case) =>(
                             <li key={the_case._id}>
                                 <button onClick={that.Release.bind(that, the_case)}>Release</button>
                                 <a href={"/case/"+the_case._id}>{the_case.content}</a>
                             </li>
                         ))}
                    </ul>
                </fieldset>
            </div>
        );
    }
    AssignToMe(the_case) {
        //this.props.
        this.props.assign_to_self(the_case._id);
    }
    Release(the_case){
        this.props.release(the_case._id);
    }
}

export default CaseList;
