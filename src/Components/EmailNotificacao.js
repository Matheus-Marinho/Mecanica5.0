import React from 'react';
import emailjs from '@emailjs/browser';

const EnviarEmail = ({ parametros }) => {
    parametros.preventDefault();

    emailjs.send('mecanicaDoBill', 'confirmaAgendamento', parametros)
      .then(() => {
          console.log("Confirmação de agendamento enviado por e-mail!");
      }, (error) => {
          console.log(error.text);
      });

};

export default EnviarEmail