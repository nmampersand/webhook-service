const { gql } = require('graphql-request');

module.exports = ({ graphcmsClient }, ride) => Promise.all([
  // publish location points
  graphcmsClient.request(gql`
    mutation publishManyLocationPoints($rideId: ID!) {
      publishManyLocationPoints(where: {ride: {id: $rideId}}, to: PUBLISHED) {
        count
      }
    }`,
    { rideId: ride.id }
  ).then(() => console.log(`Published location points for Ride(${ride.id})`)),
  // publish ride
  graphcmsClient.request(gql`
    mutation publishRide($id: ID!) {
      publishRide(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }`,
    { id: ride.id }
  ).then(() => console.log(`Published Ride(${ride.id})`))
]);