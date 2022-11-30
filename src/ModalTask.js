import React from 'react'

function ModalTask({item, onClear}) {
    
    const [modalWindow, setModalWindow] = React.useState(false);

    const stopPropClear = (e) => {
        e.stopPropagation();
        setModalWindow(!modalWindow);
    }

  return (
    <>


        <div className='item_modal' onClick={stopPropClear} >
            {item.title}
            
                <div className={modalWindow ? "modal_back active" : "modal_back"}>
                    <div className={modalWindow ? "modal active" : "modal"} onClick={(e) => e.stopPropagation()}>
                        <div className="modal_title">
                            Header
                        </div>
                        <div className="modal_main">
                            Somting
                            {item.title}
                            {item.description}
                        </div>
                        
                        <button onClick={() => onClear(item.id)}>clear</button>
                    </div>
                </div>
            
        </div>
    </>
  )
}

export default  ModalTask;