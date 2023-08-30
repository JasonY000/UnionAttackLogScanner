import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App.jsx';
require('dotenv').config();
const app = require('../server/server.js');
const request = require('supertest');

xdescribe('App', () => {
  describe('Rendering', () => {
    it('renders the app component', () => {
      render(<App />);
      const linkElement = screen.getByText(/ARGO damage tracker/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});

describe('serve webpages', () => {
  let server;
  beforeAll(async () => {
    server = await app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  });

  afterAll(async () => {
    await server.close();
    console.log(`Server closed on port ${process.env.PORT}`);
  });

  it('GET "/" should respond with index.html', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it('GET "/error" should respond with 404', (done) => {
    request(app)
      .get('/error')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
