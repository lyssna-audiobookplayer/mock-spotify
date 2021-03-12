import express from 'express';

var router = express.Router();

router.get('/authorize', function (req, res, next) {
  res.send(`
  <html>
  <head>
  <script>
  window.onload = function returnCode() {
            console.log('onload');
            const event = {
                              type: 'access_token_spotify',
                code: '1234'
            }
         
            window.opener.postMessage(event, 'http://localhost:3332');
            window.close();
        }
</script>
</head>
  <body>Login</body>
  </html>
  `);
});

router.post('/exchange', function (req, res, next) {
  res.json({
    access_token: 'fake access token',
    refresh_token: 'fake refresh token',
    expires_in: 3600,
  });
});

module.exports = router;
