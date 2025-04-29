const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const authenticateToken = require('../middlewares/authMiddleware'); 


router.get('/', authenticateToken, tasksController.getAllTasks); 
router.post('/', authenticateToken, tasksController.createTask); 
router.put('/:id', authenticateToken, tasksController.updateTask); 
router.delete('/:id', authenticateToken, tasksController.deleteTask); 
router.patch('/:id/complete', authenticateToken, tasksController.markTaskComplete); 

module.exports = router;
