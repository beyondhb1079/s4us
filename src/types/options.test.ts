import schoolsData from '../../public/data/schools.json';

test('no duplicate schools', () => {
  schoolsData.forEach((s) =>
    expect(
      schoolsData.filter((t) => t.name === s.name && t.state === s.state),
    ).toHaveLength(1),
  );
});
