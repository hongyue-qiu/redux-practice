import React, { ChangeEvent, useEffect, useState } from 'react'
import '../todoPanel/todoPanel.css'
import { Todo } from '../../reducer/todoSlice'
import TodoItem from '../todoPanel/todoItem/todoItem'
import TodoControlItem from '../todoPanel/todoControlItem/todoControlItem'
import { filterCompletionOptions, filterPriorityOptions, FilterTodoEnum } from '../../constant/todo'
import { useQuery } from 'react-query'
import { fetchTodos } from '../../api/todoAPI'
import TodoControlCommon from '../todoPanel/todoControlCommon/todoControlCommon'

const TodoPanelQuery = () => {
  const [isPaging, setIsPaging] = useState(false)
  const [filterByCompletionType, setFilterByCompletionType] = useState(FilterTodoEnum.All)
  const [filterByPriorityType, setFilterByPriorityType] = useState(FilterTodoEnum.All)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [currentTodos, setCurrentTodos] = useState<Todo[]>()

  const todos = useQuery(
    ['todos', currentPageIndex],
    async () => await fetchTodos(currentPageIndex),
    {
      keepPreviousData: true
    }
  )

  const handleTodoItemCheckboxClicked = (index: number) => {
    //    todo: post to change check
  }

  const handleTodoItemPrioritySelected = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    //    todo: post to change select
  }

  const handlePagingSelect = () => {
    setIsPaging(true)
    setCurrentPageIndex(1)
  }

  const handleNextPageClicked = () => {
    //  todo: api need return value to justice last page
    setCurrentPageIndex(currentPageIndex + 1)
  }

  const handlePrePageClicked = () => {
    const preIndex = currentPageIndex - 1
    const index = preIndex > 0 ? preIndex : 1
    setCurrentPageIndex(index)
  }

  const handleAllSelect = () => {
    setIsPaging(false)
    setCurrentPageIndex(0)
  }

  const handleCompletionOptionClick = (type: FilterTodoEnum) => {
    setFilterByCompletionType(type)
  }

  const handlePriorityOptionClick = (type: FilterTodoEnum) => {
    setFilterByPriorityType(type)
  }

  useEffect(() => {
    if (todos.isSuccess) {
      let tempTodos = todos.data
      if (filterByCompletionType !== FilterTodoEnum.All) {
        tempTodos = tempTodos.filter((todo: { completed: boolean }) => {
          if (filterByCompletionType === FilterTodoEnum.Complete) {
            return todo.completed
          } else {
            return !todo.completed
          }
        })
      }

      tempTodos = tempTodos.filter((todo: { priority: FilterTodoEnum }) =>
        todo.priority === filterByPriorityType || filterByPriorityType === 'all')
      setCurrentTodos(tempTodos)
    }
  }, [todos.data, filterByCompletionType, filterByPriorityType])

  return <div className="todo-panel">
        <section className="todo-list">
            <h3>todo list</h3>
            <div className="todo-list-content">
                {currentTodos?.map((item, index) =>
                    <TodoItem
                        key={index}
                        index={index}
                        isChecked={item.completed}
                        description={item.text}
                        onCheckboxClicked={() => handleTodoItemCheckboxClicked(item.index ?? 0)}
                        onPrioritySelect={(e) => handleTodoItemPrioritySelected(e, item.index ?? 0)}
                        priority={item.priority}
                    />
                )}
            </div>

        </section>
        <section className="todo-control">
            <TodoControlCommon
                handlePagingSelect={handlePagingSelect}
                handleAllSelect={handleAllSelect}
                onNextPageClicked={handleNextPageClicked}
                onPrePageClicked={handlePrePageClicked}
                isPaging={isPaging}
                pageIndex={currentPageIndex}
            />
            <div className="todo-control-options">
                <TodoControlItem
                    title="filter by completion: "
                    type="completion"
                    options={filterCompletionOptions}
                    onOptionClick={handleCompletionOptionClick}
                />
                <TodoControlItem
                    title="filter by priority: "
                    type="priority"
                    options={filterPriorityOptions}
                    onOptionClick={handlePriorityOptionClick}
                />
            </div>
        </section>
    </div>
}

export default TodoPanelQuery
