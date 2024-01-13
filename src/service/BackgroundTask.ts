import * as TaskManager from "expo-task-manager";

const BACKGROUND_TASK_NAME = "backgroundTask";

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background task error:", error);
    return;
  }

  // Your background task logic here, e.g., API calls, data syncing
  console.log("Background task executed with data:", data);
});

export { BACKGROUND_TASK_NAME };
