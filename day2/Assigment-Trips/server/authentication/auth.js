// authentification middleware

function authenticate(req,res,next) {
  if(req.session) {
    if(req.session.username) {
      next() // proceed to the original request

    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}

module.exports = authenticate 