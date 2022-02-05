import supertest from 'supertest';
import {expect} from "chai";
import 'dotenv/config'

describe('Auth', function() {
    const request = supertest(process.env.BASE_URL) // Where did PROCESS come from?
    // console.log(request);

    it('Successful Log In', function() {
        request
            .post('/auth') // /auth is endpoint
            .send({ login: process.env.LOGIN, password: process.env.PASSWORD }) // request body
            //.expect(500) // this expect is from supertest?? and it doesn't work
            .end(function(err, res) {  // works with response
                // console.log(res);
                expect(res.statusCode).to.eq(200) // one of the response object keys
                expect(res.body.token).not.to.be.undefined // .body.token is method that calls token
            })
    })

    it('Login with Invalid Credentials', function() {
        request
            .post('/auth')
            .send({ login: 'adminius111', password: 'supers3cret' })
            .end(function(err, res) {
                // console.log(res);
                expect(res.statusCode).to.eq(404)
                expect(res.body.message).to.eq('Wrong login or password.')
                // We need postman to know the message text??
            })
    })
})