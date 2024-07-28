import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store,persitor } from './Redux/Store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persitor}>
  <Provider store={store}>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </Provider>,
  </PersistGate>
)
