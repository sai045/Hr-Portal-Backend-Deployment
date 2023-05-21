const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Leave Block', () => {

    it("Get All Leave Requests", function (done) {
        this.timeout(0);
        chai.request(app).get('/api/leave').end((err, res) => {
            res.should.have.status(200)
            res.body.leaverequests.should.be.a('array')
            done()
        })
    })

    var id;
    it("Leave Create Block", function (done) {
        this.timeout(0)
        const newTravel = {
            days: "4",
            employeeId: "62120e962c4e0cd2c8f10795",
            leavedate: "2023-09-12"
        }
        chai.request(app)
            .post('/api/leave')
            .send(newTravel)
            .end((err, res) => {
                res.should.have.status(200);
                id = res.body.leaverequest._id
                done();
            });
    });

    it("Leave Get Block", function (done) {
        this.timeout(0)
        chai.request(app).get(`/api/leave/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })

    it("Leave Patch Block", function (done) {
        this.timeout(0);
        chai.request(app).patch(`/api/leave/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})
