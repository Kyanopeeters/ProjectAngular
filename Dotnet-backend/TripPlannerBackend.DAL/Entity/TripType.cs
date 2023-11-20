using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
    public class TripType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Trip>? Trips { get; set; }
    }
}
