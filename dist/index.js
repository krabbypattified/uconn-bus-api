'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _apolloServerExpress = require('apollo-server-express');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 4000;

// Express
const app = (0, _express2.default)();

app.use((0, _cors2.default)());

app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: _api.schema, rootValue: _api.rootValue }));
app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
	console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});