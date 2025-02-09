import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDitails from "./ExpenseDitails"
const ExpenseList = () => {

    const { state } = useBudget()

    
    const filteredExpenses = state.selectedCategory ? state.expenses.filter(expense => expense.category === state.selectedCategory) : state.expenses
   
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
   
   
    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p> :
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Lista de Gastos</p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDitails
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            }
        </div>
    )
}

export default ExpenseList