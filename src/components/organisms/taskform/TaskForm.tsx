import React from "react";
import {useForm} from "react-hook-form";
import ControllerInput from "../../molecules/ControllerInput.tsx";
import ControllerSelect from "../../molecules/ControllerSelect.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import {useCreateTaskMutation} from "../../../store/api/taskApi.ts";
import {defaultValues, TaskFormValidationSchema} from "./validation/TaskFormValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {TaskFormValues} from "./types.ts";


export const TaskForm: React.FC = () => {
    const {user} = useAuth();
    const [createTask, {isLoading}] = useCreateTaskMutation();
    const {control, handleSubmit, reset} = useForm<TaskFormValues>({
        defaultValues,
        resolver: zodResolver(TaskFormValidationSchema),
    });

    const onSubmit = async (data: TaskFormValues) => {
        try {
            if (!user) return;

            await createTask({
                ...data,
                createdBy: user.uid,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }).unwrap();

            reset();
        } catch (error) {
            console.error("Görev oluşturulurken hata oluştu:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Yeni Görev Oluştur</h2>

            <ControllerInput
                name="title"
                control={control}
                label="Başlık"
                placeholder="Görev başlığını girin"
            />

            <ControllerInput
                name="description"
                control={control}
                label="Açıklama"
                placeholder="Görev açıklamasını girin"
                multiline
            />

            <ControllerInput
                name="dueDate"
                control={control}
                label="Bitiş Tarihi"
                type="date"
            />

            <ControllerInput
                name="assignedTo"
                control={control}
                label="Atanan Kişi"
                placeholder="Görevi atayacağınız kişiyi girin"
            />

            <ControllerSelect
                name="status"
                control={control}
                label="Durum"
                options={[
                    {value: "todo", label: "Yapılacak"},
                    {value: "inprogress", label: "Devam Ediyor"},
                    {value: "done", label: "Tamamlandı"}
                ]}
            />

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold transition-colors`}
            >
                {isLoading ? "Kaydediliyor..." : "Görevi Kaydet"}
            </button>
        </form>
    );
};
