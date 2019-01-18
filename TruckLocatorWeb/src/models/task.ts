export interface ITask {
    id: string;
    taskAddress: string;
    taskDescription: string;
    taskTime: string;
    done?: boolean;
}