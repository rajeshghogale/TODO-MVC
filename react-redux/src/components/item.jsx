import { PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import TextInput from "./text-input";
import { api } from '../api/axiosConfig';

export default class Item extends PureComponent {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        editTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
    };

    state = {
        editing: false,
    };

    handleDoubleClick = () => {
        this.setState({ editing: true });
    };

    handleSave = async (todo, text) => {
        console.log(todo,text)
        if (text.length === 0)
            this.props.deleteTodo(todo);
        else {
            this.props.editTodo(todo, text);
            await api.patch(`/${todo.orderTodo}`,{ title :  text});
        }
        this.setState({ editing: false });
    };

    render() {
        const { todo, toggleTodo, deleteTodo, index } = this.props;
        let element;
        if (this.state.editing) {
            element = <TextInput text={todo.title} editing={this.state.editing} onSave={(text) => this.handleSave(todo, text)} />;
        } else {
            element = (
                <div className="view">
                    <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={todo.completed == 1} onChange={() => toggleTodo(todo.orderTodo)} />
                    <label onDoubleClick={this.handleDoubleClick} data-testid="todo-item-label">
                        {todo.title}
                    </label>
                    <button className="destroy" data-testid="todo-item-button" onClick={() => deleteTodo(todo.orderTodo)} />
                </div>
            );
        }

        return (
            <li
                className={classnames({
                    completed: todo.completed == 1,
                    editing: this.state.editing,
                })}
                data-testid="todo-item"
            >
                {element}
            </li>
        );
    }
}
