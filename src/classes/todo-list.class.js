import { Todo } from "./todo.class";

export class TodoList {

 constructor() {

    //this.todos = [];
    this.cargarLocalStorage();

  }
  nuevoTodo( todo ) {

    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo( id ) {

    this.todos = this.todos.filter( todo => todo.id != id) // Si es diferente al id
    this.guardarLocalStorage();
  }

  marcarCompletado( id ) {

    for(const todo of this.todos) {

      if(todo.id == id) {

        todo.completado = !todo.completado; // Si es true su negación es falso y viceversa
        this.guardarLocalStorage();
        break;
      }
    }

  }

  eliminarCompletados() {

    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {

    localStorage.setItem("todo", JSON.stringify(this.todos));
  }

  cargarLocalStorage() {

    this.todos = localStorage.getItem("todo")
               ? JSON.parse(localStorage.getItem("todo"))
               : [];

    this.todos = this.todos.map( Todo.fronJson );
  }
}