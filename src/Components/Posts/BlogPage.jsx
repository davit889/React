import BlogPost from './BlogPost'
import posts from '../data/posts'
import './BlogPage.css'

function BlogPage() {
  return (
    <main >
      <h1 className='myblog'>my Blog</h1>
      {posts.map((post) => (
        <BlogPost key={post.id} {...post} />
      ))}
    </main>
  )
}

export default BlogPage
