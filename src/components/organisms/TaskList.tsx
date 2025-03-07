import { FaTrash, FaCheck } from "react-icons/fa";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import Loading from "../molecules/Loading.tsx";
import useAuth from "../../hooks/useAuth";
import {
    useGetTasksQuery,
    useDeleteTaskMutation,
    useUpdateTaskStatusMutation
} from "../../store/api/taskApi";

const TaskList = () => {
    const { user, isAdmin } = useAuth();
    const { data: tasks, isLoading, error } = useGetTasksQuery(
        { userId: user?.uid || "", isAdmin: isAdmin || false },
        { skip: !user }
    );
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "d MMMM yyyy HH:mm", { locale: tr });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo':
                return 'bg-yellow-100 text-yellow-800';
            case 'inprogress':
                return 'bg-blue-100 text-blue-800';
            case 'done':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'todo':
                return 'Yapılacak';
            case 'inprogress':
                return 'Devam Ediyor';
            case 'done':
                return 'Tamamlandı';
            default:
                return status;
        }
    };

    const handleStatusUpdate = async (id: string, currentStatus: string) => {
        try {
            await updateTaskStatus({ id, currentStatus }).unwrap();
        } catch (error) {
            console.error("Görev durumu güncellenirken hata oluştu:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id).unwrap();
        } catch (error) {
            console.error("Görev silinirken hata oluştu:", error);
        }
    };

    if (!user) {
        return null;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center py-8 bg-red-50 rounded-lg">
                <p className="text-red-500">Görevler yüklenirken bir hata oluştu</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-bold mb-4">Görevler</h2>
            {!tasks || tasks.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Henüz görev bulunmamaktadır.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-lg shadow-md p-4 border-l-4 hover:shadow-lg transition-shadow"
                            style={{ borderLeftColor: task.status === 'done' ? '#10B981' : '#3B82F6' }}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-lg">{task.title}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleStatusUpdate(task.id, task.status)}
                                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                        title={task.status === 'done' ? 'Görevi Yapılmadı İşaretle' : 'Görevi Tamamlandı İşaretle'}
                                    >
                                        <FaCheck className={task.status === 'done' ? 'text-green-500' : 'text-gray-400'} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="p-1.5 rounded-full hover:bg-red-100 transition-colors"
                                        title="Görevi Sil"
                                    >
                                        <FaTrash className="text-red-500" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-3">{task.description}</p>

                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="font-medium mr-2">Atanan:</span>
                                    {task.assignedTo}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="font-medium mr-2">Bitiş Tarihi:</span>
                                    {formatDate(task.dueDate)}
                                </div>
                                <div className="flex items-center">
                                    <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                        {getStatusText(task.status)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
