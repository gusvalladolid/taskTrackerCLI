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
      console.log(data);
      break;
    case 'update':
      console.log("update");
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