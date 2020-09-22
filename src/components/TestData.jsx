import React from 'react';

class TestData extends React.Component {
  state = {
    scholarships: null
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Scholarship List from Firestore!</h1>
      </div>
    )
  }
}

export default TestData;
