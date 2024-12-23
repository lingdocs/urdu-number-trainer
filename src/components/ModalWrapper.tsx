import Modal from "react-modal";

export default function ModalWrapper(props: {
  isOpen: boolean;
  setShowing: (s: boolean) => void;
  children: JSX.Element;
  contentLabel: string;
}) {
  function handleClose() {
    props.setShowing(false);
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={handleClose}
      style={{
        content: {
          maxWidth: "20rem",
          margin: "0 auto",
        },
      }}
      ariaHideApp={false}
      contentLabel={props.contentLabel}
    >
      {props.children}
      <div style={{ margin: "0.75rem 0", textAlign: "center" }}>
        <button onClick={handleClose}>close</button>
      </div>
    </Modal>
  );
}
