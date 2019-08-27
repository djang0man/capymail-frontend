<img src="https://i.pinimg.com/originals/53/b8/68/53b8686a18b7b0f34c7c6165336f8dc4.jpg" />

capymail frontend
===
> Realtime messaging with <a href="https://www.mailgun.com/">Mailgun</a> and <a href="https://pusher.com/">Pusher</a>.

UI for https://github.com/stuartkershaw/capymail-backend

## Configure

Include a `.env` file with the following environment variables:

```
PORT=4000
API_PORT=8000
NODE_ENV=development
API_URL=http://localhost:8000
CLIENT_URL=http://localhost:4000
PUSHER_KEY={ your Pusher key }
PUSHER_CLUSTER={ your Pusher cluster }
```

## Start

* Active dev `npm run watch`
* Build the UI `npm run build`
* Start the UI server `npm run start`

## Next steps
* Frontend caching.
