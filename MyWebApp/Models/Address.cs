using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWebApp.Models
{
    public class Address
    {
        private string street;
        private int number;
        private string place;
        private int postcode;

        public Address()
        {

        }

        public Address(string street, int number, string place, int postcode)
        {
            this.street = street;
            this.number = number;
            this.place = place;
            this.postcode = postcode;
        }

        public string Street { get => street; set => street = value; }
        public int Number { get => number; set => number = value; }
        public string Place { get => place; set => place = value; }
        public int Postcode { get => postcode; set => postcode = value; }
    }
}