using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace u18347852_HW03.Models
{
    public class borrwauthortypeVM
    {
        public IEnumerable<books> books { get; set; }
        public IEnumerable<authors> authors { get; set; }
        public IEnumerable<types> types { get; set; }
        public IEnumerable<borrows> borrows { get; set; }
    }
}