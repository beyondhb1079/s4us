/**
 * @jest-environment node
 */
import {
  assertFails,
  assertSucceeds,
  clearFirestoreData,
  initializeTestApp,
} from '@firebase/rules-unit-testing';

const MY_PROJECT_ID = 'scholarships-rules-test';
const newScholarship = {
  name: 'test-scholarship',
  deadline: new Date(),
  description: 'this is a test scholarship',
  website: 'https://test.com',
  amount: {
    type: 'UNKNOWN',
    min: 0,
    max: 0,
  },
  dateAdded: new Date(),
  lastModified: new Date(),
};

const unauthedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
});

const aliceId = 'alice';
const aliceAuthor = { id: aliceId, email: 'alice@gmail.com' };
const aliceApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: aliceId },
});

const johnApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'john-doe' },
});

const adminApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
  auth: { uid: 'admin', admin: true },
});

beforeEach(() => clearFirestoreData({ projectId: MY_PROJECT_ID }));
afterAll(() =>
  Promise.all([unauthedApp, aliceApp, adminApp, johnApp].map((c) => c.delete()))
);

test('allows scholarships read when signed out', () => {
  return assertSucceeds(
    unauthedApp.firestore().collection('scholarships').doc('ASDK91023JUS').get()
  );
});

test('allows scholarships read when signed in', () => {
  return assertSucceeds(
    aliceApp.firestore().collection('scholarships').doc('ASDK91023JUS').get()
  );
});

test('denies scholarships write when signed out', () => {
  return assertFails(
    unauthedApp.firestore().collection('scholarships').doc().set(newScholarship)
  );
});

test('allows scholarships create when signed in', () => {
  return assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc()
      .set({
        ...newScholarship,
        author: aliceAuthor,
      })
  );
});

test('denies scholarships update when user is not author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: aliceAuthor })
  );

  return assertFails(
    johnApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});

test('allows scholarships update when user is author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: aliceAuthor })
  );

  return assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});

test('allows scholarships update when user is admin', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: aliceAuthor })
  );

  return assertSucceeds(
    adminApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ name: 'updated name' })
  );
});

test('denies scholarship delete when user is not author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: aliceAuthor })
  );

  return assertFails(
    johnApp.firestore().collection('scholarships').doc('KLJASDQW').delete()
  );
});

test('allows scholarship delete when user is author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: aliceAuthor })
  );

  return assertSucceeds(
    aliceApp.firestore().collection('scholarships').doc('KLJASDQW').delete()
  );
});

test('allows scholarship delete when user is admin', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, author: aliceAuthor })
  );

  return assertSucceeds(
    adminApp.firestore().collection('scholarships').doc('KLJASDQW').delete()
  );
});

describe('validation rules - create', () => {
  const collection = aliceApp.firestore().collection('scholarships').doc();

  test('fails when no scholarship name', () => {
    const scholarship = { ...newScholarship };
    delete scholarship.name;

    return assertFails(collection.set(scholarship));
  });

  test('fails when no scholarship amount', () => {
    const scholarship = { ...newScholarship };
    delete scholarship.amount;
    return assertFails(collection.set(scholarship));
  });

  test('fails when no scholarship description', () => {
    const scholarship = { ...newScholarship };
    delete scholarship.description;
    return assertFails(collection.set(scholarship));
  });

  test('fails when no scholarship deadline', () => {
    const scholarship = { ...newScholarship };
    delete scholarship.deadline;
    return assertFails(collection.set(scholarship));
  });

  test('fails when no scholarship website', () => {
    const scholarship = { ...newScholarship };
    delete scholarship.website;
    return assertFails(collection.set(scholarship));
  });

  test('fails when scholarship organization not a string', () => {
    return assertFails(collection.set({ ...newScholarship, organization: 23 }));
  });

  test('fails when scholarship tags not an array', () => {
    return assertFails(collection.set({ ...newScholarship, tags: 'list' }));
  });

  test('fails when scholarship dateAdded not a Date', () => {
    return assertFails(
      collection.set({ ...newScholarship, dateAdded: '12/23/12' })
    );
  });

  test('fails when scholarship lastModified not a Date', () => {
    return assertFails(
      collection.set({ ...newScholarship, lastModified: 'today' })
    );
  });

  test('fails when scholarship author not an object', () => {
    return assertFails(collection.set({ ...newScholarship, author: '{}' }));
  });

  test('fails when author id not a string', () => {
    return assertFails(
      collection.set({
        ...newScholarship,
        author: { id: 2, email: 'test@gmail.com' },
      })
    );
  });

  test('fails when author email not a string', () => {
    return assertFails(
      collection.set({ ...newScholarship, author: { email: 2, id: aliceId } })
    );
  });

  describe('requirements validation', () => {
    const scholarship = { ...newScholarship };
    scholarship.requirements = {};

    test('fails when scholarship requirements not an object', () => {
      return assertFails(
        collection.set({ ...newScholarship, requirements: 3.4 })
      );
    });

    test('fails when scholarship gpa is not a number', () => {
      scholarship.requirements.gpa = '3.0';
      return assertFails(collection.set(scholarship));
    });

    test('fails when gpa is less than 0', () => {
      scholarship.requirements.gpa = -3;
      return assertFails(collection.set(scholarship));
    });

    test('fails when gpa is greater than 4', () => {
      scholarship.requirements.gpa = 4.1;
      return assertFails(collection.set(scholarship));
    });

    test('fails when scholarship ethnicities is not an array', () => {
      scholarship.requirements.ethnicities = '[]';
      return assertFails(collection.set(scholarship));
    });

    test('fails when scholarship majors is not an array', () => {
      scholarship.requirements.majors = 'History';
      return assertFails(collection.set(scholarship));
    });

    test('fails when scholarship schools is not an array', () => {
      scholarship.requirements.schools = 'UCI';
      return assertFails(collection.set(scholarship));
    });

    test('fails when scholarship grades is not an array', () => {
      scholarship.requirements.grades = 8;
      return assertFails(collection.set(scholarship));
    });

    test('fails when scholarship states is not an array', () => {
      scholarship.requirements.states = 'WA';
      return assertFails(collection.set(scholarship));
    });

    test('fails when scholarship genders is not an array', () => {
      scholarship.requirements.genders = 'Male';
      return assertFails(collection.set(scholarship));
    });
  });
});

/*
describe('scholarship amount rule', () => {
  const scholarship = { ...newScholarship };
  const collection = aliceApp.firestore().collection('scholarships').doc();

  test('fails when amount not a map', () => {
    scholarship.amount = 'amount';
    return assertFails(collection.set(scholarship));
  });

  test('fails when type is not an AmountType key', () => {
    scholarship.amount = { type: 'random' };
    return assertFails(collection.set(scholarship));
  });

  test('fails when min/max is not int', () => {
    scholarship.amount.min = '0';
    scholarship.amount.max = '10';

    return (
      assertFails(collection.set(scholarship)) &&
      assertFails(collection.set(scholarship))
    );
  });
});
*/
