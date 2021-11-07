const { GraphQLClient } = require('graphql-request');
const Router = require('./router');

// eslint-disable-next-line no-undef
const { GRAPHCMS_ENDPOINT, GRAPHCMS_MUTATION_TOKEN, GRAPHCMS_WEBHOOK_SECRET } = process.env;

const routes = {
  Ride: require('./publishRide')
}

const context = {
  GRAPHCMS_WEBHOOK_SECRET,
  graphcmsClient: new GraphQLClient(
    GRAPHCMS_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${ GRAPHCMS_MUTATION_TOKEN }`,
      },
    }
  )
};

module.exports = Router(routes, context);