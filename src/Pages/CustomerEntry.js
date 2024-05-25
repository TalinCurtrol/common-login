import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CUSTOMER_URL, ROOT_URL, endpoints } from '../components/urls';
import { isValidToken } from '../utils/jwtUtils';







function CustomerEntry() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [value, setValue] = React.useState(0);



  useEffect(() => {
    // 从本地内存取用户和token
    var user = ''
    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'))
    }


    // 没有就logout
    if (!user || !user.token) {
      console.log("当前没登陆")
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid
    if (user.token.length > 0 && isValidToken(user.token)) {
      setLoggedIn(true)
      window.location.href = CUSTOMER_URL + "?userName=" + user.userName + "&token=" + user.token;
    } else {
      console.log("token不合法")
      setLoggedIn(false)
      return
    }
  }, [])



  const logIn = async () => {//获得token并存到本地存储
    const data = await fetch(ROOT_URL + endpoints.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    });
    const token = await data.text();

    if (token.length !== 0) {

      localStorage.setItem('user', JSON.stringify({ userName, token }))
      setLoggedIn(true)
      window.location.href = CUSTOMER_URL + "?userName=" + userName + "&token=" + token;
    } else {
      window.alert('Wrong user name or password')
    }
  }










  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }




  return (
    <div>
      {
        loggedIn ?
          (<>
            <div className={'inputContainer'}>
              <input className={'inputButton'} type="button" onClick={() => {//点击登出就清空信息
                setLoggedIn(false)
                localStorage.removeItem('user')
              }} value={'Log out'} />
            </div>
          </>)
          :
          (<>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={(event, newValue) => {
                setValue(newValue);
              }} centered>
                <Tab label="Log in" {...a11yProps(0)} />
                <Tab label="Sign up" {...a11yProps(1)} />

              </Tabs>
            </Box>
            <div
              role="tabpanel"
              hidden={value !== 0}
              id={`simple-tabpanel-0`}
              aria-labelledby={`simple-tab-0`}

            >
              {value === 0 && (
                <Box >
                  <div className={'mainContainer'}>
                    <div className={'titleContainer'}>
                      <div>Login as customer</div>
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                      <input
                        value={userName}
                        placeholder="Enter your user name here"
                        onChange={(ev) => setUserName(ev.target.value)}
                        className={'inputBox'}
                      />
                      <label className="errorLabel">{userNameError}</label>
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                      <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                      />
                      <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                      <input className={'inputButton'} type="button" onClick={(e) => {//点击之后检查再登录
                        // Set initial error values to empty
                        e.preventDefault();
                        setUserNameError('')
                        setPasswordError('')

                        // Check if the user has entered both fields correctly
                        if ('' === userName) {
                          setUserNameError('Please enter your email')
                          return
                        }

                        if ('' === password) {
                          setPasswordError('Please enter a password')
                          return
                        }
                        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

                        if (!pattern.test(password)) {
                          console.log(password)
                          setPasswordError(`The password must be a lowercase and uppercase letter, digit, special character, and 8 or more total characters.`)
                          return
                        } else {
                          setPasswordError('')
                        }

                        logIn()

                      }} value={'Log in'} />
                    </div>
                  </div>
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={value !== 1}
              id={`simple-tabpanel-1`}
              aria-labelledby={`simple-tab-1`}

            >
              {value === 1 && (
                <Box >
                  <div className={'mainContainer'}>
                    <div className={'titleContainer'}>
                      <div>Sign up as customer</div>
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                      <input
                        value={userName}
                        placeholder="Enter your user name here"
                        onChange={(ev) => setUserName(ev.target.value)}
                        className={'inputBox'}
                      />
                      <label className="errorLabel">{userNameError}</label>
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                      <input
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                      />
                      <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                      <input className={'inputButton'} type="button" onClick={(e) => {//注册成功自动登录
                        // Set initial error values to empty
                        e.preventDefault();
                        setUserNameError('')
                        setPasswordError('')

                        // Check if the user has entered both fields correctly
                        if ('' === userName) {
                          setUserNameError('Please enter your email')
                          return
                        }

                        if ('' === password) {
                          setPasswordError('Please enter a password')
                          return
                        }
                        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/

                        if (!pattern.test(password)) {
                          setPasswordError(`The password must be a lowercase and uppercase letter, digit, special character, and 8 or more total characters.`)
                          return
                        }

                        fetch(ROOT_URL + endpoints.register_customer, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ userName, password }),
                        }).then((response) => {
                          if (!response.ok) throw new Error(response.status);
                          else {
                            logIn()
                          }
                        });

                      }} value={'Sign up'} />
                    </div>
                  </div>
                </Box>
              )}
            </div>

          </>)
      }
    </div>


  )
}

export default CustomerEntry;