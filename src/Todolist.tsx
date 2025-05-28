import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
  filter: FilterValuesType
    changeTaskStatus: (taskId:string, isDone: boolean) => void
}

export const Todolist = (props: PropsType)=> {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if(title.trim()) {
            props.addTask(title.trim())

        setTitle("");
        } else {
            setError('докинь title')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        if(e.currentTarget.value.length < 10) {
             setTitle(e.currentTarget.value)
        }
        else if (e.currentTarget.value.length === 10) {
              setError('Максимальня строка')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error  && <div className={'errorMessage'}>{error}</div>}

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange = {(e) =>{props.changeTaskStatus(t.id, e.currentTarget.checked)}}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter=== 'all' ? 'active-filter' : ''} onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
