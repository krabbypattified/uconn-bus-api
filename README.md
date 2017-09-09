# Quickstart
1. Create a new Postgres DB (see below)
2. Run `yarn install`
3. Run `yarn start`


### Creating a Postgres DB
1. Download Postgres at https://postgresapp.com/
2. Install the CLI by running
	`sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
2. Create a database and user by running
	`psql`
	`CREATE DATABASE test_graphql_db;`
	`CREATE USER test_graphql_admin WITH PASSWORD 'iamapassword';`
	`GRANT ALL PRIVILEGES ON DATABASE "test_graphql_db" to test_graphql_admin;`
