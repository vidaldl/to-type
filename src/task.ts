// This is the definition of the interface
interface Task {
    id: number;
    description: string;
    completed: boolean;
    priority?: "low" | "medium" | "high";  // Optional
    dueDate?: Date;  // Optional 
}

