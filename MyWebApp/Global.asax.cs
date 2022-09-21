using MyWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MyWebApp
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            List<User> users = ReadAndWriteModels.ReadUsers();
            HttpContext.Current.Application["users"] = users;
            List<FitnessCenter> fitnessCenters = ReadAndWriteModels.ReadFitnessCenters(users);
            HttpContext.Current.Application["fitnessCenters"] = fitnessCenters;
            List<GroupTraining> trainings = ReadAndWriteModels.ReadGroupTraining(fitnessCenters);
            HttpContext.Current.Application["groupTrainings"] = trainings;
            List<Comment> comments = ReadAndWriteModels.ReadComments(fitnessCenters);
            HttpContext.Current.Application["comments"] = comments;
        }
    }
}
