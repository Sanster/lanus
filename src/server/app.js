var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')
var ssh = require('ssh2').Client
var config = require('./config/config.json')

var connectDatabase = require('./db')
var User = require('./models/user')

var webpack = require('webpack')
var webpackConfig = require('../../webpack.config')
var compiler = webpack(webpackConfig)

// app.use(
//   require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath
//   })
// )

// app.use(require('webpack-hot-middleware')(compiler))
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())

app.use(express.static(path.join(__dirname, '../..', 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'build/index.html'))
})

var api = require('./api')
api.mount(app)

server.listen(3000)
// app.post('/login', (req, res) => {
//   res.redirect('/')
// })
// ;(async () => {
//   try {
//     const db = await connectDatabase('mongodb://localhost/test')
//     console.log(`Connected to mongodb ${db.host}:${db.port}/${db.name}`)

//     await server.listen(3000)
//     console.log('Listen at port 3000')
//   } catch (error) {
//     console.error('Unable to connect to mongodb')
//   }
// })()

// var termCols
// var termRows

// io.on('connection', socket => {
//   var sshConnection = new ssh()
//   socket.on('terminal resize', (cols, rows) => {
//     termCols = cols
//     termRows = rows
//   })

//   sshConnection.on('ready', () => {
//     sshConnection.shell(
//       {
//         term: 'xterm',
//         cols: termCols,
//         rows: termRows
//       },
//       (err, stream) => {
//         if (err) {
//           console.log('connect ssh shell error')
//           console.log(err.message)
//           return
//         }

//         socket.on('data', data => {
//           stream.write(data)
//         })

//         stream.on('data', data => {
//           socket.emit('data', data.toString())
//         })

//         stream.on('close', (code, signal) => {
//           console.log(`Stream close, code: ${code}, signal: ${signal}`)
//           sshConnection.end()
//           socket.disconnect()
//         })

//         stream.stderr.on('data', err => {
//           console.log(`STDERR: ${err}`)
//         })
//       }
//     )
//   })

//   sshConnection.on('end', () => {
//     socket.disconnect()
//   })

//   sshConnection.on('close', () => {
//     socket.disconnect()
//   })

//   sshConnection.on('error', err => {
//     console.log(`ssh connection on error: ${err}`)
//   })

//   sshConnection.on(
//     'keyboard-interactive',
//     (name, instructions, instructionsLang, prompts, finish) => {
//       console.log('Connection: keyboard-interactive')
//       finish(config.user.password)
//     }
//   )

//   sshConnection.connect({
//     host: '127.0.0.1',
//     port: 22,
//     username: config.user.name,
//     password: config.user.password,
//     tryKeyboard: true
//   })
// })
