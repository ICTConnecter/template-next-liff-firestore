"use client"
import { useState } from "react"

const Register = () => {
    const [todo, setTodo] = useState<string[]>([])
    return <>
        <div className="flex flex-col items-center h-screen mt-10">
            <h1 className="text-2xl font-bold mb-5">登録ページ</h1>
            {
                todo.map((v, i) =>
                    <div key={v + i}>
                        <input type="text" className="border-2 border-gray-300 rounded-md p-2 mb-1" value={v} onChange={(e) => {
                            setTodo(prev => prev.map((value, index) => index === i ? e.target.value : value))
                        }} />
                        <button className="outline-gray-300 border-2 border-gray-300 p-2 rounded-md" onClick={() => {
                            setTodo(prev => prev.filter((value, index) => i !== index))
                        }}>✖</button>
                    </div>
                )
            }
            <button className="bg-blue-500 text-white p-2 px-4 rounded-md" onClick={() => {
                setTodo(prev => [...prev, ""])
            }}>追加</button>
        </div>
    </>
}

export default Register