
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const nodemailer = require('nodemailer');


const app = express()
const porta = 443

app.use('/Contato.html', function(req, res){
  res.sendFile(__dirname + '/Contato.html')
})
app.get("/sendemail", async(req, res) =>{
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7bb748fbe27aad",
      pass: "879d3277ac8666"
  }
  });
  var message = {
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
  };
  transport.sendMail(message, function(err){
    if(err)
      return res.status(400).json({
        erro: true,
        mensagem: 'Erro: E-mail não enviado!'
  });
    else
      return res.json({
        erro:false ,
        mensagem: 'E-mail enviado com sucesso!'
      });
})
})

app.listen( porta, () => { console.log('servidor rodando') })