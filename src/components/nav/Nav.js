import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Grid, Paper} from '@material-ui/core'

export default function Nav () {

	return (
			<div style={{margin:"0 auto"}}>
				<AppBar position="static" className="nav">
					<Link to="/" className="link"><span className="title">ANIME INDEX</span></Link>
				</AppBar>
			</div>
		)
}