import React, { useState } from "react";
import styles from "./ModalComponent.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onUpdate: (title: string, value: string) => void;
  title: string;
  content: string[];
}

const ModalComponent: React.FC<ModalProps> = ({
  show,
  onClose,
  onUpdate,
  title,
  content,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    content.length > 0 ? content[0] : ""
  );

  return (
    <div
      className={`modal ${styles.modal_container} ${
        show ? "show d-block" : "d-none"
      }`}
      tabIndex={-1}
      role="dialog"
    >
      <div className={`modal-dialog ${styles.modal_dialog}`}>
        <div className="modal-content" style={{ backgroundColor: "inherit" }}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{ filter: "invert(1)" }} // Hace el botón de cerrar visible en fondo oscuro
            ></button>
          </div>
          <div className="modal-body">
            <label htmlFor="nomineeSelect" className="pb-2">
              El ganador es:
            </label>
            <select
              id="nomineeSelect"
              className="form-select"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {content.length > 0 ? (
                content.map((nominee, index) => (
                  <option key={index} value={nominee}>
                    {nominee}
                  </option>
                ))
              ) : (
                <option value="">No hay nominados</option>
              )}
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" onClick={onClose}>
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => onUpdate(title, selectedValue)}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
