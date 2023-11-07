import { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Item from "./item";
import Footer from "./footer";
import {api} from '../api/axiosConfig';

export default class Main extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        location: PropTypes.object.isRequired,
        visibleTodos: PropTypes.array.isRequired,
        completedCount: PropTypes.number.isRequired,
        activeCount: PropTypes.number.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        toggleAll: PropTypes.func.isRequired,
        clearCompleted: PropTypes.func.isRequired,
    };

    async deleteTodo(todoId) {
        console.log(todoId)
        const res = await api.delete(`/${todoId}`);
    }

    render() {
        const { todos, editTodo, toggleTodo, toggleAll, clearCompleted, location, visibleTodos, completedCount, activeCount } = this.props;
        if (todos.length === 0)
            return null;

        return (
            <main className="main" data-testid="main">
                <Footer completedCount={completedCount} activeCount={activeCount} filter={location.pathname} onClearCompleted={clearCompleted} />
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={completedCount === todos.length} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
                <ul className={classnames("todo-list")} data-testid="todo-list">
                    {visibleTodos.map((todo, index) => (
                        <Item key={todo.orderTodo} todo={todo} editTodo={editTodo} deleteTodo={key => this.deleteTodo(key)} toggleTodo={toggleTodo} index={index} />
                    ))}
                </ul>
                
            </main>
        );
    }
}
