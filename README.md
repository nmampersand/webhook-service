# webhook-service

A service which handles webhooks to support the platform.

## Supported Webhooks

### GraphCMS

Listens for create/update events (currently only Ride) from GraphCMS and auto publishes them.

#### Manual Deployment

`STAGE=dev npm serverless deploy --stage=${STAGE}`

