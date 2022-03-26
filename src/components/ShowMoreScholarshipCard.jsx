import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ShowMoreScholarshipCard({ scholarship }) {
  const {
    name,
    organization,
    amount,
    deadline,
    website,
    description,
    tags,
    reqs,
    author,
  } = scholarship.data;

  // dummy variables
  const org = organization;
  console.log(org);
  const web = website;
  console.log(web);
  console.log(tags);
  console.log(reqs);
  console.log(author);

  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{amount}</Typography>
        <Typography>{deadline}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
}
