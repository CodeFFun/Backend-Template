import jwt from 'jsonwebtoken'


class Auth {
  static check(new_token: string) {
    let key: any = process.env.JWT_SECRET
    let token = new_token.split(' ')[1]
    let result: any = false
    try {
      result = jwt.verify(token, key)
      return result
    } catch (e) {
      return false
    }
  }
}

export default Auth
