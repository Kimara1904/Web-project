using MyWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyWebApp.Controllers
{
    public class FitnessCenterController : ApiController
    {
        public List<FitnessCenter> Get(string username, int token)
        {
            User owner = Users.UserList.Find(x => x.Username.Equals(username));
            List<FitnessCenter> retVal = FitnessCenters.FitnessCentersList.FindAll(x => owner.ListOfTrainingOrFitnessCentersId.Contains(x.Id) && !x.Deleted);
            return retVal;
        }
        public List<FitnessCenter> Get(int sort)
        {
            /*0 - Name asc
              1 - Name desc
              2 - Address asc 
              3 - Address desc
              4 - YearOfOpening asc
              5 - YearOfOpening desc*/

            List<FitnessCenter> retVal = FitnessCenters.FitnessCentersList.FindAll(x => !x.Deleted);

            switch (sort)
            {
                case 0:
                    return retVal.OrderBy(x => x.Name).ToList();
                case 1:
                    return retVal.OrderByDescending(x => x.Name).ToList();
                case 2:
                    return retVal.OrderBy(x => x.Address.Street).ThenBy(x => x.Address.Number).ThenBy(x => x.Address.Place).ThenBy(x => x.Address.Postcode).ToList();
                case 3:
                    return retVal.OrderByDescending(x => x.Address.Street).ThenBy(x => x.Address.Number).ThenBy(x => x.Address.Place).ThenBy(x => x.Address.Postcode).ToList();
                case 4:
                    return retVal.OrderBy(x => x.YearOfOpening).ToList();
                case 5:
                    return retVal.OrderByDescending(x => x.YearOfOpening).ToList();
                default:
                    return null;
            }
        }

        public FitnessCenter Get(string id)
        {
            return FitnessCenters.FitnessCentersList.Find(x => x.Id.Equals(id) && !x.Deleted);
        }

        public IHttpActionResult Post(FitnessCenter fitnessCenter)
        {
            if (fitnessCenter == null)
            {
                return BadRequest();
            }

            if (fitnessCenter.Name == null || fitnessCenter.Name.Equals(""))
            {
                return BadRequest();
            }

            if (fitnessCenter.Address == null || fitnessCenter.Address.Street == null || fitnessCenter.Address.Street.Equals("") || 
                fitnessCenter.Address.Number == 0 || fitnessCenter.Address.Place == null || fitnessCenter.Address.Place.Equals("") || 
                fitnessCenter.Address.Postcode == 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.YearOfOpening > DateTime.Now.Year)
            {
                return Conflict();
            }

            User owner = Users.UserList.Find(x => x.Username.Equals(fitnessCenter.Owner.Username));
            if (fitnessCenter.Owner == null)
            {
                return NotFound();
            }

            if (fitnessCenter.PriceOfMonthlyMembership < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfYearlyMembership < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfOneTraining < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfOneGroupTraining < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfTrainingWithCoach < 0)
            {
                return BadRequest();
            }
            
            fitnessCenter.Owner = owner;
            return Ok(FitnessCenters.AddFitnessCenter(fitnessCenter));
        }

        public IHttpActionResult Put(FitnessCenter fitnessCenter)
        {
            if (fitnessCenter == null)
            {
                return BadRequest();
            }

            if (fitnessCenter.Name == null || fitnessCenter.Name.Equals(""))
            {
                return BadRequest();
            }

            if (fitnessCenter.Address == null || fitnessCenter.Address.Street == null || fitnessCenter.Address.Street.Equals("") ||
                fitnessCenter.Address.Number == 0 || fitnessCenter.Address.Place == null || fitnessCenter.Address.Place.Equals("") ||
                fitnessCenter.Address.Postcode == 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.YearOfOpening < 1900)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfMonthlyMembership < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfYearlyMembership < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfOneTraining < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfOneGroupTraining < 0)
            {
                return BadRequest();
            }

            if (fitnessCenter.PriceOfTrainingWithCoach < 0)
            {
                return BadRequest();
            }

            return Ok(FitnessCenters.UpdateFitnessCenter(fitnessCenter));
        }

        public IHttpActionResult Delete(string id)
        {
            FitnessCenter fitnessCenter = FitnessCenters.FitnessCentersList.Find(item => item.Id.Equals(id));

            if (fitnessCenter == null)
            {
                return NotFound();
            }

            List<GroupTraining> trainings = GroupTrainings.Trainings.FindAll(x => x.FitnessCenter.Id.Equals(id));

            foreach (GroupTraining training in trainings)
            {
                if (training.Customers.Count > 0)
                {
                    return Conflict();
                }
            }

            FitnessCenters.DeleteFitnessCenter(fitnessCenter);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
