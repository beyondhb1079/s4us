import firebase from 'firebase';

export function loadBookmarks(onLoad) {
  const db = firebase.firestore();
  db.collection('bookmarks').get().then((querySnapshot) => {
    const bookmarks = querySnapshot.docs.map((doc) => doc.data());
    onLoad(bookmarks);
  });
}
