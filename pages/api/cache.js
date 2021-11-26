import redis from 'async-redis';

const client = redis.createClient({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379
});

client.on('connect', function () {
    console.log('Redis Connected!');
});

export default async function handler(req, res) {
    try {
        const method = req.method;
        const { authorization } = req.headers;
        const [claim, token] = authorization.split(" ");
        if (!token) {
            res.status(403).send("Access Denied");
            return;
        }
        switch (method) {
            case "GET":
                try {
                    const data = await client.hgetall(token);
                    return res.status(200).json(data);
                } catch (error) {
                    throw error;
                }
            case "POST":
                try {
                    await client.hmset(token, {
                        ...req.body
                    });
                    return res.status(200).json({ message: "Added to cache" });
                } catch (error) {
                    throw error;
                }
            default:
                return res.status(404).json({ message: "Not Found" });
        };
    } catch (error) {
        console.log(error)
        res.status(403).send("Access Denied");
        return;
    }
};
