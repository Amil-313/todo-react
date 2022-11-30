import React from 'react'
import { ContextTasks } from './Tasks';
import ModalTask from './ModalTask';

function Task({
    dragOverHandler,
    dragStartHandler,
    dragLeaveHandler,
    dragEndHandler,
    dropHandler
    }) {

      const {
        board,
        queue,
        develeopment,
        done,
        setQueue,
        setDevelopment,
        setDone,
      } = React.useContext(ContextTasks);

      const onClear = (id) => {
        setQueue(queue.filter((item) => item.id !== id));
        setDevelopment(develeopment.filter((item) => item.id !== id));
        setDone(done.filter((item) => item.id !== id));
      };

    
  return (
    <>
        {board.items.map(item => 
                    <div 
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={(e) => dragStartHandler(e, board, item)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dropHandler(e, board, item)}
                        draggable={true}
                        key={item.id}
                        className="item">
                       
                       <ModalTask 
                        onClear = {onClear}
                       item = {item}/>
                    
                    </div> )}
    </>
  )
}

export default Task;