'use latest';

import P from 'bluebird';
import request from 'superagent-bluebird-promise';
import twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_PHONE_NUMBER, URL } = ctx.data;

export default function(ctx, cb) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER || !MY_PHONE_NUMBER) {
    return cb(new Error('Key missing'));
  }

  request.get(URL)
    .catch(() => {
      notifyUser(MY_PHONE_NUMBER);
    }).finally(() => {
      cb();
    });
}

function sendText(phone) {
  return twilio.sms.messages.post({
    to: phone,
    from: TWILIO_PHONE_NUMBER,
    body: 'Site down!'
  });
}
