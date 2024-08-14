"use client"

import React, { useState } from 'react'
import Navigationbar from './ui/Navbar'
import MagicButton from './ui/Button'
import Input from './ui/Input'

function KI() {
  const [fach, setFach] = useState("")
  const [stunden, setStunden] = useState(1)
  const [kiInput, setKiInput] = useState([])
  const [kiOutput, setKiOutbut] = useState([])

  const fetchKiInput = async () => {
    if (!fach || !stunden) {
      return;
    }

    try {
      const resFetchKiInput = await fetch("/api/getKiInput", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fach,
          stunden
        })
      });

      if (resFetchKiInput.ok) {
        const data = await resFetchKiInput.json();
        setKiInput(data)
        console.log(data)
      } else {
        console.error("Fehler beim Abrufen des KI Inputs");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des KI Inputs", error);
    }
  };

  return (
    <div>
      <Navigationbar />

      <div className='main_div d-flex justify-content-center mx-4'>
        <div className='card card_thema mt-4'>
          <div className='mx-3 mt-3'>
            <Input placeholder={"Mathe"} isLabel={true} contentLabel={"Fach"} onChange={(e) => setFach(e.target.value)} />
            <Input placeholder={1} type={"number"} isLabel={true} contentLabel={"Anzahl der Stunden"} extraClass={"mt-2 mb-3"} onChange={(e) => setStunden(e.target.value)} />
            <MagicButton content={"Stundenwiederholung generieren"} extraClass={"full_width_button"} funktion={fetchKiInput} />
          </div>

          <h1 className='fs-3 mx-3 mt-4 mb-1'>Output</h1>
          <div className='thema_content card mx-3 mb-3'>
            <div className='p-2 add_seite overflow-auto'>
              {kiInput.map((item, index) => (
                <div key={index} className='mb-2'>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                  <small>{item.date}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KI