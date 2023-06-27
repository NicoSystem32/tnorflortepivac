import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'

// App
import App from './infrastructure/UI/App'

// styles
import 'bootstrap/dist/js/bootstrap'
import './index.scss'
import './theme.css'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
