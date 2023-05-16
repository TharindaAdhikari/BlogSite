
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import Post from '../models/post.js';
import User from '../models/user.js';
import { db } from '../config/db.js';
import app from '../index.js';
import sinon from 'sinon';
import { getPost, getPosts } from '../controllers/post.js';

chai.use(chaiHttp);
const expect = chai.expect;
chai.should();

//Test case for Get post by ID enpoint
describe('Posts API', () => {
  let user;
  let token;

  before(async () => {
    // Create a user and generate a JWT token for authentication
    user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    });

    token = jwt.sign({ id: user.id }, 'jwtkey');
  });

  after(async () => {
    // Delete the user and all associated posts
    await Post.destroy({ where: { uid: user.id } });
    await user.destroy();
  });


  describe('GET /posts/:id', () => {
    it('should return a post by ID', async () => {
      const post = await Post.create({
        title: 'Test Post',
        desc: 'Test post description',
        img: 'https://example.com/test.jpg',
        cat: 'test',
        date: new Date(),
        uid: user.id,
      });

      const res = await chai.request(app).get(`/api/posts/${post.id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title', 'Test Post');
      expect(res.body).to.have.property('desc', 'Test post description');
      expect(res.body).to.have.property('img', 'https://example.com/test.jpg');
      expect(res.body).to.have.property('cat', 'test');
      expect(res.body).to.have.property('date');
      expect(res.body).to.have.property('username', 'testuser');
    });

  });
});
     
////Test case for Get posts enpoint
describe('getPost function', () => {
    it('should return a post object with the specified id', () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      const data = [{ id: 1, username: 'john', title: 'Post title', desc: 'Post description', img: 'post.jpg', userImg: 'user.jpg', cat: 'technology', date: '2022-05-14' }];
  
      // Stub the db.query function to return the data array
      sinon.stub(db, 'query').callsFake((query, params, callback) => {
        callback(null, data);
      });
  
      getPost(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(data[0])).to.be.true;
  
      // Restore the original db.query function
      db.query.restore();
    });

  });

  describe('getPosts function', () => {
    it('should return an array of posts when called with no query parameters', async () => {
      const req = { query: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const expectedPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
      sinon.stub(Post, 'findAll').resolves(expectedPosts);
  
      await getPosts(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expectedPosts)).to.be.true;
  
      Post.findAll.restore();
    });
  
    it('should return an array of posts filtered by category when called with a "cat" query parameter', async () => {
      const req = { query: { cat: 'news' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const expectedPosts = [{ id: 3, title: 'News post 1', cat: 'news' }, { id: 4, title: 'News post 2', cat: 'news' }];
      sinon.stub(Post, 'findAll').resolves(expectedPosts);
  
      await getPosts(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expectedPosts)).to.be.true;
  
      Post.findAll.restore();
    });
  
    it('should return a 500 error response when an error occurs', async () => {
      const req = { query: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
      const errorMessage = 'An error occurred';
      sinon.stub(Post, 'findAll').throws(new Error(errorMessage));
  
      await getPosts(req, res);
  
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(errorMessage)).to.be.true;
  
      Post.findAll.restore();
    });
  });


//Test case for update post enpoint
describe('updatePost', () => {
  let token;
  let postId;
  let server;

  before(async () => {
    // Authenticate user and create a post to update

    const user = { id: 1, username: 'testuser' };
    token = jwt.sign(user, 'jwtkey');
    const post = await Post.create({
      title: 'test post',
      desc: 'test description',
      img: 'test.jpg',
      cat: 'test category',
      uid: user.id,
    });
    postId = post.id;
  });

  after(async () => {
    // Delete the test post
    await Post.destroy({ where: { id: postId } });
    // server.close((err) => {
    //   if (err) throw err;
    //   console.log('Server has been closed');
    // });
  });

  it('should update a post', (done) => {
    const updatedPost = {
      title: 'updated post',
      desc: 'updated description',
      img: 'updated.jpg',
      cat: 'updated category',
    };

    chai.request(app)
      .put(`/api/posts/${postId}`)
      .set('Cookie', `access_token=${token}`)
      .send(updatedPost)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Post has been updated!');
        done();
      });
  });

  it('should not update a post if the user is not authenticated', (done) => {
    const updatedPost = {
      title: 'updated post',
      desc: 'updated description',
      img: 'updated.jpg',
      cat: 'updated category',
    };

    chai.request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('string').eql('Not authenticated!');
        done();
      });
  });

  it('should not update a post if the user is not the owner of the post', (done) => {
    const otherUser = { id: 2, username: 'otheruser' };
    const otherToken = jwt.sign(otherUser, 'jwtkey');
    const updatedPost = {
      title: 'updated post',
      desc: 'updated description',
      img: 'updated.jpg',
      cat: 'updated category',
    };

    chai.request(app)
      .put(`/api/posts/${postId}`)
      .set('Cookie', `access_token=${otherToken}`)
      .send(updatedPost)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('string').eql('You can update only your post!');
        done();
      });
  });

  it('should return an error if the post does not exist', (done) => {
    const updatedPost = {
      title: 'updated post',
      desc: 'updated description',
      img: 'updated.jpg',
      cat: 'updated category',
    };

    chai.request(app)
      .put('/api/posts/999')
      .set('Cookie', `access_token=${token}`)
      .send(updatedPost)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Post not found!');
        done();
      });
  });
});