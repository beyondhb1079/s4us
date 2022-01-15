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
  author: { id: 'alice', email: 'alice@gmail.com' },
};

const unauthedApp = initializeTestApp({
  projectId: MY_PROJECT_ID,
});

const aliceId = 'alice';
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
      .set({ ...newScholarship })
  );
});

test('denies scholarships update when user is not author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship })
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
      .set({ ...newScholarship })
  );
  return assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, name: 'updated name' })
  );
});

test('allows scholarships update when user is admin', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship })
  );
  return assertSucceeds(
    adminApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship, name: 'updated name' })
  );
});

test('denies scholarship delete when user is not author', async () => {
  await assertSucceeds(
    aliceApp
      .firestore()
      .collection('scholarships')
      .doc('KLJASDQW')
      .set({ ...newScholarship })
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
      .set({ ...newScholarship })
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
      .set({ ...newScholarship })
  );

  return assertSucceeds(
    adminApp.firestore().collection('scholarships').doc('KLJASDQW').delete()
  );
});

describe('scholarship alidation rules', () => {
  const collection = (id) =>
    aliceApp.firestore().collection('scholarships').doc(id);

  test('fails create when name not a string', () => {
    return assertFails(collection('abc').set({ ...newScholarship, name: 34 }));
  });

  test('fails update when name not a string', async () => {
    await assertSucceeds(collection('abc').set(newScholarship));
    return assertFails(collection('abc').set({ ...newScholarship, name: 34 }));
  });

  test('fails create when amount type not in AmountType', () => {
    const amount = { type: 'random', min: 0, max: 0 };
    return assertFails(
      collection('ab').set({ ...newScholarship, amount: amount })
    );
  });

  test('fails update when amount type not in AmountType', async () => {
    const amount = { type: 'random', min: 0, max: 0 };
    await assertSucceeds(collection('ab').set(newScholarship));
    return assertFails(
      collection('ab').set({ ...newScholarship, amount: amount })
    );
  });

  test('fails create when amount min/max not an integer', () => {
    const amount = { type: 'VARIES', min: false, max: '0' };
    return assertFails(
      collection('ab').set({ ...newScholarship, amount: amount })
    );
  });

  test('fails update when amount min/max are not an integer', async () => {
    const amount = { type: 'VARIES', min: false, max: '0' };
    await assertSucceeds(collection('ab').set(newScholarship));
    return assertFails(collection('ab').set({ ...newScholarship, amount }));
  });

  test('fails create when description not string', () => {
    return assertFails(
      collection('qw').set({ ...newScholarship, description: 43 })
    );
  });

  test('fails update when description not a string', async () => {
    await assertSucceeds(collection('qw').set(newScholarship));
    return assertFails(
      collection('qw').set({ ...newScholarship, description: 43 })
    );
  });

  test('fails create when deadline not a Date', () => {
    return assertFails(
      collection('zs').set({ ...newScholarship, deadline: 43 })
    );
  });

  test('fails update when deadline not a Date', async () => {
    await assertSucceeds(collection('zs').set(newScholarship));
    return assertFails(
      collection('zs').set({ ...newScholarship, deadline: 43 })
    );
  });

  test('fails create when website not a string', () => {
    return assertFails(
      collection('re').set({ ...newScholarship, website: 43 })
    );
  });

  test('fails update when website not a string', async () => {
    await assertSucceeds(collection('re').set(newScholarship));
    return assertFails(
      collection('re').set({ ...newScholarship, website: 43 })
    );
  });

  test('fails create when organization not a string', () => {
    return assertFails(
      collection('or').set({ ...newScholarship, organization: 23 })
    );
  });

  test('fails update when organization not a string', async () => {
    await assertSucceeds(collection('or').set(newScholarship));
    return assertFails(
      collection('or').set({ ...newScholarship, organization: 23 })
    );
  });

  test('fails create when tags not an array', () => {
    return assertFails(
      collection('ta').set({ ...newScholarship, tags: 'list' })
    );
  });

  test('fails update when tags not an array', async () => {
    await assertSucceeds(collection('ta').set(newScholarship));
    return assertFails(
      collection('ta').set({ ...newScholarship, tags: 'list' })
    );
  });

  test('fails create when dateAdded not a Date', () => {
    return assertFails(
      collection('da').set({ ...newScholarship, dateAdded: 43 })
    );
  });

  test('fails update when dateAdded not a Date', async () => {
    await assertSucceeds(collection('da').set(newScholarship));
    return assertFails(
      collection('da').set({ ...newScholarship, dateAdded: 43 })
    );
  });

  test('fails create when lastModified not a Date', () => {
    return assertFails(
      collection('lm').set({ ...newScholarship, lastModified: 43 })
    );
  });

  test('fails update when lastModified not a Date', async () => {
    await assertSucceeds(collection('lm').set(newScholarship));
    return assertFails(
      collection('lm').set({ ...newScholarship, lastModified: 43 })
    );
  });

  test('fails create when author not an object', () => {
    return assertFails(
      collection('au').set({ ...newScholarship, author: '{}' })
    );
  });

  test('fails update when author not an object', async () => {
    await assertSucceeds(collection('au').set(newScholarship));
    return assertFails(
      collection('au').set({ ...newScholarship, author: '{}' })
    );
  });

  test('fails create when author id not a string', () => {
    return assertFails(
      collection('ai').set({
        ...newScholarship,
        author: { id: 2, email: 'test@gmail.com' },
      })
    );
  });

  test('fails update when author id not a string', async () => {
    await assertSucceeds(collection('ai').set(newScholarship));
    return assertFails(
      collection('ai').set({
        ...newScholarship,
        author: { id: 2, email: 'test@gmail.com' },
      })
    );
  });

  test('fails create when author email not a string', () => {
    return assertFails(
      collection('ae').set({
        ...newScholarship,
        author: { email: 2, id: aliceId },
      })
    );
  });

  test('fails update when author email not a string', async () => {
    await assertSucceeds(collection('ae').set(newScholarship));
    return assertFails(
      collection('ae').set({
        ...newScholarship,
        author: { id: aliceId, email: 2 },
      })
    );
  });

  describe('requirements validation', () => {
    const scholarship = { ...newScholarship };
    scholarship.requirements = {};

    test('fails create when requirements not an object', () => {
      return assertFails(
        collection('re').set({ ...newScholarship, requirements: 3.4 })
      );
    });

    test('fails update when requirements not an object', async () => {
      await assertSucceeds(collection('re').set(newScholarship));
      return assertFails(
        collection('re').set({ ...newScholarship, requirements: 3.4 })
      );
    });

    test('fails create when gpa is not a number', () => {
      return assertFails(
        collection('gp').set({
          ...newScholarship,
          requirements: { gpa: '3.0' },
        })
      );
    });

    test('fails update when gpa is not a number', async () => {
      await assertSucceeds(collection('gp').set(newScholarship));
      return assertFails(
        collection('gp').set({
          ...newScholarship,
          requirements: { gpa: '3.0' },
        })
      );
    });

    test('fails create when gpa is less than 0', () => {
      return assertFails(
        collection('gp').set({ ...newScholarship, requirements: { gpa: -3 } })
      );
    });

    test('fails update when gpa is less than 0', async () => {
      await assertSucceeds(collection('gp').set(newScholarship));
      return assertFails(
        collection('gp').set({
          ...newScholarship,
          requirements: { gpa: -3 },
        })
      );
    });

    test('fails create when gpa is greater than 4', () => {
      return assertFails(
        collection('gp').set({ ...newScholarship, requirements: { gpa: 4.1 } })
      );
    });

    test('fails update when gpa is greater than 4', async () => {
      await assertSucceeds(collection('gp').set(newScholarship));
      return assertFails(
        collection('gp').set({ ...newScholarship, requirements: { gpa: 4.1 } })
      );
    });

    test('fails create when ethnicities not an array', () => {
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
