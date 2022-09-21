using MyWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebApp.Controllers
{
    public class GroupTrainingController : ApiController
    {
        public List<GroupTraining> Get(string id, string by)
        {
            if (by.Equals("fitnessCenter"))
            {
                return GroupTrainings.Trainings.FindAll(x => x.FitnessCenter.Id.Equals(id) && DateTime.Compare(x.TimeTrainingStarts, DateTime.Now) > 0 && !x.Deleted);
            }
            else
            {
                return GroupTrainings.Trainings.FindAll(x => x.Id.Equals(id) && !x.Deleted);
            }
        }

        public List<GroupTraining> Get(string username, int sort, string type)
        {
            User user = Users.UserList.Find(x => x.Username.Equals(username));

            if (user == null)
            {
                return null;
            }

            List<GroupTraining> retVal = new List<GroupTraining>();
            foreach (string item in user.ListOfTrainingOrFitnessCentersId)
            {
                GroupTraining training = null;
                if (type.Equals("old"))
                {
                    training = GroupTrainings.Trainings.Find(x => x.Id.Equals(item) && DateTime.Compare(x.TimeTrainingStarts, DateTime.Now) < 0 && !x.Deleted);
                }
                else
                {
                    training = GroupTrainings.Trainings.Find(x => x.Id.Equals(item) && DateTime.Compare(x.TimeTrainingStarts, DateTime.Now) > 0 && !x.Deleted);
                }

                if (training != null)
                {
                    retVal.Add(training);
                }
            }

            switch (sort)
            {
                case 0:
                    return retVal.OrderBy(x => x.Name).ToList();
                case 1:
                    return retVal.OrderByDescending(x => x.Name).ToList();
                case 2:
                    return retVal.OrderBy(x => x.Type.ToString()).ToList();
                case 3:
                    return retVal.OrderByDescending(x => x.Type.ToString()).ToList();
                case 4:
                    return retVal.OrderBy(x => x.FitnessCenter.Name).ToList();
                case 5:
                    return retVal.OrderByDescending(x => x.FitnessCenter.Name).ToList();
                case 6:
                    return retVal.OrderBy(x => x.TimeTrainingStarts).ToList();
                case 7:
                    return retVal.OrderByDescending(x => x.TimeTrainingStarts).ToList();
                default:
                    return null;
            }
        }

        public IHttpActionResult Post(GroupTraining trainingParameter)
        {
            if (trainingParameter == null)
            {
                return BadRequest();
            }
            if (trainingParameter.Name == null || trainingParameter.Name.Equals(""))
            {
                return BadRequest();
            }
            if (trainingParameter.Type.ToString() == null)
            {
                return BadRequest();
            }
            if (trainingParameter.MinutesOfTraining <= 0)
            {
                return BadRequest();
            }
            if (trainingParameter.TimeTrainingStarts == null)
            {
                return BadRequest();
            }
            else if (DateTime.Compare(trainingParameter.TimeTrainingStarts, DateTime.Now.AddDays(3)) < 0)
            {
                return Conflict();
            }
            if (trainingParameter.MaxNumOfCustomers <= 0)
            {
                return BadRequest();
            }
            
            GroupTraining usableTraining = new GroupTraining(trainingParameter.Name, trainingParameter.Type, FitnessCenters.FitnessCentersList.Find(x => x.Id.Equals(trainingParameter.FitnessCenter.Id)), trainingParameter.MinutesOfTraining, trainingParameter.TimeTrainingStarts, trainingParameter.MaxNumOfCustomers);
            Users.UserList.Find(x => x.Username.Equals(trainingParameter.Customers[0])).ListOfTrainingOrFitnessCentersId.Add(usableTraining.Id);
            return Ok(GroupTrainings.AddTraining(usableTraining));
        }

        
        public IHttpActionResult Put(AddCustomerParameter acp)
        {
            GroupTraining training = GroupTrainings.Trainings.Find(x => x.Id.Equals(acp.Id));
            User customer = Users.UserList.Find(x => x.Username.Equals(acp.Username));

            if (training == null)
            {
                return BadRequest();
            }

            if (customer == null)
            {
                return BadRequest();
            }

            if (training.MaxNumOfCustomers == training.Customers.Count)
            {
                return StatusCode(HttpStatusCode.NotAcceptable);
            }

            if (training.Customers.Contains(customer.Username))
            {
                return StatusCode(HttpStatusCode.MethodNotAllowed);
            }

            GroupTrainings.AddCustomer(training, customer);

            return Ok();
        }

        
        public IHttpActionResult Put(string id, GroupTraining training)
        {
            GroupTraining exist = GroupTrainings.Trainings.Find(x => x.Id.Equals(id));
            
            if (exist == null)
            {
                return BadRequest();
            }
            if (training == null)
            {
                return BadRequest();
            }
            if (training.Name == null || training.Name.Equals(""))
            {
                return BadRequest();
            }
            if (training.Type.ToString() == null)
            {
                return BadRequest();
            }
            if (training.MinutesOfTraining <= 0)
            {
                return BadRequest();
            }
            if (training.TimeTrainingStarts == null)
            {
                return BadRequest();
            }
            else if (DateTime.Compare(training.TimeTrainingStarts, DateTime.Now.AddDays(3)) < 0)
            {
                return Conflict();
            }
            if (training.MaxNumOfCustomers <= 0)
            {
                return BadRequest();
            }

            return Ok(GroupTrainings.UpdateTraining(training));
        }

        public IHttpActionResult Delete(string id)
        {
            GroupTraining training = GroupTrainings.Trainings.Find(item => item.Id.Equals(id));

            if (training == null)
            {
                return NotFound();
            }

            if (training.Customers.Count > 0)
            {
                return Conflict();
            }

            GroupTrainings.DeleteTraining(training);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
