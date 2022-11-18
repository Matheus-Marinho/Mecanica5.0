"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

const url = "smtps://mecanincadobill%40gmail.com:"+encodeURIComponent("gppaxhxpevckdrdn") + "@smtp.gmail.com:465";
const transporter = nodemailer.createTransport(url);

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const remetente = "'Mecânica do Bill' <mecanincadobill@gmail.com>";

    const assunto = req.body["assunto"];
    const destinatarios = req.body["destinatarios"];
    const corpo = req.body["corpo"];
    const corpoHtml = req.body["corpoHtml"];

    const email = {
      from: remetente,
      to: destinatarios,
      subject: assunto,
      text: corpo,
      html: corpoHtml,
    };

    transporter.sendMail(email, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Mensagem %s enviada: %s", info.messageId, info.response);
    });
  });
});
