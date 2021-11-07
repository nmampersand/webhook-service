module.exports = {
  app: 'rmc',
  service: 'webhook-service',
  plugins: [
    'serverless-prune-plugin'
  ],
  package: {
    patterns: [
      '!**/.npm/**',
      '!**/.cache/**'
    ]
  },
  custom: {
    prune: {
      automatic: true,
      number: 3
    },
    vars: {
      GRAPHCMS_ENDPOINT: '${ssm:/${self:app}/${opt:stage}/graphcms/endpoint}',
      GRAPHCMS_WEBHOOK_SECRET: '${ssm:/${self:app}/${opt:stage}/graphcms/webhook-secret~true}',
      GRAPHCMS_MUTATION_TOKEN: '${ssm:/${self:app}/${opt:stage}/graphcms/webhook-mutation-token~true}',
    }
  },
  provider: {
    name: 'aws',
    stackName: '${self:app}-${opt:stage}-${self:service}',
    region: 'us-west-2',
    runtime: 'nodejs14.x',
    environment: {
      GRAPHCMS_ENDPOINT: '${self:custom.vars.GRAPHCMS_ENDPOINT}',
      GRAPHCMS_WEBHOOK_SECRET: '${self:custom.vars.GRAPHCMS_WEBHOOK_SECRET}',
      GRAPHCMS_MUTATION_TOKEN: '${self:custom.vars.GRAPHCMS_MUTATION_TOKEN}'
    }
  },
  functions: {
    onGraphCMSEvent: {
      name: '${self:app}-${opt:stage}-${self:service}-onGraphCMSEvent',
      handler: 'webhooks.graphcms',
      events: [{
        http: {
          path: 'webhooks/graphcms',
          method: 'post',
        }
      }]
    },
  }
}
