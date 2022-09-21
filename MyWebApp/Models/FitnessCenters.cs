using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class FitnessCenters
    {
        public static List<FitnessCenter> FitnessCentersList = HttpContext.Current.Application["fitnessCenters"] as List<FitnessCenter>;

        public static FitnessCenter AddFitnessCenter(FitnessCenter fitnessCenter)
        {
            fitnessCenter.Id = fitnessCenter.Name + new Random().Next(10000).ToString();
            fitnessCenter.Owner.ListOfTrainingOrFitnessCentersId.Add(fitnessCenter.Id);
            FitnessCentersList.Add(fitnessCenter);
            ReadAndWriteModels.WriteUsers(Users.UserList);
            ReadAndWriteModels.WriteFitnessCenters(FitnessCentersList);
            return fitnessCenter;
        }

        public static void DeleteFitnessCenter(FitnessCenter fitnessCenter)
        {
            List<User> coaches = Users.UserList.FindAll(x => x.Role == Role.COACH && x.FitnessCenterId.Equals(fitnessCenter.Id));

            foreach (User coach in coaches)
            {
                coach.Blocked = true;
            }

            fitnessCenter.Deleted = true;
            ReadAndWriteModels.WriteFitnessCenters(FitnessCentersList);
            ReadAndWriteModels.WriteUsers(Users.UserList);
        }

        public static FitnessCenter UpdateFitnessCenter(FitnessCenter fitnessCenter)
        {
            FitnessCenter oldFitnessCenter = FitnessCentersList.Find(item => item.Id == fitnessCenter.Id);

            oldFitnessCenter.Name = fitnessCenter.Name;
            oldFitnessCenter.Address = fitnessCenter.Address;
            oldFitnessCenter.YearOfOpening = fitnessCenter.YearOfOpening;
            oldFitnessCenter.PriceOfMonthlyMembership = fitnessCenter.PriceOfMonthlyMembership;
            oldFitnessCenter.PriceOfYearlyMembership = fitnessCenter.PriceOfYearlyMembership;
            oldFitnessCenter.PriceOfOneTraining = fitnessCenter.PriceOfOneTraining;
            oldFitnessCenter.PriceOfOneGroupTraining = fitnessCenter.PriceOfOneGroupTraining;
            oldFitnessCenter.PriceOfTrainingWithCoach = fitnessCenter.PriceOfTrainingWithCoach;
            ReadAndWriteModels.WriteFitnessCenters(FitnessCentersList);

            return oldFitnessCenter;
        }
    }
}