import { db } from './firebaseConfig';
const usersRef = db.collection('users');
export const loadUser = uid => {
  return usersRef.doc(uid).get();
};
export const loadAllUsers = group => {
  return (
    usersRef
      .where('groups', 'array-contains', group)
      // .orderBy("score", "desc")
      .get()
      .then(userSS => {
        return userSS.docs.map(u => {
          return { id: u.id, ...u.data() };
        });
      })
  );
};

export const updateUser = (userId, userData) => {
  console.log('update:', userId);
  return usersRef.doc(userId).set(userData, { merge: true });
};
export const displayNameIsUnique = (userName, uid) => {
  return usersRef
    .where('displayName', '==', userName)
    .get()
    .then(doc => (doc.size === 0 ? true : doc.docs[0].id === uid));
};
export const getWeekScore = (uid, week, groupId) => {
  return usersRef
    .doc(uid)
    .get()
    .then(doc => {
      const weekScores = doc.data().weekScores || {};
      const scoresArray = weekScores[groupId] || [];
      return scoresArray[week - 1] || 0;
    });
};
