import { connect } from "react-redux";
import Main from "../components/main";
import { editTodo, toggleTodo, deleteTodo, toggleAll, clearCompleted } from "../actions";
import { withRouter } from "react-router-dom";
import { getCompletedTodos, getVisibleTodos } from "../selectors/filters";

const mapStateToProps = (state, ownProps) => {
    let { todos } = state;
    let visibleTodos = [], completedCount = 0, activeCount = 0;
    if (ownProps.data.length) {
        todos  = ownProps.data;
        const { location } = ownProps;
        console.log(ownProps)
        visibleTodos = getVisibleTodos(todos, location.pathname);
        completedCount = getCompletedTodos(todos).length;
        activeCount = todos.length - completedCount;
    }
    return { todos, completedCount, activeCount, visibleTodos };
};

const mapDispatchToProps = {
    editTodo,
    toggleTodo,
    deleteTodo,
    toggleAll,
    clearCompleted,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
