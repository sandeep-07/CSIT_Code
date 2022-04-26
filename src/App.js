import axios from 'axios';
import {useState,useEffect} from 'react';
import Pagination from './Pagination';
import Posts from './Posts';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams 
} from "react-router-dom";

function App() {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage,setPostsPerPage]=useState(30);
  const [value,setValue]=useState("");
  const [char,setChar]=useState(null)
  const [renPost,setRenPost]=useState([])

  useEffect(() => {
    const fetchPosts=async ()=>{
      setLoading(true);
      const res=await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setRenPost(res.data);
      setLoading(false);
    }
    fetchPosts();
  }, [])
  
  const indexOfLastPost=currentPage*postsPerPage;
  const indexOfFirstPost=indexOfLastPost-postsPerPage;
  const currentPosts=posts.slice(indexOfFirstPost,indexOfLastPost);
  const handleChange=(e)=>{
    setValue(e.target.value);
  }
  // Change Page
  const paginate=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }
  const options=[null,"Title","Body"]

  const hangleTextChange=(e)=>{
    setChar(e.target.value)
  }

  const filterPost=()=>{
    let tempPosts=[]
    if(value==="Title")
    tempPosts=posts.filter((post)=>post.title[0]===char)
    else if(value==="Body")
    tempPosts=posts.filter((post)=>post.body[0]===char)
    setPosts(tempPosts)
  }
  useEffect(() => {
    if(query && query.length!==0)
     filterPost()
    
  }, [query])

  const Home=()=>{
    return (<div>
      <div className='container'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <p>{char}</p>
      <input onChange={hangleTextChange} />

      <select value={value} onChange={handleChange}>
      {options.map((item,idx)=><option value={item} key={idx} style={ (idx==0) ? { display:"none"} : {}}>{item}</option >)}

      </select>
      
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
    </div>)
  }

const PostDetail=()=>{
  
  const {id}=useParams()
  return(
    <div>{id}</div>
  )
}


  
  return (  
    <>
      <div className='container'>
        <h1 className='text-primary mb-3'>My Blog</h1>
        <p>{char}</p>
        <input onChange={hangleTextChange} />

        <select value={value} onChange={handleChange}>
        {options.map((item,idx)=><option value={item} key={idx} style={ (idx==0) ? { display:"none"} : {}}>{item}</option >)}

        </select>
        
        
        <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
      </div>
    </>
    );
  }
  
  export default App;
  
