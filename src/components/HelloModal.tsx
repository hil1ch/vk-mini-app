// HelloModal.tsx
import { useState } from "react";
import { Modal } from "./ui/Modal";
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
        <Title style={{ paddingBottom: "15px" }}>
          «Кто Я?» — за 10 вопросов!
        </Title>
        <Text style={{ paddingBottom: "15px" }}>
          Загадай своего друга.<br />
          Другие игроки будут задавать вопросы, на которые можно отвечать только
          «Да», «Нет» или «Не знаю».
        </Text>
        <Button size="m" onClick={handleClose}>
          Начать игру
        </Button>
      </ModalPage>
    </Modal>
  );
}
