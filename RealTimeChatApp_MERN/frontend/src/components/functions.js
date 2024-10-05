export const getSender = (loggedInUser, users) => {
    console.log(users[0]?._id === loggedInUser?._id ? {name:users[1].name,profilepic:users[1].profilepic} : {name:users[0].name,profilepic:users[0].profilepic})
    
    return users[0]?._id === loggedInUser?._id ? {name:users[1].name,profilepic:users[1].profilepic} : {name:users[0].name,profilepic:users[0].profilepic};
  };
  