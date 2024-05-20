import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { CUSTOMER_URL, ROOT_URL, endpoints } from '../Components/urls';





function CustomerEntry() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // 从本地内存取用户和token
    const user = JSON.parse(localStorage.getItem('user'))

    // 没有就logout
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid
    // fetch('http://localhost:3080/verify', {
    //   method: 'POST',
    //   headers: {
    //     'jwt-token': user.token,
    //   },
    // })
    //   .then((r) => r.json())
    //   .then((r) => {
    //     setLoggedIn('success' === r.message)
    //     setEmail(user.email || '')
    //   })
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

  const onLogoutClick = () => {//点击登出就清空信息
    setLoggedIn(false)
    localStorage.removeItem('user')
  }
  function LogoutPage() {//如果已经登陆就显示的登出按钮
    return (
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onLogoutClick} value={'Log out'} />
      </div>
    )
  }

  const onSignupClick = async () => {//注册成功自动登录
    // Set initial error values to empty
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

  }

  const onLoginClick = () => {//点击之后检查再登录
    // Set initial error values to empty
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

    logIn()

  }

  function SignupPage() {



    return (
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
          <input className={'inputButton'} type="button" onClick={onSignupClick} value={'Sign up'} />
        </div>
      </div>)
  }

  function LoginPage() {
    return (
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
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onLoginClick} value={'Log in'} />
        </div>
      </div>
    )
  }





  const EntryTabs = () => {//显示一组tab，分别是登录和注册

    CustomTabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    function CustomTabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box >
              {children}
            </Box>
          )}
        </div>
      );
    }



    return (<>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Log in" {...a11yProps(0)} />
          <Tab label="Sign up" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {LoginPage()}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {SignupPage()}
      </CustomTabPanel>

    </>)
  }


  function PageSelector() {

    if (loggedIn) {
      //如果登陆了就显示登出
      return <LogoutPage />;
    }
    //没登录则显示tabs
    return (EntryTabs());
  }

  return (PageSelector())
}

export default CustomerEntry;