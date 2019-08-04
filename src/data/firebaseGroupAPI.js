import { db } from "./firebaseConfig";
import firebase from "firebase/app";
let groupsRef = db.collection("groups");
const usersRef = db.collection("users");
export const groupNameIsUnique = groupName => {
  return groupsRef
    .where("groupName", "==", groupName)
    .get()
    .then(doc => doc.size === 0);
};
export const saveGroup = (userId, group) => {
  return groupsRef
    .add({ ...group, adimn: userId, members: [userId] })
    .then(doc => addGroupToUser(userId, doc.id));
};
export const addGroupToUser = (userId, groupId) => {
  return usersRef
    .doc(userId)
    .update({ groups: firebase.firestore.FieldValue.arrayUnion(groupId) });
};
export const getGroupsForUser = uid => {
  return groupsRef
    .where("members", "array-contains", uid)
    .get()
    .then(docs => {
      console.log(docs.size);
      return docs.docs.map(d => {
        console.log("id ", d, d.data());
        return { id: d.id, ...d.data() };
      });
    });
};
