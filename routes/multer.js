const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '/images/uploads')
    },
    filename: function(req, file, cb){
        const uniqueName = uuidv4();
        cb(null, uniqueName);
    }
})

const upload = multer({storage: storage});

module.exports = upload;