let users = [];

module.exports = {
  getAll: () => users,
  create: (user) => {
    const newUser = { id: Date.now(), ...user };
    users.push(newUser);
    return newUser;
  }
};
