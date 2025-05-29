using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Require authentication for all actions
    public class TasksController : ControllerBase
    {
        private readonly TaskManagerDbContext _context;

        public TasksController(TaskManagerDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
            return Ok(tasks);
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();
            return task;
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Ensure all fields are set, fallback to defaults if missing
            task.CreatedAt = DateTime.UtcNow;
            task.Status = string.IsNullOrWhiteSpace(task.Status) ? "ToDo" : task.Status;
            task.Priority = string.IsNullOrWhiteSpace(task.Priority) ? "Medium" : task.Priority;
            task.IsCompleted = false;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Fetch the task again to ensure all fields (including DB-generated) are returned
            var createdTask = await _context.Tasks.FindAsync(task.Id);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, createdTask);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskItem task)
        {
            if (id != task.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Ensure all fields are set, fallback to defaults if missing
            task.Status = string.IsNullOrWhiteSpace(task.Status) ? "ToDo" : task.Status;
            task.Priority = string.IsNullOrWhiteSpace(task.Priority) ? "Medium" : task.Priority;

            _context.Entry(task).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                    return NotFound();
                throw;
            }
            // Return the updated task
            var updatedTask = await _context.Tasks.FindAsync(id);
            return Ok(updatedTask);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}