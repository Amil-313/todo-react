import React from 'react';
import Comment from './Comment';

function Subtask({item, deleteSubtask}) {

    const [isComment, setIsComment] = React.useState(false);
    const [updateSubtask, setUpdateSubtask] = React.useState(false);
    const [commentValue, setCommentValue] = React.useState({});
    const [itemValue, setItemValue] = React.useState('');
    const [itemDescription, setItemDescription] = React.useState('');

    const addComment = () => {
        const comment = {
        id: Math.floor(Math.random()*1000) + String(commentValue.id),
        title: commentValue.title,
        dis: commentValue.dis + 1,
        comments: []
        };
        item.comments = [comment, ...item.comments];
    };
    const onAddCommit = () => {
        addComment();
        setCommentValue({});
        setIsComment(false);
    }
    const onChangeSubtask = () => {
        item.title = itemValue;
        item.description = itemDescription;
        setUpdateSubtask(false);
    };
  return (
    <div className="subtask_main">
                                {!updateSubtask ? <div className='subtask_form'>
                                    <div className="modal_title">
                                        <i>Subask: </i>
                                        <h3>
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="modal_main">
                                        <i>Description:</i>
                                        <div>
                                            {item.description}
                                        </div>
                                    </div>
                                    <div className='subtask_btn'>
                                        <button onClick={() => setUpdateSubtask(true)}>
                                            Update
                                            </button>
                                        <button onClick={() => setIsComment(true)}>
                                            Add comment
                                        </button>
                                        <button onClick={() => deleteSubtask(item.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div> : <form
                            className="subtask_form"
                            onSubmit={onChangeSubtask}>
                                    <i>Task: </i>
                                    <input 
                                    className="modal_title"
                                    defaultValue={item.title} 
                                    type="text" 
                                    onChange={(e) => setItemValue(e.target.value)}
                                    required
                                    />
                                    <i>Description:</i>
                                    <textarea
                                    className="modal_main"
                                    cols="30" 
                                    rows="10"
                                    defaultValue={item.description}
                                    type="text" 
                                    onChange={(e) => setItemDescription(e.target.value)}
                                     />
                                     <div className="task_edit">
                                        <button>Save</button>
                                    </div>
                                </form>}

                                {isComment &&
                                <form 
                                onSubmit={onAddCommit}
                                className='comment_form'>
                                    <textarea 
                                    cols="30" rows="10" 
                                    placeholder='Add comment'
                                    value={commentValue.title}
                                    type="text" 
                                    onChange={(e) => 
                                    setCommentValue({
                                        id: item.id,
                                        dis: 0,
                                        title: e.target.value
                                    })}
                                    required
                                    />
                                    <div className='subtask_btn'>
                                        <button>Add comment</button>
                                        <button onClick={() => setIsComment(false)}>
                                            Censel
                                        </button>
                                    </div>
                                </form>}

                                <div className='comment_center'>
                                    <div className='all_comments'>
                                        <Comment array={item.comments} />
                                    </div>
                                </div>
                            </div>
  )
}

export default Subtask
