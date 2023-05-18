const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Applicant Block', () => {

    it("Get All Applicant", function (done) {
        this.timeout(0);
        chai.request(app).get('/api/applicant').end((err, res) => {
            res.should.have.status(200)
            res.body.applicants.should.be.a('array')
            done()
        })
    })

    var id;
    it("Applicant Create Block", function (done) {
        this.timeout(0)
        const newApplicant = {
            "name": "Knife",
            "department": "Research",
            "qualification": "Engineering and MBA",
            "experience": "4",
        }
        chai.request(app)
            .post('/api/applicant')
            .send(newApplicant)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.applicant.name).to.be.equal("Knife")
                expect(res.body.applicant.department).to.be.equal("Research")
                id = res.body.applicant._id
                done();
            });
    });

    it("Applicant Get Block", function (done) {
        this.timeout(0)
        chai.request(app).get(`/api/applicant/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(res.body.applicant.name).to.be.equal("Knife")
            expect(res.body.applicant.department).to.be.equal("Research")
            done();
        })
    })

    it("Applicant Patch Block", function (done) {
        this.timeout(0);
        chai.request(app).patch(`/api/applicant/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })

    it("Applicant Delete Block", function (done) {
        this.timeout(0)
        chai.request(app).delete(`/api/applicant/${id}`).end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})
