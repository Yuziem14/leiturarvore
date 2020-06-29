'use strict'

class SessionController {
  async store({ auth, request, response }) {
    const { email, password } = request.all()

    const tokens = await auth.withRefreshToken().attempt(email, password)

    return response.json({ ...tokens })
  }

  async update({ auth, request, response }) {
    const { refreshToken } = request.all()

    const tokens = await auth.generateForRefreshToken(refreshToken)

    return response.json({ ...tokens })
  }
}

module.exports = SessionController
