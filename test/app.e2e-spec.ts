import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Test } from '@nestjs/testing';
import { DbService } from 'src/db/db.service';

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

    db = app.get(DbService);
    db.cleanData();
  });

  afterAll(() => {
    app.close();
  });

  it.todo('should pass');
  it.todo('should pass');
});
