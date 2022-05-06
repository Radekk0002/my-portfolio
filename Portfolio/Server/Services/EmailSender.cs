using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Portfolio.Shared;

namespace Portfolio.Server.Services
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            return Execute(email, subject, htmlMessage);
        }

        public Task Execute(string email, string subject, string htmlMessage)
        {
            MailMessage mail = new MailMessage();

            mail.From = new MailAddress(Secrets.EmailFrom);
            mail.To.Add(Secrets.EmailTo);
            mail.Subject = subject;
            mail.Body = htmlMessage;
            mail.IsBodyHtml = true;


            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential(Secrets.EmailFrom, Secrets.EmailPwd);
            smtp.EnableSsl = true;


            return smtp.SendMailAsync(mail);
        }
    }
}
