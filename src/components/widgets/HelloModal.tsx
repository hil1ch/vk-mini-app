// HelloModal.tsx
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { ModalPage, Title, Text, Button } from "@vkontakte/vkui";

export function HelloModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <Modal activeModal={isOpen ? "hello" : null}>
      <ModalPage
        id="hello"
        preventClose={true}
        hideCloseButton={true}
        onClose={handleClose}
        dynamicContentHeight={true}
        header={<div style={{ height: 20 }} />}
        footer={<div style={{ height: 15 }} />}
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "30px",
        }}
      >
        <Title style={{ paddingBottom: "15px" }}>Aim Training</Title>
        <Text style={{ paddingBottom: "15px", paddingRight: '5px', paddingLeft: '5px' }}>
          Перед тобой игровое поле, где случайно появляются круги разных
          размеров. Твоя задача — за выбранное время кликнуть по ним как можно быстрее!
        </Text>
        <Button size="m" onClick={handleClose}>
          Начать игру
        </Button>
      </ModalPage>
    </Modal>
  );
}
