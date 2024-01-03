import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';

export async function getAllDataInRoute(path: string) {
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    const dataArray = Object.values(data);
    return dataArray;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function checkIfCreator(userID: string) {
  const dataRef = ref(database, 'roles/creators');
  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const usersArray = Object.values(data);


      const isCreator = usersArray.includes(userID);

      if (isCreator) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error('Invalid data format');
      return false;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function checkIfAdmin(userID: string) {
  const dataRef = ref(database, 'roles/admins');
  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const usersArray = Object.values(data);


      const isAdmin = usersArray.includes(userID);

      if (isAdmin) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error('Invalid data format');
      return false;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getUserRoles(userID: string) {
  const creatorRoles = await checkIfCreator(userID);
  const adminRoles = await checkIfAdmin(userID);

  const userRoles = [];

  if (creatorRoles) {
    userRoles.push('creator');
  }

  if (adminRoles) {
    userRoles.push('admin');
  }

  return userRoles;
}



