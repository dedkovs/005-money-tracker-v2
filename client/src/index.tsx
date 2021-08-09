import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<CssBaseline />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
