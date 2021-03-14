import fetch from 'node-fetch';
import { CVAuthRequest, CVAuthResponse } from '../models/types/auth';
import * as config from '../config'
import { DateTime } from 'luxon'

const CAESAR_VISION_SERVICE = process.env.CAESAR_VISION_SERVICE
const AUTH_MESSAGE_TYPE = 1018

export const authorize = async (pin: number): Promise<CVAuthResponse> => {
  const request: CVAuthRequest = {
    messageType: AUTH_MESSAGE_TYPE,
    locationNumber: config.getLocationNumber(),
    dateTimeStampUTC: DateTime.utc().toFormat('yyyy-LL-dd HH:mm:ss'),
    PIN: pin ?? 0
  }

  const serviceResponse = await fetch(`${CAESAR_VISION_SERVICE}/mike`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const authResponse: CVAuthResponse = await serviceResponse.json();
  return authResponse;
}
