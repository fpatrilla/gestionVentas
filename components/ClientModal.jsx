import React from "react";
import Modal from "react-modal";

const ClientModal = ({ isOpen, closeModal, client }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Mi Modal">
      <h2>Elegí el Cliente</h2>
      <div className="container text-center">
        <div className="row">
          <div className="col-10">
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">Código</th>
                  <th scope="col-2">Nombre</th>
                  <th scope="col-2">Apellido</th>
                  <th scope="col-2">Celular</th>
                  <th scope="col-5">Seleccionar</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </Modal>
  );
};

export default ClientModal;
