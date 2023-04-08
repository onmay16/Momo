import axios from 'axios';
import { FIRESTORE_API_URL, PROJECT_ID } from '@env';

import { getAuthToken } from '../utils/utils';

export const getUserRoutine = async () => {
  try {
    const response = await axios.get(
      // TODO: replace 'user1' with token
      `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1/routine`
    );
    return response;
  } catch (error) {
    return error;
  }
};
