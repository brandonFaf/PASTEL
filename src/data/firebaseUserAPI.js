import { db } from "./firebaseConfig";
export const loadUser = uid => {
  return db
    .collection("users")
    .doc(uid)
    .get();
};
export const loadAllUsers = () => {
  return db.collection("users").get();
};
