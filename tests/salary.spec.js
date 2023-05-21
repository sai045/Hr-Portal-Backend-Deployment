const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Salary Block', () => {

    it("Get All Salary", function (done) {
        this.timeout(0);
        chai.request(app).get('/api/salary').end((err, res) => {
            res.should.have.status(200)
            res.body.obj.should.be.a('array')
            done()
        })
    })

    const id = "62120e962c4e0cd2c8f10795";
    it("Salary Get Block", function (done) {
        this.timeout(0)
        chai.request(app).get(`/api/salary/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })

    it("Salary Patch Block", function (done) {
        this.timeout(0);
        const salary = {
            salary: 1200
        }
        chai.request(app).patch(`/api/salary/${id}`).send(salary).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})
