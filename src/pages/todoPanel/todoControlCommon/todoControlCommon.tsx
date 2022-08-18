import React from 'react'
import './todoControlCommon.css'
import classNames from 'classnames'

interface TodoControlCommonProps {
  handlePagingSelect: () => void
  handleAllSelect: () => void
  onNextPageClicked?: () => void
  onPrePageClicked?: () => void
  pageIndex?: number
  isPaging: boolean
}

const TodoControlCommon = ({
  handleAllSelect,
  handlePagingSelect,
  onNextPageClicked,
  onPrePageClicked,
  isPaging,
  pageIndex = 1
}: TodoControlCommonProps) => {
  return <div className="todo-control-common">
        <div>
            <button className="todo-control-button">add todo</button>
            <button className="todo-control-button">delete completed</button>
        </div>
        <div>
            <div className="todo-control-buttons">
                <span
                    className={classNames('todo-control-button-slice',
                      !isPaging && 'todo-control-button-slice-selected')}
                    onClick={handleAllSelect}
                >
                    all
                </span>
                    <span
                        className={classNames('todo-control-button-slice',
                          isPaging && 'todo-control-button-slice-selected')}
                        onClick={handlePagingSelect}
                    >
                    paging
                </span>
            </div>
            {isPaging &&
                <div className="todo-control-page-buttons">
                    <button className="todo-control-page-button" onClick={onPrePageClicked}>-</button>
                    {pageIndex}
                    <button className="todo-control-page-button" onClick={onNextPageClicked}>+</button>
                </div>
            }
        </div>
    </div>
}

export default TodoControlCommon
