import React from 'react'
import Comment from './Comment';
import Subtask from './Subtask';
import { ContextTasks } from './Tasks';

function ModalTask({item, onClear}) {
    
    const [modalWindow, setModalWindow] = React.useState(false);

    const {
        queue,
        develeopment,
        done
      } = React.useContext(ContextTasks);

    const stopPropClear = (e) => {
        e.stopPropagation();
        setModalWindow(!modalWindow);
    }

const [taskUpdate, setTaskUpdate] = React.useState(true);
const [itemValue, setItemValue] = React.useState();
const [itemDescription, setItemDescription] = React.useState();
const [isComment, setIsComment] = React.useState(false);
const [isSubtask, setIsSabtask] = React.useState(false);
const [subtaskTitle, setSubtaskTitle] = React.useState('');
const [subtaskDescription, setSubtaskDescription] = React.useState('');
const [subtasks, setSubtasks] = React.useState(item.subtasks);

const onAddSubtask = () => {
    const objSubtask = {
        id: Math.floor(Math.random()*10000),
        title: subtaskTitle,
        description: subtaskDescription,
        comments: []
    };
    setSubtasks([objSubtask, ...subtasks]);
    setSubtaskTitle('');
    setSubtaskDescription('');
    setIsSabtask(false);
};
const deleteSubtask = (deleteId) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== deleteId))
};

const [commentValue, setCommentValue] = React.useState({});

  const addComment = () => {
    const comment = {
      id: Math.floor(Math.random()*1000) + String(commentValue.id),
      title: commentValue.title,
      dis: commentValue.dis + 1,
      comments: []
    };
    item.comments = [comment, ...item.comments];
    setCommentValue({});
  };
  const onAddCommit = () => {
    addComment();
    setCommentValue({});
    setIsComment(false);
  }

  if (modalWindow) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  };


const onChangeTask = () => {
    itemValue && queue.map((item) => item.id === itemValue.id ? item.title = itemValue.title : item);
    itemDescription && queue.map((item) => item.id === itemDescription.id ? item.description = itemDescription.description : item);
    itemValue && develeopment.map((item) => item.id === itemValue.id ? item.title = itemValue.title : item);
    itemDescription && develeopment.map((item) => item.id === itemDescription.id ? item.description = itemDescription.description : item);
    itemValue && done.map((item) => item.id === itemValue.id ? item.title = itemValue.title : item);
    itemDescription && done.map((item) => item.id === itemDescription.id ? item.description = itemDescription.description : item);

    setTaskUpdate(true);
}

  return (
    <>


        <div className='item_modal' onClick={stopPropClear} >
            <h4>{item.title}</h4>
            
                <div className={modalWindow ? "modal_back active" : "modal_back"}>
                    <div className={modalWindow ? "modal active modal_task" : "modal modal_task"} onClick={(e) => e.stopPropagation()}>
                        <div className="task_update">
                            {taskUpdate ? <>
                                <div className="task_main">
                                    <div className="modal_title">
                                        <i>Task: </i>
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
                                </div>
                                <div className="task_edit">

                                        <button onClick={() => setIsSabtask(true)}>
                                            Add subtask
                                        </button>
                                        <button onClick={() => setIsComment(true)}>
                                            Add comments
                                        </button>
                                        <button 
                                        onClick={() => setTaskUpdate(false)
                                        }>
                                            Change
                                        </button> 
                                        <button 
                                        onClick={() => onClear(item.id)
                                        }>
                                            Delete
                                        </button>
                                    
                                </div>
                            </> :
                            <form
                            className="task_main task_form"
                            onSubmit={onChangeTask}>
                                    <i>Task: </i>
                                    <input 
                                    className="modal_title"
                                    defaultValue={item.title} 
                                    type="text" 
                                    onChange={(e) => setItemValue({
                                        id: item.id,
                                        title: e.target.value
                                        })}
                                    required
                                    />
                                    <i>Description:</i>
                                    <textarea
                                    className="modal_main"
                                    cols="30" 
                                    rows="10"
                                    defaultValue={item.description}
                                    type="text" 
                                    onChange={(e) => setItemDescription({
                                            id: item.id,
                                            description: e.target.value
                                        })}
                                     />
                                     <div className="task_edit">
                                        <button>Save</button>
                                    </div>
                                </form>}
                        </div>
                        {isSubtask &&
                        <form 
                        onSubmit={onAddSubtask}
                        className='subtask_form'>
                            <input 
                            placeholder='Subtask name'
                            type="text"
                            value={subtaskTitle}
                            onChange={(e) => setSubtaskTitle(
                                e.target.value
                            )}
                            required />
                            <textarea 
                            placeholder='Subtask description'
                            type="text" cols="30" rows="10"
                            value={subtaskDescription}
                            onChange={(e) => setSubtaskDescription(
                                e.target.value
                            )}
                             />
                            <div className='subtask_btn'>
                                <button>Create</button>
                                <button onClick={() => setIsSabtask(false)}>
                                    Censel
                                </button>
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
                        {subtasks.map((subtask) => 
                            <Subtask 
                            deleteSubtask={ deleteSubtask }
                            item={subtask} />
                        )}
                        

                    </div>
                </div>
            
        </div>
    </>
  )
}

export default  ModalTask;