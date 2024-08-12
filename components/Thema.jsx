"use client"

import Navigationbar from './ui/Navbar'
import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import MagicButton from './ui/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import Input from './ui/Input';

function Thema({ params }) {
  const [themaId, setThemaId] = useState("")
  const [toogle, setToggle] = useState(false)
  const [title, setTitle] = useState("1. Weltkrieg")
  const [seitenInhalt, setSeitenInhalt] = useState("Der Erste Weltkrieg war ein bewaffneter Konflikt, der von 1914 bis 1918 in Europa, in Vorderasien, in Afrika, Ostasien und auf den Ozeanen geführt wurde. Etwa 17 Millionen Menschen verloren durch ihn ihr Leben, wobei die Schätzungen mit großen Unsicherheiten behaftet sind.[1] Etwa 40 Staaten[2] beteiligten sich am bis dahin umfassendsten Krieg der Geschichte, insgesamt standen annähernd 70 Millionen Menschen unter Waffen.[3] Die wichtigsten Kriegsbeteiligten waren Deutschland, Österreich-Ungarn und das Osmanische Reich einerseits (Kriegsverlierer) sowie Frankreich, Großbritannien und sein Britisches Weltreich, Russland, Italien und die USA andererseits (Kriegsgewinner).")

  useEffect(() => {
    const { id } = params
    setThemaId(id)
  })

  const editSeiteToggle = () => {
    if (toogle) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  return (
    <div>
      <Navigationbar />

      <div className='main_div d-flex justify-content-center mx-4'>
        <div className='card card_thema mt-4'>
          <div className='d-flex justify-content-start mt-3 mx-3'>
            {toogle ? (
                <Input placeholder={"Geometrie"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            ) : (
              <h1 className='fs-3'>{title}</h1>
            )}
            {toogle ? (
              <MagicButton extraClass={"mb-3 ms-3"} content={<><SaveIcon className='me-2' /> Änderungen speichern</>} funktion={editSeiteToggle} />
            ) : (
              <MagicButton extraClass={"mb-3 ms-3"} content={<><EditNoteIcon className='me-2' /> Seite bearbeiten</>} funktion={editSeiteToggle} />
            )}
          </div>

          <div className='thema_content card mx-3'>
            {toogle ? (
              <textarea onChange={(e) => setSeitenInhalt(e.target.value)} className='mt-2 mx-3 p-2 textarea_seite'>{seitenInhalt}</textarea>
            ) : (
              <div className='d-felx justify-content-start mt-2 mx-3 p-2'>{seitenInhalt}</div>
            )}
          </div>

          <div className='d-flex justify-content-center align-items-center thema_footer'>
            <Pagination className='mt-3'>
              <Pagination.First className='seiten_anzahl d-flex justify-content-center' />
              <Pagination.Item className='seiten_anzahl d-flex justify-content-center'>{10}</Pagination.Item>
              <Pagination.Item className='seiten_anzahl d-flex justify-content-center'>{11}</Pagination.Item>
              <Pagination.Item active className='seiten_anzahl d-flex justify-content-center'>{12}</Pagination.Item>
              <Pagination.Item className='seiten_anzahl d-flex justify-content-center'>{13}</Pagination.Item>
              <Pagination.Item className='seiten_anzahl d-flex justify-content-center'>{14}</Pagination.Item>
              <Pagination.Last className='seiten_anzahl d-flex justify-content-center' />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thema