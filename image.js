const Clarifai = require('clarifai');
const app = new Clarifai.App({ apiKey: 'fc3632962b344286b7ce5856ad85789a' });

const handleImageUrl = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to detect'))
}

const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    let found = false;
    db('users').where({ id: id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => {
            res.status(400).json('Unable to get Entries')
        })
}
module.exports = {
    handleImagePut,
    handleImageUrl
};