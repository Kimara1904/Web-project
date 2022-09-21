using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class GroupTrainings
    {
        public static List<GroupTraining> Trainings = HttpContext.Current.Application["groupTrainings"] as List<GroupTraining>;

        public static GroupTraining AddTraining(GroupTraining training)
        {
            ReadAndWriteModels.WriteUsers(Users.UserList);
            Trainings.Add(training);
            ReadAndWriteModels.WriteGroupTraining(Trainings);
            return training;
        }

        public static void AddCustomer(GroupTraining training, User customer)
        {
            training.Customers.Add(customer.Username);
            customer.ListOfTrainingOrFitnessCentersId.Add(training.Id);
            ReadAndWriteModels.WriteGroupTraining(Trainings);
            ReadAndWriteModels.WriteUsers(Users.UserList);
        }
        public static void DeleteTraining(GroupTraining training)
        {
            training.Deleted = true;
            ReadAndWriteModels.WriteGroupTraining(Trainings);
        }

        public static GroupTraining UpdateTraining(GroupTraining training)
        {
            GroupTraining oldTraining = Trainings.Find(item => item.Id.Equals(training.Id));

            oldTraining.Name = training.Name;
            oldTraining.Type = training.Type;
            oldTraining.MinutesOfTraining = training.MinutesOfTraining;
            oldTraining.TimeTrainingStarts = training.TimeTrainingStarts;
            oldTraining.MaxNumOfCustomers = training.MaxNumOfCustomers;

            ReadAndWriteModels.WriteGroupTraining(Trainings);
            return oldTraining;
        }
    }
}