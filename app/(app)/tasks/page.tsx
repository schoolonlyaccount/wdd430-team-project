import { getTasks, getTasksPages, TaskFilterStatus } from "@/lib/tasks-db";
import { updateTask, deleteTask } from "@/lib/actions";
import TaskCardButton from "./task-card-button";
import { Pagination } from "@/components/Pagination";
import PageHeading from "@/components/PageHeading";

export default async function TasksPage(props: { searchParams?: Promise<{ query?: string; page?: string; status?: string; }> }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1;

    const allowedStatuses: TaskFilterStatus[] = [
        "all",
        "in-progress",
        "completed"
    ];

    const status = allowedStatuses.includes(searchParams?.status as TaskFilterStatus) ? (searchParams?.status as TaskFilterStatus) : "all";

    const [tasks, totalPages] = await Promise.all([
        getTasks(query, currentPage, status),
        getTasksPages(query, status),
    ]);

    const filterStyle = "border w-[8rem] py-2 text-center cursor-pointer"

    return (
        <div>
            <PageHeading title="Your Tasks" description="Here you can manage your tasks and track your progress." />

            <nav className="flex justify-center gap-4 p-4">
                <a className={`${filterStyle} `} href="/tasks?status=all">All</a>
                <a className={`${filterStyle}`} href="/tasks?status=in-progress">In-progress</a>
                <a className={`${filterStyle}`} href="/tasks?status=completed">Completed</a>
            </nav>

            {tasks.length === 0 ? (
                <section className="text-center p-12 m-4 mb-8 border-2 border-white bg-[var(--secondary-color)]">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {status === "in-progress"
                            ? "No tasks in progress"
                            : status === "completed"
                                ? "No completed tasks"
                                : "No tasks yet"}
                    </h2>

                    <p className="text-white">
                        {status === "in-progress"
                            ? "You're all caught up! There are no tasks currently in progress."
                            : status === "completed"
                                ? "You haven't completed any tasks yet."
                                : "Create a task to get started."}
                    </p>
                </section>
            ) : (<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {tasks.map((task) => (
                    <div key={task._id.toString()} className="border-2 border-white">
                        <h2 className="text-xl font-bold text-white text-center border-b-2 border-white py-2 bg-[var(--primary-color)]">
                            {task.title}
                        </h2>
                        <div className="flex border-b-2 border-white justify-center text-center bg-[var(--secondary-color)]">
                            <div className="flex-1 py-2 border-r-2 border-white">
                                <p className="text-lg font-bold">Due date</p>
                                <p className="">{task.dueDate}</p>
                            </div>
                            <div className="flex-1 py-2">
                                <p className="text-lg font-bold">Status</p>
                                <p className="">{task.status.charAt(0).toLocaleUpperCase() + task.status.slice(1)}</p>
                            </div>
                        </div>
                        <p className="h-[8rem] overflow-y-auto break-words p-4 border-b-2 border-white bg-[var(--secondary-color)]">
                            {task.details}
                        </p>
                        <div className="flex">
                            <form action={updateTask.bind(null, task._id.toString())} className="flex-1 border-r-2">
                                <TaskCardButton actionType="update">
                                    {task.status === "in-progress"
                                        ? "Mark as complete"
                                        : "Mark as in-progress"}
                                </TaskCardButton>
                            </form>
                            <form action={deleteTask.bind(null, task._id.toString())} className="flex-1">
                                <TaskCardButton actionType="delete">
                                    Delete
                                </TaskCardButton>
                            </form>
                        </div>
                    </div>
                ))}
            </section>
            )}
            {totalPages > 0 && <Pagination totalPages={totalPages} />}
        </div>
    );
}