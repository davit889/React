

function BlogPost({ title, content, author, date,id }) {
  return (
    <div className='text'>
      <h2>{title}</h2>
      <p>
        <strong>{id}</strong>
        <strong>{author}</strong> |
         <span>{date}</span>
      </p>
      <p>{content}</p>
    </div>
  )
}

export default BlogPost
