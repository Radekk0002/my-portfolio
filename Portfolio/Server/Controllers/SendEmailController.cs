using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Portfolio.Shared;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Portfolio.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SendEmailController : ControllerBase
    {
        private readonly IEmailSender _sender;
        public SendEmailController(IEmailSender sender)
        {
            _sender = sender;
        }

        [HttpPost]
        public async Task<bool> SendAsync(EmailModel email)
        {
            try
            {
                if (!IsValidEmail(email)) return false;

                string msg = $"<h1>Imię: {email.Name}; Email: {email.Email}</h1><br/><br/><p>{email.Message}</p>";

                await _sender.SendEmailAsync(email.Email, email.Subject, msg);

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        private bool IsValidEmail(EmailModel email)
        {
            if (email.Name.Length == 0 || email.Name.Length > 30) return false;
            if (email.Email.Length == 0) return false;

                try
                {
                    var tmp = new MailAddress(email.Email);
                }
                catch (FormatException)
                {
                    return false;
                }
            
            if(email.Subject.Length == 0 || email.Subject.Length > 30) return false;
            if(email.Message.Length == 0 || email.Message.Length > 600) return false;
            return true;
        }
    }
}
