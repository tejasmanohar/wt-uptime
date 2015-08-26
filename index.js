'use latest';

import P from 'bluebird';
import request from 'superagent-bluebird-promise';
import twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, MY_PHONE_NUMBER, URL } = ctx.data;

const twilioClient = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const createMessage = P.promisify(twilioClient.sms.messages.create, twilioClient);

