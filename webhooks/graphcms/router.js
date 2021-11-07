const { createHmac } = require('crypto');
const R = require('ramda');
const { okRequest, badRequest } = require('../../lib/response');

module.exports = R.curry(async (handlers, context, req) => {
  try {
    const signature = R.prop('gcms-signature', req.headers) || R.prop('Gcms-Signature', req.headers);
    if(!signature) throw Error('Invalid token');

    const [rawSign, rawEnv, rawTimestamp] = signature.split(', ');
  
    const sign = rawSign.replace('sign=', '');
    const EnvironmentName = rawEnv.replace('env=', '');
    const Timestamp = parseInt(rawTimestamp.replace('t=', ''));

    const body = JSON.parse(req.body);
  
    const payload = JSON.stringify({
      Body: JSON.stringify(body),
      EnvironmentName,
      TimeStamp: Timestamp,
    });
  
    const hash = createHmac('sha256', context.GRAPHCMS_WEBHOOK_SECRET)
      .update(payload)
      .digest('base64');
  
    if(sign !== hash) throw Error('Invalid token');

    const handler = handlers[R.path(['data', '__typename'], body)];
    if(!handler) {
      console.log('No handler for this type yet');
      return okRequest();
    }

    await handler(context, body.data);
  
    return okRequest();
  } catch(err) {
    console.log(`Webhook error: ${ err.message }`);
    return badRequest();
  }
});