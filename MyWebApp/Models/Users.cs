using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class Users
    {
        public static List<User> UserList = HttpContext.Current.Application["users"] as List<User>;

        public static User AddUser(User user)
        {
            user.ListOfTrainingOrFitnessCentersId = new List<string>();
            UserList.Add(user);
            ReadAndWriteModels.WriteUsers(UserList);
            return user;
        }

        public static void Block(User user)
        {
            user.Blocked = true;
            ReadAndWriteModels.WriteUsers(UserList);
        }

        public static void Unblock(User user)
        {
            user.Blocked = false;
            ReadAndWriteModels.WriteUsers(UserList);
        }

        public static User UpdateUser(User user)
        {
            User oldUser = UserList.Find(item => item.Username.Equals(user.Username));
            
            oldUser.Password = user.Password;
            oldUser.FirstName = user.FirstName;
            oldUser.LastName = user.LastName;
            oldUser.Gender = user.Gender;
            oldUser.EmailAddress = user.EmailAddress;
            oldUser.DateOfBirth = user.DateOfBirth;

            ReadAndWriteModels.WriteUsers(UserList);
            return oldUser;
        }
    }
}