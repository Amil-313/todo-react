import React from 'react';
import Project from './Project';
import { Routes, Route, Link } from 'react-router-dom';

import Tasks from './Tasks';
import Head from './Head';
import NotFound from './NotFound';

function Add() {

    const [projects, setProjects] = React.useState([]);
    const [title, setTitle] = React.useState();
    const [valueUpdate, setValueUpdate] = React.useState();
    const [currentProject, setCurrentProject] = React.useState();
    const [searchProject, setSearchProject] = React.useState('');

    const [taskValue, setTaskValue] = React.useState();

    const tasks = [
        {id: 1, title: "Queue", items: [] },
        {id: 2, title: "Development", items: []},
        {id: 3, title: "Done", items: []},
    ]
    

    console.log(projects, new Date());

    const onAddProject = (e) => {
        e.preventDefault();
        const objProject = {
            id: Math.floor(Math.random()*10000),
            title: title,
            tasks: tasks
        };
        setProjects([objProject, ...projects]);
        setTitle('');
    };

    const onClear = (item) => {
        setProjects(projects.filter((project) => project.id !== item.id ));
    }


    function dragStartHandler(e, project) {
        setCurrentProject(project);
    };

    function dragEndHandler(e) {
        e.target.style.background = 'white';

    };
    
    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = 'lightgray';
    };
    
    function dropHandler(e, project) {
        e.preventDefault();
        
        const ProjectIndex = projects.indexOf(project);
        const currentIndex = projects.indexOf(currentProject);
        projects.splice(currentIndex, 1);
        projects.splice(ProjectIndex, 0, currentProject);
        setProjects(projects.map(item => {return item}));
        e.target.style.background = 'white';
        e.stopPropagation();
    };

    function dropBoardHandler(e) {
        e.preventDefault();

        projects.push(currentProject);
        const currentIndex = projects.indexOf(currentProject);
        projects.splice(currentIndex, 1);
        setProjects(projects.map(item => {return item}));
    }

    function dragOverBoard(e) {
        e.preventDefault();
    }

  return (
    <>
        <div className='add'>
            <Link to='/'>
                <h1>Todo app</h1>
            </Link>

            <input 
            className='search' 
            type="text" 
            onChange={(e) => setSearchProject(e.target.value)} 
            value={searchProject} 
            placeholder='Search project'
            />
            <form 
            className='add_form' 
            onSubmit={onAddProject}
            >
                <input 
                className='add_project' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                type="text" 
                placeholder='Add project' 
                />
                <button 
                className='add_btn'
                >
                    Add
                </button>
            </form>
            <ul 
            className='projects'
            onDrop={(e) => dropBoardHandler(e)}
            onDragOver={(e) => dragOverBoard(e)}
            draggable={true}>

                {projects
                .filter((item) => item.title.toLowerCase().includes(searchProject.toLowerCase()))
                .map(project => 
                    <li
                    className='project'
                    onDragStart={(e) => dragStartHandler(e, project)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, project)}
                    draggable={true}
                    key={project.id}
                    >
                    <Link to={`/${project.id}`}>
                        <Project 
                        item={project}
                        onClear={onClear}
                        setValueUpdate={setValueUpdate}
                        valueUpdate={valueUpdate}
                        projects={projects}
                        />
                    </Link>
                    </li>
                )}
    
            </ul>
        </div>
        <div className="tasks">
            <Routes>


            <Route path='/' element={ <Head /> } />

                {projects.map((item) => 
                
                    <Route 
                    key={item.id}  
                    path={`/${item.id}`} 
                    element={ 
                         <Tasks 
                        item={item}
                          /> } 
                    />
                ) }

                <Route path='*' element={ <NotFound /> } />
                
            </Routes>    
        </div>
    </>
  )
}

export default Add;