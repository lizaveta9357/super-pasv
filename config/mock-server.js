import express from 'express'
import bodyParser from 'body-parser'
import responses from './responses.json'

function start(port) {  // starts mock server
    const app = express()
    let server; // will be user in before/after to wake server up and later to shut server down
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/auth', async function(req, res) {
        const login = req.body.login
        const password = req.body.password
        if (login === process.env.LOGIN && password === process.env.PASSWORD)
            await res.status(200).send(responses.auth.valid)
        else
            await res.status(404).send(responses.auth.invalid)
    })


    app.post('/users', async function(req, res) {
        await res.status(200).send(responses.users.create)
    })

    app.get('/users', async function(req, res) {
        const id = req.query.id
        if (id)
            await res.status(200).send({ id: id, amount: 1000 })
        else
            await res.status(200).send(responses.users.getAll)
    })

    app.delete('/users', async function(req, res) {
        await res.status(200).send(responses.users.delete)
    })


    app.post('/transactions', async function(req, res) {
        await res.status(200).send(responses.transactions.create)
    })

    app.get('./transactions', async function(req, res) {
        const id = req.query.id
        if (id)
            await res.status(200).send( { id: id, amount: 100})
        else
            await res.status(200).send(responses.transactions.getAll)
    })


    app.delete('/config', async function(req, res) {
        await res.status(200).send({"message": "Data wiped out."})
    })

    before(async function() {
        server = await app.listen(port)
        console.log(`Mock server is running on ${port}`)
    })

    after(function() {
        server.close() // shuts server down
    })
}

export { start }