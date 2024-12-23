import Modal from "react-modal";

export default function ModalWrapper(props: {
  isOpen: boolean;
  close: () => void;
  children: JSX.Element;
  contentLabel: string;
}) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={close}
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
        <button onClick={close}>close</button>
      </div>
    </Modal>
  );
}
