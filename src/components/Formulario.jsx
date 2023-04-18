import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useState } from "react";

const Formulario = ({addTodo}) => {
    const [todo, setTodo] = useState({
        title: "",
        description: "",
        state: "pendiente",
        priority: true,
    });

    const { title, description, state, priority } = todo;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title.trim || !description.trim()) {
            return swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El título y la descripción son obligatorias',
            })
        }

        addTodo({
            id: Date.now(),
            ...todo,
            state: state === 'completado'
        })

        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarea agregada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        setTodo({
            ...todo,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ingrese alguna tarea"
                className="form-control mb-2"
                name="title"
                value={title}
                onChange={handleChange}
            />
            <textarea
                className="form-control mb-2"
                id='textarea'
                placeholder="Ingrese la descripción"
                name="description"
                value={description}
                onChange={handleChange}
            />
            <div className="form-check mb-2">
                <input
                    type="checkbox"
                    name="priority"
                    className="form-check-input"
                    id="inputCheck"
                    checked={priority}
                    onChange={handleChange}
                />
                <label htmlFor="inputCheck" className='prioridad'> Dar prioridad </label>
            </div>
            <select
                className="mb-2"
                name="state"
                value={state}
                onChange={handleChange}
            >
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
            </select>
            <div>
                <button type="submit" className="btn btn-dark">
                    Agregar Tarea
                </button>
            </div>
        </form>
    );
};
export default Formulario;
