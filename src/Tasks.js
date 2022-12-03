import React from 'react';
import Task from './Task';

export let ContextTasks = React.createContext({});

function Tasks({ item }) {

    
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [queue, setQueue] = React.useState([]);
    const [develeopment, setDevelopment] = React.useState([]);
    const [done, setDone] = React.useState([])
    const [currentBoard, setCurrentBoard] = React.useState();
    const [currentItem, setCurrentItem] = React.useState();
    const [modalAdd, setModalAdd] = React.useState(false);
 
    const [boards, setBoards] = React.useState(item.tasks)


    boards[0].items = queue;
    boards[1].items = develeopment;
    boards[2].items = done;

    const onAddTask = (e) => {
        e.preventDefault();
        const objProject = {
            parId: item.id,
            id: Math.floor(Math.random()*10000),
            title: title,
            description: description,
            comments: []
        };
        setQueue([objProject, ...queue]);
        setTitle('');
        setDescription('');
        setModalAdd(false);
    };
    

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    };

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'

    };

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    };
    
    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'

    };
    
    function dropHandler(e, board, item) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex, 0, currentItem);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none';
        e.stopPropagation()
    };

    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    const stopPropAdd = (e) => {
        e.stopPropagation();
        setModalAdd(false);
    }


  return (
    <div className='tasks_function'>
        <div className='add_task'></div>
            <div onClick={stopPropAdd} className={modalAdd ? "modal_back active" : "modal_back"} >
                <form 
                    onClick={(e) => e.stopPropagation()}
                    className={modalAdd ? "modal active add_modal" : "modal add_modal"}
                    onSubmit={onAddTask}
                    >
                    <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    type="text" 
                    placeholder='Task name' 
                    />
                    <textarea 
                    rows="10" cols="20" wrap="hard"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    type="text" 
                    placeholder='Add description' 
                    />
                    <button>
                        Create
                    </button>
                </form>
            </div>  
            <div className='add_task_btn'>
                <h2>Add task</h2>
                <button 
                onClick={() => setModalAdd(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
                        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                        <path fill="#fff" d="M21,14h6v20h-6V14z"/>
                        <path fill="#fff" d="M14,21h20v6H14V21z"/>
                    </svg>
                </button>
                </div>
                
        <div className='tasks_board'>
        <ContextTasks.Provider value={{
                queue,
                develeopment,
                done,
                setQueue,
                setDevelopment,
                setDone,
            }}>
        
        {boards.map(board =>
            <div className="board"
            key={board.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            >
                <div 
                className="board__tittle"
                >
                    {board.title}
                </div>

                <Task
                    dragOverHandler = {dragOverHandler}
                    dragStartHandler = {dragStartHandler}
                    dragLeaveHandler = {dragLeaveHandler}
                    dragEndHandler = {dragEndHandler}
                    dropHandler = {dropHandler}
                    board = {board}
                />

        </div> )}

        </ContextTasks.Provider>
        </div>

    </div>
  )
}

export default Tasks;