function auth(req, res, next) {
    if (!req.session?.user) return res.status(401).send({status: "error", error: "No estás autorizado"});

    next();
}

export default auth;
