class auth {
  authMiddleWare = async (req, res, next) => {
    const { useMe } = req.query;
    if ((useMe == 1)) {
      res.json("Hey I am here");
    }

    req.isUserValid = true || false;

    next();
  };
}

export default new auth();
