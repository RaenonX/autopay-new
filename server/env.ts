import * as dotenv from 'dotenv';
import * as env from 'env-var';


dotenv.config();

export const API_PATH_REQUEST = env.get('API_PATH_REQUEST').required().asString();

export const API_MERCHANT_NO = env.get('API_MERCHANT_NO').required().asString();

export const API_MERCHANT_CODE = env.get('API_MERCHANT_CODE').required().asString();

export const API_CALLBACK_URL = env.get('API_CALLBACK_URL').required().asString();

export const API_REDIRECT_URL = env.get('API_REDIRECT_URL').required().asString();
