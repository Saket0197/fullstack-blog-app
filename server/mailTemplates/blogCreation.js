const blogCreation = (username,coverImage) => {
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
            <p>Your Blog has been created successfully</p>
            <a href=${coverImage}>Click Here to view your uploaded cover image</a>
        </body>
    </html>`
}

module.exports = blogCreation;