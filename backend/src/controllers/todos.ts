import { Request, Response } from 'express';
import prisma from '../config/database';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { status, priority, search } = req.query;
    
    const whereClause: any = { userId: (req as any).user.id };
    
    if (status && status !== 'all') {
      whereClause.completed = status === 'completed';
    }
    
    if (priority && priority !== 'all') {
      whereClause.priority = priority;
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const todos = await prisma.todo.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, dueDate, priority } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: (req as any).user.id,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed, dueDate, priority } = req.body;

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }

  try {
    const todo = await prisma.todo.update({
      where: { id, userId: (req as any).user.id },
      data: {
        title,
        description,
        completed,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where: { id, userId: (req as any).user.id },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};