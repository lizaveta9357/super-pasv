import TransactionsHelper from '../helpers/transactions.helper';
import UsersHelper from "../helpers/users.helper";
import { expect } from "chai";
import {getRandomItem, getRandomNumber} from "../helpers/common.helper";

describe('T R A N S A C T I O N S', function() {
    let transactionHelper = new TransactionsHelper();
    let userHelper = new UsersHelper();

    let user1Id, user2Id;
    let transaction1Id, transaction2Id;

    before(async function() {
            await userHelper.create();
            user1Id = userHelper.response.body.id
            await userHelper.create();
            user2Id = userHelper.response.body.id

            await transactionHelper.create(user1Id, user2Id, 100);
            transaction1Id = transactionHelper.response.body.id
            await transactionHelper.create(user2Id, user1Id, 100);
            transaction2Id = transactionHelper.response.body.id
    })

    describe('Transaction creation', function() {

        it('response code status is 200', function() {
            expect(transactionHelper.response.statusCode).to.eq(200)
        })

        it('response body contains transaction id', function() {
            expect(transactionHelper.response.body.id).not.to.be.undefined
        })

        it('response body contains sender id', function() {
            expect(transactionHelper.response.body.from).not.to.be.undefined
        })

        it('response body contains receiver id', function() {
            expect(transactionHelper.response.body.to).not.to.be.undefined
        })

        it('response body contains transaction amount', function() {
            expect(transactionHelper.response.body.amount).not.to.be.undefined
        })
    })


    describe('Get transaction by ID', function() {

        before(async function() {
            await transactionHelper.getById(transaction1Id)
        })

        it('response code status is 200', function() {
            expect(transactionHelper.response.statusCode).to.eq(200)
        })

        it('response body contains transaction id', function() {
            expect(transactionHelper.response.body.id).to.eq(transaction1Id)
        })

        it('response body contains sender id', function() {
            expect(transactionHelper.response.body.from).to.eq(user1Id)
        })

        it('response body contains receiver id', function() {
            expect(transactionHelper.response.body.to).to.eq(user2Id)
        })

        it('response body contains transaction amount', function() {
            expect(transactionHelper.response.body.amount).to.eq(100)
        })
    })


    describe('Get all transactions', function() {

        before(async function() {
            await transactionHelper.getAll()
        })

        it('response code status is 200', function() {
            expect(transactionHelper.response.statusCode).to.eq(200)
        })

        it(`response body contains at least 2 items`, function() {
            expect(transactionHelper.response.body.length).to.be.at.least(2)
        })

        it('random transaction response body contains transaction id', function() {
            expect(getRandomItem(transactionHelper.response.body).id).not.to.be.undefined
        })

        it('random transaction response body contains sender id', function() {
            expect(getRandomItem(transactionHelper.response.body).from).not.to.be.undefined
        })

        it('random transaction response body contains receiver id', function() {
            expect(getRandomItem(transactionHelper.response.body).to).not.to.be.undefined
        })

        it('random transaction response body contains transaction amount', function() {
            expect(getRandomItem(transactionHelper.response.body).amount).not.to.be.undefined
        })
    })
})