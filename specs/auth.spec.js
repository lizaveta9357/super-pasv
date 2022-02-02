import supertest from 'supertest';
import {expect} from "chai";

describe('Auth', function() {
    const request = supertest('https://paysis.herokuapp.com')
    // console.log(request);

    it('Successful Log In', function() {
        request
            .post('/auth') // /auth is endpoint
            .send({login: 'adminius', password: 'supers3cret'}) // request body
            //.expect(500) // this expect is from supertest?? and it doesn't work
            .end(function(err, res) {  // works with response
                console.log(res);
                expect(res.statusCode).to.eq(200) // one of the response object keys
                expect(res.body.token).not.to.be.undefined // .body.token is method that calls token
            })
    })

    it.only('Login with Invalid Credentials', function() {
        request
            .post('/auth')
            .send({login: 'invalid', password: 'supers3cret'})
            .end(function(err, res) {
                console.log(res);
                expect(res.statusCode).to.eq(404)
                expect(res.body.message).to.eq('Wrong login or password.')
                // We need postman to know the message text??
            })
    })
})