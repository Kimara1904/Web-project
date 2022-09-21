using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class FitnessCenter
    {
        private string id;
        private string name;
        private Address address;
        private int yearOfOpening;
        private User owner;
        private double priceOfMonthlyMembership;
        private double priceOfYearlyMembership;
        private double priceOfOneTraining;
        private double priceOfOneGroupTraining;
        private double priceOfTrainingWithCoach;
        private bool deleted;

        public FitnessCenter()
        {

        }

        public FitnessCenter(string name, Address address, int yearOfOpening, User owner, double priceOfMonthlyMembership, 
            double priceOfYearlyMembership, double priceOfOneTraining, double priceOfOneGroupTraining, double priceOfTrainingWithCoach)
        {
            id = name + new Random().Next(10000000);
            this.name = name;
            this.address = address;
            this.yearOfOpening = yearOfOpening;
            this.owner = owner;
            this.priceOfMonthlyMembership = priceOfMonthlyMembership;
            this.priceOfYearlyMembership = priceOfYearlyMembership;
            this.priceOfOneTraining = priceOfOneTraining;
            this.priceOfOneGroupTraining = priceOfOneGroupTraining;
            this.priceOfTrainingWithCoach = priceOfTrainingWithCoach;
            deleted = false;
        }

        public string Name { get => name; set => name = value; }
        public Address Address { get => address; set => address = value; }
        public int YearOfOpening { get => yearOfOpening; set => yearOfOpening = value; }
        public User Owner { get => owner; set => owner = value; }
        public double PriceOfMonthlyMembership { get => priceOfMonthlyMembership; set => priceOfMonthlyMembership = value; }
        public double PriceOfYearlyMembership { get => priceOfYearlyMembership; set => priceOfYearlyMembership = value; }
        public double PriceOfOneTraining { get => priceOfOneTraining; set => priceOfOneTraining = value; }
        public double PriceOfOneGroupTraining { get => priceOfOneGroupTraining; set => priceOfOneGroupTraining = value; }
        public double PriceOfTrainingWithCoach { get => priceOfTrainingWithCoach; set => priceOfTrainingWithCoach = value; }
        public string Id { get => id; set => id = value; }
        public bool Deleted { get => deleted; set => deleted = value; }
    }
}