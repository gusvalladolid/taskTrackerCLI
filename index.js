import FileManager from "./fileManager.js";
const fileManager = new FileManager();

async function main() {

  const args = process.argv.slice(2);
  const action = args[0];

  if (action === 'help') {
    console.log("help");
    return
  }

  let data = await fileManager.readFile();
  
  switch (action) {
    case 'add':
      try {
        if (!Array.isArray(data)) {
          data = [];
        }

        const task = args[1];

        if (!task) {
          throw new Error("Task name is required");
        }

        data.push({
          id: (Math.floor(Math.random() * 90000) + 10000).toString(),
          description: task,
          status: "pending",
          createdAt: new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }),
          updatedAt: new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        });
    
        await fileManager.writeFile(data);
        console.log("Task added successfully");
      } catch (error) {
        console.error("Error adding task:", error.message);
      }
      break;
    case 'remove':
      try {
        if (!Array.isArray(data)) {
          throw new Error("No tasks found");
        }
        const id = args[1];
        if (!id) {
          throw new Error("Task id is required");
        }
        
        const index = data.findIndex(task => task.id === id);
        
        if (index === -1) {
          throw new Error("Task not found");
        }

        data.splice(index, 1);
        await fileManager.writeFile(data);
        console.log("Task removed successfully");
      } catch (error) {
        console.error("Error removing task:", error.message);
      }
      break;
    case 'list':
      try {
        if (!Array.isArray(data)) {
          throw new Error("No tasks found");
        }
        const listBy = args[1];
        
        if (!listBy) {
          console.table(data);
        } else if (listBy === 'done' || listBy === 'in-progress' || listBy === 'pending') {
          const tasks = data.filter(task => task.status === listBy);
          console.table(tasks);
        } else {
          throw new Error("Invalid listBy parameter");
        }
      } catch (error) {
        console.error("Error while listing tasks:", error.message);
      }
      break;
    case 'update':
      try {
        if (!Array.isArray(data)) {
          throw new Error("No tasks found");
        }
        const id = args[1];
        const task = args[2];
        if (!task || !id) {
          throw new Error("Task name and ID are required");
        }
        
        const index = data.findIndex(task => task.id === id);
        
        if (index === -1) {
          throw new Error("Task not found");
        }

        data[index].description = task;
        data[index].updatedAt = new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })
        await fileManager.writeFile(data);
        console.log("Task updated successfully");
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
      break;
    case 'mark-in-progress':
      try {
        if (!Array.isArray(data)) {
          throw new Error("No tasks found");
        }
        const id = args[1];
        if (!id) {
          throw new Error("Task ID is required");
        }
        
        const index = data.findIndex(task => task.id === id);
        
        if (index === -1) {
          throw new Error("Task not found");
        }

        data[index].status = "in-progress";
        data[index].updatedAt = new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })
        await fileManager.writeFile(data);
        console.log("Task marked as in-progress successfully");
      } catch (error) {
        console.error("Error marking task as in-progress:", error.message);
      }
      break;
    case 'mark-done':
      try {
        if (!Array.isArray(data)) {
          throw new Error("No tasks found");
        }
        const id = args[1];
        if (!id) {
          throw new Error("Task ID is required");
        }
        
        const index = data.findIndex(task => task.id === id);
        
        if (index === -1) {
          throw new Error("Task not found");
        }

        data[index].status = "done";
        data[index].updatedAt = new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })
        await fileManager.writeFile(data);
        console.log("Task marked as done successfully");
      } catch (error) {
        console.error("Error marking task as done:", error.message);
      }
      break;
    default:
      console.error(`Unknown command: ${args[0]}`);
      process.exit(1);
    }
}

main().catch(error => {
  console.error("An unexpected error occured:", error);
  process.exit(1);
});