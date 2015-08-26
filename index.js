'use latest';

import P from 'bluebird';
import request from 'superagent-bluebird-promise';
import twilio from 'twilio';

const twilioClient = new twilio.RestClient(ctx.data.TWILIO_ACCOUNT_SID, ctx.data.TWILIO_AUTH_TOKEN);

export default function(ctx, cb) {
  const reqs = meetsReqs();
  if (!reqs.success) {
    return cb(new Error(reqs.message));
  }

  request.get(ctx.data.URL)
    .catch(() => {
      notifyUser();
    }).finally(() => {
      cb();
    });
}

function meetsReqs() {
  const keys = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER', 'MY_PHONE_NUMBER', 'URL'];
  for (let key of keys) {
    if (!ctx.data[key]) {
      return {
        success: false,
        message: `${key} secret is missing!`
      };
    }
  }
}

function notifyUser() {
  return twilioClient.sms.messages.post({
    to: MY_PHONE_NUMBER,
    from: ctx.data.TWILIO_PHONE_NUMBER,
    body: 'Site down!'
  });
}
