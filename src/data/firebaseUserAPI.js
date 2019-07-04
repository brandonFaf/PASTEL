import { db } from "./firebaseConfig";
const usersRef = db.collection("users");
export const loadUser = uid => {
  return usersRef.doc(uid).get();
};
export const loadAllUsers = () => {
  return usersRef
    .orderBy("score", "desc")
    .get()
    .then(userSS => {
      return userSS.docs.map(u => {
        return { id: u.id, ...u.data() };
      });
    });
};
export const updateUser = (userId, userData) => {
  console.log("update:", userId);
  return usersRef
    .doc(userId)
    .set(userData, { merge: true })
    .then(console.log)
    .catch(console.log);
};
export const displayNameIsUnique = async (userName, uid) => {
  return usersRef
    .where("displayName", "==", userName)
    .get()
    .then(doc => (doc.size === 0 ? true : doc[0].id === uid));
};
