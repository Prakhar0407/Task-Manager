export class TodoItemFormatter {
  formatTask(task) {
    return task.length > 14 ? task.slice(0, 14) + "..." : task;
  }

  formatDueDate(dueDate) {
    return dueDate || "No due date";
  }

  formatStatus(completed) {
    return completed ? "Completed" : "Pending";
  }
}
