import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense } from "../types";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Value } from "react-calendar/src/shared/types.js";
import ErrorMesage from "./ErrorMesage";
import { useBudget } from "../hooks/useBudget";


const ExpenseForm = () => {

    const { dispatch, state, remainingBudget } = useBudget()

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const [previousAmount, setPreviousAmount] = useState(0)

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError("No puede haber campos vacíos.")
            return
        }

        if ((expense.amount - previousAmount) > remainingBudget) {
            setError("Presupuesto alcanzado.")
            return
        }

        if (state.expenseId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.expenseId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: expense })

        }


        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        setPreviousAmount(0)
    }

    useEffect(() => {

        if (state.expenseId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.expenseId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }


    }, [state.expenseId])

    return (
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-3">
                {state.expenseId ? 'Guardar Cambios' : 'Nuevo Gasto'}
            </legend>
            {error && <ErrorMesage>{error}</ErrorMesage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl"> Nombre Gasto:</label>
                <input type="text" id="expenseName" onChange={handleChange} value={expense.expenseName} placeholder="Añade el Nombre del gasto" className='bg-slate-200 p-2' name="expenseName" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl"> Gasto:</label>
                <input type="number" id="amount" onChange={handleChange} value={expense.amount} placeholder="Añade la cantidad del gasto: ej. 300" className='bg-slate-200 p-2' name="amount" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl"> Categoía:</label>
                <select id="category" className='bg-slate-200 p-2' onChange={handleChange} name="category" value={expense.category}>
                    <option value="">---Seleccione---</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">Fecha Gasto:</label>
                <DatePicker
                    id='date'
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value= {state.expenseId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}

export default ExpenseForm