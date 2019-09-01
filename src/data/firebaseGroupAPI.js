import { db } from './firebaseConfig';
import firebase from 'firebase/app';
let groupsRef = db.collection('groups');
const usersRef = db.collection('users');
export const groupNameIsUnique = groupName => {
  return groupsRef
    .where('groupName', '==', groupName)
    .get()
    .then(doc => doc.size === 0);
};
export const getGroup = groupId => {
  return groupsRef
    .doc(groupId)
    .get()
    .then(d => ({ id: d.id, ...d.data() }));
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
  let docId;
  group.groupName = group.groupName.toUpperCase();
  return groupsRef
    .add({ ...group, admin: userId, members: [userId] })
    .then(doc => {
      docId = doc.id;
      return addGroupToUser(userId, doc.id);
    })
    .then(_ => docId);
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
    .where('groups', 'array-contains', groupId)
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
export const deleteGroup = (members, groupId) => {
  for (let member of members) {
    usersRef
      .doc(member.id)
      .update({ groups: firebase.firestore.FieldValue.arrayRemove(groupId) });
  }
  return groupsRef.doc(groupId).delete();
};
export const getGroupsForUser = uid => {
  return groupsRef
    .where('members', 'array-contains', uid)
    .get()
    .then(docs => {
      console.log(docs.size);
      return docs.docs.map(d => {
        return { id: d.id, ...d.data() };
      });
    });
};
