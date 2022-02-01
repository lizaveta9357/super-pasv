import supertest from 'supertest';
import { expect } from 'chai';

describe('Auth', function(){
    const request = supertest('https://paysis.herokuapp.com');

    it('Successful Log In', function(){
        request
            .post('/auth')
            .send({login: 'adminius', password: 'supers3cret'})
            .end(function(err, res) {
                expect(res.statusCode.to.eq(200))
                expect(res.body.token).to.be.undefined
            })
    })

    it('Log in with invalid credentials', function(){
        request
            .post('/auth')
            .send({login: 'invalid', password: 'invalid'})
            .end(function(err, res) {
                expect(res.statusCode.to.eq(400))
                expect(res.body.message).to.be.eq('Wrong login or password')
            })
    })
})