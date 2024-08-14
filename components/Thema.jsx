"use client"

import Navigationbar from './ui/Navbar'
import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import MagicButton from './ui/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import Input from './ui/Input';
import AddIcon from '@mui/icons-material/Add';

function Thema({ params }) {
  const [themaId, setThemaId] = useState("")
  const [seiten, setSeiten] = useState({ id: "", content: [] });
  const [toogle, setToggle] = useState(false)
  const [exists, setExists] = useState(false)
  const [seitenTitle, setSeitenTitle] = useState("")
  const [seitenInhalt, setSeitenInhalt] = useState("")
  const [seitenZahl, setSeitenZahl] = useState(1)
  const [date, setDate] = useState("")
  const [fach, setFach] = useState("")
  const [selectFach, setSelectFach] = useState(false)

  useEffect(() => {
    const { id } = params;
    setThemaId(id);
  }, [params]);

  useEffect(() => {
    if (Array.isArray(seiten.content)) {
      const index = seiten.content.findIndex(item => item.seitenzahl === seitenZahl);
      if (index !== -1) {
        const currentPage = seiten.content[index];
        setSeitenTitle(currentPage.title);
        setSeitenInhalt(currentPage.content);
        setExists(true);
      } else {
        setSeitenTitle("");
        setSeitenInhalt("");
        setExists(false);
      }
    }
  }, [seitenZahl, seiten.content]);

  useEffect(() => {
    if (Array.isArray(seiten.content)) {
      if (seitenZahl > seiten.content.length) {
        setExists(false);
      } else {
        setExists(true);
      }
    } else {
      setExists(false);
    }
  }, [seitenZahl, seiten.content]);

  const editSeiteToggle = () => {
    setToggle(!toogle);
  }

  const addSeite = () => {
    const newContent = {
      title: `Neuer Titel`,
      content: "Hier kommt der Inhalt.",
      seitenzahl: seiten.content.length + 1,
      date: date
    };

    setSeiten(prevSeiten => ({
      ...prevSeiten,
      content: [...prevSeiten.content, newContent]
    }));

    setExists(true);
  };

  const updateSeitenZahl = (zahl) => {
    const newSeitenZahl = seitenZahl + zahl;
    if (newSeitenZahl > 0) {
      setSeitenZahl(newSeitenZahl);
    }
  }

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("de-DE");
    setDate(formattedDate)
  }, [])

  const save = async () => {
    if (!themaId || !date) {
      console.error("Fehlende Thema ID oder fehlendes Datum");
      return;
    }

    if (!fach) {
      setSelectFach(true)
      return
    }

    const updatedContent = seiten.content.map(page =>
      page.seitenzahl === seitenZahl
        ? { ...page, title: seitenTitle, content: seitenInhalt }
        : page
    );

    try {
      const resSave = await fetch("/api/createSeiten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: themaId,
          fach: fach,
          content: updatedContent
        })
      });

      if (resSave.ok) {
        await fetchSeiten();
        setToggle(false);
      } else {
        console.error("Fehler beim Speichern oder Aktualisieren der Seite");
      }
    } catch (error) {
      console.error("Fehler beim Speichern oder Aktualisieren der Seite:", error);
    }
  };

  useEffect(() => {
    fetchSeiten();
  }, [themaId]);

  const fetchSeiten = async () => {
    if (!themaId) {
      return;
    }

    try {
      const resFetchSeiten = await fetch("/api/getSeiten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: themaId })
      });

      if (resFetchSeiten.ok) {
        const data = await resFetchSeiten.json();
        if (data && Array.isArray(data.content)) {
          setSeiten(data);
          setExists(true);
          setFach(data.fach)
        } else {
          setSeiten({ id: themaId, content: [] });
          setExists(false);
          console.error("Es existieren keine Seiten unter dieser Id", data);
        }
      } else {
        console.error("Fehler beim Abrufen der Seiten");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Seiten", error);
    }
  };

  return (
    <div>
      <Navigationbar />

      <div className='main_div d-flex justify-content-center mx-4'>
        <div className='card card_thema mt-4'>
          <div className='d-flex justify-content-start mt-3 mx-3'>
            {toogle ? (
              <Input placeholder={"Geometrie"} value={seitenTitle} onChange={(e) => setSeitenTitle(e.target.value)} />
            ) : (
              exists ? (
                <h1 className='fs-3'>{seitenTitle}</h1>
              ) : (
                <div></div>
              )
            )}
            {toogle ? (
              <MagicButton extraClass={"mb-3 ms-3"} content={<><SaveIcon className='me-2' /> Änderungen speichern</>} funktion={save} />
            ) : (
              seitenTitle ? (
                exists ? (
                  <MagicButton extraClass={"mb-3 ms-3"} content={<><EditNoteIcon className='me-2' /> Seite bearbeiten</>} funktion={editSeiteToggle} />
                ) : (
                  <div></div>
                )
              ) : (
                exists ? (
                  <MagicButton extraClass={"mb-3"} content={<><EditNoteIcon className='me-2' /> Seite bearbeiten</>} funktion={editSeiteToggle} />
                ) : (
                  <div></div>
                )
              )
            )}
          </div>

          <div className='thema_content card mx-3'>
            {selectFach ? (
                <div className='d-flex justify-content-center align-items-center flex-column add_seite'>
                  <Input placeholder={"Mathe"} onChange={(e) => setFach(e.target.value)} extraClass={"half_width_button"}/>
                  <MagicButton extraClass={"half_width_button mt-3"} content={<><SaveIcon className='me-2' /> Fach festlegen</>} funktion={() => setSelectFach(false)}/>
                </div>
            ) : (
              exists ? (
                toogle ? (
                  <textarea onChange={(e) => setSeitenInhalt(e.target.value)} className='mt-2 mx-3 p-2 textarea_seite' value={seitenInhalt}></textarea>
                ) : (
                  <div className='d-flex justify-content-start mt-2 mx-3 p-2'>{seitenInhalt}</div>
                )
              ) : (
                <div className='d-flex justify-content-center align-items-center mt-2 mx-3 p-2 add_seite'>
                  <MagicButton content={<><AddIcon className='me-2' /> Seite hinzufügen</>} funktion={addSeite} />
                </div>
              )
            )}

          </div>

          <div className='d-flex justify-content-center align-items-center thema_footer'>
            <Pagination className='mt-3'>
              <Pagination.First className='seiten_anzahl d-flex justify-content-center' onClick={() => setSeitenZahl(1)} />

              {seitenZahl - 2 <= 0 ? (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center'>x</Pagination.Item>
              ) : (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center' onClick={() => updateSeitenZahl(-2)}>{seitenZahl - 2}</Pagination.Item>
              )}

              {seitenZahl - 1 <= 0 ? (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center'>x</Pagination.Item>
              ) : (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center' onClick={() => updateSeitenZahl(-1)}>{seitenZahl - 1}</Pagination.Item>
              )}
              <Pagination.Item active className='seiten_anzahl d-flex justify-content-center'>{seitenZahl}</Pagination.Item>

              {seitenZahl > seiten.content.length ? (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center' >x</Pagination.Item>
              ) : (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center' onClick={() => updateSeitenZahl(1)}>{seitenZahl + 1}</Pagination.Item>
              )}

              {seitenZahl > seiten.content.length - 1 ? (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center' >x</Pagination.Item>
              ) : (
                <Pagination.Item className='seiten_anzahl d-flex justify-content-center' onClick={() => updateSeitenZahl(2)}>{seitenZahl + 2}</Pagination.Item>
              )}

              {seitenZahl > seiten.content.length - 1 ? (
                <Pagination.Last className='seiten_anzahl d-flex justify-content-center' />
              ) : (
                <Pagination.Last className='seiten_anzahl d-flex justify-content-center' onClick={() => updateSeitenZahl(seiten.content.length - 1)} />
              )}
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thema