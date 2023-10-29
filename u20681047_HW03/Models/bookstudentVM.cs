using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u18347852_HW03.Models
{
    public class bookstudentVM
    {
        public IEnumerable<books> books { get; set; }
        public IEnumerable<students> students { get; set; }
        public IEnumerable<borrows> borrows { get; set; }
    }
}