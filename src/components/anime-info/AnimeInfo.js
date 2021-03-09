import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {AppBar, Grid, Paper} from '@material-ui/core'
import Nav from "../nav/Nav"

export default function AnimeInfo () {
	let { slug } = useParams()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	const headers = {
		"accept": "application/vnd.api+json"
	}
	const getList = (slug="one-peice") => {
		setLoading(true)
		axios
		.get(`https://kitsu.io/api/edge/anime?fields%5Bcategories%5D=slug%2Ctitle&filter%5Bslug%5D=${slug}&include=categories%2CanimeProductions.producer`,{...headers})
		.then(res=>{
			setData(res.data)
			setLoading(false)
			console.log(res.data)
		})
	}

	useEffect(()=>{
		getList(slug)
	},[])

	const getImageSrc=()=>{
		if(data.data[0].attributes.coverImage){
			return data.data[0].attributes.coverImage.original || data.data[0].attributes.coverImage.large
		}
		else if(data.data[0].attributes.posterImage){
			return data.data[0].attributes.posterImage.original || data.data[0].attributes.posterImage.large
		
		}
	}


	return (
		<div style={{overflow: 'hidden'}}>
			<Nav />
			{
				!loading ?
				<>
					<Grid container>
						<Grid xs={12} sm={12} md={12} item className="cover-wrapper">
							<img className="img cover-img" alt={slug} src={getImageSrc()} />
							<div className="overlay">
								<h2 className="left-10 overlay-text">{data.data[0].attributes.canonicalTitle}</h2>
							</div>
						</Grid>
					</Grid>
					<Grid container spacing={2} className="left-10">
						{
							data.included.filter(x=>x.type==="categories").map(d=>(
								<Grid item key={d.id} >
									<span className="genre">{d.attributes.title}</span>
								</Grid>
							))
						}
					</Grid>
					<Grid container className="synopsis">
						{
							data.data[0].attributes.synopsis || "N/A"
						}
					</Grid>
				</>
				:
				<div className="bouncing-loader">
				  <div></div>
				  <div></div>
				  <div></div>
				</div>
			}
			
		</div>
		)
}