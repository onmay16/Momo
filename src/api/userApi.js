import axios from 'axios';
import { FIRESTORE_API_URL, PROJECT_ID } from '@env';

import { getAuthToken } from '../utils/utils';

export const getUserBasic = async () => {
  try {
    const response = await axios.get(
      // TODO: replace 'user1' with token
      `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/NBBAH21lfVFZOzXcv5Fx`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserRoutine = async () => {
    const response = await axios.get(
      // TODO: replace 'user1' with token
        `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/NBBAH21lfVFZOzXcv5Fx/routine`
    ).then(res => {
      return res;
    }).catch(e => {
      return e;
    });
    return response;
};

export const patchIndividualUserRoutine = async (routineId, data, updateMask) => {
  let updateMaskParam = '';
  updateMask.forEach(field => {
    updateMaskParam = updateMaskParam.concat('updateMask.fieldPaths=', field, '&');
  });
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/NBBAH21lfVFZOzXcv5Fx/routine/${routineId}?${updateMaskParam}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res;
  }).catch((error) => {
    return error(error);
  });
  return response;
};
