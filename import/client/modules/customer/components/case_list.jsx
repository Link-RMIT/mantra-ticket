import React from 'react';
class CaseList extends React.Component {
    render() {
        const { case_list } = this.props;
        return (
            <div>
                <textarea ref='contentRef' placeholder='Enter your comment here.'>

                </textarea>
                <br />
                <button onClick={this.Submit.bind(this)}>Add Comment</button>
                <ul>
                    {case_list.map((the_case,i) =>
                         (<li key={i}>{the_case.content}</li>)
                     )}
                </ul>
            </div>
        );
    }
    Submit(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        const {new_case} = this.props;
        const {contentRef} = this.refs;
        console.log(this.refs);
        new_case(contentRef.value);
    }
}

export default CaseList;
