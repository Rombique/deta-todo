const express = require('express')
const { Deta } = require('deta')
const app = express()
const deta = Deta('YOUR KEY HERE')
const todos = deta.Base('todos')

app.use(express.json());

app.post('/', async (req, res) => {
	const title = req.body.title
	if (title === undefined) {
		res.status(422).json({'error': 'title is not defined'})
	} else {
		const todo = {
			createdAt: Date.now(),
			title: title
		}
		await todos.put(todo)
		res.json(todo)
	}
})

app.get('/', async (req, res) => {
	const result = await todos.fetch()
	res.send(result)
})

app.put('/:id', async (req, res) => {
	const title = req.body.title
	const id = req.params.id
	if (id === undefined || title === undefined) {
		res.status(422).json({'error': 'title and/or id is not defined'})
	} else {
		const toUpdate = { key: id, title }
		const result = await todos.put(toUpdate) 
		res.json(result)
	}
})

app.delete('/:id',  async (req, res) => {
	const id = req.params.id
	await todos.delete(id)
	res.json({'message': 'todo with id ' + id + ' deleted'})
})

module.exports = app