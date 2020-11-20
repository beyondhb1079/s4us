import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import pic from '../img/blank.png';

const content = {
  0: {
    direction: 'row-reverse',
    tab: '', // empty
    title: 'For and by the Community',
    description:
      'Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.',
    button: (
      <Link to="/about">
        <Button variant="outlined" color="primary">
          Learn More
        </Button>
      </Link>
    ),
    picture: pic,
  },
};

function Home() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Find Scholarships Today</h1>
      <ScholarshipsMadeSimple />
      <HomeSection
        direction={content[0].direction}
        tab={content[0].tab}
        title={content[0].title}
        description={content[0].description}
        button={content[0].button}
        pic={content[0].picture}
      />
    </Container>
  );
}

export default Home;
