import supertest from "supertest";

class TransactionsHelper {
    response

    async create(from, to, amount) {
        await supertest(process.env.BASE_URL)
            .post('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send( {from: from, to: to, amount: amount })
            .then(res => {
                this.response = res
            })
    }

    async getById(id) {
        await supertest(process.env.BASE_URL)
            .get(`/transactions?id=${id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }

    async getAll() {
        await supertest(process.env.BASE_URL)
            .get('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
}

export default TransactionsHelper