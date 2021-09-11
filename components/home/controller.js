export default {
   verifyUnauthentication(req, res) {
      req.isUnauthenticated()
         ? res.end()
         : res.redirect(`/user/${req.app.locals.userLogged}/me`);
   },
};
