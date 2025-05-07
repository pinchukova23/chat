const users = [];

const findUser = (user) => {
  const userName = user.name.trim().toLowerCase();
  const userRoom = user.room.trim().toLowerCase();

  return (isExist = users.find(
    (u) =>
      u.name.trim().toLowerCase() === userName &&
      u.room.trim().toLowerCase() === userRoom
  ));
};

const addUser = (user) => {
  const isExist = findUser(user);

  !isExist && users.push(user);

  const currentUser = isExist || user;

  return { isExist: !!isExist, user: currentUser };
};

module.exports = { addUser, findUser };
