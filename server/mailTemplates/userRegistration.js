const userRegistration = (username) => {
    return `
    <html>
        <head>
            <style>
                *{
                   margin:0;
                   padding:0;
                   box-sizing:border-box; 
                   font-size: larger;
                }
                .user{
                    color: green;
                    margin-left: 0.15rem;
                    font-weight: bold;
                    text-transform:capitalize;
                }
            </style>
        </head>

        <body>
            <p>Hello <span class='user'>${username},</span></p>
            <br/>
            <p>Your account has been registered successfully</p>
        </body>
    </html>`
}

module.exports = userRegistration;