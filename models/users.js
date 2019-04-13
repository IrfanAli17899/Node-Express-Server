exports = module.exports = function (app, mongoose) {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            required: [true, "Please Provide Name"],
        },

        username: {
            type: String,
            required: [true, "Please Provide Username"],
            unique: [true, "Username Already Exist"],
            isAsync: true,
            validate: {
                validator: function (value, cb) {
                    let regex = /^[a-z0-9]+$/i;
                    cb(value.length <5, "Username Must Be Atleast Of 5 Characters");
                    cb(!regex.test(value), "Username Must Be Alphanumeric");
                },
                message: "Invalid Username"

            }
        },

        email: {
            type: String,
            required: [true, "Please Provide Email"],
            unique: [true, "Email Already Exist"],
            isAsync: true,
            validate: {
                validator: function (value, cb) {
                    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    cb(regex.test(value), "Invalid Email Address Please Type Another");
                },
                message: "Invalid Email Address"

            }
        },

        password: {
            type: String,
            required: [true, "Please Provide Password"],
            // validate: {
            //     validator: function (value, cb) {
            //         let regex = /^[a-z0-9]+$/i;
            //         cb(value.length < 6, "Password Must Be Atleast Of 6 Characters");
            //         cb(!regex.test(value), "Password Must Be Alphanumeric");
            //     },
            //     message: "Invalid Password"

            // }
        },

        image: {
            type: String,
            isAsync: true,
            validate: {
                validator: function (value, cb) {
                    let regex = /^(ftp|http|https):\/\/[^ "]+$/;
                    cb(!regex.test(value), "Invalid Image URL");
                },
                message: "Invalid Image URL"

            },
            required: [true, "Please Provide Image"],
        }
    });
    app.db.model('User', UserSchema)
}