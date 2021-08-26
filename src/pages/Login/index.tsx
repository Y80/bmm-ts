import { NButton } from 'naive-ui'
import classes from '../../style/login.module.css'

// #/login
// --->github.com/login/auth
// --->/?code=231asfadfaf
//  (window.opener.handleSuccessLogin(); window.close();)

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow

export default function Login() {
  function handleClick() {
    const childWindow = window.open(
      'https://github.com/login/oauth/authorize?client_id=e2694ff6d268a2124f44&redirect_uri=http://localhost:3000'
    )

    if (!childWindow) {
      alert('null')
      return
    }

    childWindow.addEventListener('loadstart', () => {
      console.log('load')
      console.log(childWindow.location.href)
    })

    childWindow.addEventListener('unload', () => {
      console.log('unload')
      console.log(childWindow.location.href)
    })
  }

  return (
    <div class={classes.root}>
      <NButton type="primary" onClick={handleClick}>
        使用 Github 登录
      </NButton>
    </div>
  )
}
