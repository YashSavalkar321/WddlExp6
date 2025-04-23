import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';
import '../App.css';


const TodoList = ({ tasks, updateTask, deleteTask, reorderTasks }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="todo-list"
          >
            {tasks.length === 0 && <p className="empty-list-message">No tasks yet. Add one!</p>}
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      background: snapshot.isDragging ? '#444' : 'transparent',
                      boxShadow: snapshot.isDragging ? '0 0 10px #aaa' : 'none',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <TodoItem
                      task={task}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
