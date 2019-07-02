import { db } from "./firebaseConfig";
export const loadUser = uid => {
  return db
    .collection("users")
    .doc(uid)
    .get();
};
export const loadAllUsers = () => {
  return db
    .collection("users")
    .orderBy("score", "desc")
    .get()
    .then(userSS => {
      return userSS.docs.map(u => {
        return { id: u.id, ...u.data() };
      });
    });
};
