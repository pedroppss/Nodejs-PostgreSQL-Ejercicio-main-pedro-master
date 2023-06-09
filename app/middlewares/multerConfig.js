const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {

        if (file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "application/vnd.ms-excel") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("only allows .xls,xlsx"));
        }
    },

}) // conts upload=multer({storage:storage}) the first storage is the muller configuration and the second storage is the storage variable that I have created for the multer configuration
module.exports = upload;