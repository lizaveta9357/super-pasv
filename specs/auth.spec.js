import {expect} from 'chai';
import AuthHelper from '../helpers/auth.helper';

describe('Auth', function() {

    let authHelper = new AuthHelper();

    describe('Successful Log In', function(){

        before(async function() {
            await authHelper.login(process.env.LOGIN, process.env.PASSWORD)
        })

        it('response status code is 200', function() {
            expect(authHelper.response.statusCode).to.eq(200) // one of the response object key
        })

        it('response body contains authorization token', function() {
            expect(authHelper.response.body.token).not.to.be.undefined
        })
    })

    describe('Login with Invalid Credentials', function() {

        before(async function() { // Do we use HOOK BEFORE only inside descride?? Yes
            await authHelper.login('invalid', 'invalid');
        })

        it('response status code is 404', function () {
            expect(authHelper.response.statusCode).to.eq(404);
        })

        it('response body contains error massage', function () {
            expect(authHelper.response.body.message).to.eq('Wrong login or password.')
        })
    })
})