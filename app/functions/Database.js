import database from '@react-native-firebase/database';

class Database {
  async dataBaseRead(ref) {
    return await database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        return snapshot
      })
      .catch((e) => {
        return false;
      });
  }

  async databaseWrite(ref, value) {
    return await database()
      .ref(ref)
      .set(value)
      .then(() => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }
  async databaseDelete(ref) {
    return await database()
      .ref(ref)
      .remove()
      .then(() => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }

   databaseKey() {
    return database().ref().push().key;
   
  }
 
}

export default new Database();
