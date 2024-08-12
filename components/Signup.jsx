"use client"

import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Input from './ui/Input';
import MagicButton from './ui/Button';
import { useRouter } from 'next/navigation';

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!name || !email || !password){
            return
        }

        try{    
            const resUserExists = await fetch('api/userExists', {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email
                })
            })

            const {user} = await resUserExists.json()

            if(user) {
                console.log("Diese Email ist vergeben")
                return
            }

            const resSignUp = await fetch('api/signup', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name,
                    email, 
                    password
                })
            })

            if(resSignUp.ok){
                const form = e.target
                form.reset()
                router.push("/")
            }else {
                console.log("Ein Fehler ist beim erstellen eines Nutzers aufgetreten")
            }
        } catch (error){
            console.log("Ein Fehler ist beim erstellen eines Nutzers aufgetreten", error)
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='card form_card'>
                <h1 className='mt-4 mx-4'>Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <Input type={"text"} placeholder={"Name"} onChange={(e) => setName(e.target.value)} extraClass={"mt-3 mx-4"} />

                    <Input type={"email"} placeholder={"E-Mail"} onChange={(e) => setEmail(e.target.value)} extraClass={"mt-3 mx-4"} />

                    <Input type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} extraClass={"mt-3 mx-4"} />
                    <div className='mx-4'>
                        <MagicButton type={"submit"} content={"Sign Up"} extraClass={"full_width_button mt-3"} />
                    </div>

                    <div className='mt-3 mb-4 mx-4'>
                        <Link href={"/"}>Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup