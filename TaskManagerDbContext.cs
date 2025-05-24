using Microsoft.EntityFrameworkCore;

namespace TaskManager.API
{
    public class TaskManagerDbContext : DbContext
    {
        public TaskManagerDbContext(DbContextOptions<TaskManagerDbContext> options) : base(options)
        {
        }

        // Define your DbSets here, for example:
        // public DbSet<Task> Tasks { get; set; }
    }
}
