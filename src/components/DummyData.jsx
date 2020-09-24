import React from 'react';
import { loadBookmarks } from '../lib/backend';

export default class DummyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarks: [] };
    loadBookmarks((result) => {
      this.setState({
        bookmarks: result,
      });
      console.log(result);
    });
  }

  render() {
    return (
      <div>
        {this.state.bookmarks.map((bookmark) => (
          <div>
            <h1>{bookmark.scholarship_id}</h1>
            <h2>{new Date(bookmark.bookmark_date.seconds * 1000).toString()}</h2>
          </div>
        ))}
      </div>
    );
  }
}
