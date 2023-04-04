import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { DbService } from 'src/db/db.service';
import { loginUser, signupUser } from 'src/auth/data_models';

describe('App e2e', () => {
  let app: INestApplication;
  let db: DbService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3000);

    db = app.get(DbService);
    db.cleanData();

    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      const body: signupUser = {
        email: 'thisIs@anemail.com',
        password: 'SomePass123',
        firstName: 'radwan',
        lastName: 'jab',
      };
      it('working signup', () => {
        return pactum
          .spec()
          .post('/auth/signup/')
          .withBody(body)
          .expectStatus(201);
      });
      it('invalid signup: account already exists', () => {
        return pactum
          .spec()
          .post('/auth/signup/')
          .withBody(body)
          .expectStatus(403);
      });
      it('invalid signup: empty email', () => {
        return pactum
          .spec()
          .post('/auth/signup/')
          .withBody({
            password: body.password,
          })
          .expectStatus(400);
      });
      it('invalid signup: empty password', () => {
        return pactum
          .spec()
          .post('/auth/signup/')
          .withBody({
            email: body.email,
          })
          .expectStatus(400);
      });
    });

    describe('Login', () => {
      const body: loginUser = {
        email: 'thisIs@anemail.com',
        password: 'SomePass123',
      };
      it('valid login', () => {
        return pactum
          .spec()
          .post('/auth/login/')
          .withBody(body)
          .expectStatus(200);
      });
      it('invalid login: empty email', () => {
        return pactum
          .spec()
          .post('/auth/login/')
          .withBody({
            password: body.password,
          })
          .expectStatus(400);
      });
      it('invalid login: empty password', () => {
        return pactum
          .spec()
          .post('/auth/login/')
          .withBody({
            email: body.email,
          })
          .expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get Me', () => {});
    describe('Edit', () => {});
  });

  describe('Bookmark', () => {
    describe('Create', () => {});
    describe('Get All', () => {});
    describe('Get by ID', () => {});
    describe('Edit', () => {});
    describe('Delete', () => {});
  });
});
