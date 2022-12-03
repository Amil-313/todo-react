import React from 'react';

function Commentnext({itemComment, setCommentValue, addComment, commentValue}) {

  const [update, setUpdate] = React.useState(true);
  const [updateComment, setUpdateComment] = React.useState(itemComment);
  const [isComment, setIsComment] = React.useState(false);


  const onUpdateComment = () => {
    itemComment.title = updateComment.title;
    setUpdate(true);
  }

  const onAddComment = () => {
    addComment(); 
    setIsComment(false);
  }
   
  
  return (
    <>
            
              <div className='add_comment'>
               {update ?  
                <div className="comment_main">
                    <p>{itemComment.title}</p>
                    <div className="comment_btn">
                      <button onClick={() => setUpdate(false)}>
                      <img src={require('./img/edit.png') } alt="edit" />
                      </button>
                      <button onClick={() => setIsComment(true)}>
                        <img src={require('./img/comment.png') } alt="comment" />
                      </button>
                    </div>
                </div> : <form 
                className="comment_main comment_change"
              onSubmit={onUpdateComment}> 
                <textarea 
                defaultValue={itemComment.title}
                placeholder='Add comment'
                type="text" 
                onChange={(e) => 
                  setUpdateComment({
                  id: itemComment.id,
                  title: e.target.value
                })}
                />
                <button>
                  Change
                </button>
              </form>}
              {isComment &&
            <form 
            className='comment_add'
              onSubmit={onAddComment}> 
                <textarea 
                placeholder='Add comment'
                value={commentValue.title}
                type="text" 
                onChange={(e) => 
                  setCommentValue({
                    id: itemComment.id,
                    dis: itemComment.dis,
                    title: e.target.value
                  })}
                />
                <button>
                <img src={require('./img/done.png') } alt="done" />
                </button>
              </form>}
            </div>
            
        
      
    </>
  )
}

export default Commentnext;
