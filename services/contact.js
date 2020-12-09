import Contact from '../models/contact.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d8585e4a56c066",
      pass: "2023b88674e938"
    }
  });

export const getContactById = async (id) => Contact.findById(id);

export const getAllContacts = async () => Contact.find();

export const createContact = async (data) => {
    
   const contact = await Contact.create(data);
   const mail = {
       from: contact.firstname,
       to: "mattia@leratechsolutions.com",
       subject: contact.email,
       text: contact.message
   }
   transporter.sendMail(mail, (err, data)=> {
       console.log(data);
       if(err){
           res.json({
               status:'fail'
           })
       }else {
           res.json({
               status: 'success'
           })
       }
   })

}
export const removeContact = async (id) => {
  const contact = await Contact.findById(id);
  contact.remove();
}
