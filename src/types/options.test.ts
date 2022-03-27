import { SCHOOLS } from './options';
test('no duplicate schools', () => {
  SCHOOLS.forEach((s) =>
    expect(
      SCHOOLS.filter((t) => t.name === s.name && t.state === s.state)
    ).toHaveLength(1)
  );
});
