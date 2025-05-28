using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.Models {

    public class TaskList {
        
        public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string ? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreateAt { get; set; } = DateTime.UtcNow;


    }
}