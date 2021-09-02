import { NButton } from 'naive-ui'
import classes from '../../style/login.module.css'
import router from '../router'

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow

export default function Login() {
  /**
   * 1. 打开新窗口，进行 GitHub 授权
   * 2. 授权成功，重定向至 REDIRECT_URI
   * 3. 在 REDIRECT_URI 页面中请求服务端，请求签发 token
   * 4. 新窗口调用 handleSuccessLogin(), 新窗口被关闭，当前窗口导航至 /admin
   */
  function handleClick() {
    // const REDIRECT_URI = 'http://localhost:3000'
    const REDIRECT_URI = location.origin
    const CLIENT_ID = 'e2694ff6d268a2124f44'
    const childWindow = window.open(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
    )
    window.handleSuccessLogin = () => {
      childWindow?.close()
      router.replace('/admin')
    }
  }

  return (
    <div class={classes.root}>
      <NButton type="primary" onClick={handleClick}>
        使用 Github 登录
      </NButton>
    </div>
  )
}

Login.displayName = 'Login'
