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
export const getAllGroups = () => {
  return groupsRef
    .get()
    .then(doc => doc.docs.map(d => ({ id: d.id, ...d.data() })));
};
export const addUserToGroup = (groupId, userId) => {
  return groupsRef
    .doc(groupId)
    .update({ members: firebase.firestore.FieldValue.arrayUnion(userId) })
    .then(d => addGroupToUser(userId, groupId));
};

export const saveGroup = (userId, group) => {
  return groupsRef
    .add({ ...group, admin: userId, members: [userId] })
    .then(doc => addGroupToUser(userId, doc.id));
};
export const changeAdmin = (userId, groupId) => {
  return groupsRef.doc(groupId).update({ admin: userId });
};
export const addGroupToUser = (userId, groupId) => {
  return usersRef
    .doc(userId)
    .update({ groups: firebase.firestore.FieldValue.arrayUnion(groupId) });
};
export const getMembersOfGroup = groupId => {
  return usersRef
    .where("groups", "array-contains", groupId)
    .get()
    .then(docs => docs.docs.map(d => ({ id: d.id, ...d.data() })));
};
export const removeFromGroup = (userId, groupId) => {
  const userPromise = usersRef
    .doc(userId)
    .update({ groups: firebase.firestore.FieldValue.arrayRemove(groupId) });
  const groupsPromise = groupsRef
    .doc(groupId)
    .update({ members: firebase.firestore.FieldValue.arrayRemove(userId) });
  return Promise.all([userPromise, groupsPromise]);
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
