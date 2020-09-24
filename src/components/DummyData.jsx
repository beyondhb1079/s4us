import React, { useState } from 'react';
import { loadBookmarks } from '../lib/backend';

export default function DummyData() {
  const [bookmarks, setBookmarks] = useState([]);
  loadBookmarks((bookmarks) => { setBookmarks(bookmarks); console.log(bookmarks) });
  return (
    <div>
      {bookmarks.map((bookmark) =>
        <div>
          <h1>bookmark.scholarship_id</h1>
          <h2>bookmark.bookmark_date</h2>
        </div>
      )}
    </div>
  );
}
