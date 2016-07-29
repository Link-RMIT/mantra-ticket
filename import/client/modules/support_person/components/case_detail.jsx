import React from 'react';

class CaseDetail extends React.Component {
    render() {
        const { the_case, teams, notes} = this.props;
        const that = this;
        console.log(the_case);
        return (
            <div>
                <p>
                    {the_case.content}
                </p>
                <fieldset>
                    <legend>Assign to:</legend>

                    <ul>
                        {teams.map((teamName, i)=>(
                             <li key={i}>
                                 <button onClick={that.AssignToTeam.bind(that,teamName)}>
                                     {teamName}
                                 </button>
                             </li>
                         ))}
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Notes:</legend>
                    {notes.map((note, i)=>(
                         <div key={note._id}>
                             <b>{note.support_person_name}:</b> {note.content}
                         </div>
                     ))}
                         <div>
                             <textarea ref='contentRef' placeholder='Enter your comment here.'>

                             </textarea>
                             <br />
                             <button onClick={this.AddNote.bind(this)}>Add Note</button>
                         </div>

                </fieldset>
            </div>
        );
    }
    AssignToTeam(teamName) {
        //this.props.
        this.props.assign_to_team(
            this.props.the_case._id,
            teamName
        );
    }
    AddNote(the_case){
        this.props.new_note(
            this.props.the_case._id,
            this.refs.contentRef.value,
        );
    }

}

export default CaseDetail;
