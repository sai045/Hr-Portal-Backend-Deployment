const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Complaint Block', () => {

    it("Get All Complaint", function (done) {
        this.timeout(0);
        chai.request(app).get('/api/complaints').end((err, res) => {
            res.should.have.status(200)
            // res.body.complaints.should.be.a('array')
            done()
        })
    })

    var id;
    it("Complaint Create Block", function (done) {
        this.timeout(0)
        const newComplaint = {
            "Name": "Knife",
            "Department": "Account",
            "complaint": "Test Complaint",
        }
        chai.request(app)
            .post('/api/complaints')
            .send(newComplaint)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body)
                expect(res.body.newComplaint.Name).to.be.equal("Knife")
                expect(res.body.newComplaint.Department).to.be.equal("Account")
                id = res.body.newComplaint._id
                done();
            });
    });

    it("Complaint Delete Block", function (done) {
        this.timeout(0)
        chai.request(app).delete(`/api/complaints/${id}`).end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})
