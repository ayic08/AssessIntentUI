import React from 'react'
import { Context } from './context'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import { ProductPage } from './pages'


const App = () => {
	return (
		<Context.Provider>
			<Router>
				<Routes>
        			<Route path="/" element={<ProductPage />} />
				</Routes>
			</Router>
		</Context.Provider>
	)
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (

		<Route
			render={(props) => {
				return (
					<>
						<Component {...props} />
					</>
				)
			}}
			{...rest}
		/>
	)
}

export default App
