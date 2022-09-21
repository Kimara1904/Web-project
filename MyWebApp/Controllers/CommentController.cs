using MyWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebApp.Controllers
{
    public class CommentController : ApiController
    {
        public List<Comment> Get(string id)
        {
            return Comments.CommentList.FindAll(x => x.FitnessCenter.Id.Equals(id));
        }

        public List<Comment> Get(string username, int token)
        {
            User owner = Users.UserList.Find(x => x.Username.Equals(username));

            if (owner == null)
            {
                return null;
            }

            List<Comment> comments = Comments.CommentList.FindAll(x => owner.ListOfTrainingOrFitnessCentersId.Contains(x.FitnessCenter.Id));

            return comments;
        }

        public IHttpActionResult Post(Comment commentParams)
        {
            FitnessCenter fitnessCenter = FitnessCenters.FitnessCentersList.Find(x => x.Id.Equals(commentParams.FitnessCenter.Id));

            if (commentParams.Customer == null || commentParams.Customer.Equals("") || fitnessCenter == null)
            {
                return BadRequest();
            }

            Comment usableComment = new Comment(commentParams.Customer, fitnessCenter, commentParams.Text, commentParams.Rate);
            return Ok(Comments.AddComment(usableComment));
        }

        public IHttpActionResult Put(int id)
        {
            Comment comment = Comments.CommentList.Find(x => x.Id == id);

            if (comment == null)
            {
                return NotFound();
            }

            Comments.ApproveComment(comment);
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {
            Comment comment = Comments.CommentList.Find(x => x.Id.Equals(id));

            if (comment == null)
            {
                return NotFound();
            }

            Comments.UnapproveComment(comment);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
