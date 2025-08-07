"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const database_1 = __importDefault(require("../config/database"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, priority, search } = req.query;
        const whereClause = { userId: req.user.id };
        if (status && status !== 'all') {
            whereClause.completed = status === 'completed';
        }
        if (priority && priority !== 'all') {
            whereClause.priority = priority;
        }
        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const todos = yield database_1.default.todo.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
        });
        res.json(todos);
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, dueDate, priority } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }
    try {
        const todo = yield database_1.default.todo.create({
            data: {
                title,
                description,
                priority: priority || 'medium',
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: req.user.id,
            },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority } = req.body;
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }
    try {
        const todo = yield database_1.default.todo.update({
            where: { id, userId: req.user.id },
            data: {
                title,
                description,
                completed,
                priority,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
        });
        res.json(todo);
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.default.todo.delete({
            where: { id, userId: req.user.id },
        });
        res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});
exports.deleteTodo = deleteTodo;
