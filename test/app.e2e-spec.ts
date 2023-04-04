import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { DbService } from 'src/db/db.service';
import { loginUser, signupUser } from 'src/auth/data_models';
import { createBookmarkDto } from 'src/bookmark/bookmark.dto';

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
          .stores('userJWT', 'access_token')
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
    describe('GetMe', () => {
      it('valid getme', () => {
        return pactum
          .spec()
          .withBearerToken('$S{userJWT}')
          .get('/user/me')
          .expectStatus(200);
      });
    });
    describe('Edit', () => {
      it('valid editMe', () => {
        return pactum
          .spec()
          .withBearerToken('$S{userJWT}')
          .withBody({
            email: 'thisIsAnotherEmail@anemail.com',
            firstName: 'ruwudwan',
            lastName: 'j0b',
          })
          .patch('/user/edit')
          .expectStatus(200)
          .expectBodyContains('j0b')
          .expectBodyContains('ruwudwan')
          .expectBodyContains('thisIsAnotherEmail@anemail.com');
      });
    });
  });

  describe('Bookmark', () => {
    describe('Create', () => {
      it('valid create', () => {
        let body: createBookmarkDto = {
          title: 'testing title',
          link: 'www.testing.com',
          description: '',
        };
        return pactum
          .spec()
          .withBearerToken('$S{userJWT}')
          .withBody(body)
          .post('/bookmark')
          .expectStatus(201);
      });

      it('invalid create: missing title', () => {
        let body = {
          link: 'www.testing.com',
          description: '',
        };
        return pactum
          .spec()
          .withBearerToken('$S{userJWT}')
          .withBody(body)
          .post('/bookmark')
          .expectStatus(400);
      });

      it('invalid create: missing link', () => {
        let body = {
          title: 'testing title',
          description: '',
        };
        return pactum
          .spec()
          .withBearerToken('$S{userJWT}')
          .withBody(body)
          .post('/bookmark')
          .expectStatus(400);
      });

      it('invalid create: incorrect link', () => {
        let body: createBookmarkDto = {
          title: 'testing title',
          link: 'this is not a link',
          description: '',
        };
        return pactum
          .spec()
          .withBearerToken('$S{userJWT}')
          .withBody(body)
          .post('/bookmark')
          .expectStatus(400);
      });
    });
    describe('Get All', () => {});
    describe('Get by ID', () => {});
    describe('Edit', () => {});
    describe('Delete', () => {});
  });
});
