import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AboutCard from '../components/AboutCard';
import testPic from '../logo.svg';

function About() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>About UndocuScholar</h1>
      <h2>Scholarship Search With UndocuScholar</h2>
      <p>
        Est elit eu mollit reprehenderit enim nisi ea velit mollit dolore.
        Tempor exercitation ullamco tempor occaecat ad ex velit labore excepteur eiusmod minim.
        Enim id aliqua irure veniam est irure culpa ea deseru.
        Ullamco laboris ea ut cupidatat non velit mollit ea ullamco eiu.
        Enim amet officia fugiat dolore ullamco consequat laboris culpa.
      </p>

      <h2>Our History</h2>
      <p>
        Et dolor ex pariatur ex voluptate commodo voluptate culpa commodo pariatur magna occaecat.
        Mollit fugiat ad exercitation enim.
        Eu pariatur id ut mollit do sunt proident consequat exercitation est.
        Voluptate cillum tempor elit proident. Esse culpa eiusmod irure aute qui nulla.
        Reprehenderit enim aute commodo cupidatat ut ipsum ea minim magna velit.
      </p>

      <h2>How UndocuScholar Works</h2>
      <p>
        Laboris amet nostrud amet anim fugiat deserunt ad laboris dolore sint eiusmod.
        In cupidatat amet eu excepteur reprehenderit quis enim id velit labore
        duis culpa. Ex culpa occaecat velit consequat eu.
        Labore eiusmod pariatur occaecat aliqua reprehenderit laboris.
        Officia qui ad do magna excepteur proident laborum ea laborum consectetur aliqua pariatur.
      </p>

      <h2>Meet the Developers</h2>
      <Grid container justify="space-evenly" spacing={3}>
        <Grid item xs={10} sm={6} md={4}>
          <AboutCard img={testPic} name="Josue Rios" description="Deserunt proident dolor ad anim exercitation duis et laboris ipsum nisi cillum." />
        </Grid>
        <Grid item xs={10} sm={6} md={4}>
          <AboutCard img={testPic} name="Edwin Lopez" description="Minim esse labore laborum ipsum laboris ex occaecat quis ad esse laborum irure." />
        </Grid>
        <Grid item xs={10} sm={6} md={4}>
          <AboutCard img={testPic} name="Gonzalo Lara" description="Eiusmod tempor ipsum nostrud quis commodo enim enim voluptate cillum laboris esse esse velit tempor. " />
        </Grid>
        <Grid item xs={10} sm={6} md={4}>
          <AboutCard img={testPic} name="Sergio Mejia" description="Anim dolor ad exercitation eu. Do minim ullamco ea esse qui duis incididunt." />
        </Grid>
        <Grid item xs={10} sm={6} md={4}>
          <AboutCard img={testPic} name="Alejandro Loaiza" description="Ad laboris duis nostrud eiusmod incididunt adipisicing ut. Anim qui deserunt incididunt ullamco." />
        </Grid>
      </Grid>

      <h2>Apply for Scholarships today</h2>
      <p>
        Laborum aliqua labore nulla non consequat mollit nostrud quis commodo tempor labore irure.
      </p>
      <Link to="/scholarships">
        <Button variant="contained" color="primary">Start Your Search</Button>
      </Link>
    </div>
  );
}

export default About;
