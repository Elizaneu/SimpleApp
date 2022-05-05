db = db.getSiblingDB("sample");

db.createUser({
  user: "liza",
  pwd: "123",
  roles: [
    {
      role: "readWrite",
      db: "sample",
    },
  ],
});

db.createCollection("init");

db.init.insertMany([
  {
    isInited: true,
  },
]);
