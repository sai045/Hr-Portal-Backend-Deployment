const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Employee Block', () => {

    it("Get All Employee", function (done) {
        this.timeout(0);
        chai.request(app).get('/api/employee').end((err, res) => {
            res.should.have.status(200)
            res.body.employees.should.be.a('array')
            done()
        })
    })

    var id;
    it("Employee Create Block", function (done) {
        this.timeout(0)
        const newEmployee = {
            "name": "Knife",
            "department": "Research",
            "email": "klaus@mikaelson.com",
            "salary": "1234",
            "working_hours": "22",
            "hired_date": "2023-05-12"
        }
        chai.request(app)
            .post('/api/employee')
            .send(newEmployee)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.employee.name).to.be.equal("Knife")
                expect(res.body.employee.department).to.be.equal("Research")
                expect(res.body.employee.email).to.be.equal("klaus@mikaelson.com")
                expect(res.body.employee.working_hours).to.be.equal(22)
                expect(res.body.employee.salary).to.be.equal(1234)
                id = res.body.employee._id
                done();
            });
    });

    it("Employee Get Block", function (done) {
        this.timeout(0)
        chai.request(app).get(`/api/employee/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(res.body.employee.name).to.be.equal("Knife")
            expect(res.body.employee.department).to.be.equal("Research")
            expect(res.body.employee.email).to.be.equal("klaus@mikaelson.com")
            expect(res.body.employee.working_hours).to.be.equal(22)
            expect(res.body.employee.salary).to.be.equal(1234)
            done();
        })
    })

    it("Employee Patch Block", function (done) {
        this.timeout(0);
        const newEmployee = {
            "name": "Knife",
            "department": "Accounting"
        }
        chai.request(app).patch(`/api/employee/${id}`).send(newEmployee).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(res.body.employee.department).to.be.equal("Accounting")
            done();
        })
    })

    it("Employee Delete Block", function (done) {
        this.timeout(0)
        chai.request(app).delete(`/api/employee/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            expect(res.body.message).to.be.equal("Deleted employee")
            done();
        })
    })
})
