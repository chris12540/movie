const genMes =
  "There is a problem on our end, our engineers are looking into it.";

export default {
  lists: (req, res) => {
    req.session.user &&
      req.app
        .get("db")
        .find_user({ username: req.session.user.username })
        .then((users) => {
          req.app
            .get("db")
            .get_user_lists({ ...users[0] })
            .then((userLists) => {
              res.json(userLists);
            })
            .catch((error) =>
              errorMessage(error, "Error getting lists", genMes, res)
            );
        })
        .catch((error) =>
          errorMessage(error, "Error getting user", genMes, res)
        );
  },
  userLists: (req, res) => {
    req.session.user &&
      req.app
        .get("db")
        .get_user_lists_with_media({ username: req.session.user.username })
        .then((lists) => {
          res.json(lists);
        })
        .catch((error) =>
          errorMessage(error, "Error getting user lists", genMes, res)
        );
  },
  addList: (req, res) => {
    console.log(req.body);
    req.app
      .get("db")
      .find_user({ username: req.session.user.username })
      .then((users) => {
        req.app
          .get("db")
          .add_list({ listName: req.body.listName, id: users[0].id })
          .then(() => {
            res.sendStatus(201);
          })
          .catch((error) =>
            errorMessage(error, "Error adding list", genMes, res)
          );
      })
      .catch((error) => errorMessage(error, "Error getting user", genMes, res));
  },
  addToList: (req, res) => {
    req.session.user &&
      req.app
        .get("db")
        .add_to_list({ ...req.body })
        .then((response) => {
          res.status(201).json(response);
        })
        .catch((error) =>
          errorMessage(error, "Error adding to user list", genMes, res)
        );
  },
  deleteList: (req, res) => {
    req.session.user &&
      req.app
        .get("db")
        .delete_list({ id: req.params.id })
        .then(() => {
          res.sendStatus(204);
        });
  },
  deleteMedia: (req, res) => {
    req.session.user &&
      req.app
        .get("db")
        .delete_media({ id: req.params.id })
        .then(() => {
          res.sendStatus(204);
        });
  },
};

function errorMessage(error, message, serverMessage, res) {
  console.log(message, error);
  res.status(500).send(serverMessage);
}
