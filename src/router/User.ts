import express from 'express'

const User = express.Router()

User.get('/')
User.post('/')
User.get('/:id')
User.put('/:id')
User.delete('/:id')

export default User