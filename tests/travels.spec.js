const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Travel Block', () => {

    it("Get All Travel Requests", function (done) {
        this.timeout(0);
        chai.request(app).get('/api/travel').end((err, res) => {
            res.should.have.status(200)
            res.body.travels.should.be.a('array')
            done()
        })
    })

    var id;
    it("Travel Create Block", function (done) {
        this.timeout(0)
        const newTravel = {
            employeeId: "62120e962c4e0cd2c8f10795",
            from: "Mumbai",
            to: "Hyderabad",
            applied_date: "2023-05-19",
        }
        chai.request(app)
            .post('/api/travel')
            .send(newTravel)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.newTravel.from).to.be.equal("Mumbai")
                expect(res.body.newTravel.to).to.be.equal("Hyderabad")
                id = res.body.newTravel._id
                done();
            });
    });

    it("Travel Get Block", function (done) {
        this.timeout(0)
        chai.request(app).get(`/api/travel/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(res.body.travel.from).to.be.equal("Mumbai")
            expect(res.body.travel.to).to.be.equal("Hyderabad")
            done();
        })
    })

    it("Travel Patch Block", function (done) {
        this.timeout(0);
        chai.request(app).patch(`/api/travel/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})
