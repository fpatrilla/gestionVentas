import { Link } from "@material-ui/core";

import NoteModal from "../components/NoteModal";
import React, { useState, useRef, useEffect } from "react";
import Note from "../models/Note";
import dbConnect from "../lib/dbConnect";
import { format } from "date-fns";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import InventoryIcon from "@mui/icons-material/Inventory";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ClearIcon from "@mui/icons-material/Clear";
import TodayIcon from "@mui/icons-material/Today";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GroupsIcon from "@mui/icons-material/Groups";
import BuildIcon from "@mui/icons-material/Build";
import RadioIcon from "@mui/icons-material/Radio";
import Swal from "sweetalert2";

const contentType = "application/json";

export default function Varios({ notes }) {
  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notesState, setNotes] = useState(notes); //
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto"); // Estado para la altura del textarea

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(`${scrollHeight}px`);
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [notes]); // Ajusta la altura del textarea cada vez que las notas cambien

  const openNoteModal = () => {
    setNoteModalIsOpen(true);
  };

  const closeNoteModal = () => {
    setNoteModalIsOpen(false);
  };

  const handleDelete = async (noteId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de que deseas eliminar la nota?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/note/${noteId}`, {
          method: "DELETE",
          headers: {
            Accept: contentType,
            "Content-Type": contentType,
          },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const updatedNotes = notesState.filter((note) => note._id !== noteId);
        setNotes(updatedNotes);
        window.location.reload();

        Swal.fire("¡Eliminado!", "La nota se eliminó exitosamente", "success");
      }
    } catch (error) {
      setErrorMessage("Error al eliminar la nota");
    }
  };

  return (
    <div>
      <h1>
        Varios
        <GroupsIcon className="iconhead" />
      </h1>
      <hr></hr>
      <div style={{ display: "flex" }}>
        <div className="btn btn-success">
          <PostAddIcon
            onClick={openNoteModal}
            style={{ textDecoration: "none", color: "white" }}
          />
        </div>
      
        <div style={{marginLeft:"auto"}}>
          <Link href="/sotckOrders">
            <button className="btn btn-danger">
              Pedidos
              <LocalGroceryStoreIcon style={{ marginLeft: "3px" }} />
            </button>
          </Link>
        </div>
      </div>
      <hr></hr>
      <div>
        <div
          className="card-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 0fr))",
            gridGap: "20px",
          }}
        >
          {notes.map((note, index) => (
            <div
              className="card mb-3"
              key={note._id}
              style={{ width: "18rem", backgroundColor: "#ffbf00c4" }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <h5 className="card-title">
                    <TodayIcon /> {note.createdAt}
                  </h5>
                </div>
                <div style={{ height: "6px", width: "6px", marginLeft: "45%" }}>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="btn btn-black"
                    style={{ padding: "1px", fontSize: "6px" }}
                  >
                    <ClearIcon />
                  </button>
                </div>
              </div>

              <textarea
                className="card-text"
                ref={textareaRef}
                style={{
                  height: textareaHeight,
                  overflowY: "hidden",
                  minHeight: "100px",
                  backgroundColor: "rgb(255 191 0 / 1%)",
                }}
                defaultValue={note.note}
                onChange={adjustTextareaHeight}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
      <NoteModal isOpen={noteModalIsOpen} closeModal={closeNoteModal} />
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Note.find({});
  const notes = result.map((doc) => {
    const note = doc.toObject();
    note._id = note._id.toString();
    note.createdAt = format(new Date(note.createdAt), "dd-MM-yyyy");
    return note;
  });

  return { props: { notes } };
}
