import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  dataSourceOptions, dataSourceOptionsForSeeds
} from 'src/db/data-source';
import { DataSource } from 'typeorm';
import { createDatabase, runSeeders } from 'typeorm-extension';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerAs('database', () => ({
        ...dataSourceOptions,
        autoLoadEntities: true
      }))]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      })
    })
  ],
  controllers: [],
  providers: [],
})

export class DbModule {
  constructor(private configService: ConfigService) {
    this.seed();
  }

  async seed() {
    await createDatabase({
      options: dataSourceOptions,
      initialDatabase: this.configService.get('database.database'),
      ifNotExist: true
    });

    const dataSource = new DataSource(dataSourceOptionsForSeeds);
    await dataSource.initialize();

    await runSeeders(dataSource);
  }
}
