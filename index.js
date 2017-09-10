import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import {schema, rootValue} from './api'

const PORT = process.env.PORT || 4000

// Express
const app = express()

app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({schema, rootValue}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

app.listen(PORT, () => {
	console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`)
})
