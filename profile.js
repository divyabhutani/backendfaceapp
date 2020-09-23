const handleProfileGet = (req,res,db) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) { res.json(user[0]) }
            else { res.status(400).json('No such User') }
        }
        )
        .catch(err => res.status(400).json('No such user found'))
}

module.exports = {
    handleProfileGet : handleProfileGet
};