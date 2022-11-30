import React from 'react';
import Task from './Task';

export let ContextTasks = React.createContext({});

function Tasks({ item }) {

    console.log(item)
    
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [queue, setQueue] = React.useState([]);
    const [develeopment, setDevelopment] = React.useState([]);
    const [done, setDone] = React.useState([])
    const [currentBoard, setCurrentBoard] = React.useState();
    const [currentItem, setCurrentItem] = React.useState();
    const [modalAdd, setModalAdd] = React.useState(false);
 
    const [boards, setBoards] = React.useState(item.tasks)
    console.log('task 1', item.tasks)
    console.log('task 2', item.tasks)


    boards[0].items = queue;
    boards[1].items = develeopment;
    boards[2].items = done;

    const onAddTask = (e) => {
        e.preventDefault();
        const objProject = {
            id: Math.floor(Math.random()*10000),
            title: title,
            description: description
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


  return (
    <div className='tasks_board'>

        {modalAdd ? <div >
            <form  onSubmit={onAddTask}>
                <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                type="text" 
                placeholder='Add task' 
                />
                <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                type="text" 
                placeholder='Add description' 
                />
                <button>
                    Create
                </button>
            </form>
        </div> : <button 
        onClick={() => setModalAdd(true)}
        >
            add
        </button>}

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
                
            <ContextTasks.Provider value={{
                board,
                queue,
                develeopment,
                done,
                setQueue,
                setDevelopment,
                setDone,
            }}>

                <Task
                    dragOverHandler = {dragOverHandler}
                    dragStartHandler = {dragStartHandler}
                    dragLeaveHandler = {dragLeaveHandler}
                    dragEndHandler = {dragEndHandler}
                    dropHandler = {dropHandler}
                />

            </ContextTasks.Provider>

        </div> )}

    </div>
  )
}

export default Tasks;