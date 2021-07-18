const auth = require('basic-auth');

const mwBasicAuth  = async (req, res, next)  => {
	const user  = await auth(req);

	const username = 'test@koibanx.com';
	const password = 'test123';

	if (user && user.name.toLowerCase() === username.toLowerCase() && user.pass === password) {
        res.status(200);
		next();
	} else {
		res.send("No authorized access");
		res.status(401);
	}
}

module.exports = mwBasicAuth;