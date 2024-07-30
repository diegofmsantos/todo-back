import { Prisma, Category } from "@prisma/client"
import { prisma } from "../libs/prisma"

export const createTask = async (data: Prisma.TaskCreateInput) => {
    try {
        const task = await prisma.task.create({ data })
        return task
    } catch (error) {
        console.log('Erro ao criar tarefa', error)
        return false
    }
}

export const getTasks = async () => {
    try {
        const tasks = await prisma.task.findMany({})
        return tasks
    } catch (error) {
        console.log('Erro ao mostrar tarefas', error)
        return false
    }
}

export const updateDone = async (id: number) => {
    try {
        const currentTask = await prisma.task.findUnique({ where: { id } })
        if (!currentTask) {
            throw new Error('Tarefa não encontrada')
        }

        const task = await prisma.task.update({
            where: { id },
            data: {
                done: !currentTask.done
            }
        })

        return task
    } catch (error) {
        console.log('Erro ao concluir tarefa:', error)
        return false
    }
}

export const updateTask = async (id: number, newTitle: string, newCategory: string) => {
    try {
        if (!Object.values(Category).includes(newCategory as Category)) {
            throw new Error(`Categoria inválida: ${newCategory}`)
        }

        const task = await prisma.task.update({
            where: { id },
            data: {
                title: newTitle,
                category: newCategory as Category,
            }
        })
        return task
    } catch (error) {
        console.log('Erro ao atualizar tarefa:', error)
        return false
    }
}

export const deleteTask = async (id: number) => {
    try {
        const task = await prisma.task.delete({
            where: { id }
        });
        return task
    } catch (error) {
        console.log('Erro ao deletar tarefa', error)
        return false
    }
}
