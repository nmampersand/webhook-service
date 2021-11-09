const { gql } = require('graphql-request');
const R = require('ramda');

module.exports = ({ graphcmsClient }) => R.cond([
  [R.propEq('operation', 'update'), ({ data }) => graphcmsClient.request(gql`
    mutation PublishLocationPoint($id: ID!) {
      publishLocationPoint(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }`,
    { id: data.id }
  ).then(() => console.log(`Published LocationPoint(${ data.id })`))],
  // newly created locationPoints are published on ride create
  [R.T, () => true]
]);