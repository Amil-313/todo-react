import React from 'react';
import Commentnext from './Commentnext';

function Comment({array}) {

  const [commentValue, setCommentValue] = React.useState({});

  const addComment = () => {
    const comment = {
      id: Math.floor(Math.random()*1000) + String(commentValue.id),
      title: commentValue.title,
      dis: commentValue.dis + 1,
      comments: []
    };
    array.map((item) => item.id === commentValue.id ?
    item.comments = [comment, ...item.comments] : item)
    setCommentValue({});
    
  }

  return (
    <>
      {array.map((itemComment) => 
        <div>
          <div className='comment'>
            {[...Array(itemComment.dis)].map(i => 
              <div className='comment_line'></div>)}
                <Commentnext 
                commentValue={commentValue}
                addComment={addComment}
                setCommentValue={setCommentValue}
                itemComment={ itemComment } />
              </div>
              
        
          <Comment array={itemComment.comments} />
        </div>)}
    </>
  )
}

export default Comment;
