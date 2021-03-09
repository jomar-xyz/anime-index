import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {AppBar, Grid, Paper} from '@material-ui/core'

export default function Categories () {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)

	const headers = {
		"accept": "application/vnd.api+json"
	}
	const getCategories = () => {
		setLoading(true)
		axios.get('https://kitsu.io/api/edge/categories?page%5Blimit%5D=40&sort=-total_media_count',{...headers})
		.then(res=>{
			setCategories(res.data.data)
			setLoading(false)
			console.log(res.data.data)
		})
	}

	useEffect(()=>{
		getCategories()
	},[])

	return (
			<Grid container item>
				{
					!loading ?
					categories.map(c=>(
						<Grid item xs={3} sm={2} md={6} lg={6} key={c.id} className="center-text">
							{c.attributes.title}
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
		)
}