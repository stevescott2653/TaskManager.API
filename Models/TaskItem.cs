using System;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public DateTime? DueDate { get; set; }

        public string Status { get; set; } = "ToDo";

        public string Priority { get; set; } = "Medium";

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}