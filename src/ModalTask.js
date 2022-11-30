import React from 'react'

function ModalTask({item, onClear}) {
    
    const [modalWindow, setModalWindow] = React.useState(false);

    const stopPropClear = (e) => {
        e.stopPropagation();
        setModalWindow(!modalWindow);
    }

const [taskUpdate, setTaskUpdate] = React.useState(true);
const [itemValue, setItemValue] = React.useState();
const [itemDescription, setItemDescription] = React.useState();

const onChanceTask = () => {
    item.title = itemValue.title;
    item.description = itemDescription.description;
    setTaskUpdate(true);
}

  return (
    <>


        <div className='item_modal' onClick={stopPropClear} >
            <h4>{item.title}</h4>
            
                <div className={modalWindow ? "modal_back active" : "modal_back"}>
                    <div className={modalWindow ? "modal active modal_task" : "modal modal_task"} onClick={(e) => e.stopPropagation()}>
                        <div className="task_update">
                            <div className="task_main">
                                <div className="modal_title">
                                    <p>Task: </p>
                                    <h3>
                                        {taskUpdate ? item.title : <input 
                                    defaultValue={item.title} 
                                    type="text" 
                                    onChange={(e) => setItemValue({
                                        id: item.id,
                                        title: e.target.value
                                        })} /> }
                                    </h3>
                                </div>
                                <div className="modal_main">
                                    <p>
                                        {taskUpdate ? 
                                            item.description : 
                                        <textarea 
                                        defaultValue={item.description} 
                                        type="text" 
                                        onChange={(e) => setItemDescription({
                                            id: item.id,
                                            description: e.target.value
                                        })} /> }
                                    </p>
                                </div>
                            </div>
                            <div className="task_edit">
                                {taskUpdate ? 
                                    <>
                                    <button 
                                    onClick={() => setTaskUpdate(false)
                                    }>
                                        change
                                    </button> 
                                    <button 
                                    onClick={() => onClear(item.id)
                                    }>
                                        clear
                                    </button>
                                    </> : <button
                                    onClick={onChanceTask}
                                    >
                                        save
                                    </button>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    </>
  )
}

export default  ModalTask;