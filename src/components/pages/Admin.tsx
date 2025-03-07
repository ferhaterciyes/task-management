import TaskList from "../organisms/TaskList";
import { TaskForm } from "../organisms/taskform/TaskForm";

const Admin = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Görev Yönetimi</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <TaskForm />
                </div>
                <div className="md:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
