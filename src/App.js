import React, { Component } from 'react';
import Hello from './Hello'
import axios from 'axios'
import {
  Button,
  Grid,
  TextField
} from '@material-ui/core'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: false,
      isLoginFail: false,
      isLoading: false
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  onPressLogin() {
    this.callAuthAPI(this.state.username, this.state.password)
  }

  callAuthAPI(username, password) {
    const body = {
      username: username,
      password: password
    }
    const url = 'https://8e6484f74e30.ngrok.io/login'
    const config = {
      method: 'POST',
      url: url,
      data: body
    }
    axios(config)
      .then((res) => {
        console.log('response: ', (res.data));
        if (res.data?.status) {
          this.setState({
            isLogin: true
          })
        } else {
          this.setState({
            isLoginFail: true
          })
        }
      })
      .catch((err) => {
        console.log('err:', JSON.stringify(err));
      })
  }

  render() {
    if (this.state.isLogin) {
      return (
        <Hello username={this.state.username}></Hello>
      )
    }
    else {
      return (
        <div>
          <Button
            variant="outlined"
            size="medium"
          >
            Homepage
          </Button>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <TextField
              variant="outlined"
              size="small"
              style={{
                marginTop:'10px',
                width:'30ch',
              }}
              value={this.state.username}
              onChange={(e) => {
                this.setState({
                  username: e.target.value
                })
              }}
              placeholder={'username'}
            />
            <TextField
              variant="outlined"
              size="small"
              style={{
                marginTop:'10px',
                width:'30ch',
              }}
              value={this.state.password}
              onChange={(e) => {
                this.setState({
                  password: e.target.value
                })
              }}
              placeholder={'password'} />
            <Button
              style={{marginTop:'20px'}}
              variant="contained"
              color="primary"
              onClick={() => this.onPressLogin()}
            >
              Login
          </Button>
            {
              this.state.isLoginFail
                ?
                <div>
                  Sai tk hoac mk
              </div>
                :
                null
            }
          </Grid>
        </div>
      )
    }
    // form login: username, password
    // username password = admin => chuyen toi Dashboard hello admin
    // neu sai thi hien len sai tk mk, bat nhap lai
  }
}

// https://8e6484f74e30.ngrok.io/login