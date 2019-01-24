import Users from '../../models/v1/users';
import pool from '../../models/v1/dbConfig';


const { getAllUsers, getSpecificUser, deleteAllUsers, deleteSpecificUser } = Users;

class UserController {
  static getAllUsers(req, res) {
    getAllUsers()
      .then(users => res.status(200).json({
        status: 200,
        message: 'Successfully retrieved all Users',
        data: users.rows,
      }))
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static getSpecificUser(req, res) {
    const { userId } = req.params;
    getSpecificUser(userId)
      .then((user) => {
        if (user.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved specific user',
            data: user.rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static deleteAllUsers(req, res) {
    deleteAllUsers()
      .then((users) => {
        if (users.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully deleted users',
            data: users.rows,
          });
        }
        return res.status(409).json({
          status: 409,
          message: 'No user found',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static deleteSpecificUser(req, res) {
    const { userId } = req.params;
    deleteSpecificUser(userId)
      .then((user) => {
        if (user.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully deleted user',
            data: user.rows,
          });
        }
        return res.status(409).json({
          status: 409,
          message: 'User not found',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error: error.message,
      }));
  }
}


export default UserController;
