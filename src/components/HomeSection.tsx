import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

interface HomeSectionProps {
  alignItems?: string;
  direction?: 'row' | 'row-reverse';
  title: string;
  main?: boolean;
  description?: string;
  buttons?: JSX.Element[];
  pic: string;
}

const HomeSection = ({
  alignItems = 'flex-start',
  direction = 'row',
  title,
  main = false,
  description = '',
  buttons = [],
  pic,
}: HomeSectionProps): JSX.Element => {
  const picSize = main ? '95%' : '85%';
  return (
    <Container sx={{ padding: 4 }}>
      <Grid container spacing={3} direction={direction} alignItems={alignItems}>
        <Grid item xs={12} sm={6}>
          <Typography variant={main ? 'h2' : 'h3'} component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Grid container spacing={2}>
            {buttons.map((button: JSX.Element, i: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item key={i}>
                {button}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ height: 400 }}>
          <img
            src={pic}
            alt=""
            style={{
              width: picSize,
              height: picSize,
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeSection;
