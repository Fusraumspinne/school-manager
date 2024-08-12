"use client"

import React, { useState, useEffect } from 'react'
import Navigationbar from './ui/Navbar'
import { useSession } from "next-auth/react"
import Accordion from 'react-bootstrap/Accordion';
import Link from 'next/link';
import MagicButton from './ui/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Input from './ui/Input';

function Datein() {
    const { data: session } = useSession()

    const [email, setEmail] = useState("")
    const [toggle, setToggle] = useState("")
    const [fachName, setFachName] = useState("")
    const [themaName, setThemaName] = useState("")
    const [selectedFachIndex, setSelectedFachIndex] = useState(null);
    const [currentFach, setCurrentFach] = useState("")
    const [fächer, setFächer] = useState([])

    useEffect(() => {
        setEmail(session?.user?.email)
    }, [session])

    const handleToggleAdd = (form, index = null, currentFach) => {
        if (!toggle) {
            setToggle(form)
        } else {
            setToggle("")
        }

        setSelectedFachIndex(index);
        setCurrentFach(currentFach)
    }

    const addFach = () => {
        if (!email) {
            return
        }

        const newFach = {
            fach: fachName,
            email: email,
            themen: []
        };

        setFächer([...fächer, newFach]);
        setFachName("")
        setToggle("");
    }

    const addThema = () => {
        if (selectedFachIndex === null || !themaName) {
            return;
        }

        const updatedFächer = fächer.map((fach, index) => {
            if (index === selectedFachIndex) {
                return {
                    ...fach,
                    themen: [...fach.themen, themaName]
                };
            }
            return fach;
        });

        setFächer(updatedFächer);
        setThemaName("");
        setToggle("");
        setSelectedFachIndex(null);
    }

    const save = async () => {
        if (!fächer) {
            return
        }

        try {
            const resCreateFächer = await fetch("/api/createFaecher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fächer
                })
            })

            if (resCreateFächer.ok) {
                console.log("Fächer wurden gespeichert")
            } else {
                console.log("Fehler beim speichern der Fächer")
            }
        } catch (error) {
            console.log("Fehler beim speichern der Fächer: ", error)
        }
    }

    useEffect(() => {
        if(email){
            fetchFächer()
        }
    }, [email])

    const fetchFächer = async () => {
        try {
            const resFetchFächer = await fetch("/api/getFaecher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
    
            if (resFetchFächer.ok) {
                const data = await resFetchFächer.json(); 
                setFächer(data);
            } else {
                console.error("Fehler beim Abrufen der Fächer");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Fächer: ", error);
        }
    };

    return (
        <div>
            <Navigationbar />

            <div className='main_div d-flex justify-content-center'>
                {toggle ? (
                    toggle === "fach" ? (
                        <div className='card form_card'>
                            <h1 className='mt-4 mx-4 fs-4'>Fach hinzufügen</h1>

                            <div>
                                <Input type={"text"} placeholder={"Mathe"} onChange={(e) => setFachName(e.target.value)} extraClass={"mt-3 mx-4"} />

                                <div className='mx-4'>
                                    <MagicButton funktion={() => addFach("fach")} content={"hinzufügen"} extraClass={"full_width_button mt-3 mb-2"} />
                                    <MagicButton funktion={handleToggleAdd} content={"abbrechen"} extraClass={"full_width_button mt-1 mb-4"} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='card form_card'>
                            <h1 className='mt-4 mx-4 fs-4'>Thema hinzufügen</h1>
                            <p className='m-0 mx-4 fs-5 mb-1 mt-3'>Fach: {currentFach}</p>

                            <div>
                                <Input type={"text"} placeholder={"Geometrie"} onChange={(e) => setThemaName(e.target.value)} extraClass={"mt-0 mx-4"} />

                                <div className='mx-4'>
                                    <MagicButton funktion={() => addThema(themaName)} content={"hinzufügen"} extraClass={"full_width_button mt-3 mb-2"} />
                                    <MagicButton funktion={handleToggleAdd} content={"abbrechen"} extraClass={"full_width_button mt-1 mb-4"} />
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <Accordion defaultActiveKey="0" className='auswahl_accordion mt-5'>
                        {fächer.map((fach, index) => (
                            <Accordion.Item eventKey={index.toString()} key={index}>
                                <Accordion.Header>{fach.fach}</Accordion.Header>
                                <Accordion.Body>
                                    {fach.themen.map((thema, idx) => (
                                        <div key={idx}>
                                            {isNaN(thema) ? (
                                                <Link href={`${fach.email}-${thema}`} className="d-block">
                                                    {thema}
                                                </Link>
                                            ) : (
                                                <p className='fs-5 mb-0 mt-2'>Klasse: {thema}</p>
                                            )}
                                        </div>
                                    ))}

                                    <MagicButton extraClass={"full_width_button mt-3"} content={<><AddIcon className='me-2' /> Thema hinzufügen</>} funktion={() => handleToggleAdd("thema", index, fach.fach)} />
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                        <MagicButton extraClass={"full_width_button mt-3"} content={<><AddIcon className='me-2' /> Fach hinzufügen</>} funktion={() => handleToggleAdd("fach")} />
                        <MagicButton extraClass={"full_width_button mt-3"} content={<><SaveIcon className='me-2' /> Speichern</>} funktion={save} />
                    </Accordion>
                )}
            </div>
        </div>
    )
}

export default Datein