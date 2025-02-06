import { ChangeEvent, FormEvent, useState } from "react";
import { DraftExpense } from "../types";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Value } from "react-calendar/src/shared/types.js";
import ErrorMesage from "./ErrorMesage";


const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

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
            [value]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError("No puede haber campos vacíos.")
        }
    }

    return (
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
                <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-3">
                    Nuevo Gasto
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
                    <label htmlFor="amount" className="text-xl"> Categoía:</label>
                    <select id="amount" className='bg-slate-200 p-2' onChange={handleChange} name="amount" value={expense.category}>
                        <option value="">---Seleccione---</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount" className="text-xl">Fecha Gasto:</label>
                    <DatePicker
                        className="bg-slate-100 p-2 border-0"
                        value={expense.date}
                        onChange={handleChangeDate}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                    value={'Registrar Gasto'}
                />
        </form>
    )
}

export default ExpenseForm