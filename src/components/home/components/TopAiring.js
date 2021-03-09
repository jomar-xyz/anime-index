import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {AppBar, Grid, Paper} from '@material-ui/core'

export default function TopAiring () {
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(true)

	const headers = {
		"accept": "application/vnd.api+json"
	}
	const getList = () => {
		setLoading(true)
		axios.get('https://kitsu.io/api/edge/anime?filter%5Bstatus%5D=current&page%5Blimit%5D=5&sort=-user_count',{...headers})
		.then(res=>{
			setList(res.data.data)
			setLoading(false)
			console.log(res.data.data)
		})
	}

	useEffect(()=>{
		getList()
	},[])

	return (
		<>
			<Grid container item xs={12} sm={12} md={8} lg={8} className="card-container" direction="column">
				<div className="card-title">
					TOP AIRING ANIME
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
		</>
		)
}