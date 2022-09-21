using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class GroupTraining
    {
        string id;
        private string name;
        private TypeOfTraining type;
        private FitnessCenter fitnessCenter;
        private int minutesOfTraining;
        private DateTime timeTrainingStarts;
        private int maxNumOfCustomers;
        private List<string> customers;
        private bool deleted;

        public GroupTraining()
        {

        }

        public GroupTraining(string name, TypeOfTraining type, FitnessCenter fitnessCenter, int minutesOfTraining, 
            DateTime timeTrainingStarts, int maxNumOfCustomers)
        {
            this.id = name + new Random().Next(1000000).ToString();
            this.name = name;
            this.type = type;
            this.fitnessCenter = fitnessCenter;
            this.minutesOfTraining = minutesOfTraining;
            this.timeTrainingStarts = timeTrainingStarts;
            this.maxNumOfCustomers = maxNumOfCustomers;
            this.customers = new List<string>();
            deleted = false;
        }

        public string Name { get => name; set => name = value; }
        public TypeOfTraining Type { get => type; set => type = value; }
        public FitnessCenter FitnessCenter { get => fitnessCenter; set => fitnessCenter = value; }
        public int MinutesOfTraining { get => minutesOfTraining; set => minutesOfTraining = value; }
        public DateTime TimeTrainingStarts { get => timeTrainingStarts; set => timeTrainingStarts = value; }
        public int MaxNumOfCustomers { get => maxNumOfCustomers; set => maxNumOfCustomers = value; }
        public List<string> Customers { get => customers; set => customers = value; }
        public string Id { get => id; set => id = value; }
        public bool Deleted { get => deleted; set => deleted = value; }
    }
}