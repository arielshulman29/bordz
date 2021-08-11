const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
module.exports.googleLoginUser = (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
        .then(async (response) => {
            const { email_verified, name, email } = response.payload;
            if (!email_verified) {
                return res.status(401).json({ message: "Email is not verified" });
            }
            const user = { name, email, provider: 'Google' };
            await User.findOrCreate(user, (err, user) => {
                if (err) {
                    return res.status(400).json({ message: "Something went wrong..." })
                }
                return res.status(200).json(user);
            })
        })
        .catch(err => res.status(400).json({ message: "Something went wrong..." }));
}