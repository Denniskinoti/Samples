import React, {useState,useEffect} from 'react'
import ReactDOM from 'react-dom'


// const App = () => {
// 	const[count, stateCount] = useState(0);

// 	useEffect(()=>{
// 		document.title = `clicked ${count} times`
// 	})

// 	const increment = () => {
// 		stateCount(count + 1);
// 	}

// 	return(
// 		<div>
// 			<p> our count is</p>
// 			<button onClick={increment}>count number{count}</button>

// 		</div>

// 		)
// }

const App = ()=> {
	const[news, setNews]=useState([])
	const [searchQuery, setSearchQuery]= useState('react')
	const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
	const [loading, setLoading] = (false)
	const fetchNews = () => {
		setLoading(true)
		fetch(url)
		.then((result)=> result.json())
		.then((data) => (setNews(data.hits).setLoading(false)))
		.catch((error)=> console.log(error))
	};

	useEffect(()=> {
		fetchNews();
	},[url])//second argument controls the behaviour of useEffect

	const handleChange = (e) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault();
		setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
	}

	return(
			<div>
				<h2> news</h2>
				{loading ? <h2> loading </h2> : ""}
				<form onSubmit={handleSubmit}>
					<input type="text" value={searchQuery} onChange={handleChange} />
					<button> submit </button>
				</form>

				{news.map((n, i)=> (
					<p key={i}>{n.title}</p>
				))}

			</div>
		)
}



ReactDOM.render(<App />, document.getElementById('root'))