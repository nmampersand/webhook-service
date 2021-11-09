const { gql } = require('graphql-request');
const R = require('ramda');

module.exports = ({ graphcmsClient }) => R.cond([
  [R.propEq('operation', 'create'), ({ data }) => graphcmsClient
    .request(gql`
      mutation PublishNewRide($id: ID!) {
        publishManyLocationPoints(where: {ride: {id: $id}}, to: PUBLISHED) {
          count
        }
        publishRide(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `,
    { id: data.id })
    .then(() => console.log(`Published Ride(${data.id})`))
  ],
  [R.propEq('operation', 'update'), ({ data }) => graphcmsClient
    .request(gql`
      mutation PublishRide($id: ID!) {
        publishRide(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `, { id: data.id })
    .then(() => console.log(`Published Ride(${ data.id })`))
  ],
  [R.T, () => true]
]);