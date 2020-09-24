import firebase from 'firebase';

export function loadBookmarks(onLoad) {
  const db = firebase.firestore();
  db.collection('bookmarks').get().then((querySnapshot) => {
    let bookmarks = [];
    querySnapshot.forEach((doc) => {
      bookmarks.push(doc.data());
      console.log(`${doc.id} => ${doc.data().bookmark_date}`);
    });
    onLoad(bookmarks)
  });
}