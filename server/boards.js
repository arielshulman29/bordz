process.env.NODE_ENV = 'test';
const { getBoard, getBoards, createBoard, updateBoard, deleteBoard } = require("../../controllers/boards");
const Board =require("../../models/board")
//During the test the env variable is set to test


let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();


chai.use(chaiHttp);

//parent block
describe('Boards', () => {
    beforeEach((done) => { //Before each test we empty the database
        Board.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET Board', () => {
      it('it should GET all the Boards', (done) => {
        chai.request(server)
            .get('/boards')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});