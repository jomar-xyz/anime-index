import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {AppBar, Grid, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Nav from '../nav/Nav'
import Categories from './components/Categories'
import TopAiring from './components/TopAiring'
import TopUpcoming from './components/TopUpcoming'

export default function Home () {
	const [list, setList] = useState([])
	const [trendingList, setTrendingList] = useState([])
	const [loading, setLoading] = useState(true)
	const [loadTrending, setLoadTrending] = useState(true)

	const headers = {
		"accept": "application/vnd.api+json"
	}
	const getList = () => {
		setLoading(true)
		axios.get('https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-user_count',{...headers})
		.then(res=>{
			setList(res.data.data)
			setLoading(false)
			console.log(res.data.data)
		})
	}
	const getTrendingList = () => {
		setLoadTrending(true)
		axios.get('https://kitsu.io/api/edge/trending/anime?limit=10',{...headers})
		.then(res=>{
			setTrendingList(res.data.data)
			setLoadTrending(false)
			console.log(res.data.data)
		})
	}

	useEffect(()=>{
		getList()
		getTrendingList()
	},[])

	return (
			<div>
				<Nav />
				<Grid container item xs={12} sm={12} md={12} lg={12} spacing={1} >

					<Grid container item xs={12} sm={12} md={8} lg={8} className="card-container" direction="column">
						<div className="card-title">
							TRENDING
						</div>
						<Grid container item >
							{
								!loadTrending ?
								trendingList.map(item=>(
									<Grid container item xs={4} sm={3} md={3} lg={2} key={item.id} justify="center" className="card">
										<Grid item xs={12}>
											<img className="img" alt={item.attributes.canonicalTitle} src={item.attributes.posterImage.tiny} />
										</Grid>
										<Grid item xs={12} className="anime-title">
											<Link to={`/anime/${item.attributes.slug}`} className="link" >{item.attributes.canonicalTitle}</Link>
										</Grid>
									</Grid>
									))
								:
								<div className="bouncing-loader">
								  <div></div>
								  <div></div>
								  <div></div>
								</div>
							}
							</Grid>
					</Grid>

					<Grid container item xs={12} sm={12} md={4} lg={4} className="card-container" direction="column">
						<div className="card-title">
							CATEGORIES
						</div>
						<Categories />
					</Grid>

					<TopAiring />
					<TopUpcoming />

					<Grid container item xs={12} sm={12} md={8} lg={8} className="card-container" direction="column">
						<div className="card-title">
							MOST POPULAR
						</div>
						<Grid container item>
							{
								!loading ?
								list.map(item=>(
									<Grid container item xs={4} sm={3} md={3} lg={2} key={item.id} justify="center" className="card">
										<Grid item xs={12}>
											<img className="img" alt={item.attributes.canonicalTitle} src={item.attributes.posterImage.tiny} />
										</Grid>
										<Grid item xs={12} className="anime-title">
											<Link to={`/anime/${item.attributes.slug}`} className="link" >{item.attributes.canonicalTitle}</Link>
										</Grid>
									</Grid>
									))
								:
								<div className="bouncing-loader">
								  <div></div>
								  <div></div>
								  <div></div>
								</div>
							}
							</Grid>
					</Grid>

				</Grid>
			</div>
		)
}