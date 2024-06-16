// const userSc = require("../schema/userSchema");
// require("dotenv").config();

// signUp = async (req, res) => {
//   try {
//     let user = await userSc.create(req.body);
//     user = user.toObject();
//     res.status(200).json({
//       type: "success",
//       message: "User Created",
//       data: {
//         user: user,
//       },
//     });
//   } catch (error) {
//     res.status(500).send({
//       statusCode: 500,
//       message: `Internal server error : ${error}`,
//     });
//   }
//   return;
// };

// module.exports = { signUp };
const userSc = require("../schema/userSchema");

const signUp = async (req, res) => {
  try {
    let user = await userSc.create(req.body);
    user = user.toObject();
    res.status(200).json({
      type: "success",
      message: "User Created",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: `Internal server error : ${error}`,
    });
  }
};

const getInfo = async (req, res) => {
  try {
    // Implement logic to retrieve specific data
    // For example, retrieving all users with specific fields
    const users = await userSc.find(
      {},
      { _id: 0, books: 1, date: 1 }
    );

    res.status(200).json({
      type: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: `Internal server error : ${error}`,
    });
  }
};

module.exports = {
  signUp,
  getInfo,
};
