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
    // Check if Aadhar number is provided in params
    const { aadharNumber } = req.params;

    if (aadharNumber) {
      // Retrieve specific user data
      const user = await userSc.findOne(
        { aadharNumber },
        {
          _id: 0, // Exclude the _id field
          userName: 1, // Include the userName field
          aadharNumber: 1, // Include the aadharNumber field
          date: 1, // Include the date field
          books: 1, // Include the books field
        }
      );

      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          message: `User with Aadhar Number ${aadharNumber} not found`,
        });
      }

      res.status(200).json({
        type: "success",
        message: "User retrieved successfully",
        data: user,
      });
    } else {
      // Retrieve all users data
      const users = await userSc.find(
        {},
        {
          _id: 0, // Exclude the _id field
          userName: 1, // Include the userName field
          aadharNumber: 1, // Include the aadharNumber field
          date: 1, // Include the date field
          books: 1, // Include the books field
        }
      );

      res.status(200).json({
        type: "success",
        message: "Users retrieved successfully",
        data: users,
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: `Internal server error : ${error}`,
    });
  }
};

const updateBooks = async (req, res) => {
  const { aadharNumber, books } = req.body;

  try {
    // Check if 'books' field is present in req.body
    if (!books) {
      return res.status(400).json({
        statusCode: 400,
        message: "Books field is required in the request body",
      });
    }

    // Construct update object based on req.body
    const updateObject = {};
    if (books.A4 !== undefined) {
      updateObject["books.A4"] = books.A4;
    }
    if (books.Long !== undefined) {
      updateObject["books.Long"] = books.Long;
    }
    // Update the user document
    const updatedUser = await userSc.findOneAndUpdate(
      { aadharNumber },
      { $set: updateObject },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        statusCode: 404,
        message: `User with Aadhar Number ${aadharNumber} not found`,
      });
    }

    res.status(200).json({
      type: "success",
      message: "Books updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: `Internal server error: ${error}`,
    });
  }
};

module.exports = {
  signUp,
  getInfo,
  updateBooks,
};
