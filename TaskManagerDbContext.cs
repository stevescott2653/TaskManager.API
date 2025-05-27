using Microsoft.EntityFrameworkCore;

namespace TaskManager.API
{
    public class TaskManagerDbContext : DbContext
    {
        public TaskManagerDbContext(DbContextOptions<TaskManagerDbContext> options) : base(options)
        {
        }

        // Example DbSet for tasks
        public DbSet<TaskItem> Tasks { get; set; }
    }
}
  