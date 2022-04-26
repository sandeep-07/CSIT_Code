import React from 'react'

function Posts({posts,loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
  return (
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Bank</th>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">Body</th>
                </tr>
            </thead>
            {posts.map(post=>(
            <tr key={post.bank_name} >
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
            </tr>
        ))}
        </table>
        
    </div>
  )
}







export default Posts