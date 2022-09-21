using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class User
    {
        private string username;
        private string password;
        private string firstName;
        private string lastName;
        private char gender;
        private string emailAddress;
        private DateTime dateOfBirth;
        private Role role;
        private List<string> listOfTrainingOrFitnessCentersId;
        private string fitnessCenterId;
        private bool blocked;

        public User()
        {

        }

        public User(string username, string password, string firstName, string lastName, char gender, string emailAddress, DateTime dateOfBirth, 
            Role role)
        {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.emailAddress = emailAddress;
            this.dateOfBirth = dateOfBirth;
            this.role = role;
            listOfTrainingOrFitnessCentersId = new List<string>();
            blocked = false;
        }

        public string Username { get => username; set => username = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public char Gender { get => gender; set => gender = value; }
        public string EmailAddress { get => emailAddress; set => emailAddress = value; }
        public DateTime DateOfBirth { get => dateOfBirth; set => dateOfBirth = value; }
        public Role Role { get => role; set => role = value; }
        public List<string> ListOfTrainingOrFitnessCentersId { get => listOfTrainingOrFitnessCentersId; set => listOfTrainingOrFitnessCentersId = value; }
        public string FitnessCenterId { get => fitnessCenterId; set => fitnessCenterId = value; }
        public bool Blocked { get => blocked; set => blocked = value; }
    }
}