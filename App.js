// App.js

import React from 'react'
import AppContainer from './app/navigations/AppNavigator'
import { Provider } from 'react-redux'
import store from '@store/store'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}