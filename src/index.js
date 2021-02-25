import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ScreensRoot from './screens/Root'
import Loading from './components/UI/Loading'
import './index.css'

ReactDOM.render(
  (
	<>
  		<Loading />
		  
  		<ScreensRoot />
  	</>
  ),
  document.getElementById('root')
);
