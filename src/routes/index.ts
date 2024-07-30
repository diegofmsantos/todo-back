import express from 'express'
import { createTask, deleteTask, getTasks, updateDone, updateTask } from '../services/task'

const router = express.Router()

router.post('/task', async (req, res) => {
    try {
        const { title, category } = req.body
        const result = await createTask({ title, category })
        res.json({ result })
    } catch (error) {
        console.log('Erro ao criar tarefa', error)
        res.status(500).json({ error: 'Erro ao criar tarefa' })
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const result = await getTasks()
        res.json({ result })
    } catch (error) {
        console.log('Erro ao obter tarefas', error)
        res.status(500).json({ error: 'Erro ao obter tarefas' })
    }
})

router.put('/taskdone/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await updateDone(Number(id))
        if (result) {
            res.json({ result })
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada' })
        }
    } catch (error) {
        console.log('Erro na conclusão da tarefa:', error)
        res.status(500).json({ error: 'Erro na conclusão da tarefa' })
    }
})

router.put('/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { newTitle, newCategory } = req.body
        const result = await updateTask(Number(id), newTitle, newCategory)
        if (result) {
            res.json({ result })
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada' })
        }
    } catch (error) {
        console.log('Erro na atualização da tarefa:', error)
        res.status(500).json({ error: 'Erro na atualização da tarefa' })
    }
})

router.delete('/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteTask(Number(id))
        if (result) {
            res.json({ result })
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada' })
        }
    } catch (error) {
        console.log('Erro ao deletar tarefa', error)
        res.status(500).json({ error: 'Erro ao deletar tarefa' })
    }
})

export default router
