using MyWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebApp.Controllers
{
    public class UserController : ApiController
    {
        public List<User> Get(string id)
        {
            List<User> customers = Users.UserList.FindAll(x => x.ListOfTrainingOrFitnessCentersId.Contains(id) && x.Role == Role.CUSTOMER);
            
            return customers;
        }

        public IHttpActionResult Get(string username, string password)
        {
            User user = Users.UserList.Find(x => x.Username.Equals(username));

            if (user == null)
            {
                return BadRequest();
            }

            if (!user.Password.Equals(password))
            {
                return NotFound();
            }

            if (user.Blocked)
            {
                return StatusCode(HttpStatusCode.MethodNotAllowed);
            }

            return Ok(user);
        }

        public List<User> Get(string username, Role role)
        {
            User owner = Users.UserList.Find(x => x.Username.Equals(username));

            if (owner == null)
            {
                return null;
            }

            List<User> coaches = Users.UserList.FindAll(x => x.Role == role && owner.ListOfTrainingOrFitnessCentersId.Contains(x.FitnessCenterId));
            return coaches;
        }

        public IHttpActionResult Post(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            if (user.Username == null || user.Username.Equals(""))
            {
                return BadRequest();
            }

            User u = Users.UserList.Find(x => x.Username.Equals(user.Username));

            if (u != null)
            {
                return Conflict();
            }

            if (user.Password == null || user.Username.Equals(""))
            {
                return BadRequest();
            }

            if (user.FirstName == null || user.FirstName.Equals(""))
            {
                return BadRequest();
            }

            if (user.LastName == null || user.LastName.Equals(""))
            {
                return BadRequest();
            }

            if (user.EmailAddress == null || user.EmailAddress.Equals(""))
            {
                return BadRequest();
            }

            u = Users.UserList.Find(x => x.EmailAddress.Equals(user.EmailAddress));

            if (u != null)
            {
                return StatusCode(HttpStatusCode.MethodNotAllowed);
            }

            if (user.DateOfBirth == null)
            {
                return BadRequest();
            }

            if (DateTime.Compare(user.DateOfBirth, DateTime.Now) >= 0)
            {
                return StatusCode(HttpStatusCode.NotAcceptable);
            }

            if (user.Role == Role.COACH)
            {
                if (user.FitnessCenterId == null || user.FitnessCenterId.Equals("None"))
                {
                    return BadRequest();
                }
            }

            return Ok(Users.AddUser(user));
        }

        public IHttpActionResult Put(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            if (user.Password == null || user.Password.Equals(""))
            {
                return BadRequest();
            }

            if (user.FirstName == null || user.FirstName.Equals(""))
            {
                return BadRequest();
            }

            if (user.LastName == null || user.LastName.Equals(""))
            {
                return BadRequest();
            }

            if (user.EmailAddress == null || user.EmailAddress.Equals(""))
            {
                return BadRequest();
            }

            if (user.DateOfBirth == null)
            {
                return BadRequest();
            }

            return Ok(Users.UpdateUser(user));
        }

        public IHttpActionResult Put(string id)
        {
            User coach = Users.UserList.Find(x => x.Username.Equals(id));

            if (coach == null)
            {
                return NotFound();
            }

            Users.Unblock(coach);
            return Ok();
        }

        public IHttpActionResult Delete(string id)
        {
            User user = Users.UserList.Find(item => item.Username.Equals(id));

            if (user == null)
            {
                return NotFound();
            }

            Users.Block(user);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
