import supertest from 'supertest';
import {expect} from "chai";

describe('Auth', function() {
    const request = supertest(process.env.BASE_URL) // Where did PROCESS come from?

    describe('Successful Log In', function(){
        let result;

        //HOOK BEFORE
        before(async function() {
            await request
                .post('/auth') // /auth is endpoint
                .send({ login: process.env.LOGIN, password: process.env.PASSWORD }) // request body
                .then(res => { // explanation please. What is .then??
                    // What is it in the res? Response body? Ok. Who said that?
                    result = res;
                })
        })

        it('response status code is 200', function() {
            expect(result.statusCode).to.eq(200) // one of the response object key
        })

        it('response body contains authorization token', function() {
            expect(result.body.token).not.to.be.undefined
        })
    })

    describe('Login with Invalid Credentials', function() {
        let result;

        // HOOK BEFORE
        before(async function() { // Do we use HOOK BEFORE only inside descride?? Yes
            await request
                .post('/auth')
                .send({login: 'adminius111', password: 'supers3cret'})
                .then(res => {
                    result = res;
                })
        })

        it('response status code is 404', function () {
            expect(result.statusCode).to.eq(404);
        })
        it('response body contains error massage', function () {
            expect(result.body.message).to.eq('Wrong login or password.')
        })
    })
})