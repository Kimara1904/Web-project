using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace MyWebApp.Models
{
    public class ReadAndWriteModels
    {
        public static List<User> ReadUsers()
        {
            List<User> users = new List<User>();
            string path = HostingEnvironment.MapPath("~/App_Data/Users.txt");
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split(';');
                User user = new User(tokens[0], tokens[1], tokens[2], tokens[3], tokens[4].ToCharArray()[0], tokens[5], DateTime.ParseExact(tokens[6], "yyyy/MM/dd", System.Globalization.CultureInfo.InvariantCulture), (Role)Enum.Parse(typeof(Role), tokens[7]));

                for (int i = 0; i < int.Parse(tokens[8]); i++)
                {
                    user.ListOfTrainingOrFitnessCentersId.Add(tokens[i + 9]);
                }
                if (user.Role == Role.COACH)
                {
                    user.FitnessCenterId = tokens[tokens.Length - 2];
                    user.Blocked = bool.Parse(tokens[tokens.Length - 1]);
                }

                users.Add(user);
            }

            sr.Close();
            stream.Close();

            return users;
        }

        public static void WriteUsers(List<User> users)
        {
            string path = HostingEnvironment.MapPath("~/App_Data/Users.txt");
            File.WriteAllText(path, String.Empty);
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamWriter sw = new StreamWriter(stream);


            int counter = 0;
            foreach (User user in users)
            {
                string line = user.Username + ";" + user.Password + ";" + user.FirstName + ";" + user.LastName + ";" + user.Gender + ";" + user.EmailAddress + ";" + user.DateOfBirth.ToString("yyyy/MM/dd") + ";" + user.Role.ToString() + ";" + user.ListOfTrainingOrFitnessCentersId.Count;
                for (int i = 0; i < user.ListOfTrainingOrFitnessCentersId.Count; i++)
                {
                    line += ";" + user.ListOfTrainingOrFitnessCentersId[i];
                }
                
                
                if (user.Role == Role.COACH)
                {
                    line += ";" + user.FitnessCenterId + ";" + user.Blocked;
                }

                if (counter == users.Count - 1)
                {
                    sw.Write(line);
                }
                else
                {
                    sw.WriteLine(line);
                    counter++;
                }
            }

            sw.Close();
            stream.Close();
        }

        public static List<FitnessCenter> ReadFitnessCenters(List<User> users)
        {
            List<FitnessCenter> fitnessCenters = new List<FitnessCenter>();
            string path = HostingEnvironment.MapPath("~/App_Data/FitnessCenters.txt");
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split(';');
                FitnessCenter fitnessCenter = new FitnessCenter(tokens[1], new Address(tokens[2], int.Parse(tokens[3]), tokens[4], int.Parse(tokens[5])), int.Parse(tokens[6]), users.Find(x => x.Username.Equals(tokens[7])),
                    double.Parse(tokens[8]), double.Parse(tokens[9]), double.Parse(tokens[10]), double.Parse(tokens[11]), double.Parse(tokens[12]));

                fitnessCenter.Id = tokens[0];
                fitnessCenter.Deleted = bool.Parse(tokens[13]);
                fitnessCenters.Add(fitnessCenter);
            }

            sr.Close();
            stream.Close();

            return fitnessCenters;
        }

        public static void WriteFitnessCenters(List<FitnessCenter> fitnessCenters)
        {
            string path = HostingEnvironment.MapPath("~/App_Data/FitnessCenters.txt");
            File.WriteAllText(path, String.Empty);
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamWriter sw = new StreamWriter(stream);

            int counter = 0;
            foreach (FitnessCenter fitnessCenter in fitnessCenters)
            {
                if (counter == fitnessCenters.Count - 1)
                {
                    sw.Write(fitnessCenter.Id + ";" + fitnessCenter.Name + ";" + fitnessCenter.Address.Street + ";" +
                        fitnessCenter.Address.Number + ";" + fitnessCenter.Address.Place + ";" + fitnessCenter.Address.Postcode + ";" +
                        fitnessCenter.YearOfOpening + ";" + fitnessCenter.Owner.Username + ";" + fitnessCenter.PriceOfMonthlyMembership + ";" +
                        fitnessCenter.PriceOfYearlyMembership + ";" + fitnessCenter.PriceOfOneTraining + ";" + fitnessCenter.PriceOfOneGroupTraining + ";" +
                        fitnessCenter.PriceOfTrainingWithCoach + ";" + fitnessCenter.Deleted);
                    sw.Flush();
                }
                else
                {
                    sw.WriteLine(fitnessCenter.Id + ";" + fitnessCenter.Name + ";" + fitnessCenter.Address.Street + ";" +
                        fitnessCenter.Address.Number + ";" + fitnessCenter.Address.Place + ";" + fitnessCenter.Address.Postcode + ";" +
                        fitnessCenter.YearOfOpening + ";" + fitnessCenter.Owner.Username + ";" + fitnessCenter.PriceOfMonthlyMembership + ";" +
                        fitnessCenter.PriceOfYearlyMembership + ";" + fitnessCenter.PriceOfOneTraining + ";" + fitnessCenter.PriceOfOneGroupTraining + ";" +
                        fitnessCenter.PriceOfTrainingWithCoach + ";" + fitnessCenter.Deleted);
                    counter++;
                }
            }

            sw.Close();
            stream.Close();
        }

        public static List<GroupTraining> ReadGroupTraining(List<FitnessCenter> fitnessCenters)
        {
            List<GroupTraining> trainings = new List<GroupTraining>();
            string path = HostingEnvironment.MapPath("~/App_Data/GroupTrainings.txt");
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split(';');
                GroupTraining training = new GroupTraining(tokens[1], (TypeOfTraining)Enum.Parse(typeof(TypeOfTraining), tokens[2]), fitnessCenters.Find(x => x.Id.Equals(tokens[3])), int.Parse(tokens[4]),
                    DateTime.ParseExact(tokens[5], "yyyy-MM-ddTHH:mm:ss", System.Globalization.CultureInfo.InvariantCulture), int.Parse(tokens[6]));

                training.Id = tokens[0];
                training.Deleted = bool.Parse(tokens[7]);

                for (int i = 0; i < int.Parse(tokens[8]); i++)
                {
                    training.Customers.Add(tokens[i + 9]);
                }

                trainings.Add(training);
            }

            sr.Close();
            stream.Close();

            return trainings;
        }

        public static void WriteGroupTraining(List<GroupTraining> trainings)
        {
            string path = HostingEnvironment.MapPath("~/App_Data/GroupTrainings.txt");
            File.WriteAllText(path, String.Empty);
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamWriter sw = new StreamWriter(stream);

            int counter = 0;
            foreach (GroupTraining training in trainings)
            {
                string line = training.Id + ";" + training.Name + ";" + training.Type.ToString() + ";" + training.FitnessCenter.Id + ";" +
                    training.MinutesOfTraining + ";" + training.TimeTrainingStarts.ToString("s") + ";" + training.MaxNumOfCustomers + ";" + 
                    training.Deleted + ";" + training.Customers.Count;
                for (int i = 0; i < training.Customers.Count; i++)
                {
                    line += ";" + training.Customers[i];
                }

                if (counter == trainings.Count - 1)
                {
                    sw.Write(line);
                }
                else
                {
                    sw.WriteLine(line);
                    counter++;
                }
            }

            sw.Close();
            stream.Close();
        }

        public static List<Comment> ReadComments(List<FitnessCenter> fitnessCenters)
        {
            List<Comment> comments = new List<Comment>();
            string path = HostingEnvironment.MapPath("~/App_Data/Comments.txt");
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split(';');
                Comment comment = new Comment(tokens[1], fitnessCenters.Find(x => x.Id.Equals(tokens[2])), tokens[3].Replace("%newline%", "\n"), int.Parse(tokens[4]));
                comment.Id = int.Parse(tokens[0]);
                comment.Approved = bool.Parse(tokens[5]);

                comments.Add(comment);
            }

            sr.Close();
            stream.Close();

            return comments;
        }

        public static void WriteComments(List<Comment> comments)
        {
            string path = HostingEnvironment.MapPath("~/App_Data/Comments.txt");
            File.WriteAllText(path, String.Empty);
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamWriter sw = new StreamWriter(stream);

            int counter = 0;
            foreach (Comment comment in comments)
            {
                if (counter == comments.Count - 1)
                {
                    sw.Write(comment.Id + ";" + comment.Customer + ";" + comment.FitnessCenter.Id + ";" + comment.Text.Replace("\n", "%newline%") + ";" + comment.Rate + ";" + comment.Approved);
                }
                else
                {
                    sw.WriteLine(comment.Id + ";" + comment.Customer + ";" + comment.FitnessCenter.Id + ";" + comment.Text.Replace("\n", "%newline%") + ";" + comment.Rate + ";" + comment.Approved);
                    counter++;
                }
            }
            sw.Close();
            stream.Close();
        }
    }
}