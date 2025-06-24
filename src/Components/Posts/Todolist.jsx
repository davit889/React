import { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import './Todolist.css'

import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* քաշելու handle-ը */}
      {children({ listeners })}
    </div>
  )
}

function Todolist() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editedTaskValue, setEditedTaskValue] = useState('')
  const [error, setError] = useState('')

  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    const stored = localStorage.getItem('my-tasks')
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleInputChange(e) {
    setNewTask(e.target.value)
    setError('')
  }

  function addTask() {
    const trimmed = newTask.trim()
    if (trimmed === '') {
      setError('You must enter a value')
      return
    }

    const exists = tasks.some((de) => de.text.toLowerCase() === trimmed.toLowerCase())
    if (exists) {
      setError('It already exists')
      return
    }

    setTasks((prev) => [...prev, { text: trimmed, completed: false }])
    setNewTask('')
    setError('')
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  function toggleComplete(index) {
    const updated = [...tasks]
    updated[index].completed = !updated[index].completed
    setTasks(updated)
  }

  function saveEditedTask(index) {
    const trimmed = editedTaskValue.trim()
    if (trimmed === '') {
      setError('You must enter a value')
      return
    }

    const updated = [...tasks]
    updated[index].text = trimmed
    setTasks(updated)
    setEditIndex(null)
    setEditedTaskValue('')
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = parseInt(active.id)
    const newIndex = parseInt(over.id)

    setTasks((prev) => arrayMove(prev, oldIndex, newIndex))
  }

  return (
    <div className="myblog">
      <h2>📝 My Todo List</h2>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="New task"
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask()
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((_, i) => i.toString())} strategy={verticalListSortingStrategy}>
          <ul>
            {tasks.map((task, index) => (
              <SortableItem key={index} id={index.toString()}>
                {({ listeners }) => (
                  <li className={`${task.completed ? 'active' : ''} listItem`}>
                    {editIndex === index ? (
                      <>
                        <input
                          value={editedTaskValue}
                          onChange={(e) => setEditedTaskValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditedTask(index)
                          }}
                        />
                        <button onClick={() => saveEditedTask(index)}>Save</button>
                        <button onClick={() => setEditIndex(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        {task.text}
                        <div className="buttons">
                          <button
                            onClick={() => {
                              setEditIndex(index)
                              setEditedTaskValue(task.text)
                              setError('')
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button onClick={() => deleteTask(index)}>
                            <FaTrash />
                          </button>
                          <button className="check" onClick={() => toggleComplete(index)}>
                            ✅
                          </button>

                          {/* ✅ Սա է քաշելու handle-ը */}
                          <span className="drag-handle" {...listeners} style={{ cursor: 'grab', marginLeft: '10px' }}>
                            ⠿
                          </span>
                        </div>
                      </>
                    )}
                  </li>
                )}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default Todolist
