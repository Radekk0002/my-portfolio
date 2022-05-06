using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProxyController : Controller
    {
        [EnableCors("proxy")]
        public IActionResult Index()
        {
            return Content("");
        }
    }
}
