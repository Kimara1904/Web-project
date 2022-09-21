using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class Comment
    {
        private int id;
        private string customer;
        private FitnessCenter fitnessCenter;
        private string text;
        private int rate;
        private bool approved;

        public Comment()
        {

        }
        public Comment(String customer, FitnessCenter fitnessCenter, string text, int rate)
        {
            this.id = new Random().Next(100000);
            this.customer = customer;
            this.fitnessCenter = fitnessCenter;
            this.text = text;
            this.rate = rate;
            this.approved = false;
        }

        public string Customer { get => customer; set => customer = value; }
        public FitnessCenter FitnessCenter { get => fitnessCenter; set => fitnessCenter = value; }
        public string Text { get => text; set => text = value; }
        public int Rate { get => rate; set => rate = value; }
        public int Id { get => id; set => id = value; }
        public bool Approved { get => approved; set => approved = value; }
    }
}