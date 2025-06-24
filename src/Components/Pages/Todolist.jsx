import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import './Todolist.css' // 

function Todolist() {
  const [tasks, setTasks] = useState(['One', 'Two', 'Three'])
  const [newTask, setNewTask] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editedTaskValue, setEditedTaskValue] = useState('')
  const [error, setError] = useState('')

  function handleInputChange(e) {
    setNewTask(e.target.value)
    setError('') 
  }

  function addTask() {
    const trimmedTask = newTask.trim()

    if (trimmedTask === '') {
      setError('You must enter a value')
      return
    }

    const alreadyExists = tasks.some((task) => task.toLowerCase() === trimmedTask.toLowerCase())

    if (alreadyExists) {
      setError('its already exist')
      return
    }

    setTasks([...tasks, trimmedTask])
    setNewTask('')
    setError('')
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  function saveEditedTask(index) {
    const trimmed = editedTaskValue.trim()
    if (trimmed === '') {
      setError('error')
      return
    }

    const alreadyExists = tasks.some((task, i) => i !== index && task.toLowerCase() === trimmed.toLowerCase())

    if (alreadyExists) {
      setError('its already exists')
      return
    }

    const updatedTasks = [...tasks]
    updatedTasks[index] = trimmed
    setTasks(updatedTasks)
    setEditIndex(null)
    setEditedTaskValue('')
    setError('')
  }

  return (
    <div className="myblog">
      <h2>📝 my todolist</h2>
      <div>
        <input type="text" value={newTask} onChange={handleInputChange} placeholder="new work" />
        <button onClick={addTask}>add</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  value={editedTaskValue}
                  onChange={(e) => setEditedTaskValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEditedTask(index)
                  }}
                />
                <button onClick={() => saveEditedTask(index)}>add</button>
                <button onClick={() => setEditIndex(null)}>reset</button>
              </>
            ) : (
              <>
                {task}
                <FaEdit
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => {
                    setEditIndex(index)
                    setEditedTaskValue(task)
                    setError('')
                  }}
                />
                <FaTrash
                  style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
                  onClick={() => deleteTask(index)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todolist
