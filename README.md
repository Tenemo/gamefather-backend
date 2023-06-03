# gamefather-backend

## Running migrations and seeds

1. `sequelize-cli db:migrate`
2. `sequelize-cli db:seed:all`

## Creating migrations and seeds examples
`sequelize-cli migration:generate --name create-users`
`sequelize-cli seed:generate --name seed-users`

## Fresh start
`sequelize db:migrate:undo:all`
or
`sequelize db:migrate:undo:all && sequelize-cli db:migrate && sequelize-cli db:seed:all`

